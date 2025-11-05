import React, { useState } from 'react';
import FeedbackWidget from '@/components/FeedbackWidget';
import { WidgetSettings } from './types';
import DashboardOverview from '@/components/DashboardOverview';
import DashboardEmail from '@/pages/dashboard/DashboardEmail';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Default settings for the demo widget
  const defaultWidgetSettings: WidgetSettings = {
    accentColor: '#2563EB', // blue-600
    position: 'right',
    headerText: 'Share Your Feedback',
    subheaderText: 'Help us improve your experience',
    rateExperienceText: 'Rate your experience',
    perfect10Question: 'What would make this a perfect 10?',
    perfect10Placeholder: 'Tell us what would make your experience perfect...',
    changeRemoveQuestion: 'What would you change or remove?',
    changeRemovePlaceholder: "Tell us what you'd like to see improved...",
    // FIX: Added missing 'width' property required by the WidgetSettings type.
    width: 384,
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {isLoggedIn ? (
        <DashboardOverview/>
      ) : (
        <DashboardEmail/>
      )}
      {/* The FeedbackWidget is placed here to be persistent across all pages */}
      <FeedbackWidget settings={defaultWidgetSettings} />
    </div>
  );
};

export default App;