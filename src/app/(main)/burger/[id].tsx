import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Share, Text, View } from 'react-native';
import { DesignFrame, useFrameScale } from '../../../components/DesignFrame';
import { GradientButton } from '../../../components/GradientButton';
import { QuantityStepper } from '../../../components/QuantityStepper';
import { ScreenBackground } from '../../../components/ScreenBackground';
import { SoftShadow } from '../../../components/SoftShadow';
import { findBurger, type Burger } from '../../../data/burgers';
import { useAddToCart } from '../../../hooks/useAddToCart';
import { formatPrice } from '../../../lib/format';
import { fonts, makeStyles, s, useTheme } from '../../../theme';

export default function BurgerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const styles = useStyles();
  const burger = findBurger(id);

  return (
    <View style={styles.root}>
      <ScreenBackground glow="top" />
      {burger ? (
        <DesignFrame>
          <Details burger={burger} />
        </DesignFrame>
      ) : (
        <View style={styles.missing}>
          <Text style={styles.missingText}>This burger is no longer on the menu.</Text>
          <GradientButton title="Back to menu" onPress={() => router.replace('/home')} style={{ width: s(220) }} />
        </View>
      )}
    </View>
  );
}

function Details({ burger }: { burger: Burger }) {
  const f = useFrameScale();
  const { colors } = useTheme();
  const styles = useStyles();
  const addToCart = useAddToCart();

  const [qty, setQty] = useState(1);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/home'));

  const share = async () => {
    setOptionsOpen(false);
    await Share.share({ message: `${burger.name} at Burger Bite — ${formatPrice(burger.price)}. ${burger.short}!` });
  };

  return (
    <>
      <Pressable onPress={goBack} hitSlop={12} style={[styles.abs, { left: f(22), top: f(34) }]} accessibilityLabel="Back">
        <Ionicons name="chevron-back" size={f(36)} color={colors.text} />
      </Pressable>
      <Pressable
        onPress={() => setOptionsOpen(true)}
        hitSlop={12}
        style={[styles.abs, { right: f(43), top: f(40) }]}
        accessibilityLabel="More options"
      >
        <Ionicons name="ellipsis-horizontal" size={f(26)} color={colors.text} />
      </Pressable>

      <SoftShadow width={f(210)} height={f(12)} style={{ left: f(90), top: f(340) }} />
      <Image
        source={burger.image}
        resizeMode="contain"
        style={[styles.abs, { left: f(20), top: f(115), width: f(350), height: f(233) }]}
      />

      <Text style={[styles.title, { left: f(28), right: f(28), top: f(421), fontSize: f(24), lineHeight: f(32) }]} numberOfLines={1}>
        {burger.name}
      </Text>

      <ScrollView
        style={[styles.abs, { left: f(28), top: f(468), width: f(330), height: f(130) }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.description, { fontSize: f(14.5), lineHeight: f(21) }]}>{burger.description}</Text>
      </ScrollView>

      <View style={[styles.abs, { left: f(28), top: f(616) }]}>
        <QuantityStepper value={qty} onChange={setQty} unit={f} />
      </View>

      <Text style={[styles.totalLabel, { left: f(207), top: f(616), fontSize: f(11) }]}>Total price</Text>
      <Text style={[styles.total, { left: f(207), top: f(633), fontSize: f(24), lineHeight: f(34) }]}>
        {formatPrice(burger.price * qty)}
      </Text>

      <GradientButton
        title="Add to cart"
        height={f(50)}
        fontSize={f(17)}
        icon={<MaterialCommunityIcons name="basket-outline" size={f(25)} color="#FFFFFF" />}
        onPress={() => {
          addToCart(burger, qty);
          setQty(1);
        }}
        style={[styles.abs, { left: f(38), top: f(737), width: f(314) }]}
      />

      <Modal visible={optionsOpen} transparent animationType="fade" onRequestClose={() => setOptionsOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOptionsOpen(false)}>
          <View style={styles.popover}>
            <Pressable style={styles.option} onPress={share}>
              <Ionicons name="share-social-outline" size={s(19)} color={colors.text} />
              <Text style={styles.optionText}>Share</Text>
            </Pressable>
            <Pressable
              style={styles.option}
              onPress={() => {
                setOptionsOpen(false);
                router.push('/cart');
              }}
            >
              <MaterialCommunityIcons name="basket-outline" size={s(19)} color={colors.text} />
              <Text style={styles.optionText}>Open cart</Text>
            </Pressable>
            <Pressable
              style={styles.option}
              onPress={() => {
                setOptionsOpen(false);
                router.push('/menu');
              }}
            >
              <Ionicons name="restaurant-outline" size={s(19)} color={colors.text} />
              <Text style={styles.optionText}>Full menu</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  abs: {
    position: 'absolute',
  },
  title: {
    position: 'absolute',
    color: c.text,
    fontFamily: fonts.bold,
  },
  description: {
    color: c.textSoft,
    fontFamily: fonts.regular,
  },
  totalLabel: {
    position: 'absolute',
    color: c.textSoft,
    fontFamily: fonts.regular,
  },
  total: {
    position: 'absolute',
    color: c.text,
    fontFamily: fonts.bold,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  popover: {
    position: 'absolute',
    top: s(90),
    right: s(28),
    minWidth: s(180),
    backgroundColor: c.surface,
    borderRadius: s(16),
    borderWidth: 1,
    borderColor: c.border,
    paddingVertical: s(6),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    paddingHorizontal: s(16),
    paddingVertical: s(12),
  },
  optionText: {
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(14),
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(20),
    padding: s(30),
  },
  missingText: {
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(16),
    textAlign: 'center',
  },
}));
