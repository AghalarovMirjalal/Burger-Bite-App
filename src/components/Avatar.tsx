import { Image, Text, View } from 'react-native';
import { fonts, makeStyles } from '../theme';

interface Props {
  photo: string | null | undefined;
  name?: string;
  size: number;
}

export function Avatar({ photo, name = '', size }: Props) {
  const styles = useStyles();
  const box = { width: size, height: size, borderRadius: size / 2 };

  if (photo) {
    return <Image source={{ uri: photo }} style={[styles.base, box]} />;
  }

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <View style={[styles.base, styles.placeholder, box]}>
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials || '?'}</Text>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  base: {
    backgroundColor: c.surfaceLight,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: c.cardBorder,
  },
  initials: {
    color: c.orange,
    fontFamily: fonts.semibold,
    includeFontPadding: false,
  },
}));
