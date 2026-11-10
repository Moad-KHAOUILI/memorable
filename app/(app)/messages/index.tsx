import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Screen } from '../../../src/components/primitives/Screen';
import { Stack } from '../../../src/components/primitives/Stack';
import { Row } from '../../../src/components/primitives/Row';
import { Text } from '../../../src/components/primitives/Text';
import { Icon } from '../../../src/components/primitives/Icon';
import { Divider } from '../../../src/components/primitives/Divider';
import { Spinner } from '../../../src/components/primitives/Spinner';
import { PageHeader } from '../../../src/components/PageHeader';
import { Sheet } from '../../../src/components/Sheet';
import { ConversationItem } from '../../../src/components/ConversationItem';
import { getConversations } from '../../../src/services';
import type { Conversation } from '../../../src/types';
import { colors } from '../../../src/theme';

export default function MessagesScreen() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getConversations()
      .then(setConversations)
      .catch(() => setError('Could not load your messages. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Screen padding="none">
      <PageHeader title="Messages" />
      <Sheet>
        {isLoading && <Spinner size="large" color={colors.primary} />}
        {error !== '' && <Text color={colors.danger}>{error}</Text>}
        <Stack>
          {conversations.map((conversation) => (
            <Stack key={conversation.id}>
              <Divider />
              <ConversationItem
                conversation={conversation}
                onPress={() => router.push({ pathname: '/messages/[id]', params: { id: conversation.id } })}
              />
            </Stack>
          ))}
          {conversations.length > 0 && <Divider />}
        </Stack>
        {!isLoading && (
          <Row gap="md" justify="center">
            <Icon name="lock-closed-outline" size={22} color={colors.textSecondary} />
            <Text size="md" color={colors.textSecondary}>Messages are only visible to clinic staff.</Text>
          </Row>
        )}
      </Sheet>
    </Screen>
  );
}
