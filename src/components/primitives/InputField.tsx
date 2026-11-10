import { TextInput, View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, spacing } from '../../theme';

interface InputFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  testID?: string;
  variant?: 'default' | 'search' | 'chat';
  onSubmitEditing?: () => void;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error,
  testID,
  variant = 'default',
  onSubmitEditing,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      {label !== undefined && <Text size="sm" weight="medium">{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        secureTextEntry={secureTextEntry}
        style={[styles.input, styles[variant], error !== undefined && styles.inputError]}
        testID={testID}
        autoCapitalize={variant === 'chat' ? 'sentences' : 'none'}
        accessibilityLabel={label ?? placeholder}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={variant === 'chat' ? 'send' : 'done'}
      />
      {error !== undefined && <Text size="sm" color={colors.danger}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  input: {
    fontSize: 17,
    color: colors.text,
  },
  default: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  search: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: 999,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  chat: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
  },
  inputError: { borderColor: colors.danger },
});
