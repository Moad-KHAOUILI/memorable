import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors } from '../../theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'count';
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const isCount = variant === 'count';

  return (
    <View style={[styles.base, styles[variant]]}>
      <Text
        size="sm"
        weight={isCount ? 'bold' : 'normal'}
        color={isCount ? colors.textOnPrimary : undefined}
        align="center"
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  default: {
    backgroundColor: '#e5e7eb',
  },
  success: {
    backgroundColor: '#d1fae5',
  },
  warning: {
    backgroundColor: '#fef3c7',
  },
  error: {
    backgroundColor: '#fee2e2',
  },
  count: {
    backgroundColor: colors.danger,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
