export type Page = 'landing' | 'about' | 'pricing';
export type DashboardPage = 'overview' | 'feedback' | 'widget-editor' | 'email' | 'settings';
export type SettingsTab = 'profile' | 'billing' | 'notifications' | 'whats-new' | 'help-support';

export interface ChatMessage {
  role: 'user' | 'model' | 'error';
  text: string;
}

export interface FeedbackSubmission {
  id: number;
  rating: number;
  perfect10: string;
  changeRemove: string;
  date: string;
  email: string;
}

export interface WidgetSettings {
  accentColor: string;
  position: 'left' | 'right';
  headerText: string;
  subheaderText: string;
  rateExperienceText: string;
  perfect10Question: string;
  perfect10Placeholder: string;
  changeRemoveQuestion: string;
  changeRemovePlaceholder: string;
  width: number;
}
