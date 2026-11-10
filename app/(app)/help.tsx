import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Row } from '../../src/components/primitives/Row';
import { Text } from '../../src/components/primitives/Text';
import { Icon, type IconName } from '../../src/components/primitives/Icon';
import { Card } from '../../src/components/primitives/Card';
import { PageHeader } from '../../src/components/PageHeader';
import { Sheet } from '../../src/components/Sheet';
import { StyledButton } from '../../src/components/StyledButton';
import { BOT_NAME, helpTopics, type HelpTopic } from '../../src/services';
import { colors, shadows, spacing } from '../../src/theme';

const contacts: { label: string; detail: string; icon: IconName }[] = [
  { label: 'On-call doctor', detail: 'ext. 200 · 24/7', icon: 'medkit-outline' },
  { label: 'IT helpdesk', detail: 'ext. 300 · 8:00 – 18:00', icon: 'construct-outline' },
];

function openChat(topic?: HelpTopic) {
  if (topic === undefined) {
    router.push('/chatbot');
    return;
  }
  router.push({ pathname: '/chatbot', params: { question: topic.question } });
}

export default function HelpScreen() {
  return (
    <Screen padding="none">
      <PageHeader title="Help" subtitle="WE’RE HERE FOR YOU" showBack />
      <Sheet backgroundColor={colors.backgroundMuted}>
        <Stack gap="lg">
          {/* Assistant */}
          <Card elevated>
            <Stack padding="lg" gap="lg">
              <Row gap="md">
                <View style={styles.botAvatar}>
                  <Icon name="happy-outline" size={36} color={colors.primary} />
                </View>
                <Stack flex={1}>
                  <Text size="xl" weight="bold">Ask {BOT_NAME}</Text>
                  <Text size="md" color={colors.textSecondary}>
                    Our assistant answers quick questions about the app and daily care.
                  </Text>
                </Stack>
              </Row>
              <StyledButton label="Start chat" icon="chatbubbles-outline" onPress={() => openChat()} testID="start-chat" />
            </Stack>
          </Card>

          {/* Quick topics */}
          <Text size="lg" weight="bold">Common questions</Text>
          <Stack gap="sm">
            {helpTopics.map((topic) => (
              <Pressable
                key={topic.id}
                onPress={() => openChat(topic)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.topic, pressed && styles.pressed]}
              >
                <Row justify="space-between" gap="md">
                  <Text size="lg">{topic.label}</Text>
                  <Icon name="chevron-forward" size={22} color={colors.primary} />
                </Row>
              </Pressable>
            ))}
          </Stack>

          {/* Human contacts */}
          <Text size="lg" weight="bold">Talk to a person</Text>
          <Card elevated>
            <Stack padding="md" gap="md">
              {contacts.map((contact) => (
                <Row key={contact.label} gap="md">
                  <Icon name={contact.icon} size={28} color={colors.navIcon} />
                  <Stack flex={1}>
                    <Text size="lg" weight="medium">{contact.label}</Text>
                    <Text size="md" color={colors.textSecondary}>{contact.detail}</Text>
                  </Stack>
                  <Icon name="call-outline" size={24} color={colors.primary} />
                </Row>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  botAvatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: colors.chatTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topic: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.soft,
  },
  pressed: { opacity: 0.7 },
});
