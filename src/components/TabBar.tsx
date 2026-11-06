import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles, s, useTheme } from '../theme';

function TabIcon({ route, color }: { route: string; color: string }) {
  if (route === 'locations') return <Ionicons name="location-outline" size={s(24)} color={color} />;
  if (route === 'deals') return <MaterialCommunityIcons name="piggy-bank-outline" size={s(27)} color={color} />;
  return <MaterialCommunityIcons name="basket-outline" size={s(26)} color={color} />;
}

// Three icons, the active one sits in the glowing orange circle (see the home mockup)
export function TabBar({ state, descriptors, navigateToTab }: BottomTabBarProps) {
  const { colors } = useTheme();
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, s(14)) }]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key]!;

        const onPress = () => {
          if (!focused) navigateToTab(route.key);
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            accessibilityRole="tab"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={options.title}
            style={styles.tab}
          >
            <View style={[styles.circle, focused && styles.active]}>
              <TabIcon route={route.name} color={focused ? '#FFFFFF' : colors.text} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  bar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: s(39),
    paddingTop: s(20),
    backgroundColor: c.bg,
  },
  tab: {
    width: s(104),
    alignItems: 'center',
  },
  circle: {
    width: s(52),
    height: s(52),
    borderRadius: s(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: c.orange,
    shadowColor: c.orange,
    shadowOpacity: 0.55,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
}));
