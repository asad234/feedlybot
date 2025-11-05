import React from 'react';
import { FeedbackSubmission } from '@/types';

interface DashboardOverviewProps {
  onLogout: () => void;
}

const StatCard = ({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                 <p className="text-sm text-green-500 mt-2">{change}</p>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                {icon}
            </div>
        </div>
    </div>
);


const mockRecentFeedback: FeedbackSubmission[] = [
    { id: 1, rating: 9, perfect10: "The onboarding was seamless!", changeRemove: "Nothing, it was great.", date: "2024-07-29", email: "user1@example.com" },
    { id: 2, rating: 5, perfect10: "Faster loading times.", changeRemove: "The dashboard is a bit confusing.", date: "2024-07-29", email: "user2@example.com" },
    { id: 3, rating: 10, perfect10: "I love the new AI feature!", changeRemove: "", date: "2024-07-28", email: "user3@example.com" },
    { id: 4, rating: 7, perfect10: "More customization options for the widget.", changeRemove: "The pricing page is a little vague.", date: "2024-07-28", email: "user4@example.com" },
];

const mockRatingData = [
    { rating: 1, count: 5 }, { rating: 2, count: 3 }, { rating: 3, count: 8 }, { rating: 4, count: 12 }, { rating: 5, count: 25 },
    { rating: 6, count: 30 }, { rating: 7, count: 55 }, { rating: 8, count: 120 }, { rating: 9, count: 250 }, { rating: 10, count: 410 },
];


const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onLogout }) => {
    const totalResponses = mockRatingData.reduce((sum, item) => sum + item.count, 0);
    const maxCount = Math.max(...mockRatingData.map(d => d.count));

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Responses" value={totalResponses.toLocaleString()} change="+12% this month" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>} />
                <StatCard title="Avg. Rating" value="8.2 / 10" change="+0.5 this month" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>} />
                <StatCard title="Emails Sent" value="480" change="+25% this month" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
                <StatCard title="NPS Score" value="+45" change="+5 this month" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Feedback Ratings Distribution</h2>
                    <div className="flex items-end h-64 space-x-2 pt-4 border-t">
                        {mockRatingData.map(data => (
                            <div key={data.rating} className="flex-1 flex flex-col items-center justify-end">
                                <div 
                                    className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors"
                                    style={{ height: `${(data.count / maxCount) * 100}%` }}
                                    title={`Rating ${data.rating}: ${data.count} responses`}
                                ></div>
                                <span className="text-xs font-medium text-gray-600 mt-1">{data.rating}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Feedback</h2>
                    <ul className="space-y-4">
                        {mockRecentFeedback.map(fb => (
                            <li key={fb.id} className="border-b pb-3 last:border-b-0">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-700 truncate pr-2">{fb.email}</p>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${fb.rating >= 8 ? 'bg-green-100 text-green-800' : fb.rating >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {fb.rating}/10
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 italic">"{fb.perfect10 || fb.changeRemove}"</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
