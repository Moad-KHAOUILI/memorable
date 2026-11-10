import { supabase } from '../lib/supabase';
import type { Patient } from '../types';

interface PatientRow {
  id: string;
  first_name: string;
  last_name: string;
  room: string;
  date_of_birth: string;
  notes: string;
  created_at: string;
}

function mapPatient(row: PatientRow): Patient {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    room: row.room,
    dateOfBirth: row.date_of_birth,
    notes: row.notes,
    createdAt: row.created_at,
  };
}

export async function getPatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('room')
    .returns<PatientRow[]>();
  if (error) throw new Error(error.message);
  return data.map(mapPatient);
}

export async function getPatientById(id: string): Promise<Patient> {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single<PatientRow>();
  if (error) throw new Error(error.message);
  return mapPatient(data);
}
