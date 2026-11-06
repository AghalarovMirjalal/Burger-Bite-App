import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GradientButton } from '../../components/GradientButton';
import { QuantityStepper } from '../../components/QuantityStepper';
import { ScreenBackground } from '../../components/ScreenBackground';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { confirmAction, notify } from '../../lib/dialog';
import { formatPrice } from '../../lib/format';
import { fonts, makeStyles, s, useTheme } from '../../theme';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();
  const toast = useToast();
  const cart = useCart();
  const [code, setCode] = useState('');
  const [placing, setPlacing] = useState(false);

  const applyCode = () => {
    if (!code.trim()) return;
    if (cart.applyPromo(code)) {
      toast('Promo code applied');
      setCode('');
    } else {
      toast('This code is not valid');
    }
  };

  const placeOrder = async () => {
    setPlacing(true);
    const order = await cart.checkout();
    setPlacing(false);
    if (order) {
      await notify('Order placed!', `Your order ${order.id} for ${formatPrice(order.total)} is on its way.`);
      router.replace('/home');
    }
  };

  const confirmRemove = async (id: string, name: string) => {
    if (await confirmAction('Remove item', `Remove ${name} from your cart?`, 'Remove')) {
      cart.removeLine(id);
    }
  };

  if (cart.lines.length === 0) {
    return (
      <View style={styles.root}>
        <ScreenBackground glow="top" />
        <ScreenHeader title="My Cart" />
        <View style={styles.empty}>
          <MaterialCommunityIcons name="basket-outline" size={s(72)} color={colors.cardBorder} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyText}>Add a few burgers and they will show up here.</Text>
          <GradientButton title="Browse menu" onPress={() => router.replace('/home')} style={{ width: s(220), marginTop: s(10) }} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScreenBackground glow="top" />
      <ScreenHeader title="My Cart" />

      <FlatList
        data={cart.lines}
        keyExtractor={(line) => line.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: s(12) }} />}
        renderItem={({ item }) => (
          <Pressable style={styles.line} onPress={() => router.push({ pathname: '/burger/[id]', params: { id: item.id } })}>
            <Image source={item.burger.image} style={styles.image} resizeMode="contain" />
            <View style={styles.lineInfo}>
              <View style={styles.lineTop}>
                <Text style={styles.lineName} numberOfLines={1}>
                  {item.burger.name}
                </Text>
                <Pressable onPress={() => confirmRemove(item.id, item.burger.name)} hitSlop={10}>
                  <Ionicons name="trash-outline" size={s(18)} color={colors.muted} />
                </Pressable>
              </View>
              <Text style={styles.linePrice}>{formatPrice(item.burger.price * item.qty)}</Text>
              <QuantityStepper value={item.qty} min={0} onChange={(qty) => cart.setQty(item.id, qty)} unit={(n) => s(n * 0.78)} />
            </View>
          </Pressable>
        )}
        ListFooterComponent={
          <View>
            <View style={styles.promo}>
              <Ionicons name="pricetag-outline" size={s(18)} color={colors.orange} />
              {cart.promo ? (
                <>
                  <Text style={styles.promoApplied}>
                    {cart.promo.code} · {cart.promo.title}
                  </Text>
                  <Pressable onPress={cart.clearPromo} hitSlop={10}>
                    <Ionicons name="close-circle" size={s(20)} color={colors.muted} />
                  </Pressable>
                </>
              ) : (
                <>
                  <TextInput
                    value={code}
                    onChangeText={setCode}
                    placeholder="Promo code"
                    placeholderTextColor={colors.faint}
                    autoCapitalize="characters"
                    selectionColor={colors.orange}
                    style={styles.promoInput}
                    onSubmitEditing={applyCode}
                  />
                  <Pressable onPress={applyCode} hitSlop={8}>
                    <Text style={styles.apply}>Apply</Text>
                  </Pressable>
                </>
              )}
            </View>
            {cart.promo && cart.discount === 0 && !cart.promo.freeDelivery && (
              <Text style={styles.promoHint}>Add items worth {formatPrice(cart.promo.minOrder)} to use this code</Text>
            )}

            <View style={styles.summary}>
              <Row label="Subtotal" value={formatPrice(cart.subtotal)} />
              {cart.discount > 0 && <Row label="Discount" value={`− ${formatPrice(cart.discount)}`} accent />}
              <Row label="Delivery" value={cart.delivery === 0 ? 'Free' : formatPrice(cart.delivery)} />
              <View style={styles.divider} />
              <Row label="Total" value={formatPrice(cart.total)} big />
            </View>
          </View>
        }
      />

      <View style={[styles.checkout, { paddingBottom: insets.bottom + s(16) }]}>
        <GradientButton
          title={`Checkout · ${formatPrice(cart.total)}`}
          height={s(50)}
          onPress={placeOrder}
          loading={placing}
        />
      </View>
    </View>
  );
}

function Row({ label, value, big, accent }: { label: string; value: string; big?: boolean; accent?: boolean }) {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, big && styles.rowBig]}>{label}</Text>
      <Text style={[styles.rowValue, big && styles.rowBig, accent && styles.rowAccent]}>{value}</Text>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  list: {
    paddingHorizontal: s(28),
    paddingBottom: s(30),
  },
  line: {
    flexDirection: 'row',
    gap: s(12),
    padding: s(12),
    borderRadius: s(16),
    backgroundColor: c.surface,
  },
  image: {
    width: s(84),
    height: s(84),
  },
  lineInfo: {
    flex: 1,
    gap: s(4),
  },
  lineTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: s(8),
  },
  lineName: {
    flex: 1,
    color: c.text,
    fontFamily: fonts.kanitSemibold,
    fontSize: s(17),
  },
  linePrice: {
    color: c.orange,
    fontFamily: fonts.semibold,
    fontSize: s(14),
    marginBottom: s(2),
  },
  promo: {
    marginTop: s(22),
    height: s(50),
    borderRadius: s(25),
    borderWidth: 1,
    borderColor: c.cardBorder,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(18),
    gap: s(10),
  },
  promoInput: {
    flex: 1,
    height: '100%',
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(14),
    paddingVertical: 0,
  },
  promoApplied: {
    flex: 1,
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(13),
  },
  apply: {
    color: c.orange,
    fontFamily: fonts.semibold,
    fontSize: s(14),
  },
  promoHint: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(12),
    marginTop: s(6),
    marginLeft: s(18),
  },
  summary: {
    marginTop: s(20),
    gap: s(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(14),
  },
  rowValue: {
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(14),
  },
  rowBig: {
    color: c.text,
    fontFamily: fonts.bold,
    fontSize: s(20),
  },
  rowAccent: {
    color: '#3BB273',
  },
  divider: {
    height: 1,
    backgroundColor: c.border,
    marginVertical: s(4),
  },
  checkout: {
    paddingHorizontal: s(38),
    paddingTop: s(12),
    backgroundColor: c.bg,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(40),
    gap: s(8),
    marginBottom: s(80),
  },
  emptyTitle: {
    color: c.text,
    fontFamily: fonts.kanitMedium,
    fontSize: s(22),
    marginTop: s(10),
  },
  emptyText: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(14),
    textAlign: 'center',
  },
}));
