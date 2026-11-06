import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../../../components/Avatar';
import { BurgerCatalog } from '../../../components/catalog/BurgerCatalog';
import { CartBar } from '../../../components/CartBar';
import { ScreenBackground } from '../../../components/ScreenBackground';
import { SideMenu } from '../../../components/SideMenu';
import { SortSheet, sortBurgers, type SortKey } from '../../../components/SortSheet';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { burgers, categories, type Category } from '../../../data/burgers';
import { fonts, makeStyles, s, useTheme } from '../../../theme';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();
  const { user } = useAuth();
  const { unread, count } = useCart();

  const [category, setCategory] = useState<Category>('All');
  const [sort, setSort] = useState<SortKey>('popular');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    const list = category === 'All' ? burgers : burgers.filter((b) => b.category === category);
    return sortBurgers(list, sort);
  }, [category, sort]);

  const popular = useMemo(() => {
    const list = filtered.filter((b) => b.popular);
    return list.length ? list : filtered.slice(0, 4);
  }, [filtered]);

  // the menu below shows what is not already in the popular row
  const menu = useMemo(() => {
    const rest = filtered.filter((b) => !popular.includes(b));
    return rest.length ? rest : filtered;
  }, [filtered, popular]);

  const header = (
    <View>
      <View style={styles.topRow}>
        <Pressable onPress={() => setMenuOpen(true)} hitSlop={10} style={styles.burgerIcon} accessibilityLabel="Open menu">
          <View style={[styles.line, { width: s(22), marginLeft: s(5) }]} />
          <View style={[styles.line, { width: s(22), marginLeft: s(2) }]} />
          <View style={[styles.line, { width: s(11), marginLeft: s(2) }]} />
        </Pressable>

        <View style={styles.topRight}>
          <Pressable onPress={() => router.push('/profile')} accessibilityLabel="Profile">
            <Avatar photo={user?.photo} name={user?.name} size={s(32)} />
          </Pressable>
          <Pressable onPress={() => router.push('/notifications')} hitSlop={8} accessibilityLabel="Notifications">
            <Ionicons name="notifications-outline" size={s(28)} color={colors.text} />
            {unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unread > 9 ? '9+' : unread}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <Text style={styles.title}>Beyond Just Burgers</Text>
      <Text style={styles.subtitle}>It’s a Taste Revolution!</Text>

      <View style={styles.tabsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs} contentContainerStyle={styles.tabsContent}>
          {categories.map((item) => {
            const active = item === category;
            return (
              <Pressable key={item} onPress={() => setCategory(item)} hitSlop={8}>
                <Text style={[styles.tab, active && styles.tabActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <Pressable onPress={() => setSortOpen(true)} hitSlop={10} style={styles.filter} accessibilityLabel="Sort">
          <View style={[styles.filterLine, { width: s(21) }]} />
          <View style={[styles.filterLine, { width: s(15) }]} />
          <View style={[styles.filterLine, { width: s(8) }]} />
        </Pressable>
      </View>

      <BurgerCatalog variant="popular" data={popular} emptyText="No burgers in this category" />

      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>Menu</Text>
        <Pressable onPress={() => router.push('/menu')} hitSlop={10}>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <ScreenBackground glow="left" />
      <View style={{ flex: 1, paddingTop: Math.max(insets.top - s(14), 0) }}>
        <BurgerCatalog
          data={menu}
          header={header}
          contentStyle={{ paddingBottom: count > 0 ? s(70) : s(20) }}
          emptyText="No burgers in this category"
        />
      </View>
      <CartBar />

      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
      <SortSheet visible={sortOpen} value={sort} onChange={setSort} onClose={() => setSortOpen(false)} />
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  topRow: {
    height: s(31),
    marginTop: s(30),
    marginHorizontal: s(28),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  burgerIcon: {
    width: s(31),
    height: s(31),
    borderWidth: 1,
    borderColor: c.circle,
    justifyContent: 'center',
    gap: s(4),
  },
  line: {
    height: s(3),
    borderRadius: s(2),
    backgroundColor: c.text,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(16),
    marginRight: s(3),
  },
  badge: {
    position: 'absolute',
    top: -s(5),
    right: -s(5),
    minWidth: s(16),
    height: s(16),
    paddingHorizontal: s(3),
    borderRadius: s(8),
    backgroundColor: c.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontFamily: fonts.medium,
    fontSize: s(10),
    includeFontPadding: false,
  },
  title: {
    color: c.text,
    fontFamily: fonts.bold,
    fontSize: s(22),
    lineHeight: s(30),
    marginTop: s(12),
    marginLeft: s(28),
  },
  subtitle: {
    color: c.text,
    fontFamily: fonts.regular,
    fontSize: s(16),
    lineHeight: s(22),
    marginLeft: s(28),
  },
  tabsRow: {
    height: s(24),
    marginTop: s(30),
    marginBottom: s(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabs: {
    marginLeft: s(29),
    width: s(280),
    flexGrow: 0,
  },
  tabsContent: {
    gap: s(37),
    alignItems: 'center',
  },
  tab: {
    color: c.text,
    fontFamily: fonts.regular,
    fontSize: s(13),
  },
  tabActive: {
    color: c.red,
    fontFamily: fonts.semibold,
  },
  filter: {
    marginLeft: 'auto',
    marginRight: s(29),
    width: s(21),
    alignItems: 'center',
    gap: s(3),
  },
  filterLine: {
    height: s(2.5),
    borderRadius: s(2),
    backgroundColor: c.text,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: s(14),
    marginBottom: s(9),
    marginLeft: s(28),
    marginRight: s(30),
  },
  menuTitle: {
    color: c.text,
    fontFamily: fonts.kanitMedium,
    fontSize: s(23),
  },
  seeAll: {
    color: c.muted,
    fontFamily: fonts.kanit,
    fontSize: s(14),
  },
}));
