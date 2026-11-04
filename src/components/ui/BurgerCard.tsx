import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import type { Burger } from '../../types/burger';

interface BurgerCardProps {
  burger: Burger;
}

export function BurgerCard({ burger }: BurgerCardProps) {
  return (
    <View style={styles.card}>
      <Image source={burger.image} style={styles.image} resizeMode="contain" />
      <View style={styles.body}>
        <Text style={styles.name}>{burger.name}</Text>
        <Text style={styles.description}>{burger.description}</Text>
        <Text style={styles.price}>${burger.price.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
  },
  body: {
    marginTop: 12,
  },
  name: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  price: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
});
