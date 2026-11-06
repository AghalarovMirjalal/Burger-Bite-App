import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { findBurger, type Burger } from '../data/burgers';
import { deals, type Deal } from '../data/deals';
import { keys, readJson, writeJson } from '../lib/storage';
import { useAuth } from './AuthContext';

export interface CartLine {
  id: string;
  qty: number;
}

export interface Order {
  id: string;
  createdAt: string;
  lines: { id: string; name: string; qty: number; price: number }[];
  total: number;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
}

interface CartContextValue {
  lines: (CartLine & { burger: Burger })[];
  count: number;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  promo: Deal | null;
  orders: Order[];
  notifications: Notification[];
  unread: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  checkout: () => Promise<Order | null>;
  markAllRead: () => void;
}

const DELIVERY_FEE = 49;
const FREE_DELIVERY_FROM = 999;

const CartContext = createContext<CartContextValue | null>(null);

const welcomeNotifications = (): Notification[] => [
  {
    id: 'welcome',
    title: 'Welcome to Burger Bite!',
    body: 'Your account is ready. Grab your first burger and enjoy.',
    createdAt: new Date().toISOString(),
    read: false,
  },
  {
    id: 'promo-bite10',
    title: '10% off your first order',
    body: 'Use code BITE10 at checkout. Check the Deals tab for more offers.',
    createdAt: new Date().toISOString(),
    read: false,
  },
];

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id;

  const [storedItems, setItems] = useState<CartLine[]>([]);
  const [storedOrders, setOrders] = useState<Order[]>([]);
  const [storedNotifications, setNotifications] = useState<Notification[]>([]);
  const [storedPromo, setPromo] = useState<Deal | null>(null);
  const [loadedFor, setLoadedFor] = useState<string | null>(null);

  // state of a previous user is ignored until the current user's data is loaded
  const active = !!userId && loadedFor === userId;
  const items = useMemo(() => (active ? storedItems : []), [active, storedItems]);
  const orders = useMemo(() => (active ? storedOrders : []), [active, storedOrders]);
  const notifications = useMemo(() => (active ? storedNotifications : []), [active, storedNotifications]);
  const promo = active ? storedPromo : null;

  useEffect(() => {
    if (!userId) return;

    (async () => {
      const [savedCart, savedOrders, savedNotifications] = await Promise.all([
        readJson<CartLine[]>(keys.cart(userId), []),
        readJson<Order[]>(keys.orders(userId), []),
        readJson<Notification[] | null>(keys.notifications(userId), null),
      ]);
      setItems(savedCart.filter((line) => findBurger(line.id)));
      setOrders(savedOrders);
      setNotifications(savedNotifications ?? welcomeNotifications());
      setPromo(null);
      setLoadedFor(userId);
    })();
  }, [userId]);

  // persist only after the user's data has been loaded, otherwise we'd wipe it
  useEffect(() => {
    if (userId && loadedFor === userId) writeJson(keys.cart(userId), storedItems);
  }, [storedItems, userId, loadedFor]);

  useEffect(() => {
    if (userId && loadedFor === userId) writeJson(keys.notifications(userId), storedNotifications);
  }, [storedNotifications, userId, loadedFor]);

  const add = useCallback((id: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((line) => line.id === id);
      if (existing) {
        return prev.map((line) => (line.id === id ? { ...line, qty: Math.min(line.qty + qty, 99) } : line));
      }
      return [...prev, { id, qty }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((line) => line.id !== id) : prev.map((line) => (line.id === id ? { ...line, qty: Math.min(qty, 99) } : line)),
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setItems((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const applyPromo = useCallback((code: string) => {
    const deal = deals.find((d) => d.code === code.trim().toUpperCase());
    if (!deal) return false;
    setPromo(deal);
    return true;
  }, []);

  const clearPromo = useCallback(() => setPromo(null), []);

  const lines = useMemo(
    () =>
      items
        .map((line) => ({ ...line, burger: findBurger(line.id) }))
        .filter((line): line is CartLine & { burger: Burger } => !!line.burger),
    [items],
  );

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.qty * line.burger.price, 0);
  const discount = promo && subtotal >= promo.minOrder ? Math.round(subtotal * promo.percent) / 100 : 0;
  const delivery = subtotal === 0 || subtotal - discount >= FREE_DELIVERY_FROM || promo?.freeDelivery ? 0 : DELIVERY_FEE;
  const total = Math.max(subtotal - discount + delivery, 0);

  const checkout = useCallback(async () => {
    if (!userId || lines.length === 0) return null;

    const order: Order = {
      id: `BB-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      lines: lines.map(({ burger, qty }) => ({ id: burger.id, name: burger.name, qty, price: burger.price })),
      total,
    };

    const nextOrders = [order, ...orders];
    setOrders(nextOrders);
    await writeJson(keys.orders(userId), nextOrders);

    setNotifications((prev) => [
      {
        id: order.id,
        title: `Order ${order.id} confirmed`,
        body: 'We are preparing your burgers. Estimated delivery time is 30–40 minutes.',
        createdAt: order.createdAt,
        read: false,
      },
      ...prev,
    ]);
    setItems([]);
    setPromo(null);
    return order;
  }, [userId, lines, total, orders]);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => (prev.some((n) => !n.read) ? prev.map((n) => ({ ...n, read: true })) : prev));
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    discount,
    delivery,
    total,
    promo,
    orders,
    notifications,
    unread,
    add,
    setQty,
    removeLine,
    applyPromo,
    clearPromo,
    checkout,
    markAllRead,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
