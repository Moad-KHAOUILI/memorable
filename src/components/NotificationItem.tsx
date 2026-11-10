import { Pressable, StyleSheet } from 'react-native';
import type { AppNotification } from '../types';
import { Avatar } from './primitives/Avatar';
import { Icon } from './primitives/Icon';
import { Row } from './primitives/Row';
import { Stack } from './primitives/Stack';
import { Text } from './primitives/Text';
import { colors, spacing } from '../theme';

interface NotificationItemProps {
  notification: AppNotification;
  onPress: () => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
    >
      <Row gap="md">
        {notification.kind === 'message' && <Avatar name={notification.senderName ?? notification.title} />}
        <Stack flex={1}>
          <Text size="lg" weight="bold">{notification.title}</Text>
          <Text size="sm" color={colors.textSecondary}>{notification.ago}</Text>
        </Stack>
        {notification.kind === 'medication' && (
          <Icon name="alert-circle-outline" size={26} color={colors.warning} />
        )}
        {notification.kind === 'stock' && (
          <Icon name="alert-circle-outline" size={26} color={colors.orange} />
        )}
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.lg },
  pressed: { opacity: 0.6 },
});
