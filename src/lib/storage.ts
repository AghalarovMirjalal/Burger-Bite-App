import AsyncStorage from '@react-native-async-storage/async-storage';

export const keys = {
  users: 'bb:users',
  session: 'bb:session',
  cart: (userId: string) => `bb:cart:${userId}`,
  orders: (userId: string) => `bb:orders:${userId}`,
  notifications: (userId: string) => `bb:notifications:${userId}`,
};

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function writeJson(key: string, value: unknown) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function remove(key: string) {
  await AsyncStorage.removeItem(key);
}
