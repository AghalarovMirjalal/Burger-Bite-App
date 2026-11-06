import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { Burger } from '../../data/burgers';
import { formatPrice } from '../../lib/format';
import { fonts, makeStyles, s, useTheme } from '../../theme';
import { SoftShadow } from '../SoftShadow';

interface Props {
  burger: Burger;
  onPress: (burger: Burger) => void;
  onAdd: (burger: Burger) => void;
}

// 178 x 245 card with the thin golden border
export const PopularCard = memo(function PopularCard({ burger, onPress, onAdd }: Props) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <Pressable onPress={() => onPress(burger)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <SoftShadow width={s(96)} height={s(8)} style={{ top: s(122), left: s(40) }} />
      <Image source={burger.image} style={styles.image} resizeMode="contain" />

      <Text style={styles.name} numberOfLines={1}>
        {burger.name}
      </Text>
      <Text style={styles.short} numberOfLines={1}>
        {burger.short}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>{formatPrice(burger.price)}</Text>
        <Pressable
          onPress={() => onAdd(burger)}
          hitSlop={6}
          style={({ pressed }) => [styles.add, pressed && styles.addPressed]}
          accessibilityLabel={`Add ${burger.name} to cart`}
        >
          <MaterialCommunityIcons name="plus-thick" size={s(20)} color={colors.onCircle} />
        </Pressable>
      </View>
    </Pressable>
  );
});

const useStyles = makeStyles((c) => ({
  card: {
    width: s(178),
    height: s(245),
    borderRadius: s(16),
    borderWidth: 1,
    borderColor: c.cardBorder,
    paddingHorizontal: s(11),
    paddingTop: s(12),
  },
  pressed: {
    opacity: 0.85,
  },
  image: {
    alignSelf: 'center',
    width: s(140),
    height: s(112),
  },
  name: {
    color: c.text,
    fontFamily: fonts.semibold,
    fontSize: s(16),
    marginTop: s(20),
    includeFontPadding: false,
  },
  short: {
    color: c.textSoft,
    fontFamily: fonts.regular,
    fontSize: s(14),
    marginTop: s(2),
  },
  footer: {
    position: 'absolute',
    left: s(11),
    right: s(5),
    bottom: s(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: c.text,
    fontFamily: fonts.bold,
    fontSize: s(16),
  },
  add: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    backgroundColor: c.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPressed: {
    transform: [{ scale: 0.92 }],
  },
}));
