import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { burgerImage } from '../../constants/images';

export function BurgerHero() {
  return (
    <View style={styles.hero}>
      <Image source={burgerImage} style={styles.burger} resizeMode="contain" />
      <View style={styles.titleRow}>
        <Text style={styles.titleOrange}>Burger </Text>
        <Text style={styles.titleWhite}>Bite</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    marginTop: 8,
  },
  burger: {
    width: 360,
    height: 341,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    alignSelf: 'center',
    position: 'absolute',
    top: 116,
  },
  titleOrange: {
    color: colors.primary,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  titleWhite: {
    color: colors.white,
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
