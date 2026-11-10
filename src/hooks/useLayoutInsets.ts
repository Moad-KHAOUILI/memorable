import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../theme';

// Height iOS leaves undrawn below the page in the installed (home screen) web app.
// That strip already covers the home indicator, so the navigation bar needs no extra space there.
function getBottomStrip(): number {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return 0;
  if (!window.matchMedia('(display-mode: standalone)').matches) return 0;
  return Math.max(window.screen.height - window.innerHeight, 0);
}

// Spacing that keeps content clear of the phone's status bar (top) and home indicator (bottom).
// On a desktop browser the insets are 0, so the minimums below are used.
export function useLayoutInsets() {
  const insets = useSafeAreaInsets();
  const bottomStrip = getBottomStrip();

  return {
    // Top padding for blue page headers.
    headerTop: Math.max(insets.top + spacing.md, 44),
    // Height of the strip that stays visible above a panel scrolled all the way up.
    topGap: Math.max(insets.top, 32),
    // Bottom padding for the navigation bar: just enough to keep the labels clear of the home indicator.
    bottom: bottomStrip > 0 ? 0 : Math.max(Math.round(insets.bottom * 0.35), spacing.xs),
  };
}
