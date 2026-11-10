import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
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

const logoImage = require('../assets/images/logo.png');
const backgroundImage = require('../assets/images/login-background.png');

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
    <Screen padding="lg" backgroundColor={colors.loginBackground} backgroundImage={backgroundImage}>
      <Stack flex={1} justify="space-between" padding="lg">
        <View />

        {/* Logo */}
        <Image
          source={logoImage}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Memorable Care Center"
        />

        {/* Remembered staff member */}
        <Card elevated>
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
          <StyledButton label="I can't log in" size="md" underline onPress={() => {}} testID="help-button" />
        </Stack>

        <View />
      </Stack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: { width: '100%', height: undefined, aspectRatio: 382 / 103 },
  cardIcon: { paddingLeft: 20, paddingVertical: 24 },
  switchButton: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
});
