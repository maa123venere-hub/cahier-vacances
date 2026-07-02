import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';
import { chatWithAI } from '../services/aiChat.js';
import { todayKey } from '../utils/date.js';

export function useAssistantChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'assistant', 'chat');
    const unsubscribe = onSnapshot(ref, (snap) => {
      setMessages(snap.exists() ? snap.data().messages || [] : []);
    });
    return unsubscribe;
  }, [user]);

  function persist(next) {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'assistant', 'chat');
    setDoc(ref, { messages: next, updatedAt: new Date().toISOString() }, { merge: true }).catch(() => {});
  }

  async function sendMessage(text) {
    if (!text.trim() || busy) return;
    setError('');
    const userMsg = { role: 'user', content: text, ts: todayKey() };
    const withUser = [...messages, userMsg];
    setMessages(withUser);
    persist(withUser);
    setBusy(true);
    try {
      const reply = await chatWithAI(withUser);
      const withReply = [...withUser, { role: 'assistant', content: reply }];
      setMessages(withReply);
      persist(withReply);
    } catch (err) {
      setError("L'assistant n'a pas pu répondre. Réessaie dans un instant.");
    } finally {
      setBusy(false);
    }
  }

  return { messages, sendMessage, busy, error };
}
