import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... (useEffect and helper functions remain the same) ...

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <h1 className="text-3xl">Loading Quiz...</h1>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <h1 className="text-3xl">Quiz not found or already completed.</h1>
         <Link to="/dashboard" className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-300 ml-4">
            Go to Dashboard
         </Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOption = currentQuestion ? selectedAnswers[currentQuestion._id] : undefined;


  if (!currentQuestion) {
     return (
       <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
         <h1 className="text-3xl">Error loading question.</h1>
         <Link to="/dashboard" className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-300 ml-4">
            Go to Dashboard
         </Link>
       </div>
     );
  }


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">{quiz.topic}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-6">
          {currentQuestion.questionText}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option._id}
              onClick={() =>
                handleSelectAnswer(currentQuestion._id, option._id)
              }
              className={`w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-left transition-colors duration-200
                ${
                  selectedOption === option._id
                    ? 'ring-2 ring-indigo-500 bg-indigo-100 dark:bg-indigo-900'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {option.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-bold py-2 px-6 rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-md"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}