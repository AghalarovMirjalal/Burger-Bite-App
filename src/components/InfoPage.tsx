import type { ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fonts, makeStyles, s } from '../theme';
import { ScreenBackground } from './ScreenBackground';
import { ScreenHeader } from './ScreenHeader';

interface Section {
  title: string;
  text: string;
}

export function InfoPage({ title, sections, footer }: { title: string; sections: Section[]; footer?: ReactNode }) {
  const insets = useSafeAreaInsets();
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <ScreenBackground glow="top" />
      <ScreenHeader title={title} />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + s(30) }]}>
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.heading}>{section.title}</Text>
            <Text style={styles.text}>{section.text}</Text>
          </View>
        ))}
        {footer}
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
    gap: s(22),
  },
  section: {
    gap: s(6),
  },
  heading: {
    color: c.text,
    fontFamily: fonts.kanitMedium,
    fontSize: s(18),
  },
  text: {
    color: c.textSoft,
    fontFamily: fonts.regular,
    fontSize: s(14),
    lineHeight: s(21),
  },
}));
