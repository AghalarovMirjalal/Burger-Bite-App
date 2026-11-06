import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

// Returns a data URI so the photo can live in AsyncStorage together with the user
export async function pickPhoto(): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('No access', 'Allow access to your photos to set a profile picture.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.35,
    base64: true,
  });

  if (result.canceled) return null;

  const asset = result.assets[0];
  if (asset?.base64) {
    return `data:${asset.mimeType ?? 'image/jpeg'};base64,${asset.base64}`;
  }
  return asset?.uri ?? null;
}
