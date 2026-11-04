import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { radius, spacing } from '../../constants/spacing';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;
  return (
    <View style={styles.toast}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 110,
    left: spacing.xl,
    right: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  text: {
    color: colors.background,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
});
