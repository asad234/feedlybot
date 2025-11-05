import type { Metadata } from "next";
import "./globals.css";
import FeedbackWidget from "@/components/FeedbackWidget";
import { WidgetSettings } from "@/types";

export const metadata: Metadata = {
  title: "FeedlyBot - Turn Feedback into Growth",
  description: "The smart way to collect feedback and grow your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultWidgetSettings: WidgetSettings = {
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

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 text-gray-800 font-sans">
        {children}
        <FeedbackWidget settings={defaultWidgetSettings} />
      </body>
    </html>
  );
}
