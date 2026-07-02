import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase/config.js';

const functions = getFunctions(app, 'europe-west1');

export async function chatWithAI(messages) {
  const call = httpsCallable(functions, 'chatWithAI');
  const { data } = await call({ messages });
  return data.reply;
}
