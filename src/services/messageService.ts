import type { ChatMessage, Conversation } from '../types';
import { formatTime } from '../utils/date';

const conversations: Conversation[] = [
  { id: 'c1', name: 'Living Group 1 Doctors', lastMessage: 'Did we run out of Metoprolol?', lastMessageAgo: '15 min', lastMessageFromMe: true, lastMessageRead: false, unreadCount: 0 },
  { id: 'c2', name: 'Dr. Bethany Londo', lastMessage: 'Could you replace me today? I got sick.', lastMessageAgo: '2h', lastMessageFromMe: false, lastMessageRead: false, unreadCount: 2 },
  { id: 'c3', name: 'Dr. Zakaria Shahruri', lastMessage: 'Noted. I’ll prepare the notes before our team huddle.', lastMessageAgo: '1d', lastMessageFromMe: true, lastMessageRead: true, unreadCount: 0 },
  { id: 'c4', name: 'Dr. Jeremy Seavey', lastMessage: 'Yes, I gave it already', lastMessageAgo: '3d', lastMessageFromMe: true, lastMessageRead: true, unreadCount: 0 },
];

const messages: Record<string, ChatMessage[]> = {
  c1: [
    { id: 'm1', text: 'Morning everyone, the pharmacy delivery is delayed until tomorrow.', time: '08:12', fromMe: false, read: true },
    { id: 'm2', text: 'Did we run out of Metoprolol?', time: '09:45', fromMe: true, read: false },
  ],
  c2: [
    { id: 'm1', text: 'Hi Moad, are you working today?', time: '07:02', fromMe: false, read: true },
    { id: 'm2', text: 'Could you replace me today? I got sick.', time: '07:03', fromMe: false, read: true },
  ],
  c3: [
    { id: 'm1', text: 'Great, thank you! Can you also check on Mrs. Lira’s blood pressure before noon?', time: '10:04', fromMe: false, read: true },
    { id: 'm2', text: 'Will do. I’ll update her chart after that.', time: '10:06', fromMe: true, read: true },
    { id: 'm3', text: 'Also, let’s flag Mr. Shaheed’s file for a review this afternoon.', time: '10:07', fromMe: false, read: true },
    { id: 'm4', text: 'Noted. I’ll prepare the notes before our team huddle.', time: '10:08', fromMe: true, read: true },
  ],
  c4: [
    { id: 'm1', text: 'Did Mr. Dubois get his evening dose?', time: '19:30', fromMe: false, read: true },
    { id: 'm2', text: 'Yes, I gave it already', time: '19:32', fromMe: true, read: true },
  ],
};

export async function getConversations(): Promise<Conversation[]> {
  return conversations;
}

export async function getConversation(id: string): Promise<Conversation> {
  const conversation = conversations.find((item) => item.id === id);
  if (conversation === undefined) throw new Error(`Conversation ${id} not found`);
  return conversation;
}

export async function getMessages(conversationId: string): Promise<ChatMessage[]> {
  return messages[conversationId] ?? [];
}

export async function sendMessage(conversationId: string, text: string): Promise<ChatMessage> {
  const message: ChatMessage = {
    id: `m${Date.now()}`,
    text,
    time: formatTime(new Date()),
    fromMe: true,
    read: false,
  };
  messages[conversationId] = [...(messages[conversationId] ?? []), message];
  return message;
}
