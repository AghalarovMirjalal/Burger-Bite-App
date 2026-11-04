import { Stack } from 'expo-router';
import { colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="burger/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="menu" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
    </Stack>
  );
}
