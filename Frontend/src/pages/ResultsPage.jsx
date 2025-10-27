import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function ResultsPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Not authorized.');
        navigate('/');
        return;
      }

      try {
        const res = await axios.get(`/api/quiz/${quizId}/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'Failed to load results.'
        );
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [quizId, navigate]);

  const toggleExplanation = (id) => {
    setShowExplanation((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getOptionClass = (question, option) => {
    const isCorrect = option.isCorrect;
    const userAnswerId = results.userAnswers[question._id];
    const isUserAnswer = userAnswerId === option._id;

    if (isCorrect) return 'bg-green-800 ring-2 ring-green-500';
    if (isUserAnswer && !isCorrect)
      return 'bg-red-800 ring-2 ring-red-500';
    return 'bg-gray-700';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-3xl">Loading Results...</h1>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-3xl">Results not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Quiz Results</h1>
        <h2 className="text-2xl text-indigo-400 text-center mb-8">
          {results.topic}
        </h2>

        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl mb-8 text-center">
          <h3 className="text-xl text-gray-400 mb-2">Your Score</h3>
          <p className="text-6xl font-bold text-white">
            {results.score} / {results.questions.length}
          </p>
        </div>

        <div className="space-y-6">
          {results.questions.map((question, index) => (
            <div
              key={question._id}
              className="bg-gray-800 p-6 rounded-lg"
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
                className="text-indigo-400 text-sm font-medium"
              >
                {showExplanation[question._id]
                  ? 'Hide Explanation'
                  : 'Show Explanation'}
              </button>

              {showExplanation[question._id] && (
                <div className="mt-3 p-4 bg-gray-700 rounded-md">
                  <p className="text-gray-300">{question.explanation}</p>
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