export type RosterSlot = 'morning' | 'noon' | 'evening';

export type RosterStatus = 'administered' | 'due' | 'overdue';

export type MedicationRoute = 'oral' | 'injection';

export interface RosterEntry {
  id: string;
  patientName: string;
  medication: string;
  slot: RosterSlot;
  status: RosterStatus;
  route: MedicationRoute;
}
