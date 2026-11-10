import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../../../src/components/primitives/Screen';
import { Stack } from '../../../src/components/primitives/Stack';
import { Row } from '../../../src/components/primitives/Row';
import { Text } from '../../../src/components/primitives/Text';
import { Icon, type IconName } from '../../../src/components/primitives/Icon';
import { Avatar } from '../../../src/components/primitives/Avatar';
import { Card } from '../../../src/components/primitives/Card';
import { Spinner } from '../../../src/components/primitives/Spinner';
import { PageHeader } from '../../../src/components/PageHeader';
import { Sheet } from '../../../src/components/Sheet';
import { getPatientById } from '../../../src/services';
import type { Patient } from '../../../src/types';
import { colors, spacing } from '../../../src/theme';
import { formatDate, getAge } from '../../../src/utils/date';

interface InfoRowProps {
  icon: IconName;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <Row gap="md" align="flex-start">
      <Icon name={icon} size={26} color={colors.navIcon} />
      <Stack flex={1}>
        <Text size="sm" color={colors.textSecondary}>{label}</Text>
        <Text size="lg">{value}</Text>
      </Stack>
    </Row>
  );
}

export default function PatientDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [error, setError] = useState('');

  useEffect(() => {
    getPatientById(id)
      .then(setPatient)
      .catch(() => setError('This patient file could not be loaded.'));
  }, [id]);

  const fullName = patient !== undefined ? `${patient.firstName} ${patient.lastName}` : '';

  return (
    <Screen padding="none" backgroundColor={colors.background}>
      <PageHeader title={fullName === '' ? 'Patient file' : fullName} subtitle="PATIENT FILE" showBack />
      <Sheet backgroundColor={colors.backgroundMuted}>
        {error !== '' && <Text color={colors.danger}>{error}</Text>}
        {patient === undefined && error === '' && <Spinner size="large" color={colors.primary} />}
        {patient !== undefined && (
          <Stack gap="lg">
            <View style={styles.center}>
              <Avatar name={fullName} size="lg" />
            </View>
            <Card elevated>
              <Stack padding="lg" gap="lg">
                <InfoRow icon="bed-outline" label="Room" value={patient.room} />
                <InfoRow
                  icon="calendar-outline"
                  label="Date of birth"
                  value={`${formatDate(patient.dateOfBirth)} (${getAge(patient.dateOfBirth)} years)`}
                />
                <InfoRow icon="document-text-outline" label="Care notes" value={patient.notes === '' ? '—' : patient.notes} />
              </Stack>
            </Card>
          </Stack>
        )}
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', paddingTop: spacing.sm },
});
