import { Pressable, StyleSheet } from 'react-native';
import { Spinner } from './primitives/Spinner';
import { Text } from './primitives/Text';
import { Icon, type IconName } from './primitives/Icon';
import { Row } from './primitives/Row';
import { colors, spacing } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

interface StyledButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: 'lg' | 'sm';
  icon?: IconName;
  underline?: boolean;
  isLoading?: boolean;
  testID?: string;
}

const labelColors: Record<ButtonVariant, string> = {
  primary: colors.textOnPrimary,
  secondary: colors.text,
  success: colors.textOnPrimary,
  danger: colors.textOnPrimary,
};

export function StyledButton({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon,
  underline = false,
  isLoading = false,
  testID,
}: StyledButtonProps) {
  const labelColor = labelColors[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        styles[variant],
        pressed && styles.pressed,
        isLoading && styles.disabled,
      ]}
      testID={testID}
    >
      {isLoading ? (
        <Spinner size="small" color={labelColor} />
      ) : (
        <Row gap="md">
          {icon !== undefined && <Icon name={icon} size={size === 'lg' ? 32 : 20} color={labelColor} />}
          <Text
            size={size === 'lg' ? 'xl' : 'md'}
            weight={size === 'lg' ? 'bold' : 'medium'}
            color={labelColor}
            underline={underline}
          >
            {label}
          </Text>
        </Row>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  lg: {
    minHeight: 52,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 999,
  },
  sm: {
    minHeight: 40,
    minWidth: 120,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 6,
  },
  primary: { backgroundColor: colors.primary },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  success: { backgroundColor: colors.success },
  danger: { backgroundColor: colors.danger },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.6 },
});
