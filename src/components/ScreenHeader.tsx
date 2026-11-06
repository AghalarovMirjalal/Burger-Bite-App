import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts, makeStyles, s, useTheme } from '../theme';

interface Props {
  title: string;
  back?: boolean;
  right?: ReactNode;
}

export function ScreenHeader({ title, back = true, right }: Props) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={[styles.header, { paddingTop: insets.top + s(10) }]}>
      {back ? (
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/home'))}
          hitSlop={12}
          style={styles.side}
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={s(30)} color={colors.text} />
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(22),
    paddingBottom: s(14),
  },
  side: {
    width: s(40),
    height: s(40),
    justifyContent: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: c.text,
    fontFamily: fonts.kanitMedium,
    fontSize: s(22),
  },
}));
