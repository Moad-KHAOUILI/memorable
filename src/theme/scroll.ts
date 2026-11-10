import type { ViewStyle } from 'react-native';

// Stops the iOS "rubber band" bounce at the ends of a scrolling list on the web/PWA.
// overscrollBehaviorY is a web-only style that react-native-web supports, but it is not part of
// React Native's ViewStyle type, so it is cast here once. Native apps use the ScrollView `bounces` prop instead.
export const noBounce = { overscrollBehaviorY: 'none' } as unknown as ViewStyle;
