import { createContext, useContext, type ReactNode } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FRAME_W = 390;
const FRAME_H = 844;

const ScaleContext = createContext(1);

/**
 * Lays out a screen exactly like its 390x844 mockup frame,
 * scaled down uniformly so nothing overflows on shorter phones.
 */
export function DesignFrame({ children }: { children: ReactNode }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const top = Math.max(0, insets.top - 16);
  const available = height - top - insets.bottom;
  const k = Math.min(width / FRAME_W, available / FRAME_H);

  return (
    <ScaleContext.Provider value={k}>
      <View style={[styles.frame, { top, width: FRAME_W * k, height: FRAME_H * k, left: (width - FRAME_W * k) / 2 }]}>
        {children}
      </View>
    </ScaleContext.Provider>
  );
}

export function useFrameScale() {
  const k = useContext(ScaleContext);
  return (n: number) => n * k;
}

const styles = StyleSheet.create({
  frame: {
    position: 'absolute',
  },
});
