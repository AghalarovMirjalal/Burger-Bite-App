import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useTheme } from '../theme';

export function Stars({ rating, size, gap = 3 }: { rating: number; size: number; gap?: number }) {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: 'row', gap }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const name = rating >= i ? 'star' : rating >= i - 0.5 ? 'star-half' : 'star-outline';
        return <Ionicons key={i} name={name} size={size} color={colors.star} />;
      })}
    </View>
  );
}
