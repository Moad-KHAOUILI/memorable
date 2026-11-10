import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../theme';

export function useLayoutInsets() {
  const insets = useSafeAreaInsets();

  return {
    headerTop: Math.max(insets.top + spacing.md, 44),
    topGap: Math.max(insets.top, 32),
    bottom: Math.max(Math.round(insets.bottom * 0.5), spacing.xs),
  };
}
