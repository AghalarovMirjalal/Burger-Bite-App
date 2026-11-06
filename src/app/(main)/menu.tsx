import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { BurgerCatalog } from '../../components/catalog/BurgerCatalog';
import { CartBar } from '../../components/CartBar';
import { ScreenBackground } from '../../components/ScreenBackground';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useCart } from '../../context/CartContext';
import { burgers, categories, type Category } from '../../data/burgers';
import { fonts, makeStyles, s, useTheme } from '../../theme';

export default function MenuScreen() {
  const { colors } = useTheme();
  const styles = useStyles();
  const { count } = useCart();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return burgers.filter(
      (b) =>
        (category === 'All' || b.category === category) &&
        (!q || b.name.toLowerCase().includes(q) || b.short.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const header = (
    <View>
      <View style={styles.search}>
        <Ionicons name="search" size={s(18)} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search burgers"
          placeholderTextColor={colors.faint}
          selectionColor={colors.orange}
          style={styles.input}
          returnKeyType="search"
        />
        {!!query && (
          <Pressable onPress={() => setQuery('')} hitSlop={10}>
            <Ionicons name="close-circle" size={s(18)} color={colors.muted} />
          </Pressable>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {categories.map((item) => {
          const active = item === category;
          return (
            <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={styles.count}>
        {data.length} {data.length === 1 ? 'burger' : 'burgers'}
      </Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <ScreenBackground glow="top" />
      <ScreenHeader title="Our Menu" />
      <BurgerCatalog
        data={data}
        header={header}
        emptyText="No burgers match your search"
        contentStyle={{ paddingBottom: count > 0 ? s(90) : s(30) }}
      />
      <CartBar />
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  search: {
    marginHorizontal: s(35),
    height: s(46),
    borderRadius: s(23),
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(16),
    gap: s(10),
  },
  input: {
    flex: 1,
    height: '100%',
    color: c.text,
    fontFamily: fonts.regular,
    fontSize: s(14),
    paddingVertical: 0,
  },
  chips: {
    paddingHorizontal: s(35),
    gap: s(10),
    paddingVertical: s(16),
  },
  chip: {
    paddingHorizontal: s(16),
    paddingVertical: s(7),
    borderRadius: s(18),
    borderWidth: 1,
    borderColor: c.cardBorder,
  },
  chipActive: {
    backgroundColor: c.orange,
    borderColor: c.orange,
  },
  chipText: {
    color: c.text,
    fontFamily: fonts.regular,
    fontSize: s(13),
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontFamily: fonts.semibold,
  },
  count: {
    color: c.muted,
    fontFamily: fonts.kanit,
    fontSize: s(13),
    marginHorizontal: s(35),
    marginBottom: s(10),
  },
}));
