import { router } from 'expo-router';
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Background } from '../components/ui/Background';
import { Toast } from '../components/ui/Toast';
import { AuthButtons } from '../components/welcome/AuthButtons';
import { BurgerHero } from '../components/welcome/BurgerHero';
import { WelcomeFooter } from '../components/welcome/WelcomeFooter';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { useToast } from '../hooks/useToast';

export default function WelcomeScreen() {
  const { message, show } = useToast();

  const onLogIn = () => {
    Alert.alert('Log In', 'Вход в аккаунт Burger Bite (готово к подключению API)');
  };

  const onSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Background />

      <View style={styles.container}>
        <BurgerHero />

        <Text style={styles.subtitle}>Join us and start your{'\n'}journey to burger{'\n'}perfection.</Text>

        <AuthButtons onLogIn={onLogIn} onSignUp={onSignUp} />

        <WelcomeFooter
          onPrivacyPress={() => show('Learn how we handle your personal information')}
          onSupportPress={() => show('Need help? Contact our support team for assistance')}
        />

        <Toast message={message} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 18,
    paddingBottom: 26,
    justifyContent: 'flex-start',
  },
  subtitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 25,
    textAlign: 'center',
    marginTop: 8,
  },
});

