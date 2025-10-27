import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import quizRoutes from './routes/quizRoutes.js'; 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;