import type { Staff } from '../types';

// Static data for the PWA assignment — replace with the logged-in Supabase user later.
const currentStaff: Staff = {
  id: 's1',
  title: 'Dr.',
  firstName: 'Moad',
  lastName: 'Khaouili',
};

export async function getCurrentStaff(): Promise<Staff> {
  return currentStaff;
}
