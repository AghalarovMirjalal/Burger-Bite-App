import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { DesignFrame, useFrameScale } from '../components/DesignFrame';
import { GradientButton } from '../components/GradientButton';
import { ScreenBackground } from '../components/ScreenBackground';
import { images } from '../data/burgers';
import { fonts, makeStyles } from '../theme';

// Launch screen
export default function WelcomeScreen() {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <ScreenBackground glow="right" />
      <DesignFrame>
        <Welcome />
      </DesignFrame>
    </View>
  );
}

function Welcome() {
  const f = useFrameScale();
  const styles = useStyles();

  return (
    <>
      <View style={[styles.shadow, { left: f(110), top: f(426), width: f(180), height: f(16), borderRadius: f(8) }]} />
      <Image
        source={images.flying}
        resizeMode="contain"
        style={{ position: 'absolute', left: f(-70), top: f(-64), width: f(533), height: f(612) }}
      />

      <Text style={[styles.title, { top: f(172), fontSize: f(46), lineHeight: f(60) }]}>
        <Text style={styles.brand}>Burger </Text>
        Bite
      </Text>

      <Text style={[styles.tagline, { top: f(452), fontSize: f(20), lineHeight: f(30) }]}>
        Join us and start your{'\n'}journey to burger{'\n'}perfection.
      </Text>

      <GradientButton
        title="Log in"
        variant="red"
        height={f(47)}
        fontSize={f(16)}
        onPress={() => router.push('/log-in')}
        style={{ position: 'absolute', left: f(43), top: f(571), width: f(305) }}
      />
      <GradientButton
        title="Sign Up"
        height={f(47)}
        fontSize={f(16)}
        onPress={() => router.push('/sign-up')}
        style={{ position: 'absolute', left: f(43), top: f(646), width: f(305) }}
      />

      <Text style={[styles.hint, { top: f(697), fontSize: f(13), lineHeight: f(18) }]}>
        New here? Create an account to get started!
      </Text>

      <Text style={[styles.legal, { top: f(762), left: f(30), right: f(30), fontSize: f(10.5), lineHeight: f(13) }]}>
        Your privacy is important to us.{' '}
        <Text style={styles.link} onPress={() => router.push('/about')}>
          Learn
        </Text>{' '}
        how we handle your personal information.
      </Text>
      <Text style={[styles.legal, { top: f(795), left: f(30), right: f(30), fontSize: f(10.5), lineHeight: f(13) }]}>
        <Text style={styles.link} onPress={() => router.push('/contact')}>
          Need help?
        </Text>{' '}
        Contact our support team for assistance.
      </Text>
    </>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  shadow: {
    position: 'absolute',
    backgroundColor: c.shadow,
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 12,
  },
  title: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: c.text,
    fontFamily: fonts.kanitSemibold,
    includeFontPadding: false,
  },
  brand: {
    color: c.brand,
  },
  tagline: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: c.text,
    fontFamily: fonts.kanitMedium,
  },
  hint: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: c.textSoft,
    fontFamily: fonts.kanitLight,
  },
  legal: {
    position: 'absolute',
    textAlign: 'center',
    color: c.faint,
    fontFamily: fonts.kanitLight,
  },
  link: {
    textDecorationLine: 'underline',
  },
}));
