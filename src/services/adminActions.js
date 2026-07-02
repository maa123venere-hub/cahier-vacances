import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase/config.js';

const functions = getFunctions(app, 'europe-west1');

export async function adminDeleteUser(uid) {
  const call = httpsCallable(functions, 'adminDeleteUser');
  return (await call({ uid })).data;
}

export async function adminResetProgress(uid) {
  const call = httpsCallable(functions, 'adminResetProgress');
  return (await call({ uid })).data;
}

export async function adminSendMessage(uid, text) {
  const call = httpsCallable(functions, 'adminSendMessage');
  return (await call({ uid, text })).data;
}

export async function adminBroadcastNotification(title, text) {
  const call = httpsCallable(functions, 'adminBroadcastNotification');
  return (await call({ title, text })).data;
}
