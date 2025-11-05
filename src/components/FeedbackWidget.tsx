'use client';
import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react'; // ✅ Lucide icons
import FeedbackForm from './FeedbackForm';
import { WidgetSettings } from '../types';

interface FeedbackWidgetProps {
  settings: WidgetSettings;
  isPreview?: boolean;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ settings, isPreview = false }) => {
  const [isOpen, setIsOpen] = useState(isPreview);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positionClass = settings.position === 'left' ? 'left-6' : 'right-6';
  const originClass = settings.position === 'left' ? 'origin-bottom-left' : 'origin-bottom-right';

  const toggleWidget = () => {
    if (isPreview) return;
    setIsOpen(!isOpen);
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleSubmitSuccess = () => setIsSubmitted(true);

  return (
    <>
      <button
        onClick={toggleWidget}
        style={{ backgroundColor: settings.accentColor }}
        className={`${isPreview ? 'absolute' : 'fixed'} bottom-6 ${positionClass} text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform transform hover:scale-110`}
        aria-label={isOpen ? "Close Feedback Widget" : "Open Feedback Widget"}
        disabled={isPreview}
      >
        {/* ✅ Use Lucide icons */}
        {isPreview ? (
          <MessageSquare size={28} />
        ) : isOpen ? (
          <X size={28} />
        ) : (
          <MessageSquare size={28} />
        )}
      </button>

      {isOpen && (
        <div
          style={{ maxWidth: `${settings.width}px` }}
          className={`${isPreview ? 'absolute' : 'fixed'} bottom-24 ${positionClass} w-full bg-white rounded-2xl shadow-2xl flex flex-col z-40 ${originClass} transition-all duration-300 ease-in-out transform animate-fade-in-up`}
        >
          <header style={{ backgroundColor: settings.accentColor }} className="text-white p-4 rounded-t-2xl flex justify-between items-center">
            <h2 className="text-lg font-semibold">{settings.headerText}</h2>
          </header>

          <div className="p-6 overflow-y-auto">
            {isSubmitted && !isPreview ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800">Thank You!</h3>
                <p className="text-gray-600 mt-2">Your feedback has been received.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 font-semibold hover:underline"
                  style={{ color: settings.accentColor }}
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <>
                <p className="text-center text-gray-600 mb-6">{settings.subheaderText}</p>
                <FeedbackForm
                  onSubmitSuccess={handleSubmitSuccess}
                  rateExperienceText={settings.rateExperienceText}
                  perfect10Question={settings.perfect10Question}
                  perfect10Placeholder={settings.perfect10Placeholder}
                  changeRemoveQuestion={settings.changeRemoveQuestion}
                  changeRemovePlaceholder={settings.changeRemovePlaceholder}
                  accentColor={settings.accentColor}
                />
              </>
            )}
          </div>

          <style>{`
            @keyframes fade-in-up {
              0% { opacity: 0; transform: translateY(20px) scale(0.95); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fade-in-up {
              animation: fade-in-up 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;
