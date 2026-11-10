import type { AppNotification } from '../types';

// Static data for the PWA assignment — replace with a Supabase query later.
const notifications: AppNotification[] = [
  { id: 'n1', title: 'Metformin for Mrs. Lira is due soon', ago: '15 min', kind: 'medication' },
  { id: 'n2', title: 'Lisinopril is running low', ago: '2h', kind: 'stock' },
  { id: 'n3', title: 'Dr. Shahruri sent you a message', ago: '1d', kind: 'message', conversationId: 'c3', senderName: 'Dr. Zakaria Shahruri' },
  { id: 'n4', title: 'New residents arrive on Friday', ago: '3d', kind: 'announcement' },
];

export async function getNotifications(): Promise<AppNotification[]> {
  return notifications;
}
