import express from 'express';
import cors from 'cors'; // <-- Import cors
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js'; // <-- Make sure this is imported
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// --- Add CORS Middleware ---
// Option 1: Allow all origins (simpler for testing)
app.use(cors());

// Option 2: Allow only your specific Vercel frontend URL (more secure for production)
/*
const frontendURL = 'YOUR_VERCEL_FRONTEND_URL'; // Replace with your actual Vercel URL
app.use(cors({
  origin: frontendURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
*/
// ---

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes); // <-- Make sure this line exists

app.use(notFound);
app.use(errorHandler);

export default app;