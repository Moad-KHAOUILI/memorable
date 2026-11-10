import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Screen } from '../../../src/components/primitives/Screen';
import { Stack } from '../../../src/components/primitives/Stack';
import { Text } from '../../../src/components/primitives/Text';
import { Divider } from '../../../src/components/primitives/Divider';
import { Spinner } from '../../../src/components/primitives/Spinner';
import { EmptyState } from '../../../src/components/primitives/EmptyState';
import { InputField } from '../../../src/components/primitives/InputField';
import { PageHeader } from '../../../src/components/PageHeader';
import { Sheet } from '../../../src/components/Sheet';
import { PatientItem } from '../../../src/components/PatientItem';
import { getPatients } from '../../../src/services';
import type { Patient } from '../../../src/types';
import { colors } from '../../../src/theme';

export default function PatientsScreen() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPatients()
      .then(setPatients)
      .catch(() => setError('Could not load the patients. Check your connection and try again.'))
      .finally(() => setIsLoading(false));
  }, []);

  const query = search.trim().toLowerCase();
  const visiblePatients = patients.filter((patient) =>
    `${patient.firstName} ${patient.lastName} ${patient.room}`.toLowerCase().includes(query),
  );

  return (
    <Screen padding="none">
      <PageHeader title="Patients" subtitle={`${patients.length} RESIDENTS`} />
      <Sheet>
        <Stack gap="md">
          <InputField
            value={search}
            onChangeText={setSearch}
            placeholder="Search by name or room..."
            variant="search"
            testID="patient-search"
          />
          {isLoading && <Spinner size="large" color={colors.primary} />}
          {error !== '' && <Text color={colors.danger}>{error}</Text>}
          {!isLoading && error === '' && visiblePatients.length === 0 && (
            <EmptyState title="No patients found" description="Try another name or room number." />
          )}
          <Stack>
            {visiblePatients.map((patient, index) => (
              <Stack key={patient.id}>
                {index > 0 && <Divider />}
                <PatientItem
                  patient={patient}
                  onPress={() => router.push({ pathname: '/patients/[id]', params: { id: patient.id } })}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Sheet>
    </Screen>
  );
}
