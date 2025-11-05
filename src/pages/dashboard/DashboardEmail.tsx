'use client';
import React, { useState } from 'react';
import { generateEmail } from '@/services/geminiService';
import ConfirmationDialog from '@/components/ConfirmationDialog';

const mockSubscribers = [
  "zara.day@example.com",
  "john.doe@example.com",
  "alice.smith@example.com",
  "bob.johnson@example.com",
  "carol.white@example.com",
  "dave.brown@example.com",
  "eve.green@example.com",
  "frank.black@example.com",
];

const DashboardEmail: React.FC = () => {
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedEmails(mockSubscribers);
        } else {
            setSelectedEmails([]);
        }
    };
    const handleSelectEmail = (e: React.ChangeEvent<HTMLInputElement>, email: string) => {
        if (e.target.checked) {
            setSelectedEmails([...selectedEmails, email]);
        } else {
            setSelectedEmails(selectedEmails.filter(se => se !== email));
        }
    };

    const handleGenerateEmail = async () => {
        if (!aiPrompt) return;
        setIsGenerating(true);
        setSubject('');
        setBody('Generating with AI...');
        const generatedContent = await generateEmail(aiPrompt);
        
        const subjectMatch = generatedContent.match(/Subject: (.*)/);
        const emailSubject = subjectMatch ? subjectMatch[1] : 'Your Update from FeedlyBot';
        const emailBody = generatedContent.replace(/Subject: .*\n*/, '').trim();

        setSubject(emailSubject);
        setBody(emailBody);
        setIsGenerating(false);
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedEmails.length === 0 || !subject.trim() || !body.trim()) return;
        setIsConfirming(true);
    };

    const handleConfirmSend = () => {
        console.log(`Sending email with subject "${subject}" to ${selectedEmails.length} recipients.`);
        // Here, you would typically make an API call to your backend to send the emails.
        setIsConfirming(false);
        alert('Your email has been sent!');
        // Optionally reset state after sending
        setSubject('');
        setBody('');
        setSelectedEmails([]);
        setAiPrompt('');
    };


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Email Marketing</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Subscriber List */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow h-fit">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-3">Recipients</h2>
                    <div className="flex items-center mb-3">
                        <input type="checkbox" id="selectAll" onChange={handleSelectAll} checked={selectedEmails.length > 0 && selectedEmails.length === mockSubscribers.length} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <label htmlFor="selectAll" className="ml-2 block text-sm font-medium text-gray-700">Select All</label>
                    </div>
                    <div className="max-h-96 overflow-y-auto space-y-2">
                        {mockSubscribers.map(email => (
                            <div key={email} className="flex items-center">
                                <input type="checkbox" id={email} checked={selectedEmails.includes(email)} onChange={(e) => handleSelectEmail(e, email)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                <label htmlFor={email} className="ml-2 block text-sm text-gray-600 truncate">{email}</label>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Email Composer */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Compose Email</h2>
                    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                        <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-700 mb-1">✨ AI Assistant</label>
                        <p className="text-xs text-gray-500 mb-2">Describe the email you want to send. e.g., "Announce a new feature called 'AI Insights' and offer a 10% discount."</p>
                        <div className="flex space-x-2">
                           <input
                            type="text"
                            id="ai-prompt"
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Tell the AI what to write..."
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            disabled={isGenerating}
                            />
                            <button onClick={handleGenerateEmail} disabled={isGenerating || !aiPrompt} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                                {isGenerating ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                             <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                             <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                            <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} rows={10} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                        <button type="submit" disabled={selectedEmails.length === 0 || !subject.trim() || !body.trim()} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Send Email to {selectedEmails.length} recipient(s)
                        </button>
                    </form>
                </div>
            </div>
            
            <ConfirmationDialog
                isOpen={isConfirming}
                onClose={() => setIsConfirming(false)}
                onConfirm={handleConfirmSend}
                title="Confirm Email Send"
            >
                <p className="text-sm text-gray-600">
                    Are you sure you want to send this email?
                </p>
                <div className="mt-4 space-y-2 text-sm bg-gray-50 p-3 rounded-md border">
                    <p><strong className="font-medium text-gray-800">Recipients:</strong> {selectedEmails.length}</p>
                    <p><strong className="font-medium text-gray-800">Subject:</strong> {subject}</p>
                </div>
            </ConfirmationDialog>
        </div>
    );
};

export default DashboardEmail;
