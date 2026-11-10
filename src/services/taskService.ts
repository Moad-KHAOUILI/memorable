import type { Task } from '../types';
import { addDays, toDateKey } from '../utils/date';

// Static data for the PWA assignment — replace with a Supabase query later.
// Dates are relative to today so the demo always looks current.
function buildTasks(): Task[] {
  const today = new Date();
  const day = (offset: number) => toDateKey(addDays(today, offset));

  return [
    { id: 't1', title: 'Give Mr. Shahruri His Medicine', description: '4 pills of Atorvastatin', priority: 'warning', date: day(0) },
    { id: 't2', title: 'Give Ms. Brink Her Medicine', description: '1 tablet of Paracetamol', priority: 'urgent', date: day(0) },
    { id: 't3', title: 'Administer Insulin to Mrs. Giri', description: '10 units of Novorapid', priority: 'normal', date: day(0) },
    { id: 't4', title: 'Provide Mr. Uvarov With Eye Drops', description: '2 drops of Timolol', priority: 'urgent', date: day(1) },
    { id: 't5', title: 'Apply Cream to Ms. Leclercq’s Arm', description: 'Hydrocortisone 1%', priority: 'normal', date: day(1) },
    { id: 't6', title: 'Apply Patch to Ms. Vermeulen’s Back', description: '1 Buprenorphine Patch', priority: 'normal', date: day(1) },
    { id: 't7', title: 'Give Mr. Dubois His Evening Dose', description: '5 mg of Amlodipine', priority: 'urgent', date: day(2) },
    { id: 't8', title: 'Check Mrs. Lira’s Blood Pressure', description: 'Before noon', priority: 'warning', date: day(3) },
  ];
}

const tasks = buildTasks();

export async function getTasks(): Promise<Task[]> {
  return tasks;
}

export async function getTasksForDay(dateKey: string): Promise<Task[]> {
  return tasks.filter((task) => task.date === dateKey);
}
