import React from 'react';
import { FaCube, FaBook, FaFileAlt } from 'react-icons/fa';

const FeatureCard = ({ icon, title, text }) => (
  // Updated card colors
  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center shadow-lg">
    <div className="text-indigo-500 dark:text-indigo-400 mb-4 inline-block">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{text}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Quizzy comes with amazing{' '}
          <span className="text-green-500 dark:text-green-400">features</span> like:
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FaCube size={40} />}
            title="3D Coverage"
            text="3 dimensional coverage of all questions related to a particular topic"
          />
          <FeatureCard
            icon={<FaBook size={40} />}
            title="Plenty of subjects"
            text="Plenty of subjects to choose from for e.g. Computer languages, engineering subjects etc."
          />
          <FeatureCard
            icon={<FaFileAlt size={40} />}
            title="Detailed solutions"
            text="Detailed explanation of a solution is provided to get depper understanding of a topic"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;