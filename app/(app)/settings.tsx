import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Row } from '../../src/components/primitives/Row';
import { Text } from '../../src/components/primitives/Text';
import { Icon, type IconName } from '../../src/components/primitives/Icon';
import { InputField } from '../../src/components/primitives/InputField';
import { PageHeader } from '../../src/components/PageHeader';
import { Sheet } from '../../src/components/Sheet';
import { StyledButton } from '../../src/components/StyledButton';
import { getStaffDisplayName } from '../../src/services';
import { useAuthStore } from '../../src/state/useAuthStore';
import { colors, spacing } from '../../src/theme';

const settingItems: { label: string; icon: IconName }[] = [
  { label: 'Profile', icon: 'person-outline' },
  { label: 'Notifications', icon: 'notifications-outline' },
  { label: 'Appearance', icon: 'eye-outline' },
  { label: 'App language', icon: 'globe-outline' },
  { label: 'Privacy and security', icon: 'lock-closed-outline' },
  { label: 'About', icon: 'help-circle-outline' },
  { label: 'Storage and Data', icon: 'folder-open-outline' },
  { label: 'Chats', icon: 'chatbubble-ellipses-outline' },
];

export default function SettingsScreen() {
  const [search, setSearch] = useState('');
  const { user, logout } = useAuthStore();

  // Switching staff logs the current person out; the next one logs in with their own password.
  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const visibleItems = settingItems.filter((item) =>
    item.label.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <Screen padding="none">
      <PageHeader title="Settings" showBack />
      <Sheet>
        <Stack gap="lg">
          <InputField
            value={search}
            onChangeText={setSearch}
            placeholder="Search for a setting..."
            variant="search"
            testID="settings-search"
          />

          <Stack>
            {visibleItems.map((item) => (
              <Pressable
                key={item.label}
                accessibilityRole="button"
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}
              >
                <Row gap="lg" justify="space-between">
                  <Row gap="lg" flex={1}>
                    <Icon name={item.icon} size={28} color={colors.navIcon} />
                    <Text size="xl">{item.label}</Text>
                  </Row>
                  <Icon name="chevron-forward" size={18} color={colors.textSecondary} />
                </Row>
              </Pressable>
            ))}
            {visibleItems.length === 0 && (
              <Text color={colors.textSecondary} align="center">No settings match “{search}”.</Text>
            )}
          </Stack>

          {user !== undefined && (
            <Text size="md" color={colors.textSecondary} align="center">
              Logged in as {getStaffDisplayName(user)} · {user.role}
            </Text>
          )}
          <StyledButton
            label="Switch staff member"
            size="md"
            icon="people-outline"
            onPress={handleLogout}
            testID="switch-staff-button"
          />
          <StyledButton
            label="Log out"
            variant="secondary"
            size="md"
            icon="log-out-outline"
            onPress={handleLogout}
            testID="logout-button"
          />
        </Stack>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: { paddingVertical: spacing.md },
  pressed: { opacity: 0.6 },
});
