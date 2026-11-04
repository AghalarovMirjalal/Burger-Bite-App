import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Background } from '../components/ui/Background';
import { BurgerCard } from '../components/ui/BurgerCard';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { burgers } from '../mock/burger';

export default function MenuScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <Background />
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>

        {burgers.map((burger) => (
          <Pressable key={burger.id} onPress={() => router.push(`/burger/${burger.id}`)}>
            <BurgerCard burger={burger} />
          </Pressable>
        ))}
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
    paddingTop: 24,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
  },
});
