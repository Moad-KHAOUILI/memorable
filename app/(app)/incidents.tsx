import { Screen } from '../../src/components/primitives/Screen';
import { EmptyState } from '../../src/components/primitives/EmptyState';
import { PageHeader } from '../../src/components/PageHeader';
import { Sheet } from '../../src/components/Sheet';

// Placeholder until the Incidents design is ready.
export default function IncidentsScreen() {
  return (
    <Screen padding="none">
      <PageHeader title="Incidents" />
      <Sheet>
        <EmptyState
          title="No incidents reported"
          description="Falls, refused medication and other incidents will be listed here."
        />
      </Sheet>
    </Screen>
  );
}
