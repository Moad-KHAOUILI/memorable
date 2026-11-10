import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface NavProps {
  children: React.ReactNode;
}

export function Nav({ children }: NavProps) {
  return <View style={styles.base}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
