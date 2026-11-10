export type TaskPriority = 'normal' | 'warning' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  // Day the task is planned for, as yyyy-mm-dd.
  date: string;
}
