import React from 'react';
import {
  FaBook,
  FaCheck,
  FaArrowUp,
  FaFileLines,
} from 'react-icons/fa6';

const JourneyStep = ({ number, title, text }) => (
  <div>
    <span className="text-5xl font-bold text-indigo-500 dark:text-indigo-400">{number}.</span>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{text}</p>
  </div>
);

const JourneyIcon = ({ icon }) => (
  // Updated icon background
  <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg">
    {icon}
  </div>
);

const LearningJourneySection = () => {
  return (
    // Alternating background color
    <div className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
          Let' checkout your{' '}
          <span className="text-green-500 dark:text-green-400">learning</span> journey
        </h2>
        
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side: Steps */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            <JourneyStep
              number="1"
              title="Choose your subject"
              text="Choose your favourite subject from the vast selection of subjects and continue your journey"
            />
            <JourneyStep
              number="2"
              title="Select the difficulty"
              text="Select difficulty of your choice and get the difficulty of questions according to your difficulty"
            />
            <JourneyStep
              number="3"
              title="Increasing difficulty"
              text="Difficulty of questions will increase for the upcoming question perspective of result of a previous question"
            />
            <JourneyStep
              number="4"
              title="Detailed overview of scores"
              text="Get the detailed overview of your question answer session and tips on how you can improve"
            />
          </div>
          
          {/* Right Side: Decorative Icons */}
          <div className="hidden md:flex md:w-1/3 flex-col items-center justify-around space-y-10 pl-10">
            <JourneyIcon icon={<FaBook size={30} className="text-indigo-500 dark:text-indigo-400" />} />
            <JourneyIcon icon={<FaCheck size={30} className="text-green-500 dark:text-green-400" />} />
            <JourneyIcon icon={<FaArrowUp size={30} className="text-indigo-500 dark:text-indigo-400" />} />
            <JourneyIcon icon={<FaFileLines size={30} className="text-green-500 dark:text-green-400" />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningJourneySection;