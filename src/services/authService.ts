import { supabase } from '../lib/supabase';
import type { NewStaff, Staff } from '../types';
import { getStaffById } from './staffService';

export async function login(email: string, password: string): Promise<Staff> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return getStaffById(data.user.id);
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

// The staff member of the saved session, if someone is still logged in on this device.
export async function getSessionStaff(): Promise<Staff | undefined> {
  const { data } = await supabase.auth.getSession();
  if (data.session === null) return undefined;
  return getStaffById(data.session.user.id);
}

// Creates a Supabase Auth account. A database trigger creates the matching `staff` row
// from the metadata. We sign out right after, so the new staff member logs in with their password.
export async function registerStaff(newStaff: NewStaff): Promise<Staff> {
  const { data, error } = await supabase.auth.signUp({
    email: newStaff.email,
    password: newStaff.password,
    options: {
      data: {
        title: newStaff.title,
        first_name: newStaff.firstName,
        last_name: newStaff.lastName,
        role: newStaff.role,
      },
    },
  });
  if (error) throw new Error(error.message);
  if (data.user === null) throw new Error('The account could not be created.');

  if (data.session !== null) await supabase.auth.signOut();

  return {
    id: data.user.id,
    title: newStaff.title,
    firstName: newStaff.firstName,
    lastName: newStaff.lastName,
    email: newStaff.email,
    role: newStaff.role,
  };
}
