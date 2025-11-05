import React from 'react';
import Header from './Header';
import Footer from './Footer';

const AboutPage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header at the top */}
            <Header />

            {/* Main content */}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">About FeedlyBot</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Our mission is to help businesses build better products by listening to their customers.
                    </p>
                </div>

                <div className="mt-12 max-w-4xl mx-auto text-gray-700 space-y-6">
                    <p>
                        FeedlyBot was founded on a simple principle: the best way to improve is to listen. In today's competitive landscape, understanding user needs is not just an advantage; it's a necessity. We saw countless businesses struggling to gather meaningful feedback, getting lost in messy spreadsheets, or using clunky tools that annoyed their customers.
                    </p>
                    <p>
                        We decided to build a better way. A way that was simple for businesses to set up, intuitive for customers to use, and powerful enough to deliver real, actionable insights. That's how FeedlyBot was born.
                    </p>
                    <p>
                        Our platform combines elegant design with powerful AI to transform raw feedback into a clear roadmap for growth. We're passionate about helping our clients close the loop with their users, foster loyalty, and ultimately, build products that people love.
                    </p>
                </div>
            </main>

            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
};

export default AboutPage;
