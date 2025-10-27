import express from 'express';
import {
  generateQuiz,
  getQuizById,
  submitQuiz,
  getQuizResults,
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router
  .route('/generate')
  .post(protect, upload.single('pdfFile'), generateQuiz);

router.route('/:id').get(protect, getQuizById);
router.route('/:id/submit').post(protect, submitQuiz);
router.route('/:id/results').get(protect, getQuizResults);

export default router;