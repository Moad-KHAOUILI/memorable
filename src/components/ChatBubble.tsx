import { StyleSheet, View } from 'react-native';
import type { ChatMessage } from '../types';
import { Icon } from './primitives/Icon';
import { Row } from './primitives/Row';
import { Text } from './primitives/Text';
import { colors, shadows, spacing } from '../theme';

interface ChatBubbleProps {
  message: ChatMessage;
  tone: 'white' | 'tint';
}

export function ChatBubble({ message, tone }: ChatBubbleProps) {
  return (
    <View
      style={[
        styles.bubble,
        message.fromMe ? styles.mine : styles.theirs,
        tone === 'white' ? styles.white : styles.tint,
      ]}
    >
      <Text size="lg">{message.text}</Text>
      <Row gap="sm" justify="flex-end">
        <Text size="sm" color={colors.textSecondary}>{message.time}</Text>
        {message.fromMe && (
          <Icon
            name="checkmark-done"
            size={16}
            color={message.read ? colors.primary : colors.textSecondary}
          />
        )}
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderRadius: 16,
    gap: spacing.xs,
    ...shadows.soft,
  },
  mine: { alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  theirs: { alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  white: { backgroundColor: colors.surface },
  tint: { backgroundColor: colors.chatTint },
});
