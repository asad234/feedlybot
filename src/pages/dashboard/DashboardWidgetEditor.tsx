'use client';
import React, { useState, useMemo, useEffect } from 'react';
import FeedbackWidget from '@/components/FeedbackWidget';
import { WidgetSettings } from '@/types';

const initialSettings: WidgetSettings = {
    accentColor: '#2563EB',
    position: 'right',
    headerText: 'Share Your Feedback',
    subheaderText: 'Help us improve your experience',
    rateExperienceText: 'Rate your experience',
    perfect10Question: 'What would make this a perfect 10?',
    perfect10Placeholder: 'Tell us what would make your experience perfect...',
    changeRemoveQuestion: 'What would you change or remove?',
    changeRemovePlaceholder: "Tell us what you'd like to see improved...",
    width: 384,
};

const DashboardWidgetEditor: React.FC = () => {
    const [settings, setSettings] = useState<WidgetSettings>(initialSettings);
    const [savedSettings, setSavedSettings] = useState<WidgetSettings>(initialSettings);
    const [showSuccess, setShowSuccess] = useState(false);

    const hasChanges = useMemo(() => JSON.stringify(settings) !== JSON.stringify(savedSettings), [settings, savedSettings]);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setSettings({ 
            ...settings, 
            [name]: type === 'range' ? parseInt(value, 10) : value 
        });
    };

    const handleSave = () => {
        setSavedSettings(settings);
        setShowSuccess(true);
        console.log("Settings saved:", settings);
    };
    
    const handleReset = () => {
        setSettings(savedSettings);
    };

    const InputField = ({ label, name, value }: { label: string, name: keyof Omit<WidgetSettings, 'width' | 'position' | 'accentColor'>, value: string }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input 
                type="text" 
                name={name} 
                value={value} 
                onChange={handleSettingChange} 
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );

    const TextareaField = ({ label, name, value }: { label: string, name: keyof Omit<WidgetSettings, 'width' | 'position' | 'accentColor'>, value: string }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea 
                name={name} 
                value={value} 
                onChange={handleSettingChange} 
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Widget Editor</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls Panel */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow h-fit">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-3">Customize</h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
                        <input type="color" name="accentColor" value={settings.accentColor} onChange={handleSettingChange} className="w-full h-10 p-1 border border-gray-300 rounded-md" />
                    </div>
                     <div className="mb-4">
                        <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Widget Width ({settings.width}px)</label>
                        <input 
                            type="range" 
                            name="width" 
                            id="width"
                            min="320" 
                            max="500" 
                            value={settings.width} 
                            onChange={handleSettingChange} 
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                     <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                        <select name="position" value={settings.position} onChange={handleSettingChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            <option value="right">Bottom Right</option>
                            <option value="left">Bottom Left</option>
                        </select>
                    </div>
                    <InputField label="Header Text" name="headerText" value={settings.headerText} />
                    <InputField label="Subheader Text" name="subheaderText" value={settings.subheaderText} />
                    <InputField label="Rating Question" name="rateExperienceText" value={settings.rateExperienceText} />
                    <InputField label="'Perfect 10' Question" name="perfect10Question" value={settings.perfect10Question} />
                    <TextareaField label="'Perfect 10' Placeholder" name="perfect10Placeholder" value={settings.perfect10Placeholder} />
                    <InputField label="'Change/Remove' Question" name="changeRemoveQuestion" value={settings.changeRemoveQuestion} />
                    <TextareaField label="'Change/Remove' Placeholder" name="changeRemovePlaceholder" value={settings.changeRemovePlaceholder} />

                    <div className="mt-6 border-t pt-4">
                        <div className="flex items-center justify-between">
                             <div className="flex space-x-2">
                                <button
                                    onClick={handleSave}
                                    disabled={!hasChanges}
                                    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={handleReset}
                                    disabled={!hasChanges}
                                    className="bg-white text-gray-700 font-semibold px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                >
                                    Reset
                                </button>
                            </div>
                            {showSuccess && (
                                <span className="text-sm font-medium text-green-600">
                                    Saved successfully!
                                </span>
                            )}
                        </div>
                    </div>

                </div>

                {/* Live Preview Panel */}
                <div className="lg:col-span-2">
                    <div className="sticky top-8">
                         <div className="relative min-h-[650px] bg-gray-200 rounded-lg p-4 border flex items-center justify-center overflow-hidden">
                            <div className="absolute top-4 text-center text-gray-500 font-semibold">Live Preview</div>
                            {/* The widget is positioned absolutely within this relative container */}
                            <FeedbackWidget key={`${settings.position}-${settings.width}`} settings={settings} isPreview={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardWidgetEditor;
