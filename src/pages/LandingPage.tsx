'use client';
import React from 'react';

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="text-blue-600 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);


const LandingPage: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Turn Customer Feedback into Sustainable Growth
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                        FeedlyBot is the all-in-one platform to collect, analyze, and act on user feedback. Engage your customers and build better products.
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <button className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Get Started for Free
                        </button>
                        <button className="bg-white text-gray-800 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition-all duration-300 border border-gray-300 transform hover:scale-105">
                            Request a Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">Why FeedlyBot?</h2>
                        <p className="mt-4 text-lg text-gray-600">Everything you need to understand your customers.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard title="Customizable Widgets" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688 0-1.25-.562-1.25-1.25s.562-1.25 1.25-1.25m0 2.5a1.25 1.25 0 000-2.5m-3.75 0H5.25m9 0h-1.34M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                            Create beautiful feedback widgets that match your brand. Customize questions, colors, and placement with a no-code editor.
                        </FeatureCard>
                        <FeatureCard title="AI-Powered Analytics" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 1.5m-2-1.5V4.5a2.25 2.25 0 012.25-2.25h3.75a2.25 2.25 0 012.25 2.25v4.5m0 0l-1 1.5m-2-1.5h-5.25m0 0l-1-1.5m2 1.5v3.75a3 3 0 01-3 3H6a3 3 0 01-3-3V9.75l1-1.5" /></svg>}>
                            Go beyond ratings. Our AI analyzes comments to identify trends, sentiment, and key topics, giving you actionable insights instantly.
                        </FeatureCard>
                        <FeatureCard title="Email Automation" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.625a2.25 2.25 0 01-2.36 0l-7.5-4.625A2.25 2.25 0 013 6.993V6.75" /></svg>}>
                            Close the loop with customers. Use our AI assistant to craft professional emails and automatically follow up with users based on their feedback.
                        </FeatureCard>
                    </div>
                </div>
            </section>
            
            {/* Demo Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold">See It in Action</h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Click the feedback button in the bottom-right corner to see how easy it is to collect feedback with our widget.</p>
                    </div>
                </div>
            </section>

             {/* CTA Section */}
            <section className="bg-blue-600">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Elevate Your Customer Experience?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
                        Join hundreds of businesses building better products with FeedlyBot. Start for free, no credit card required.
                    </p>
                    <div className="mt-8">
                        <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-md hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Start Your Free Trial
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
