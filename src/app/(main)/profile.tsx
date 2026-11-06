import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from '../../components/Avatar';
import { GradientButton } from '../../components/GradientButton';
import { ScreenBackground } from '../../components/ScreenBackground';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TextField } from '../../components/TextField';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { confirmAction } from '../../lib/dialog';
import { formatDate, formatPrice } from '../../lib/format';
import { pickPhoto } from '../../lib/pickPhoto';
import { fonts, makeStyles, s, useTheme } from '../../theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { colors, isDark, toggle } = useTheme();
  const styles = useStyles();
  const toast = useToast();
  const { user, updateProfile, signOut } = useAuth();
  const { orders } = useCart();
  const [changingPhoto, setChangingPhoto] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<{ name: string }>({ defaultValues: { name: user?.name ?? '' } });

  if (!user) return null;

  const changePhoto = async () => {
    setChangingPhoto(true);
    const uri = await pickPhoto();
    if (uri) {
      await updateProfile({ photo: uri });
      toast('Profile photo updated');
    }
    setChangingPhoto(false);
  };

  const saveName = async ({ name }: { name: string }) => {
    await updateProfile({ name: name.trim() });
    reset({ name: name.trim() });
    toast('Name saved');
  };

  const logOut = async () => {
    if (await confirmAction('Log out', 'Do you really want to log out?', 'Log out')) signOut();
  };

  return (
    <View style={styles.root}>
      <ScreenBackground glow="top" />
      <ScreenHeader title="Profile" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + s(30) }]} keyboardShouldPersistTaps="handled">
        <Pressable onPress={changePhoto} disabled={changingPhoto} style={styles.photo}>
          <Avatar photo={user.photo} name={user.name} size={s(110)} />
          <View style={styles.camera}>
            <Ionicons name="camera" size={s(17)} color="#FFFFFF" />
          </View>
        </Pressable>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.since}>Member since {formatDate(user.createdAt).split(' ')[0]}</Text>

        <Text style={styles.section}>Your name</Text>
        <Controller
          control={control}
          name="name"
          rules={{ validate: (v) => v.trim().length >= 2 || 'Name is too short' }}
          render={({ field: { ref, onChange, onBlur, value } }) => (
            <TextField
              ref={ref}
              icon="person-outline"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
              autoCapitalize="words"
            />
          )}
        />
        {isDirty && (
          <GradientButton title="Save" onPress={handleSubmit(saveName)} loading={isSubmitting} style={styles.save} />
        )}

        <View style={styles.setting}>
          <Ionicons name={isDark ? 'moon-outline' : 'sunny-outline'} size={s(20)} color={colors.orange} />
          <Text style={styles.settingText}>Dark theme</Text>
          <Switch value={isDark} onValueChange={toggle} trackColor={{ true: colors.orange, false: colors.border }} thumbColor="#FFFFFF" />
        </View>

        <Text style={styles.section}>Order history</Text>
        {orders.length === 0 ? (
          <Text style={styles.noOrders}>No orders yet. Your first one is just a few taps away.</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.order}>
              <View style={styles.orderTop}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderTotal}>{formatPrice(order.total)}</Text>
              </View>
              <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
              <Text style={styles.orderItems}>{order.lines.map((l) => `${l.qty} × ${l.name}`).join(', ')}</Text>
            </View>
          ))
        )}

        <Pressable onPress={logOut} style={styles.logout}>
          <Ionicons name="log-out-outline" size={s(20)} color={colors.red} />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  content: {
    paddingHorizontal: s(28),
  },
  photo: {
    alignSelf: 'center',
    marginTop: s(6),
  },
  camera: {
    position: 'absolute',
    right: s(2),
    bottom: s(4),
    width: s(34),
    height: s(34),
    borderRadius: s(17),
    backgroundColor: c.orange,
    borderWidth: 3,
    borderColor: c.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(15),
    textAlign: 'center',
    marginTop: s(14),
  },
  since: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(12),
    textAlign: 'center',
    marginTop: s(2),
  },
  section: {
    color: c.text,
    fontFamily: fonts.kanitMedium,
    fontSize: s(19),
    marginTop: s(28),
    marginBottom: s(12),
  },
  save: {
    marginTop: s(14),
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    marginTop: s(22),
    paddingHorizontal: s(18),
    height: s(56),
    borderRadius: s(16),
    backgroundColor: c.surface,
  },
  settingText: {
    flex: 1,
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(15),
  },
  noOrders: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(14),
  },
  order: {
    padding: s(14),
    borderRadius: s(14),
    borderWidth: 1,
    borderColor: c.cardBorder,
    marginBottom: s(10),
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    color: c.text,
    fontFamily: fonts.semibold,
    fontSize: s(14),
  },
  orderTotal: {
    color: c.orange,
    fontFamily: fonts.bold,
    fontSize: s(14),
  },
  orderDate: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(12),
    marginTop: s(2),
  },
  orderItems: {
    color: c.textSoft,
    fontFamily: fonts.regular,
    fontSize: s(13),
    marginTop: s(6),
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(8),
    marginTop: s(30),
    padding: s(12),
  },
  logoutText: {
    color: c.red,
    fontFamily: fonts.semibold,
    fontSize: s(15),
  },
}));
