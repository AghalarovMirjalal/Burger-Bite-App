import { Ionicons } from '@expo/vector-icons';
import { FlatList, Linking, Pressable, Text, View } from 'react-native';
import { ScreenBackground } from '../../../components/ScreenBackground';
import { ScreenHeader } from '../../../components/ScreenHeader';
import { locations } from '../../../data/deals';
import { fonts, makeStyles, s, useTheme } from '../../../theme';

export default function LocationsScreen() {
  const { colors } = useTheme();
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <ScreenBackground glow="left" />
      <ScreenHeader title="Our Locations" back={false} />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: s(14) }} />}
        ListHeaderComponent={<Text style={styles.intro}>Come by for a bite or order delivery from the closest kitchen.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.pin}>
              <Ionicons name="location" size={s(22)} color="#FFFFFF" />
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.line}>{item.address}</Text>
              <Text style={styles.line}>Open {item.hours}</Text>
              <View style={styles.actions}>
                <Pressable
                  style={styles.action}
                  onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(`${item.address}, Baku`)}`)}
                >
                  <Ionicons name="navigate-outline" size={s(15)} color={colors.orange} />
                  <Text style={styles.actionText}>Directions</Text>
                </Pressable>
                <Pressable style={styles.action} onPress={() => Linking.openURL(`tel:${item.phone.replace(/\s/g, '')}`)}>
                  <Ionicons name="call-outline" size={s(15)} color={colors.orange} />
                  <Text style={styles.actionText}>Call</Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  root: {
    flex: 1,
    backgroundColor: c.bg,
  },
  list: {
    paddingHorizontal: s(28),
    paddingBottom: s(24),
  },
  intro: {
    color: c.muted,
    fontFamily: fonts.regular,
    fontSize: s(14),
    marginBottom: s(18),
  },
  card: {
    flexDirection: 'row',
    gap: s(14),
    padding: s(16),
    borderRadius: s(16),
    borderWidth: 1,
    borderColor: c.cardBorder,
    backgroundColor: c.surface,
  },
  pin: {
    width: s(44),
    height: s(44),
    borderRadius: s(22),
    backgroundColor: c.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    color: c.text,
    fontFamily: fonts.kanitSemibold,
    fontSize: s(17),
    marginBottom: s(2),
  },
  line: {
    color: c.textSoft,
    fontFamily: fonts.regular,
    fontSize: s(13),
  },
  actions: {
    flexDirection: 'row',
    gap: s(18),
    marginTop: s(10),
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(5),
  },
  actionText: {
    color: c.orange,
    fontFamily: fonts.semibold,
    fontSize: s(13),
  },
}));
