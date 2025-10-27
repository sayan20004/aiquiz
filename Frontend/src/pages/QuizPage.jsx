import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        toast.error('Not authorized.');
        navigate('/');
        return;
      }

      try {
        const res = await axios.get(`/api/quiz/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(res.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || 'Failed to load quiz.'
        );
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId, navigate]);

  const handleSelectAnswer = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const unanswered = quiz.questions.filter(
      (q) => !selectedAnswers[q._id]
    );
    if (unanswered.length > 0) {
      toast.error(
        `Please answer all questions. Missing: ${unanswered.length}`
      );
      return;
    }

    setIsSubmitting(true);
    toast.loading('Submitting your answers...');
    const token = localStorage.getItem('userToken');

    try {
      const res = await axios.post(
        `/api/quiz/${quizId}/submit`,
        { answers: selectedAnswers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.dismiss();
      toast.success(res.data.message);
      navigate(`/quiz/${quizId}/results`);
    } catch (error) {
      toast.dismiss();
      toast.error(
        error.response?.data?.message || 'Failed to submit quiz.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-3xl">Loading Quiz...</h1>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-3xl">Quiz not found.</h1>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestion._id];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">{quiz.topic}</h1>
          <p className="text-gray-400">
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
              className={`w-full p-3 bg-gray-700 rounded-md text-left transition-colors duration-200
                ${
                  selectedOption === option._id
                    ? 'ring-2 ring-indigo-500 bg-indigo-900'
                    : 'hover:bg-gray-600'
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
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md disabled:opacity-50"
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