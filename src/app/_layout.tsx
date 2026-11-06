import { Kanit_300Light, Kanit_400Regular, Kanit_500Medium, Kanit_600SemiBold } from '@expo-google-fonts/kanit';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';
import { ThemeProvider, useTheme } from '../theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Kanit_300Light,
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
  });

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <ToastProvider>{fontsLoaded ? <RootStack /> : <Blank />}</ToastProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function Blank() {
  const { colors } = useTheme();
  return <View style={{ flex: 1, backgroundColor: colors.bg }} />;
}

function RootStack() {
  const { user, ready } = useAuth();
  const { colors, isDark } = useTheme();

  if (!ready) return <Blank />;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        {/* Launch: sends a signed-in user straight to the menu */}
        <Stack.Screen name="index" options={{ animation: 'fade' }} />

        {/* Authentication */}
        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        {/* Main */}
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(main)" options={{ animation: 'fade' }} />
        </Stack.Protected>

        <Stack.Screen name="about" />
        <Stack.Screen name="contact" />
      </Stack>
    </>
  );
}
