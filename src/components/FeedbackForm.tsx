'use client';
import React, { useState } from 'react';

interface FeedbackFormProps {
  onSubmitSuccess: () => void;
  rateExperienceText: string;
  perfect10Question: string;
  perfect10Placeholder: string;
  changeRemoveQuestion: string;
  changeRemovePlaceholder: string;
  accentColor: string;
}


const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
    onSubmitSuccess,
    rateExperienceText,
    perfect10Question,
    perfect10Placeholder,
    changeRemoveQuestion,
    changeRemovePlaceholder,
    accentColor,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [perfect10, setPerfect10] = useState('');
  const [changeRemove, setChangeRemove] = useState('');

  const handleRatingClick = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) {
        alert("Please select a rating.");
        return;
    }
    console.log({
      rating,
      perfect10,
      changeRemove,
    });
    // Reset form
    setRating(null);
    setPerfect10('');
    setChangeRemove('');
    onSubmitSuccess();
  };
  
  const focusRingClass = `focus:ring-2 focus:ring-offset-2`;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-md font-semibold text-gray-800 mb-3">{rateExperienceText}</label>
          <div className="flex justify-between items-center space-x-1">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => handleRatingClick(num)}
                className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none ${focusRingClass}`}
                style={{ 
                    backgroundColor: rating === num ? accentColor : '', 
                    color: rating === num ? 'white' : '',
                    boxShadow: rating === num ? `0 0 0 2px ${accentColor}` : 'none',
                    borderColor: accentColor,
                }}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
            <span>Terrible</span>
            <span>Amazing</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="perfect10" className="block text-md font-semibold text-gray-800 mb-2">
            {perfect10Question}
          </label>
          <textarea
            id="perfect10"
            rows={3}
            value={perfect10}
            onChange={(e) => setPerfect10(e.target.value)}
            placeholder={perfect10Placeholder}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-shadow duration-200"
            style={{'--tw-ring-color': accentColor} as React.CSSProperties}
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="changeRemove" className="block text-md font-semibold text-gray-800 mb-2">
            {changeRemoveQuestion}
          </label>
          <textarea
            id="changeRemove"
            rows={3}
            value={changeRemove}
            onChange={(e) => setChangeRemove(e.target.value)}
            placeholder={changeRemovePlaceholder}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:border-transparent transition-shadow duration-200"
            style={{'--tw-ring-color': accentColor} as React.CSSProperties}
          ></textarea>
        </div>

        <button
          type="submit"
          style={{ backgroundColor: accentColor }}
          className="w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
