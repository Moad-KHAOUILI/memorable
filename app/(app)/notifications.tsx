import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Screen } from '../../src/components/primitives/Screen';
import { Stack } from '../../src/components/primitives/Stack';
import { Text } from '../../src/components/primitives/Text';
import { Divider } from '../../src/components/primitives/Divider';
import { Spinner } from '../../src/components/primitives/Spinner';
import { EmptyState } from '../../src/components/primitives/EmptyState';
import { PageHeader } from '../../src/components/PageHeader';
import { Sheet } from '../../src/components/Sheet';
import { NotificationItem } from '../../src/components/NotificationItem';
import { getNotifications } from '../../src/services';
import type { AppNotification } from '../../src/types';
import { colors } from '../../src/theme';

function openNotification(notification: AppNotification) {
  if (notification.kind === 'message' && notification.conversationId !== undefined) {
    router.push({ pathname: '/messages/[id]', params: { id: notification.conversationId } });
    return;
  }
  if (notification.kind === 'medication') {
    router.navigate('/tasks');
  }
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getNotifications()
      .then(setNotifications)
      .catch(() => setError('Could not load your notifications. Please try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Screen padding="none">
      <PageHeader title="Notifications" />
      <Sheet>
        {isLoading && <Spinner size="large" color={colors.primary} />}
        {error !== '' && <Text color={colors.danger}>{error}</Text>}
        {!isLoading && notifications.length === 0 && (
          <EmptyState title="All caught up" description="You have no new notifications." />
        )}
        <Stack>
          {notifications.map((notification) => (
            <Stack key={notification.id}>
              <Divider />
              <NotificationItem notification={notification} onPress={() => openNotification(notification)} />
            </Stack>
          ))}
          {notifications.length > 0 && <Divider />}
        </Stack>
      </Sheet>
    </Screen>
  );
}
