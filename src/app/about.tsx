import { router } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Background } from '../components/ui/Background';
import { AppButton } from '../components/ui/AppButton';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <Background />
      <View style={styles.container}>
        <Text style={styles.title}>About Burger Bite</Text>
        <Text style={styles.text}>Join us and start your journey to burger perfection.</Text>

        <View style={styles.buttonWrap}>
          <AppButton title="Back to welcome" onPress={() => router.replace('/')} color="#3A3940" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: 32,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  text: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 16,
  },
  buttonWrap: {
    marginTop: 32,
  },
});
