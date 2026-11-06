import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../theme';

type Glow = 'left' | 'right' | 'top';

const directions = {
  left: { start: { x: 0, y: 0 }, end: { x: 0.65, y: 0.32 } },
  right: { start: { x: 1, y: 0 }, end: { x: 0.35, y: 0.3 } },
  top: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 0.28 } },
};

export function ScreenBackground({ glow = 'left' }: { glow?: Glow }) {
  const { colors } = useTheme();
  const color = glow === 'left' ? colors.glowWarm : colors.glowOlive;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.bg }]} />
      <LinearGradient colors={[color, 'transparent']} {...directions[glow]} style={StyleSheet.absoluteFill} />
    </View>
  );
}
