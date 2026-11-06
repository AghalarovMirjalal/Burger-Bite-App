import { Ionicons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import type { ComponentProps } from 'react';
import { Modal, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { fonts, makeStyles, s, useTheme } from '../theme';
import { Avatar } from './Avatar';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const links: { icon: ComponentProps<typeof Ionicons>['name']; label: string; href: Href }[] = [
  { icon: 'restaurant-outline', label: 'Full menu', href: '/menu' },
  { icon: 'basket-outline', label: 'My cart', href: '/cart' },
  { icon: 'pricetags-outline', label: 'Deals', href: '/deals' },
  { icon: 'location-outline', label: 'Our locations', href: '/locations' },
  { icon: 'notifications-outline', label: 'Notifications', href: '/notifications' },
  { icon: 'person-circle-outline', label: 'Profile & orders', href: '/profile' },
  { icon: 'shield-checkmark-outline', label: 'Privacy', href: '/about' },
  { icon: 'help-circle-outline', label: 'Help & support', href: '/contact' },
];

export function SideMenu({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggle } = useTheme();
  const styles = useStyles();
  const { user, signOut } = useAuth();
  const { count } = useCart();

  const go = (href: Href) => {
    onClose();
    router.push(href);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.wrap}>
        <View style={[styles.panel, { paddingTop: insets.top + s(24), paddingBottom: insets.bottom + s(20) }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable style={styles.profile} onPress={() => go('/profile')}>
              <Avatar photo={user?.photo} name={user?.name} size={s(56)} />
              <View style={styles.profileText}>
                <Text style={styles.name} numberOfLines={1}>
                  {user?.name}
                </Text>
                <Text style={styles.email} numberOfLines={1}>
                  {user?.email}
                </Text>
              </View>
            </Pressable>

            {links.map((link) => (
              <Pressable key={link.label} style={styles.link} onPress={() => go(link.href)}>
                <Ionicons name={link.icon} size={s(21)} color={colors.orange} />
                <Text style={styles.linkText}>{link.label}</Text>
                {link.href === '/cart' && count > 0 && (
                  <View style={styles.count}>
                    <Text style={styles.countText}>{count}</Text>
                  </View>
                )}
              </Pressable>
            ))}

            <View style={styles.link}>
              <Ionicons name={isDark ? 'moon-outline' : 'sunny-outline'} size={s(21)} color={colors.orange} />
              <Text style={styles.linkText}>Dark theme</Text>
              <Switch
                value={isDark}
                onValueChange={toggle}
                trackColor={{ true: colors.orange, false: colors.border }}
                thumbColor="#FFFFFF"
              />
            </View>
          </ScrollView>

          <Pressable
            style={styles.logout}
            onPress={() => {
              onClose();
              signOut();
            }}
          >
            <Ionicons name="log-out-outline" size={s(21)} color={colors.red} />
            <Text style={[styles.linkText, { color: colors.red }]}>Log out</Text>
          </Pressable>
        </View>
        <Pressable style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  );
}

const useStyles = makeStyles((c) => ({
  wrap: {
    flex: 1,
    flexDirection: 'row',
  },
  panel: {
    width: '78%',
    maxWidth: s(320),
    backgroundColor: c.bg,
    borderTopRightRadius: s(24),
    borderBottomRightRadius: s(24),
    paddingHorizontal: s(24),
  },
  backdrop: {
    flex: 1,
    backgroundColor: c.overlay,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(14),
    paddingBottom: s(22),
    marginBottom: s(10),
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  profileText: {
    flex: 1,
  },
  name: {
    color: c.text,
    fontFamily: fonts.semibold,
    fontSize: s(17),
  },
  email: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(12),
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(14),
    paddingVertical: s(13),
  },
  linkText: {
    flex: 1,
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(15),
  },
  count: {
    minWidth: s(22),
    height: s(22),
    borderRadius: s(11),
    paddingHorizontal: s(5),
    backgroundColor: c.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontFamily: fonts.semibold,
    fontSize: s(11),
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(14),
    paddingTop: s(16),
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
}));
