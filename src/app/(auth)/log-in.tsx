import { router } from 'expo-router';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Background } from '../../components/ui/Background';
import { AppButton } from '../../components/ui/AppButton';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

export default function LogInScreen() {
  const onLogIn = () => {
    Alert.alert('Log In', 'Вход в аккаунт Burger Bite (готово к подключению API)');
  };

  return (
    <SafeAreaView style={styles.root}>
      <Background />
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>Welcome back to Burger Bite</Text>

        <View style={styles.buttons}>
          <AppButton title="Log in" onPress={onLogIn} color={colors.login} />
          <AppButton title="Back" onPress={() => router.back()} color="#3A3940" />
        </View>
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
    paddingTop: 32,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
  buttons: {
    marginTop: 32,
    gap: spacing.sm,
  },
});
