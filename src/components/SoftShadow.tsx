import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme';

interface Props {
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
}

// Blurred ellipse under the burger photos
export function SoftShadow({ width, height, style }: Props) {
  const { isDark } = useTheme();
  const color = isDark ? 'rgba(0, 0, 0, 0.55)' : 'rgba(90, 55, 20, 0.22)';

  return (
    <View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          width,
          height,
          borderRadius: height,
          backgroundColor: color,
          boxShadow: `0px 0px ${height * 1.2}px ${height * 0.6}px ${color}`,
          opacity: 0.7,
        },
        style,
      ]}
    />
  );
}
