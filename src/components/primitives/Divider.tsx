import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

export function Divider({ orientation = 'horizontal', spacing: space = 'none' }: DividerProps) {
  return (
    <View
      style={[
        styles.base,
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        styles[`spacing_${space}` as keyof typeof styles],
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: { backgroundColor: colors.border },
  horizontal: { height: 1, width: '100%' },
  vertical: { width: 1, height: '100%' },
  spacing_none: {},
  spacing_sm: { marginVertical: spacing.sm },
  spacing_md: { marginVertical: spacing.md },
  spacing_lg: { marginVertical: spacing.lg },
});
