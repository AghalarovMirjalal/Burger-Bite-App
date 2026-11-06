import { Alert, Platform } from 'react-native';

// Alert.alert has no buttons on web, so fall back to the browser dialogs there
export function confirmAction(title: string, message: string, confirmText = 'OK'): Promise<boolean> {
  if (Platform.OS === 'web') {
    return Promise.resolve(window.confirm(`${title}\n\n${message}`));
  }
  return new Promise((resolve) => {
    Alert.alert(title, message, [
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
      { text: confirmText, style: 'destructive', onPress: () => resolve(true) },
    ]);
  });
}

export function notify(title: string, message: string): Promise<void> {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n\n${message}`);
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    Alert.alert(title, message, [{ text: 'OK', onPress: () => resolve() }], { onDismiss: () => resolve() });
  });
}
