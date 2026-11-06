import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { Burger } from '../../data/burgers';
import { formatPrice } from '../../lib/format';
import { fonts, makeStyles, s, useTheme } from '../../theme';
import { Stars } from '../Stars';

interface Props {
  burger: Burger;
  onPress: (burger: Burger) => void;
  onAdd: (burger: Burger) => void;
}

// "Menu" row from the home mockup: 320 x 99, plus area on the right
export const MenuItemCard = memo(function MenuItemCard({ burger, onPress, onAdd }: Props) {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <Pressable onPress={() => onPress(burger)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={burger.image} style={styles.image} resizeMode="contain" />

      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={1}>
            {burger.name}
          </Text>
          <Stars rating={burger.rating} size={s(17)} gap={s(3)} />
          <View style={styles.bottom}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{burger.category}</Text>
            </View>
            <Text style={styles.price}>{formatPrice(burger.price)}</Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => onAdd(burger)}
        style={({ pressed }) => [styles.add, pressed && styles.addPressed]}
        accessibilityLabel={`Add ${burger.name} to cart`}
      >
        <MaterialCommunityIcons name="plus-thick" size={s(30)} color={colors.plusIcon} />
      </Pressable>
    </Pressable>
  );
});

const useStyles = makeStyles((c) => ({
  card: {
    width: s(320),
    height: s(99),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: s(16),
    backgroundColor: c.surface,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.85,
  },
  image: {
    width: s(76),
    height: s(64),
    marginLeft: s(4),
  },
  info: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: s(4),
  },
  name: {
    color: c.text,
    fontFamily: fonts.kanitSemibold,
    fontSize: s(18),
    lineHeight: s(24),
    includeFontPadding: false,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: s(10),
    marginTop: s(8),
  },
  tag: {
    backgroundColor: c.tag,
    borderRadius: s(10),
    paddingHorizontal: s(7),
    paddingVertical: s(1),
    marginLeft: s(2),
  },
  tagText: {
    color: c.tagText,
    fontFamily: fonts.kanit,
    fontSize: s(11),
  },
  price: {
    color: c.text,
    fontFamily: fonts.kanitSemibold,
    fontSize: s(16),
    includeFontPadding: false,
  },
  add: {
    width: s(70),
    height: '100%',
    backgroundColor: c.plusArea,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPressed: {
    opacity: 0.75,
  },
}));
