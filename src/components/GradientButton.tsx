import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { fonts, gradients, s } from '../theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'red' | 'orange';
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  height?: number;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
}

export function GradientButton({
  title,
  onPress,
  variant = 'orange',
  icon,
  loading,
  disabled,
  height = s(47),
  fontSize = s(16),
  style,
}: Props) {
  const radius = height / 2;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.wrap,
        { height, borderRadius: radius },
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      <LinearGradient colors={gradients[variant]} style={[StyleSheet.absoluteFill, { borderRadius: radius }]} />
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <View style={styles.row}>
          {icon}
          <Text style={[styles.title, { fontSize }]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(14),
  },
  title: {
    color: '#FFFFFF',
    fontFamily: fonts.semibold,
    includeFontPadding: false,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.6,
  },
});
