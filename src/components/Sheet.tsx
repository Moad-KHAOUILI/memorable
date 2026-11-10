import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';

interface SheetProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

// White panel with rounded top corners that overlaps the blue PageHeader.
export function Sheet({ children, backgroundColor = colors.surface }: SheetProps) {
  return <View style={[styles.base, { backgroundColor }]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    flexGrow: 1,
    marginTop: -spacing.xxl,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
