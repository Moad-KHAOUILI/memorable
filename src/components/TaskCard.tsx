import { StyleSheet, View } from 'react-native';
import type { Task } from '../types';
import { Card } from './primitives/Card';
import { Icon } from './primitives/Icon';
import { Row } from './primitives/Row';
import { Stack } from './primitives/Stack';
import { Text } from './primitives/Text';
import { colors } from '../theme';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
}

export function TaskCard({ task, onPress }: TaskCardProps) {
  return (
    <Card onPress={onPress}>
      <Row justify="space-between" gap="sm">
        <Stack padding="md" flex={1}>
          <Text size="xl" weight="bold">{task.title}</Text>
          <Text size="lg">{task.description}</Text>
        </Stack>
        {task.priority === 'warning' && (
          <View style={styles.warningIcon} accessibilityLabel="Due soon">
            <Icon name="alert-circle-outline" size={26} color={colors.warning} />
          </View>
        )}
      </Row>
      {task.priority === 'urgent' && (
        <View style={styles.urgentIcon} accessibilityLabel="Urgent">
          <Icon name="alert-circle" size={26} color={colors.danger} />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  warningIcon: { paddingRight: 14 },
  urgentIcon: {
    position: 'absolute',
    top: -9,
    right: -6,
    backgroundColor: colors.surface,
    borderRadius: 999,
  },
});
