import * as Crypto from 'expo-crypto';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { keys, readJson, remove, writeJson } from '../lib/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  createdAt: string;
}

interface StoredUser extends User {
  passwordHash: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  photo: string | null;
}

interface AuthContextValue {
  user: User | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (changes: Partial<Pick<User, 'name' | 'photo'>>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const hashPassword = (email: string, password: string) =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${email}:${password}`);

const publicUser = ({ passwordHash, ...user }: StoredUser): User => user;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const sessionId = await readJson<string | null>(keys.session, null);
      if (sessionId) {
        const users = await readJson<StoredUser[]>(keys.users, []);
        const found = users.find((u) => u.id === sessionId);
        if (found) setUser(publicUser(found));
      }
      setReady(true);
    })();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const normalized = email.trim().toLowerCase();
    const users = await readJson<StoredUser[]>(keys.users, []);
    const found = users.find((u) => u.email === normalized);
    if (!found) throw new Error('No account found with this email');

    const hash = await hashPassword(normalized, password);
    if (hash !== found.passwordHash) throw new Error('Wrong password');

    await writeJson(keys.session, found.id);
    setUser(publicUser(found));
  }, []);

  const signUp = useCallback(async ({ name, email, password, photo }: SignUpData) => {
    const normalized = email.trim().toLowerCase();
    const users = await readJson<StoredUser[]>(keys.users, []);
    if (users.some((u) => u.email === normalized)) {
      throw new Error('This email is already registered');
    }

    const newUser: StoredUser = {
      id: Crypto.randomUUID(),
      name: name.trim(),
      email: normalized,
      photo,
      createdAt: new Date().toISOString(),
      passwordHash: await hashPassword(normalized, password),
    };

    await writeJson(keys.users, [...users, newUser]);
    await writeJson(keys.session, newUser.id);
    setUser(publicUser(newUser));
  }, []);

  const signOut = useCallback(async () => {
    await remove(keys.session);
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    async (changes: Partial<Pick<User, 'name' | 'photo'>>) => {
      if (!user) return;
      const users = await readJson<StoredUser[]>(keys.users, []);
      const next = users.map((u) => (u.id === user.id ? { ...u, ...changes } : u));
      await writeJson(keys.users, next);
      setUser({ ...user, ...changes });
    },
    [user],
  );

  const value = useMemo(
    () => ({ user, ready, signIn, signUp, signOut, updateProfile }),
    [user, ready, signIn, signUp, signOut, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
