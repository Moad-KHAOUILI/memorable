import type { RosterEntry } from '../types';
import { Avatar } from './primitives/Avatar';
import { Row } from './primitives/Row';
import { Stack } from './primitives/Stack';
import { Text } from './primitives/Text';
import { StyledButton } from './StyledButton';
import { colors } from '../theme';

interface RosterItemProps {
  entry: RosterEntry;
  onAdminister: () => void;
}

function getButtonLabel(entry: RosterEntry): string {
  if (entry.status === 'administered') return 'Administered';
  return entry.route === 'injection' ? 'Injection' : 'Administer';
}

function getButtonVariant(entry: RosterEntry): 'success' | 'danger' | 'secondary' {
  if (entry.status === 'administered') return 'success';
  if (entry.status === 'overdue') return 'danger';
  return 'secondary';
}

export function RosterItem({ entry, onAdminister }: RosterItemProps) {
  const isDone = entry.status === 'administered';

  return (
    <Row justify="space-between" gap="sm">
      <Row gap="md" flex={1}>
        <Avatar name={entry.patientName} />
        <Stack flex={1}>
          <Text size="lg" weight="medium">{entry.patientName}</Text>
          <Text size="md" color={colors.textSecondary}>{entry.medication}</Text>
        </Stack>
      </Row>
      <StyledButton
        label={getButtonLabel(entry)}
        variant={getButtonVariant(entry)}
        size="sm"
        onPress={isDone ? () => {} : onAdminister}
        testID={`administer-${entry.id}`}
      />
    </Row>
  );
}
