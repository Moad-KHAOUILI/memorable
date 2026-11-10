import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../src/components/primitives/Screen';
import { Stack } from '../src/components/primitives/Stack';
import { Row } from '../src/components/primitives/Row';
import { Text } from '../src/components/primitives/Text';
import { Icon } from '../src/components/primitives/Icon';
import { InputField } from '../src/components/primitives/InputField';
import { StyledButton } from '../src/components/StyledButton';
import { registerStaff } from '../src/services';
import { useAuthStore } from '../src/state/useAuthStore';
import { colors, noBounce, shadows, spacing } from '../src/theme';
import { useLayoutInsets } from '../src/hooks/useLayoutInsets';

const titleOptions = ['Dr.', 'Nurse', 'None'];
const roleOptions = ['Doctor', 'Nurse', 'Caregiver'];

export default function RegisterScreen() {
  const setLastStaff = useAuthStore((state) => state.setLastStaff);
  const { headerTop } = useLayoutInsets();
  const [title, setTitle] = useState('Nurse');
  const [role, setRole] = useState('Nurse');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/login');
  };

  const validate = (): string => {
    if (firstName.trim() === '' || lastName.trim() === '') return 'Fill in the first and last name.';
    if (!email.includes('@')) return 'Fill in a valid email address.';
    if (password.length < 6) return 'The password needs at least 6 characters.';
    if (password !== confirmPassword) return 'The passwords do not match.';
    return '';
  };

  const handleSave = async () => {
    const validationError = validate();
    setError(validationError);
    if (validationError !== '') return;

    setIsSaving(true);
    try {
      const staff = await registerStaff({
        title: title === 'None' ? '' : title,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        role,
        email: email.trim().toLowerCase(),
        password,
      });
      setLastStaff(staff);
      router.replace('/login');
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : 'The account could not be created.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Screen padding="none" scrollable={false} backgroundColor={colors.primary}>
      <View style={[styles.header, { paddingTop: headerTop }]}>
        <Row gap="sm">
          <Pressable onPress={goBack} accessibilityRole="button" accessibilityLabel="Back" style={styles.iconButton}>
            <Icon name="chevron-back" size={26} color={colors.textOnPrimary} />
          </Pressable>
          <Text size="xxl" weight="bold" color={colors.textOnPrimary}>New staff member</Text>
        </Row>
      </View>

      <View style={styles.sheet}>
        <ScrollView style={noBounce} contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled" bounces={false}>
          <Stack gap="lg">
            <Stack gap="sm">
              <Text size="sm" weight="medium">Title</Text>
              <Row gap="sm" wrap>
                {titleOptions.map((option) => (
                  <Chip key={option} label={option} selected={title === option} onPress={() => setTitle(option)} />
                ))}
              </Row>
            </Stack>
            <InputField label="First name" value={firstName} onChangeText={setFirstName} testID="first-name-input" />
            <InputField label="Last name" value={lastName} onChangeText={setLastName} testID="last-name-input" />
            <Stack gap="sm">
              <Text size="sm" weight="medium">Role</Text>
              <Row gap="sm" wrap>
                {roleOptions.map((option) => (
                  <Chip key={option} label={option} selected={role === option} onPress={() => setRole(option)} />
                ))}
              </Row>
            </Stack>
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="name@memorable.care"
              testID="email-input"
            />
            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="At least 6 characters"
              testID="new-password-input"
            />
            <InputField
              label="Repeat password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              testID="confirm-password-input"
              onSubmitEditing={handleSave}
            />
            {error !== '' && <Text color={colors.danger} weight="medium">{error}</Text>}
            <StyledButton label="Create account" onPress={handleSave} isLoading={isSaving} testID="create-account-button" />
          </Stack>
        </ScrollView>
      </View>
    </Screen>
  );
}

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text weight="medium" color={selected ? colors.textOnPrimary : colors.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.sm, paddingBottom: spacing.xl },
  iconButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  sheet: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  form: { padding: spacing.lg, paddingTop: spacing.xl },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minHeight: 40,
    justifyContent: 'center',
    ...shadows.soft,
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
});
