import { Pressable, StyleSheet } from 'react-native';
import type { Patient } from '../types';
import { Avatar } from './primitives/Avatar';
import { Icon } from './primitives/Icon';
import { Row } from './primitives/Row';
import { Stack } from './primitives/Stack';
import { Text } from './primitives/Text';
import { getAge } from '../utils/date';
import { colors, spacing } from '../theme';

interface PatientItemProps {
  patient: Patient;
  onPress: () => void;
}

export function PatientItem({ patient, onPress }: PatientItemProps) {
  const fullName = `${patient.firstName} ${patient.lastName}`;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open file of ${fullName}`}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
      testID={`patient-${patient.id}`}
    >
      <Row gap="md">
        <Avatar name={fullName} />
        <Stack flex={1}>
          <Text size="lg" weight="bold">{fullName}</Text>
          <Text size="md" color={colors.textSecondary}>
            Room {patient.room} · {getAge(patient.dateOfBirth)} years
          </Text>
        </Stack>
        <Icon name="chevron-forward" size={22} color={colors.textSecondary} />
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.md },
  pressed: { opacity: 0.6 },
});
