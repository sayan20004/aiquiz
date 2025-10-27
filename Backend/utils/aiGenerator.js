import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-latest',
});

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export const generateQuizFromPDFText = async (
  text,
  topic,
  questionCount,
  difficulty
) => {
  const prompt = `
    Based *only* on the following text content from a document about "${topic}", create a multiple-choice quiz.
    
    Rules:
    1.  Generate exactly ${questionCount} questions.
    2.  The difficulty level must be ${difficulty}.
    3.  Each question must have 4 options.
    4.  Exactly one option must be correct.
    5.  You MUST provide a brief explanation for *why* the correct answer is right, based on the text.
    
    Respond with ONLY a valid JSON object in the following format:
    {
      "questions": [
        {
          "questionText": "What is the main topic?",
          "options": [
            { "text": "Option 1", "isCorrect": false },
            { "text": "Option 2", "isCorrect": true },
            { "text": "Option 3", "isCorrect": false },
            { "text": "Option 4", "isCorrect": false }
          ],
          "explanation": "This is the correct answer because the text states..."
        }
      ]
    }
    
    Here is the text content:
    ---
    ${text}
    ---
  `;

  try {
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const jsonResponse = response.text();
    
    return JSON.parse(jsonResponse);

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate quiz from AI');
  }
};