import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ScreenBackground } from '../../components/ScreenBackground';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useCart } from '../../context/CartContext';
import { formatDate } from '../../lib/format';
import { fonts, makeStyles, s, useTheme } from '../../theme';

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const styles = useStyles();
  const { notifications, markAllRead } = useCart();

  // everything counts as read once the user leaves the screen
  useFocusEffect(useCallback(() => () => markAllRead(), [markAllRead]));

  return (
    <View style={styles.root}>
      <ScreenBackground glow="top" />
      <ScreenHeader title="Notifications" />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: s(12) }} />}
        ListEmptyComponent={<Text style={styles.empty}>You are all caught up.</Text>}
        renderItem={({ item }) => (
          <View style={[styles.card, !item.read && styles.unread]}>
            <View style={styles.icon}>
              <Ionicons
                name={item.id.startsWith('BB-') ? 'receipt-outline' : 'notifications-outline'}
                size={s(20)}
                color={colors.orange}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
            </View>
            {!item.read && <View style={styles.dot} />}
          </View>
        )}
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
    paddingBottom: s(30),
  },
  card: {
    flexDirection: 'row',
    gap: s(12),
    padding: s(14),
    borderRadius: s(16),
    backgroundColor: c.surface,
  },
  unread: {
    borderWidth: 1,
    borderColor: c.cardBorder,
  },
  icon: {
    width: s(40),
    height: s(40),
    borderRadius: s(20),
    backgroundColor: c.tag,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    color: c.text,
    fontFamily: fonts.semibold,
    fontSize: s(14),
  },
  body: {
    color: c.textSoft,
    fontFamily: fonts.regular,
    fontSize: s(13),
    marginTop: s(2),
  },
  date: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(11),
    marginTop: s(6),
  },
  dot: {
    width: s(9),
    height: s(9),
    borderRadius: s(5),
    backgroundColor: c.red,
    marginTop: s(4),
  },
  empty: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(14),
    textAlign: 'center',
    marginTop: s(40),
  },
}));
