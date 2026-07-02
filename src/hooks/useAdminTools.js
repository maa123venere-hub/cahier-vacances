import { useEffect, useState } from 'react';
import {
  collection, doc, addDoc, setDoc, deleteDoc, getDocs,
  orderBy, query, limit, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAdminUsers } from './useAdminUsers.js';
import { adminSendMessage, adminBroadcastNotification } from '../services/adminActions.js';
import { useAnnouncements } from './useAnnouncements.js';

export function useAdminTools() {
  const { users } = useAdminUsers();
  const { announcements, removeAnnouncement } = useAnnouncements();
  const [challenges, setChallenges] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [chSnap, badSnap] = await Promise.all([
          getDocs(query(collection(db, 'challenges'), orderBy('createdAt', 'desc'), limit(20))),
          getDocs(query(collection(db, 'badges'), orderBy('createdAt', 'desc'), limit(50))),
        ]);
        setChallenges(chSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setBadges(badSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        // collections may not exist yet — ignore
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Announcements
  async function publishAnnouncement(title, text) {
    await adminBroadcastNotification(title, text);
  }

  // Private message
  async function sendPrivateMessage(uid, text) {
    await adminSendMessage(uid, text);
  }

  // Challenges
  async function addChallenge(title, description, xpReward, endsAt) {
    const ref = await addDoc(collection(db, 'challenges'), {
      title, description, xpReward: Number(xpReward), endsAt,
      createdAt: serverTimestamp(), active: true,
    });
    setChallenges((prev) => [{ id: ref.id, title, description, xpReward, endsAt, active: true }, ...prev]);
  }

  async function toggleChallenge(id, active) {
    await setDoc(doc(db, 'challenges', id), { active: !active }, { merge: true });
    setChallenges((prev) => prev.map((c) => c.id === id ? { ...c, active: !active } : c));
  }

  async function deleteChallenge(id) {
    await deleteDoc(doc(db, 'challenges', id));
    setChallenges((prev) => prev.filter((c) => c.id !== id));
  }

  // Badges — award to a user
  async function awardBadge(uid, label, icon) {
    const ref = await addDoc(collection(db, 'badges'), {
      uid, label, icon, awardedAt: serverTimestamp(), createdAt: serverTimestamp(),
    });
    // Also store on user doc
    await addDoc(collection(db, 'users', uid, 'badges'), { label, icon, awardedAt: serverTimestamp() });
    setBadges((prev) => [{ id: ref.id, uid, label, icon }, ...prev]);
  }

  async function deleteBadge(id) {
    await deleteDoc(doc(db, 'badges', id));
    setBadges((prev) => prev.filter((b) => b.id !== id));
  }

  return {
    users, loading,
    announcements, removeAnnouncement, publishAnnouncement,
    sendPrivateMessage,
    challenges, addChallenge, toggleChallenge, deleteChallenge,
    badges, awardBadge, deleteBadge,
  };
}
