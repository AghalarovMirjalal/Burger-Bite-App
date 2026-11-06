import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts, makeStyles, s, useTheme } from '../theme';
import { ScreenBackground } from './ScreenBackground';

interface Props {
  title: string;
  accent: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthScreen({ title, accent, subtitle, children }: Props) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <ScreenBackground glow="right" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.content, { paddingTop: insets.top + s(14), paddingBottom: insets.bottom + s(30) }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} hitSlop={12} style={styles.back}>
            <Ionicons name="chevron-back" size={s(30)} color={colors.text} />
          </Pressable>

          <Text style={styles.title}>
            {title} <Text style={styles.accent}>{accent}</Text>
          </Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: s(30),
  },
  back: {
    width: s(36),
    height: s(36),
    justifyContent: 'center',
    marginLeft: -s(6),
    marginBottom: s(26),
  },
  title: {
    color: c.text,
    fontFamily: fonts.kanitSemibold,
    fontSize: s(34),
    lineHeight: s(42),
  },
  accent: {
    color: c.brand,
  },
  subtitle: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(14),
    marginTop: s(4),
    marginBottom: s(30),
  },
}));
