export type NotificationKind = 'medication' | 'stock' | 'message' | 'announcement';

// Named AppNotification to avoid clashing with the browser's built-in Notification type.
export interface AppNotification {
  id: string;
  title: string;
  ago: string;
  kind: NotificationKind;
  // Set when kind is 'message': the conversation the notification opens.
  conversationId?: string;
  senderName?: string;
}
