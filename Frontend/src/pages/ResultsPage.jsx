import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function ResultsPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState({});

  // ... (useEffect and toggleExplanation functions remain the same) ...

  const getOptionClass = (question, option) => {
    // Base styles for an option
    const base = 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    if (!results?.userAnswers) return base; 

    const isCorrect = option.isCorrect;
    const userAnswerId = results.userAnswers[question._id.toString()]; 
    const isUserAnswer = userAnswerId === option._id.toString();

    // Correct answer
    if (isCorrect) return 'bg-green-100 dark:bg-green-800 ring-2 ring-green-500 text-green-900 dark:text-white';
    // User's wrong answer
    if (isUserAnswer && !isCorrect) return 'bg-red-100 dark:bg-red-800 ring-2 ring-red-500 text-red-900 dark:text-white';
    // Any other (unselected) option
    return base;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <h1 className="text-3xl">Loading Results...</h1>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <h1 className="text-3xl">Results not found.</h1>
         <Link to="/dashboard" className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-300 ml-4">
            Go to Dashboard
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Quiz Results</h1>
        <h2 className="text-2xl text-indigo-600 dark:text-indigo-400 text-center mb-8">
          {results.topic}
        </h2>

        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-2xl mb-8 text-center">
          <h3 className="text-xl text-gray-500 dark:text-gray-400 mb-2">Your Score</h3>
          <p className="text-6xl font-bold text-gray-900 dark:text-white">
            {results.score} / {results.questions.length}
          </p>
        </div>

        <div className="space-y-6">
          {results.questions.map((question, index) => (
            <div
              key={question._id}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">
                {index + 1}. {question.questionText}
              </h3>
              <div className="space-y-3 mb-4">
                {question.options.map((option) => (
                  <div
                    key={option._id}
                    className={`p-3 rounded-md ${getOptionClass(
                      question,
                      option
                    )}`}
                  >
                    {option.text}
                  </div>
                ))}
              </div>

              <button
                onClick={() => toggleExplanation(question._id)}
                className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
              >
                {showExplanation[question._id]
                  ? 'Hide Explanation'
                  : 'Show Explanation'}
              </button>

              {showExplanation[question._id] && (
                <div className="mt-3 p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300">
                   {question.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Create Another Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}