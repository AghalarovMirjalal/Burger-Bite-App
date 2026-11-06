import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';
import { ScreenBackground } from '../../../components/ScreenBackground';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { deals } from '../../../data/deals';
import { fonts, makeStyles, s } from '../../../theme';

export default function DealsScreen() {
  const styles = useStyles();
  const toast = useToast();
  const { promo, applyPromo, count } = useCart();

  return (
    <View style={styles.root}>
      <ScreenBackground glow="right" />
      <ScreenHeader title="Deals" back={false} />
      <FlatList
        data={deals}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: s(14) }} />}
        ListHeaderComponent={<Text style={styles.intro}>Save on every bite. Apply a code and it will be used at checkout.</Text>}
        renderItem={({ item }) => {
          const active = promo?.code === item.code;
          return (
            <View style={styles.card}>
              <View style={styles.icon}>
                <MaterialCommunityIcons name={item.freeDelivery ? 'moped-outline' : 'sale'} size={s(24)} color="#FFFFFF" />
              </View>
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.details}>{item.details}</Text>
                <View style={styles.codeRow}>
                  <Text style={styles.code}>{item.code}</Text>
                  <Pressable
                    disabled={active}
                    onPress={() => {
                      applyPromo(item.code);
                      toast(count > 0 ? `${item.code} applied to your cart` : `${item.code} saved, add some burgers`);
                    }}
                    style={[styles.apply, active && styles.applied]}
                  >
                    <Text style={styles.applyText}>{active ? 'Applied' : 'Apply'}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          count > 0 ? (
            <Pressable onPress={() => router.push('/cart')} style={styles.footer}>
              <Text style={styles.footerText}>Go to cart →</Text>
            </Pressable>
          ) : undefined
        }
      />
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  list: {
    paddingHorizontal: s(28),
    paddingBottom: s(24),
  },
  intro: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(14),
    marginBottom: s(18),
  },
  card: {
    flexDirection: 'row',
    gap: s(14),
    padding: s(16),
    borderRadius: s(16),
    backgroundColor: c.surface,
    borderLeftWidth: s(4),
    borderLeftColor: c.orange,
  },
  icon: {
    width: s(46),
    height: s(46),
    borderRadius: s(23),
    backgroundColor: c.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    color: c.text,
    fontFamily: fonts.kanitSemibold,
    fontSize: s(17),
  },
  details: {
    color: c.textSoft,
    fontFamily: fonts.regular,
    fontSize: s(13),
    marginTop: s(2),
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: s(12),
  },
  code: {
    color: c.orange,
    fontFamily: fonts.bold,
    fontSize: s(15),
    letterSpacing: 1.5,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: c.cardBorder,
    borderRadius: s(8),
    paddingHorizontal: s(10),
    paddingVertical: s(3),
  },
  apply: {
    backgroundColor: c.orange,
    borderRadius: s(16),
    paddingHorizontal: s(16),
    paddingVertical: s(6),
  },
  applied: {
    backgroundColor: '#3BB273',
  },
  applyText: {
    color: '#FFFFFF',
    fontFamily: fonts.semibold,
    fontSize: s(13),
  },
  footer: {
    alignSelf: 'center',
    marginTop: s(24),
    padding: s(8),
  },
  footerText: {
    color: c.orange,
    fontFamily: fonts.semibold,
    fontSize: s(15),
  },
}));
