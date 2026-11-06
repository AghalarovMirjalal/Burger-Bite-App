import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';
import { fonts, gradients, makeStyles, s } from '../theme';

// Small floating bar above the tab bar, only visible when something is in the cart
export function CartBar() {
  const styles = useStyles();
  const { count, total } = useCart();

  if (count === 0) return null;

  return (
    <Pressable onPress={() => router.push('/cart')} style={({ pressed }) => [styles.bar, pressed && { opacity: 0.9 }]}>
      <LinearGradient colors={gradients.orange} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.fill} />
      <View style={styles.left}>
        <MaterialCommunityIcons name="basket-outline" size={s(22)} color="#FFFFFF" />
        <Text style={styles.text}>
          {count} {count === 1 ? 'item' : 'items'} · {formatPrice(total)}
        </Text>
      </View>
      <View style={styles.left}>
        <Text style={styles.view}>View cart</Text>
        <Ionicons name="chevron-forward" size={s(18)} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

const useStyles = makeStyles(() => ({
  bar: {
    position: 'absolute',
    left: s(35),
    right: s(35),
    bottom: s(10),
    height: s(48),
    borderRadius: s(24),
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(18),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  text: {
    color: '#FFFFFF',
    fontFamily: fonts.semibold,
    fontSize: s(14),
  },
  view: {
    color: '#FFFFFF',
    fontFamily: fonts.medium,
    fontSize: s(14),
  },
}));
