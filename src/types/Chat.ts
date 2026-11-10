export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  read: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageAgo: string;
  lastMessageFromMe: boolean;
  lastMessageRead: boolean;
  unreadCount: number;
}
