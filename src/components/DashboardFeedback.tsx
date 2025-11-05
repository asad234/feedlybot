'use client';
import React, { useState, useMemo } from 'react';
import { FeedbackSubmission } from '@/types';

const mockSubmissions: FeedbackSubmission[] = [
    { id: 1, rating: 9, perfect10: "The onboarding was seamless!", changeRemove: "Nothing, it was great.", date: "2024-07-29", email: "zara.day@example.com" },
    { id: 2, rating: 5, perfect10: "Faster loading times.", changeRemove: "The dashboard is a bit confusing.", date: "2024-07-29", email: "john.doe@example.com" },
    { id: 3, rating: 10, perfect10: "I love the new AI feature!", changeRemove: "", date: "2024-07-28", email: "alice.smith@example.com" },
    { id: 4, rating: 3, perfect10: "Better mobile support.", changeRemove: "It was very slow on my phone.", date: "2024-07-28", email: "bob.johnson@example.com" },
    { id: 5, rating: 8, perfect10: "The widget editor is very intuitive.", changeRemove: "Maybe more font options?", date: "2024-07-27", email: "carol.white@example.com" },
    { id: 6, rating: 7, perfect10: "It does the job well.", changeRemove: "The UI could be a bit more modern.", date: "2024-07-27", email: "dave.brown@example.com" },
    { id: 7, rating: 2, perfect10: "I don't know.", changeRemove: "I couldn't figure out how to set it up.", date: "2024-07-26", email: "eve.green@example.com" },
    { id: 8, rating: 9, perfect10: "Fantastic customer support!", changeRemove: "Nothing.", date: "2024-07-26", email: "frank.black@example.com" },
];

const DashboardFeedback: React.FC = () => {
    const [filter, setFilter] = useState('all');

    const filteredSubmissions = useMemo(() => {
        if (filter === 'all') return mockSubmissions;
        if (filter === 'positive') return mockSubmissions.filter(s => s.rating >= 8);
        if (filter === 'neutral') return mockSubmissions.filter(s => s.rating >= 5 && s.rating <= 7);
        if (filter === 'negative') return mockSubmissions.filter(s => s.rating < 5);
        return mockSubmissions;
    }, [filter]);

    const FilterButton = ({ value, label }: {value: string, label: string}) => (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${filter === value ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback Submissions</h1>
             <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex space-x-2 mb-4 border-b pb-4">
                    <FilterButton value="all" label="All" />
                    <FilterButton value="positive" label="Positive (8+)" />
                    <FilterButton value="neutral" label="Neutral (5-7)" />
                    <FilterButton value="negative" label="Negative (<5)" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3 text-center">Rating</th>
                                <th scope="col" className="px-6 py-3">Comment Summary</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubmissions.map(submission => (
                                <tr key={submission.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{submission.email}</td>
                                    <td className="px-6 py-4 text-center">
                                         <span className={`px-2 py-1 text-xs font-bold rounded-full ${submission.rating >= 8 ? 'bg-green-100 text-green-800' : submission.rating >= 5 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {submission.rating}/10
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-w-md truncate">{submission.perfect10 || submission.changeRemove}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{submission.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardFeedback;
