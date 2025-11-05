'use client';
import React, { useState } from 'react';
import { SettingsTab } from '@/types';

const DashboardSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const TabButton = ({ tab, label }: {tab: SettingsTab, label: string}) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 font-medium text-sm rounded-md ${activeTab === tab ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
        >
            {label}
        </button>
    )

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
            <div className="bg-white rounded-lg shadow">
                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="p-4 flex space-x-2 sm:space-x-4 overflow-x-auto">
                        <TabButton tab="profile" label="Profile" />
                        <TabButton tab="billing" label="Billing" />
                        <TabButton tab="notifications" label="Notifications" />
                        <TabButton tab="whats-new" label="What's New" />
                        <TabButton tab="help-support" label="Help & Support" />
                    </nav>
                </div>
                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Information</h2>
                            <form className="space-y-6">
                                {/* Image Upload */}
                                <div className="flex items-center space-x-6">
                                    <div className="shrink-0">
                                        {imagePreview ? (
                                            <img className="h-20 w-20 object-cover rounded-full" src={imagePreview} alt="Current profile photo" />
                                        ) : (
                                            <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
                                                <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            </div>
                                        )}
                                    </div>
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" id="name" defaultValue="John Doe" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Login Email Address</label>
                                        <input type="email" id="email" defaultValue="john.doe@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                                        <input type="text" id="companyName" placeholder="Your Company Inc." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                                        <input type="url" id="website" placeholder="https://yourcompany.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="companyNumber" className="block text-sm font-medium text-gray-700">Company Number</label>
                                        <input type="tel" id="companyNumber" placeholder="+1 (555) 123-4567" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="privateNumber" className="block text-sm font-medium text-gray-700">Private Number</label>
                                        <input type="tel" id="privateNumber" placeholder="+1 (555) 987-6543" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="companyPresentation" className="block text-sm font-medium text-gray-700">Company Presentation</label>
                                        <textarea id="companyPresentation" rows={4} placeholder="Describe your company..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="personalPresentation" className="block text-sm font-medium text-gray-700">Personal Presentation / Bio</label>
                                        <textarea id="personalPresentation" rows={4} placeholder="Tell us about yourself..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Social Links</label>
                                        <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <input type="url" placeholder="Twitter URL" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                                            <input type="url" placeholder="Instagram URL" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                                            <input type="url" placeholder="LinkedIn URL" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t">
                                    <button type="submit" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700">Save All Changes</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {activeTab === 'billing' && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Subscription</h2>
                                <div className="mt-4 bg-gray-50 p-6 rounded-lg border flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <div>
                                        <p className="font-semibold">Current Plan: <span className="text-blue-600">Pro</span></p>
                                        <p className="text-gray-600 text-sm mt-1">$49/month. Renews on August 29, 2024.</p>
                                    </div>
                                    <div className="flex space-x-2 mt-4 sm:mt-0">
                                        <button className="border border-gray-300 bg-white text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-50 text-sm">Change Plan</button>
                                        <button className="text-red-600 hover:text-red-800 font-semibold px-4 py-2 rounded-md text-sm">Cancel Subscription</button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                                <div className="mt-4 bg-gray-50 p-6 rounded-lg border flex justify-between items-center">
                                    <div className="flex items-center">
                                         <svg className="w-10 h-10 text-gray-500 mr-4" viewBox="0 0 38 24"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" fill="#374151"/><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#fff"/><path d="M12 12h14v2H12v-2zM12 16h14v2H12v-2zM7 12h3v6H7v-6z" fill="#374151"/></svg>
                                        <div>
                                            <p className="font-semibold">Visa ending in 4242</p>
                                            <p className="text-gray-600 text-sm">Expires 12/2026</p>
                                        </div>
                                    </div>
                                    <button className="border border-gray-300 bg-white text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-50 text-sm">Update</button>
                                </div>
                            </div>
                             <div>
                                <h2 className="text-xl font-semibold text-gray-800">Billing History</h2>
                                <div className="mt-4 flow-root">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                            <table className="min-w-full divide-y divide-gray-300">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Date</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Download</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    <tr>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">July 29, 2024</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$49.00</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Paid</span></td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"><a href="#" className="text-blue-600 hover:text-blue-900">Download</a></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">June 29, 2024</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">$49.00</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Paid</span></td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"><a href="#" className="text-blue-600 hover:text-blue-900">Download</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'notifications' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Notification Preferences</h2>
                            <form className="space-y-4">
                                <div className="flex items-center">
                                    <input id="weekly-summary" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                                    <label htmlFor="weekly-summary" className="ml-3 block text-sm font-medium text-gray-700">Weekly Summary Email</label>
                                </div>
                                <div className="flex items-center">
                                    <input id="new-feedback" type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                                    <label htmlFor="new-feedback" className="ml-3 block text-sm font-medium text-gray-700">New Feedback Alerts</label>
                                </div>
                                <div>
                                    <button type="submit" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700">Save Preferences</button>
                                </div>
                            </form>
                        </div>
                    )}
                    {activeTab === 'whats-new' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">What's New at FeedlyBot</h2>
                             <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-gray-500">July 25, 2024</p>
                                    <h3 className="text-lg font-semibold mt-1">🚀 New Feature: AI-Powered Insights!</h3>
                                    <p className="text-gray-600 mt-1">Go beyond ratings! Our new AI analysis tool automatically categorizes feedback, detects sentiment, and highlights key trends in your customer comments.</p>
                                </div>
                                 <div className="border-t pt-6">
                                    <p className="text-sm text-gray-500">July 10, 2024</p>
                                    <h3 className="text-lg font-semibold mt-1">🎨 Widget Customization Upgrades</h3>
                                    <p className="text-gray-600 mt-1">We've added more customization options to the widget editor, including new fonts and the ability to add your own logo.</p>
                                </div>
                            </div>
                        </div>
                    )}
                     {activeTab === 'help-support' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Help & Support</h2>
                            <p className="text-gray-600 mb-6">Have a question or need assistance? Fill out the form below, and our team will get back to you shortly.</p>
                            <form className="space-y-4 max-w-lg">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="support-first-name" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input type="text" id="support-first-name" placeholder="John" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="support-last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input type="text" id="support-last-name" placeholder="Doe" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="support-email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="support-email" placeholder="you@example.com" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="support-company-name" className="block text-sm font-medium text-gray-700">Company Name</label>
                                    <input type="text" id="support-company-name" placeholder="Your Company Inc." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="support-message" className="block text-sm font-medium text-gray-700">Messages</label>
                                    <textarea id="support-message" rows={5} placeholder="Describe your issue or question in detail..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700">Send Message</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardSettings;
