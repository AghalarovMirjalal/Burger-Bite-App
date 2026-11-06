import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { fonts, makeStyles, useTheme } from '../theme';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  /** base unit - lets the stepper scale with the design frame */
  unit?: (n: number) => number;
}

// "+ 1 −" pill from the product mockup (plus on the left, like in Figma)
export function QuantityStepper({ value, onChange, min = 1, unit = (n) => n }: Props) {
  const { colors } = useTheme();
  const styles = useStyles();
  const u = unit;

  const circle = { width: u(32), height: u(32), borderRadius: u(16) };

  return (
    <View style={[styles.pill, { height: u(49), borderRadius: u(25), paddingHorizontal: u(8), gap: u(14) }]}>
      <Pressable
        onPress={() => onChange(Math.min(value + 1, 99))}
        style={({ pressed }) => [styles.circle, circle, pressed && styles.pressed]}
        accessibilityLabel="Increase quantity"
      >
        <MaterialCommunityIcons name="plus-thick" size={u(20)} color={colors.onCircle} />
      </Pressable>
      <Text style={[styles.value, { fontSize: u(17), minWidth: u(22) }]}>{value}</Text>
      <Pressable
        onPress={() => onChange(Math.max(value - 1, min))}
        disabled={value <= min}
        style={({ pressed }) => [styles.circle, circle, pressed && styles.pressed]}
        accessibilityLabel="Decrease quantity"
      >
        <MaterialCommunityIcons name="minus-thick" size={u(20)} color={colors.onCircle} />
      </Pressable>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: c.stepper,
  },
  circle: {
    backgroundColor: c.circle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.9 }],
  },
  value: {
    color: c.text,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
}));
