import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../theme';

// Spacing that keeps content clear of the phone's status bar (top) and home indicator (bottom).
// On a desktop browser the insets are 0, so the minimums below are used.
export function useLayoutInsets() {
  const insets = useSafeAreaInsets();

  return {
    // Top padding for blue page headers.
    headerTop: Math.max(insets.top + spacing.md, 44),
    // Height of the strip that stays visible above a panel scrolled all the way up.
    topGap: Math.max(insets.top, 32),
    // Bottom padding for the navigation bar.
    bottom: Math.max(insets.bottom, spacing.md),
  };
}
