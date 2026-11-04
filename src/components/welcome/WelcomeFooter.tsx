import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

interface WelcomeFooterProps {
  onPrivacyPress: () => void;
  onSupportPress: () => void;
}

export function WelcomeFooter({ onPrivacyPress, onSupportPress }: WelcomeFooterProps) {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        Your privacy is important to us.{' '}
        <Text style={styles.link} onPress={onPrivacyPress}>
          Learn
        </Text>{' '}
        how we handle your personal information.
      </Text>
      <Text style={styles.text}>
        <Text style={styles.link} onPress={onSupportPress}>
          Need help?
        </Text>{' '}
        Contact our support team for assistance.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  text: {
    color: colors.textMuted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
  },
  link: {
    color: colors.textLink,
    textDecorationLine: 'underline',
  },
});
