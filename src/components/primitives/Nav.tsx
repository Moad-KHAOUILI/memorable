import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface NavProps {
  children: React.ReactNode;
  // Extra space below the items, e.g. for the phone's home indicator.
  bottomInset?: number;
}

export function Nav({ children, bottomInset = spacing.md }: NavProps) {
  return <View style={[styles.base, { paddingBottom: bottomInset }]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: spacing.sm,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
