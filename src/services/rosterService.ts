import type { RosterEntry, RosterSlot } from '../types';

export const rosterSlots: { slot: RosterSlot; label: string; time: string }[] = [
  { slot: 'morning', label: 'Morning', time: '7:00 – 10:00' },
  { slot: 'noon', label: 'Noon', time: '11:00 – 14:00' },
  { slot: 'evening', label: 'Evening', time: '17:00 – 20:00' },
];

// Static data for the PWA assignment — replace with a Supabase query later.
const roster: RosterEntry[] = [
  { id: 'r1', patientName: 'Eleanor Pena', medication: 'Lisinopril 10 mg', slot: 'morning', status: 'administered', route: 'oral' },
  { id: 'r2', patientName: 'Esther Howard', medication: 'Levothyroxine', slot: 'morning', status: 'due', route: 'oral' },
  { id: 'r3', patientName: 'Marvin Reid', medication: 'Aspirin 81 mg', slot: 'morning', status: 'overdue', route: 'oral' },
  { id: 'r4', patientName: 'Albert Flores', medication: 'Novorapid 10 units', slot: 'noon', status: 'due', route: 'injection' },
  { id: 'r5', patientName: 'Kristin Watson', medication: 'Metformin 500 mg', slot: 'noon', status: 'due', route: 'oral' },
  { id: 'r6', patientName: 'Robert Fox', medication: 'Atorvastatin 20 mg', slot: 'evening', status: 'due', route: 'oral' },
];

export async function getRoster(): Promise<RosterEntry[]> {
  return roster;
}

export async function markAdministered(id: string): Promise<void> {
  const entry = roster.find((item) => item.id === id);
  if (entry === undefined) throw new Error(`Roster entry ${id} not found`);
  entry.status = 'administered';
}
