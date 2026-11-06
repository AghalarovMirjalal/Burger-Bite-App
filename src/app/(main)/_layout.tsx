import { Stack } from 'expo-router';
import { useTheme } from '../../theme';

// a signed-in user always lands on the tabs (home) first
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function MainLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="burger/[id]" />
      <Stack.Screen name="menu" />
      <Stack.Screen name="cart" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
