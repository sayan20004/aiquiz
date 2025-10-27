import asyncHandler from 'express-async-handler';
// Use require for pdf-parse
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');
// ---
import Quiz from '../models/quizModel.js';
import { generateQuizFromPDFText } from '../utils/aiGenerator.js';

const generateQuiz = asyncHandler(async (req, res) => {
  const { topic, questionCount, difficulty } = req.body;
  const userId = req.user._id;

  if (!req.file) {
    res.status(400);
    throw new Error('No PDF file uploaded.');
  }

  if (!topic || !questionCount || !difficulty) {
    res.status(400);
    throw new Error('Missing quiz parameters.');
  }

  let pdfText;
  try {
    // Call pdf directly
    const data = await pdf(req.file.buffer);
    pdfText = data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500);
    throw new Error('Failed to read PDF content.');
  }

  if (!pdfText) {
    res.status(400);
    throw new Error('Could not extract text from PDF.');
  }

  // --- AI Generation and Quiz Creation (Keep the rest the same) ---
  const aiResponse = await generateQuizFromPDFText(
    pdfText,
    topic,
    questionCount,
    difficulty
  );

  if (!aiResponse || !aiResponse.questions) {
    res.status(500);
    throw new Error('AI failed to generate quiz in the correct format.');
  }

  const quiz = await Quiz.create({
    user: userId,
    topic,
    questionCount,
    difficulty,
    questions: aiResponse.questions,
  });

  if (quiz) {
    res.status(201).json({
      message: 'Quiz created successfully',
      quizId: quiz._id,
    });
  } else {
    res.status(500);
    throw new Error('Failed to save quiz to database.');
  }
});

// --- Keep getQuizById, submitQuiz, getQuizResults the same ---

const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).select(
    '-questions.options.isCorrect -questions.explanation'
  );

  if (quiz) {
    if (quiz.completed) {
      res.status(400);
      throw new Error('This quiz has already been completed.');
    }
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error('Quiz not found.');
  }
});

const submitQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  const userAnswers = req.body.answers;

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found.');
  }

  if (quiz.completed) {
    res.status(400);
    throw new Error('This quiz has already been submitted.');
  }

  let score = 0;
  const answerMap = new Map();

  quiz.questions.forEach((question) => {
    const questionId = question._id.toString();
    const correctAnswer = question.options
      .find((opt) => opt.isCorrect)
      ._id.toString();
    const userAnswer = userAnswers[questionId];

    answerMap.set(questionId, userAnswer);

    if (userAnswer === correctAnswer) {
      score++;
    }
  });

  quiz.score = score;
  quiz.completed = true;
  quiz.userAnswers = answerMap;

  await quiz.save();

  const populatedQuiz = await Quiz.findById(req.params.id);

  res.status(200).json({
    message: 'Quiz submitted successfully!',
    score: populatedQuiz.score,
    quiz: populatedQuiz,
  });
});

const getQuizResults = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found.');
  }

  if (!quiz.completed) {
    res.status(400);
    throw new Error('This quiz has not been completed yet.');
  }

  if (quiz.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to view these results.');
  }

  res.json(quiz);
});

export { generateQuiz, getQuizById, submitQuiz, getQuizResults };