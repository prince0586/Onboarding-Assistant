export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  category: 'Day 1' | 'Week 1' | 'Month 1';
  isAiGenerated?: boolean;
}

export interface UserProfile {
  name: string;
  role: string;
  department: string;
  startDate: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type ViewState = 'setup' | 'dashboard' | 'checklist' | 'assistant' | 'resources';

export interface ResourceLink {
  title: string;
  url: string;
  description: string;
  iconName: string;
}