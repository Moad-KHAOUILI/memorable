import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import type { ChatMessage } from '../types';
import { ChatBubble } from './ChatBubble';
import { Icon, type IconName } from './primitives/Icon';
import { InputField } from './primitives/InputField';
import { Row } from './primitives/Row';
import { Spinner } from './primitives/Spinner';
import { colors, noBounce, spacing } from '../theme';

interface ChatViewProps {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  // Colour of my bubbles and the other person's bubbles.
  myTone: 'white' | 'tint';
  theirTone: 'white' | 'tint';
  // Icon shown next to incoming messages (used for the assistant).
  theirAvatarIcon?: IconName;
  isTyping?: boolean;
}

export function ChatView({ messages, onSend, myTone, theirTone, theirAvatarIcon, isTyping = false }: ChatViewProps) {
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    const text = draft.trim();
    if (text === '') return;
    onSend(text);
    setDraft('');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={[styles.messages, noBounce]}
        bounces={false}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => {
          const showAvatar = theirAvatarIcon !== undefined && !message.fromMe;
          if (!showAvatar) {
            return <ChatBubble key={message.id} message={message} tone={message.fromMe ? myTone : theirTone} />;
          }
          return (
            <Row key={message.id} gap="sm" align="flex-end">
              <View style={styles.avatar}>
                <Icon name={theirAvatarIcon} size={28} color={colors.primary} />
              </View>
              <View style={styles.avatarBubble}>
                <ChatBubble message={message} tone={theirTone} />
              </View>
            </Row>
          );
        })}
        {isTyping && (
          <View style={styles.typing}>
            <Spinner size="small" color={colors.textOnPrimary} />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputBar}>
        <Row gap="sm">
          <Pressable accessibilityRole="button" accessibilityLabel="Attach a file" style={styles.iconButton}>
            <Icon name="attach" size={24} color={colors.textSecondary} />
          </Pressable>
          <View style={styles.input}>
            <InputField
              value={draft}
              onChangeText={setDraft}
              placeholder="Type a message..."
              variant="chat"
              onSubmitEditing={handleSend}
              testID="chat-input"
            />
          </View>
          <Pressable
            onPress={handleSend}
            accessibilityRole="button"
            accessibilityLabel="Send message"
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
            testID="chat-send"
          >
            <Icon name="send" size={24} color={colors.primary} />
          </Pressable>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  messages: { flex: 1 },
  messagesContent: { padding: spacing.lg, gap: spacing.md },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.chatTint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBubble: { flex: 1 },
  typing: { alignSelf: 'flex-start', paddingLeft: 52 },
  inputBar: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: { flex: 1 },
  iconButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
});
