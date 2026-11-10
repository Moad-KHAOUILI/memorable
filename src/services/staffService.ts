import { supabase } from '../lib/supabase';
import type { Staff } from '../types';

// Shape of a row in the Supabase `staff` table (snake_case columns).
interface StaffRow {
  id: string;
  title: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

function mapStaff(row: StaffRow): Staff {
  return {
    id: row.id,
    title: row.title,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    role: row.role,
  };
}

export function getStaffDisplayName(staff: Staff): string {
  return [staff.title, staff.firstName, staff.lastName].filter((part) => part !== '').join(' ');
}

export async function getStaffList(): Promise<Staff[]> {
  const { data, error } = await supabase
    .from('staff')
    .select('id, title, first_name, last_name, email, role')
    .order('first_name')
    .returns<StaffRow[]>();
  if (error) throw new Error(error.message);
  return data.map(mapStaff);
}

export async function getStaffById(id: string): Promise<Staff> {
  const { data, error } = await supabase
    .from('staff')
    .select('id, title, first_name, last_name, email, role')
    .eq('id', id)
    .single<StaffRow>();
  if (error) throw new Error(error.message);
  return mapStaff(data);
}
