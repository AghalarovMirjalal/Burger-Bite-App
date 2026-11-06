import { Tabs } from 'expo-router';
import { TabBar } from '../../../components/TabBar';
import { useTheme } from '../../../theme';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      initialRouteName="home"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="locations" options={{ title: 'Locations' }} />
      <Tabs.Screen name="home" options={{ title: 'Menu' }} />
      <Tabs.Screen name="deals" options={{ title: 'Deals' }} />
    </Tabs>
  );
}
