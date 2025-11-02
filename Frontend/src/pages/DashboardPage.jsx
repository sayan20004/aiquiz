import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function DashboardPage() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ... (handleFileChange and handleStartQuiz functions remain the same) ...

  const inputStyles =
    'w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';
  const labelStyles = 'block text-sm font-medium text-gray-700 dark:text-gray-300 text-left';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Create a New Quiz</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Upload a PDF and let AI generate a quiz for you.
        </p>

        <form
          onSubmit={handleStartQuiz}
          className="space-y-6 bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <div>
            <label htmlFor="topic" className={labelStyles}>
              Quiz Topic
            </label>
            <input
              type="text"
              id="topic"
              placeholder="e.g., JavaScript Fundamentals"
              className={`${inputStyles} mt-1`}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="file" className={labelStyles}>
              Upload PDF Notes
            </label>
            <input
              type="file"
              id="file"
              accept=".pdf"
              className={`${inputStyles} mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500`}
              onChange={handleFileChange}
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="questionCount" className={labelStyles}>
                Number of Questions
              </label>
              <select
                id="questionCount"
                className={`${inputStyles} mt-1`}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="difficulty" className={labelStyles}>
                Difficulty
              </label>
              <select
                id="difficulty"
                className={`${inputStyles} mt-1`}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Start AI Quiz'}
          </button>
        </form>

        <Link
          to="/"
          className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mt-8 inline-block"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}