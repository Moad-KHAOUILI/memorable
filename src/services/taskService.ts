import type { Task } from '../types';

// Static data for the PWA assignment — replace with a Supabase query later.
const tasks: Task[] = [
  {
    id: 't1',
    title: 'Give Mr. Shahruri His Medicine',
    description: '4 pills of Atorvastatin',
    priority: 'warning',
  },
  {
    id: 't2',
    title: 'Give Ms. Brink Her Medicine',
    description: '1 tablet of Paracetamol',
    priority: 'urgent',
  },
  {
    id: 't3',
    title: 'Administer Insulin to Mrs. Giri',
    description: '10 units of Novorapid',
    priority: 'normal',
  },
];

export async function getTasks(): Promise<Task[]> {
  return tasks;
}
