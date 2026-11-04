import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  color: string;
  testID?: string;
}

export function AppButton({ title, onPress, color, testID }: AppButtonProps) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => [styles.button, { backgroundColor: color }, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center' as const,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  } satisfies ViewStyle,
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
