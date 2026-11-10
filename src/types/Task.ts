export type TaskPriority = 'normal' | 'warning' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  date: string;
}
