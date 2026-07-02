import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase/config.js';

const functions = getFunctions(app, 'europe-west1');

// Calls the "correctExercise" Cloud Function (functions/index.js), which holds the
// Anthropic API key server-side. Never call the AI provider directly from the browser.
export async function correctExercise({ text, fileUrl, fileType, exerciseLabel, lecon }) {
  const call = httpsCallable(functions, 'correctExercise');
  const { data } = await call({ text, fileUrl, fileType, exerciseLabel, lecon });
  return data; // { note, correction, explanation, suggestedAnswer, weaknesses }
}
