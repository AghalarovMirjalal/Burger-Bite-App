import { router, useLocalSearchParams } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Background } from '../../components/ui/Background';
import { AppButton } from '../../components/ui/AppButton';
import { colors } from '../../constants/colors';
import { spacing } from '../../constants/spacing';
import { burgers } from '../../mock/burger';

export default function BurgerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const burger = burgers.find((item) => item.id === id) ?? burgers[0];

  if (!burger) {
    return (
      <SafeAreaView style={styles.root}>
        <Background />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Burger not found</Text>
          <AppButton title="Back to menu" onPress={() => router.replace('/menu')} color={colors.login} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Background />
      <View style={styles.container}>
        <Image source={burger.image} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{burger.name}</Text>
        <Text style={styles.description}>{burger.description}</Text>
        <Text style={styles.price}>${burger.price.toFixed(2)}</Text>

        <View style={styles.buttons}>
          <AppButton title="Back to menu" onPress={() => router.replace('/menu')} color="#3A3940" />
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
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 220,
  },
  name: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800',
    marginTop: 24,
    textAlign: 'center',
  },
  description: {
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  price: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 12,
  },
  buttons: {
    marginTop: 32,
    alignSelf: 'stretch',
  },
  empty: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
    gap: spacing.md,
  },
  emptyText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
