import type { ChatMessage } from '../types';
import { formatTime } from '../utils/date';

export const BOT_NAME = 'Memo';

export interface HelpTopic {
  id: string;
  label: string;
  question: string;
}

export const helpTopics: HelpTopic[] = [
  { id: 'medication', label: 'A question about medication', question: 'I have a question about a patient’s medication' },
  { id: 'task', label: 'How do I complete a task?', question: 'How do I mark a task or medication as done?' },
  { id: 'incident', label: 'Report an incident', question: 'How do I report an incident?' },
  { id: 'app', label: 'Problem with the app', question: 'Something in the app is not working' },
];

// Simple keyword-based replies. Later this can call a real assistant through our own backend.
const replies: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['medication', 'medicine', 'dose', 'pill'],
    reply: 'Always follow the medication plan in the patient’s file. For doubts about a dose, call the on-call doctor at ext. 200 — I can’t give dosage advice.',
  },
  {
    keywords: ['done', 'complete', 'mark', 'administer'],
    reply: 'On the home screen, tap “Administer” next to the patient in your medication roster. It turns green once it’s saved.',
  },
  {
    keywords: ['incident', 'fall', 'report'],
    reply: 'Make sure the patient is safe first. Then inform the on-call doctor (ext. 200) and add a note to the patient’s file.',
  },
  {
    keywords: ['app', 'working', 'bug', 'login', 'log in'],
    reply: 'Sorry about that! Try closing and reopening the app. If it keeps happening, contact the IT helpdesk at ext. 300.',
  },
];

const fallbackReply =
  'I’m not sure I understand. You can ask me about medication, tasks, incidents or the app — or call the on-call doctor at ext. 200.';

let messageCounter = 0;

function botMessage(text: string): ChatMessage {
  messageCounter += 1;
  return { id: `bot-${messageCounter}`, text, time: formatTime(new Date()), fromMe: false, read: true };
}

export async function getGreeting(): Promise<ChatMessage[]> {
  return [botMessage('Hello!'), botMessage(`I’m ${BOT_NAME}, your care assistant. How can I help you?`)];
}

export async function getBotReply(question: string): Promise<ChatMessage> {
  const text = question.toLowerCase();
  const match = replies.find(({ keywords }) => keywords.some((keyword) => text.includes(keyword)));
  return botMessage(match !== undefined ? match.reply : fallbackReply);
}
