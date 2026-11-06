import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme';

type Glow = 'left' | 'right' | 'top';

// A soft corner light, like the warm spots in the corners of the Figma frames
export function ScreenBackground({ glow = 'left' }: { glow?: Glow }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const color = glow === 'left' ? colors.glowWarm : colors.glowOlive;
  const size = width * (glow === 'top' ? 1.6 : 1.25);

  const position =
    glow === 'left'
      ? { left: -size * 0.5, top: -size * 0.5 }
      : glow === 'right'
        ? { right: -size * 0.5, top: -size * 0.5 }
        : { left: (width - size) / 2, top: -size * 0.62 };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.bg }]} />
      <View
        style={[
          styles.glow,
          position,
          {
            width: size,
            height: size,
            backgroundImage: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  glow: {
    position: 'absolute',
  },
});
