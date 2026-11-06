import { Ionicons } from '@expo/vector-icons';
import { Linking, Pressable, Text, View } from 'react-native';
import { InfoPage } from '../components/InfoPage';
import { fonts, makeStyles, s, useTheme } from '../theme';

const channels = [
  { icon: 'call-outline' as const, label: '+994 12 555 01 01', url: 'tel:+994125550101' },
  { icon: 'mail-outline' as const, label: 'support@burgerbite.app', url: 'mailto:support@burgerbite.app' },
];

export default function HelpScreen() {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <InfoPage
      title="Help & Support"
      sections={[
        {
          title: 'Order is late?',
          text: 'Most orders arrive in 30–40 minutes. If it takes longer, call the restaurant and we will sort it out.',
        },
        {
          title: 'Wrong or missing item',
          text: 'Write to us with your order number (you can find it in Profile) and we will refund or resend it.',
        },
      ]}
      footer={
        <View style={styles.channels}>
          {channels.map((channel) => (
            <Pressable key={channel.url} style={styles.channel} onPress={() => Linking.openURL(channel.url)}>
              <Ionicons name={channel.icon} size={s(20)} color={colors.orange} />
              <Text style={styles.channelText}>{channel.label}</Text>
            </Pressable>
          ))}
        </View>
      }
    />
  );
}

const useStyles = makeStyles((c) => ({
  channels: {
    gap: s(12),
  },
  channel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    height: s(54),
    paddingHorizontal: s(18),
    borderRadius: s(27),
    borderWidth: 1,
    borderColor: c.cardBorder,
  },
  channelText: {
    color: c.text,
    fontFamily: fonts.medium,
    fontSize: s(14),
  },
}));
