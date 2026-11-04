import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';

export function Background() {
  return (
    <>
      <View style={styles.bg} />
      <View style={styles.glow} pointerEvents="none" />
      <LinearGradient
        colors={['rgba(255,196,110,0.10)', 'rgba(255,196,110,0)']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.4, y: 0.5 }}
        style={styles.glowGradient}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.background,
  },
  glow: {
    position: 'absolute',
    top: -110,
    right: -90,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.glowWarm,
  },
  glowGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 260,
    height: 260,
  },
});

