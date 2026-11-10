import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { Screen } from '../src/components/primitives/Screen';
import { Stack } from '../src/components/primitives/Stack';
import { Row } from '../src/components/primitives/Row';
import { Text } from '../src/components/primitives/Text';
import { Icon } from '../src/components/primitives/Icon';
import { Card } from '../src/components/primitives/Card';
import { Avatar } from '../src/components/primitives/Avatar';
import { Divider } from '../src/components/primitives/Divider';
import { Spinner } from '../src/components/primitives/Spinner';
import { InputField } from '../src/components/primitives/InputField';
import { StyledButton } from '../src/components/StyledButton';
import { getStaffDisplayName, getStaffList } from '../src/services';
import { useAuthStore } from '../src/state/useAuthStore';
import type { Staff } from '../src/types';
import { colors, noBounce, shadows, spacing } from '../src/theme';

const logoImage = require('../assets/images/logo.png');
const backgroundImage = require('../assets/images/login-background.png');

export default function LoginScreen() {
  const { login, isLoading, isAuthenticated, lastStaff, setLastStaff } = useAuthStore();
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isPicking, setIsPicking] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    getStaffList()
      .then((list) => {
        setStaffList(list);
        // Nobody selected yet on this device: open the list so a staff member can pick themselves.
        if (useAuthStore.getState().lastStaff === undefined) setIsPicking(true);
      })
      .catch(() => setError('Could not load the staff list. Check your connection.'));
  }, []);

  if (isAuthenticated) return <Redirect href="/" />;

  const selectStaff = (staff: Staff) => {
    setLastStaff(staff);
    setIsPicking(false);
    setPassword('');
    setError('');
  };

  const handleLogin = async () => {
    if (lastStaff === undefined) {
      setError('Choose your name first.');
      return;
    }
    if (password === '') {
      setError('Enter your password.');
      return;
    }
    setError('');
    try {
      await login(lastStaff.email, password);
      router.replace('/');
    } catch {
      setError('Wrong password. Please try again.');
    }
  };

  return (
    <Screen
      padding="lg"
      backgroundColor={colors.loginBackground}
      backgroundImage={backgroundImage}
    >
      <ScrollView style={noBounce} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" bounces={false}>
        <Stack gap="lg">
          <Image source={logoImage} style={styles.logo} resizeMode="contain" accessibilityLabel="Memorable Care Center" />

          {isPicking ? (
            /* Staff picker */
            <Card elevated>
              <Stack padding="md" gap="sm">
                <Row justify="space-between">
                  <Text size="xl" weight="bold">Who is logging in?</Text>
                  {lastStaff !== undefined && (
                    <Pressable
                      onPress={() => setIsPicking(false)}
                      accessibilityRole="button"
                      accessibilityLabel="Close staff list"
                      style={styles.iconButton}
                    >
                      <Icon name="close" size={28} color={colors.text} />
                    </Pressable>
                  )}
                </Row>
                {staffList.length === 0 && error === '' && <Spinner color={colors.primary} />}
                {staffList.length === 0 && error === '' && (
                  <Text color={colors.textSecondary} align="center">Loading staff…</Text>
                )}
                {staffList.map((staff, index) => (
                  <Stack key={staff.id}>
                    {index > 0 && <Divider />}
                    <Pressable
                      onPress={() => selectStaff(staff)}
                      accessibilityRole="button"
                      style={({ pressed }) => [styles.staffRow, pressed && styles.pressed]}
                      testID={`staff-${staff.email}`}
                    >
                      <Row gap="md">
                        <Avatar name={`${staff.firstName} ${staff.lastName}`} size="sm" />
                        <Stack flex={1}>
                          <Text size="lg" weight="medium">{getStaffDisplayName(staff)}</Text>
                          <Text size="sm" color={colors.textSecondary}>{staff.role}</Text>
                        </Stack>
                        {lastStaff?.id === staff.id && <Icon name="checkmark" size={22} color={colors.primary} />}
                      </Row>
                    </Pressable>
                  </Stack>
                ))}
                <Divider />
                <Pressable
                  onPress={() => router.push('/register')}
                  accessibilityRole="button"
                  style={({ pressed }) => [styles.staffRow, pressed && styles.pressed]}
                  testID="add-staff-button"
                >
                  <Row gap="md">
                    <Icon name="person-add-outline" size={28} color={colors.primary} />
                    <Text size="lg" weight="medium" color={colors.primary}>Add new staff member</Text>
                  </Row>
                </Pressable>
              </Stack>
            </Card>
          ) : (
            /* Selected staff member + password */
            <Stack gap="md">
              <Card elevated onPress={() => setIsPicking(true)}>
                <Row justify="space-between" gap="md">
                  <Row gap="md" flex={1}>
                    <View style={styles.cardIcon}>
                      <Icon name="person-outline" size={28} color={colors.text} />
                    </View>
                    <Stack flex={1}>
                      <Text size="xl" weight="medium">{lastStaff !== undefined ? getStaffDisplayName(lastStaff) : ''}</Text>
                      <Text size="sm" color={colors.textSecondary}>{lastStaff?.role ?? ''}</Text>
                    </Stack>
                  </Row>
                  <View style={styles.switchIcon} accessibilityLabel="Switch staff member">
                    <Icon name="people-outline" size={28} color={colors.text} />
                  </View>
                </Row>
              </Card>

              <View style={styles.passwordCard}>
                <InputField
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Enter your password"
                  onSubmitEditing={handleLogin}
                  testID="password-input"
                />
              </View>
            </Stack>
          )}

          {error !== '' && (
            <View style={styles.message}>
              <Text color={colors.danger} align="center" weight="medium">{error}</Text>
            </View>
          )}

          {!isPicking && (
            <Stack gap="lg" align="center">
              <StyledButton label="Log in" onPress={handleLogin} isLoading={isLoading} testID="login-button" />
              <StyledButton
                label="I can't log in"
                size="md"
                underline
                onPress={() => setShowHelp((current) => !current)}
                testID="cant-login-button"
              />
              {showHelp && (
                <View style={styles.message}>
                  <Text align="center">
                    Forgot your password? Ask your team lead or the IT helpdesk (ext. 300) to reset it.
                  </Text>
                </View>
              )}
            </Stack>
          )}
        </Stack>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'center', paddingVertical: spacing.xl },
  logo: { width: '100%', height: undefined, aspectRatio: 382 / 103, marginBottom: spacing.xl },
  cardIcon: { paddingLeft: 20, paddingVertical: 20 },
  switchIcon: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  staffRow: { paddingVertical: spacing.sm, minHeight: 48, justifyContent: 'center' },
  pressed: { opacity: 0.6 },
  passwordCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    ...shadows.soft,
  },
  message: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
  },
});
