import { router } from 'expo-router';
import { useCallback, type ReactElement } from 'react';
import { FlatList, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import type { Burger } from '../../data/burgers';
import { useAddToCart } from '../../hooks/useAddToCart';
import { fonts, makeStyles, s } from '../../theme';
import { MenuItemCard } from './MenuItemCard';
import { PopularCard } from './PopularCard';

interface Props {
  data: Burger[];
  /** "menu" - vertical list of rows, "popular" - horizontal row of cards */
  variant?: 'menu' | 'popular';
  header?: ReactElement;
  emptyText?: string;
  contentStyle?: StyleProp<ViewStyle>;
}

/** Shared catalog used by the home screen, the full menu and the popular row. */
export function BurgerCatalog({ data, variant = 'menu', header, emptyText = 'Nothing here yet', contentStyle }: Props) {
  const styles = useStyles();
  const addToCart = useAddToCart();

  const open = useCallback((burger: Burger) => router.push({ pathname: '/burger/[id]', params: { id: burger.id } }), []);

  if (variant === 'popular') {
    return (
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PopularCard burger={item} onPress={open} onAdd={addToCart} />}
        ItemSeparatorComponent={() => <View style={{ width: s(16) }} />}
        showsHorizontalScrollIndicator={false}
        style={styles.popular}
        ListEmptyComponent={<Text style={[styles.empty, styles.popularEmpty]}>{emptyText}</Text>}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MenuItemCard burger={item} onPress={open} onAdd={addToCart} />}
      ItemSeparatorComponent={() => <View style={{ height: s(8) }} />}
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.empty}>{emptyText}</Text>}
      contentContainerStyle={contentStyle}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const useStyles = makeStyles((c) => ({
  popular: {
    marginHorizontal: s(32),
    flexGrow: 0,
  },
  empty: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(14),
    textAlign: 'center',
    paddingVertical: s(30),
  },
  popularEmpty: {
    width: s(326),
    height: s(245),
    textAlignVertical: 'center',
  },
}));
