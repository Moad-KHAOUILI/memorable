export type NotificationKind = 'medication' | 'stock' | 'message' | 'announcement';

export interface AppNotification {
  id: string;
  title: string;
  ago: string;
  kind: NotificationKind;
  conversationId?: string;
  senderName?: string;
}
