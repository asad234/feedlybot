import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PricingTier = ({
  title,
  price,
  description,
  features,
  popular = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}) => (
  <div
    className={`border rounded-lg p-8 flex flex-col relative ${
      popular ? 'border-blue-500' : 'border-gray-300'
    }`}
  >
    {popular && (
      <div className="absolute top-0 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
        Most Popular
      </div>
    )}
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="mt-2 text-gray-600">{description}</p>
    <div className="mt-6">
      <span className="text-4xl font-extrabold">{price}</span>
      <span className="text-lg font-medium text-gray-500">/month</span>
    </div>
    <ul className="mt-8 space-y-4 text-gray-600 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg
            className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button
      className={`mt-8 w-full py-3 rounded-md font-semibold transition ${
        popular
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
      }`}
    >
      Get Started
    </button>
  </div>
);

const PricingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header at the top */}
      <Header />

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that's right for your business.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingTier
            title="Starter"
            price="$0"
            description="For individuals and small projects."
            features={[
              '1 Widget',
              '100 Responses/mo',
              'Basic Analytics',
              'Email Support',
            ]}
          />

          <PricingTier
            title="Pro"
            price="$49"
            description="For growing businesses that need more power."
            features={[
              'Unlimited Widgets',
              '5,000 Responses/mo',
              'AI-Powered Insights',
              'Email Automation',
              'Priority Support',
            ]}
            popular={true}
          />

          <PricingTier
            title="Enterprise"
            price="Custom"
            description="For large organizations with advanced needs."
            features={[
              'Everything in Pro',
              'Unlimited Responses',
              'Advanced Security',
              'Dedicated Account Manager',
              'Custom Integrations',
            ]}
          />
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default PricingPage;
