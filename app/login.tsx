import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../src/components/primitives/Screen';
import { Stack } from '../src/components/primitives/Stack';
import { Row } from '../src/components/primitives/Row';
import { Text } from '../src/components/primitives/Text';
import { Icon } from '../src/components/primitives/Icon';
import { Card } from '../src/components/primitives/Card';
import { StyledButton } from '../src/components/StyledButton';
import { getCurrentStaff } from '../src/services';
import type { Staff } from '../src/types';
import { colors } from '../src/theme';

export default function LoginScreen() {
  const [staff, setStaff] = useState<Staff | undefined>(undefined);

  useEffect(() => {
    getCurrentStaff().then(setStaff).catch(() => setStaff(undefined));
  }, []);

  // Face ID is a native feature: in the PWA this goes straight to the home screen.
  // In the native app this will use biometric authentication.
  const handleLogin = () => {
    router.replace('/');
  };

  return (
    <Screen padding="lg" scrollable={false} backgroundColor={colors.loginBackground}>
      <Stack flex={1} justify="space-between" padding="lg">
        <View />

        {/* Logo */}
        <Row gap="md" justify="center">
          <Icon name="heart-circle-outline" size={88} color={colors.text} />
          <Stack>
            <Text size="display" weight="bold" italic color={colors.primary}>Memorable</Text>
            <Text size="lg" weight="bold" underline align="center">Care Center</Text>
          </Stack>
        </Row>

        {/* Remembered staff member */}
        <Card>
          <Row justify="space-between" gap="md">
            <Row gap="md" flex={1}>
              <View style={styles.cardIcon}>
                <Icon name="person-outline" size={36} color={colors.text} />
              </View>
              <Text size="xl" weight="medium">
                {staff !== undefined ? `${staff.title} ${staff.firstName} ${staff.lastName}` : ''}
              </Text>
            </Row>
            <Pressable accessibilityRole="button" accessibilityLabel="Switch user" style={styles.switchButton}>
              <Icon name="people-outline" size={36} color={colors.text} />
            </Pressable>
          </Row>
        </Card>

        <Stack gap="lg" align="center">
          <StyledButton label="Log in with Face ID" onPress={handleLogin} testID="login-button" />
          <StyledButton label="I can't log in" size="lg" underline onPress={() => {}} testID="help-button" />
        </Stack>

        <View />
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardIcon: { paddingLeft: 16, paddingVertical: 20 },
  switchButton: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
});
