import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config.js';

// E-mails Firebase (vérification, réinitialisation…) envoyés en français
auth.languageCode = 'fr';

// Après le clic sur le lien reçu par e-mail, revenir sur le domaine
// que l'élève utilise (l'app est servie sur plusieurs domaines).
const actionCodeSettings = { url: window.location.origin };

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [niveau, setNiveau] = useState(null);
  // Vérification de l'adresse e-mail — état séparé car user.reload() mute
  // l'objet en place sans déclencher de re-render React.
  const [emailVerified, setEmailVerified] = useState(false);
  // Subject axis (matière): 'francais' (default) or 'maths'. Persisted locally as a UI preference.
  const [matiere, setMatiereState] = useState(() => {
    try { return localStorage.getItem('matiere2k26') || 'francais'; } catch { return 'francais'; }
  });
  const [loading, setLoading] = useState(true);

  function setMatiere(m) {
    setMatiereState(m);
    try { localStorage.setItem('matiere2k26', m); } catch { /* ignore */ }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setEmailVerified(!!u?.emailVerified);
      if (u) {
        try {
          const snap = await getDoc(doc(db, 'users', u.uid));
          setNiveau(snap.exists() ? (snap.data().niveau ?? null) : null);
        } catch {
          setNiveau(null);
        }
      } else {
        setNiveau(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signUp(email, password, displayName) {
    const pendingGrade = sessionStorage.getItem('pendingGrade') ?? null;
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    // Envoi automatique de l'e-mail de vérification (non bloquant si l'envoi échoue :
    // l'écran de vérification permet de renvoyer).
    sendEmailVerification(cred.user, actionCodeSettings).catch(() => {});
    await setDoc(doc(db, 'users', cred.user.uid), {
      email,
      displayName: displayName || '',
      niveau: pendingGrade,
      createdAt: serverTimestamp(),
    });
    setNiveau(pendingGrade);
    if (pendingGrade) sessionStorage.removeItem('pendingGrade');
    return cred.user;
  }

  async function signIn(email, password, rememberMe = true) {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  }

  function logOut() {
    return firebaseSignOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email, actionCodeSettings);
  }

  // Renvoyer l'e-mail de vérification à l'utilisateur connecté
  function sendVerification() {
    if (!auth.currentUser) return Promise.reject(new Error('no-user'));
    return sendEmailVerification(auth.currentUser, actionCodeSettings);
  }

  // Recharger l'utilisateur depuis Firebase pour rafraîchir emailVerified
  // (appelé après que l'élève a cliqué le lien reçu par e-mail).
  async function refreshUser() {
    if (!auth.currentUser) return false;
    try {
      await auth.currentUser.reload();
      const verified = !!auth.currentUser.emailVerified;
      setEmailVerified(verified);
      return verified;
    } catch {
      return false;
    }
  }

  const value = {
    user, niveau, matiere, setMatiere, loading,
    emailVerified, sendVerification, refreshUser,
    signUp, signIn, logOut, resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
