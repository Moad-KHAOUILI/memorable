import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Avatar } from '../../../src/components/primitives/Avatar';
import { Icon } from '../../../src/components/primitives/Icon';
import { Row } from '../../../src/components/primitives/Row';
import { Text } from '../../../src/components/primitives/Text';
import { ChatView } from '../../../src/components/ChatView';
import { getConversation, getMessages, sendMessage } from '../../../src/services';
import type { ChatMessage, Conversation } from '../../../src/types';
import { colors, spacing } from '../../../src/theme';
import { useLayoutInsets } from '../../../src/hooks/useLayoutInsets';

export default function DirectMessageScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { topGap } = useLayoutInsets();
  const [conversation, setConversation] = useState<Conversation | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getConversation(id), getMessages(id)])
      .then(([currentConversation, messageList]) => {
        setConversation(currentConversation);
        setMessages(messageList);
      })
      .catch(() => setError('This conversation could not be found.'));
  }, [id]);

  const handleSend = async (text: string) => {
    try {
      const message = await sendMessage(id, text);
      setMessages((current) => [...current, message]);
    } catch {
      setError('Your message could not be sent. Please try again.');
    }
  };

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/messages');
  };

  return (
    <View style={styles.container}>
      <View style={{ height: topGap, backgroundColor: colors.surface }} />
      <View style={styles.header}>
        <Row gap="md">
          <Pressable
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Back to messages"
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Icon name="chevron-back" size={26} color={colors.primary} />
          </Pressable>
          <Avatar name={conversation?.name ?? ''} />
          <View style={styles.name}>
            <Text size="xl" weight="bold" numberOfLines={1}>{conversation?.name ?? ''}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Call"
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Icon name="call-outline" size={26} color={colors.text} />
          </Pressable>
        </Row>
      </View>
      {error !== '' && (
        <View style={styles.error}>
          <Text color={colors.danger} align="center">{error}</Text>
        </View>
      )}
      <ChatView messages={messages} onSend={handleSend} myTone="tint" theirTone="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
  header: {
    backgroundColor: colors.surface,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  name: { flex: 1 },
  iconButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
  error: { backgroundColor: colors.surface, padding: spacing.sm },
});
