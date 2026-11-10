import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { PageHeader } from '../../src/components/PageHeader';
import { ChatView } from '../../src/components/ChatView';
import { BOT_NAME, getBotReply, getGreeting } from '../../src/services';
import type { ChatMessage } from '../../src/types';
import { colors } from '../../src/theme';
import { formatHeaderDate, formatTime } from '../../src/utils/date';

let userMessageCounter = 0;

function userMessage(text: string): ChatMessage {
  userMessageCounter += 1;
  return { id: `me-${userMessageCounter}`, text, time: formatTime(new Date()), fromMe: true, read: true };
}

export default function ChatbotScreen() {
  // Optional question picked on the Help screen.
  const { question } = useLocalSearchParams<{ question?: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const hasAskedInitialQuestion = useRef(false);

  const ask = async (text: string) => {
    setMessages((current) => [...current, userMessage(text)]);
    setIsTyping(true);
    try {
      const reply = await getBotReply(text);
      // Small delay so the reply feels like a conversation.
      setTimeout(() => {
        setMessages((current) => [...current, reply]);
        setIsTyping(false);
      }, 700);
    } catch {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    getGreeting().then((greeting) => {
      setMessages(greeting);
      if (question !== undefined && question !== '' && !hasAskedInitialQuestion.current) {
        hasAskedInitialQuestion.current = true;
        ask(question);
      }
    });
    // Only run once when the screen opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader
        title={BOT_NAME}
        subtitle={formatHeaderDate(new Date())}
        showBack
        withSheet={false}
        actionIcon="headset-outline"
        actionLabel="Contact a person"
        onAction={() => router.back()}
      />
      <ChatView
        messages={messages}
        onSend={ask}
        myTone="white"
        theirTone="tint"
        theirAvatarIcon="happy-outline"
        isTyping={isTyping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary },
});
