import { Tabs } from 'expo-router/js-tabs';
import { TabBar } from '../../../components/TabBar';
import { useTheme } from '../../../theme';

// the tab order follows the mockup (location, basket, piggy bank) but the app opens on the menu
export const unstable_settings = {
  initialRouteName: 'home',
};

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
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
