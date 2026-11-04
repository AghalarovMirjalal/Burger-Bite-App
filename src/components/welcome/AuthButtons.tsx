import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { AppButton } from '../ui/AppButton';

interface AuthButtonsProps {
  onLogIn: () => void;
  onSignUp: () => void;
}

export function AuthButtons({ onLogIn, onSignUp }: AuthButtonsProps) {
  return (
    <View style={styles.buttons}>
      <AppButton title="Log in" onPress={onLogIn} color={colors.login} testID="login-button" />
      <AppButton title="Sign Up" onPress={onSignUp} color={colors.signup} testID="signup-button" />
      <Text style={styles.newHere}>New here? Create an account to get started!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  newHere: {
    color: colors.textSecondary,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },
});
