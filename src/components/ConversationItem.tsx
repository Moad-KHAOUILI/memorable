import { Pressable, StyleSheet } from 'react-native';
import type { Conversation } from '../types';
import { Avatar } from './primitives/Avatar';
import { Badge } from './primitives/Badge';
import { Icon } from './primitives/Icon';
import { Row } from './primitives/Row';
import { Stack } from './primitives/Stack';
import { Text } from './primitives/Text';
import { colors, spacing } from '../theme';

interface ConversationItemProps {
  conversation: Conversation;
  onPress: () => void;
}

export function ConversationItem({ conversation, onPress }: ConversationItemProps) {
  const hasUnread = conversation.unreadCount > 0;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Conversation with ${conversation.name}`}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
      testID={`conversation-${conversation.id}`}
    >
      <Row gap="md">
        <Avatar name={conversation.name} />
        <Stack flex={1}>
          <Text size="lg" weight="bold" numberOfLines={1}>{conversation.name}</Text>
          <Text size="md" numberOfLines={1} weight={hasUnread ? 'medium' : 'normal'}>
            {conversation.lastMessage}
          </Text>
          <Text size="sm" color={colors.textSecondary}>{conversation.lastMessageAgo}</Text>
        </Stack>
        {hasUnread ? (
          <Badge label={String(conversation.unreadCount)} variant="count" />
        ) : (
          conversation.lastMessageFromMe && (
            <Icon
              name="checkmark-done"
              size={22}
              color={conversation.lastMessageRead ? colors.primary : colors.textSecondary}
            />
          )
        )}
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.md },
  pressed: { opacity: 0.6 },
});
