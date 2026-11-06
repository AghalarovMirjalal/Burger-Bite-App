import { Ionicons } from '@expo/vector-icons';
import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Burger } from '../data/burgers';
import { fonts, makeStyles, s, useTheme } from '../theme';

export type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'rating';

const options: { key: SortKey; label: string }[] = [
  { key: 'popular', label: 'Popular first' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
  { key: 'rating', label: 'Top rated' },
];

export function sortBurgers(list: Burger[], key: SortKey) {
  const copy = [...list];
  switch (key) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy.sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
  }
}

interface Props {
  visible: boolean;
  value: SortKey;
  onChange: (key: SortKey) => void;
  onClose: () => void;
}

export function SortSheet({ visible, value, onChange, onClose }: Props) {
  const { colors } = useTheme();
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + s(20) }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>Sort by</Text>
        {options.map((option) => {
          const active = option.key === value;
          return (
            <Pressable
              key={option.key}
              style={styles.row}
              onPress={() => {
                onChange(option.key);
                onClose();
              }}
            >
              <Text style={[styles.label, active && styles.labelActive]}>{option.label}</Text>
              <Ionicons
                name={active ? 'radio-button-on' : 'radio-button-off'}
                size={s(20)}
                color={active ? colors.orange : colors.muted}
              />
            </Pressable>
          );
        })}
      </View>
    </Modal>
  );
}

const useStyles = makeStyles((c) => ({
  backdrop: {
    flex: 1,
    backgroundColor: c.overlay,
  },
  sheet: {
    backgroundColor: c.surface,
    borderTopLeftRadius: s(26),
    borderTopRightRadius: s(26),
    paddingHorizontal: s(28),
    paddingTop: s(10),
  },
  handle: {
    alignSelf: 'center',
    width: s(40),
    height: s(4),
    borderRadius: s(2),
    backgroundColor: c.border,
    marginBottom: s(16),
  },
  title: {
    color: c.text,
    fontFamily: fonts.kanitMedium,
    fontSize: s(20),
    marginBottom: s(8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: s(14),
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  label: {
    color: c.textSoft,
    fontFamily: fonts.regular,
    fontSize: s(15),
  },
  labelActive: {
    color: c.text,
    fontFamily: fonts.semibold,
  },
}));
