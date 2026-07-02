import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';
import { ADMIN_EMAIL } from '../utils/admin.js';

// Two-layer admin check:
//   Layer 1 — Firebase Auth email (fast, client-side)
//   Layer 2 — Firestore `adminRoles/{uid}` doc (server-enforced)
//
// On first login as admin, the Firestore doc is auto-created.
// Firestore rules already enforce admin-only access server-side.

export function useAdminVerify() {
  const { user, loading: authLoading } = useAuth();
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.email !== ADMIN_EMAIL) {
      setVerified(false);
      setChecking(false);
      return;
    }

    // Layer 1 passed — now verify Firestore
    const ref = doc(db, 'adminRoles', user.uid);

    getDoc(ref)
      .then(async (snap) => {
        if (!snap.exists()) {
          // First admin login — auto-create the role doc
          await setDoc(ref, {
            email: user.email,
            uid: user.uid,
            grantedAt: new Date().toISOString(),
          }).catch(() => {});
        }
        // Both layers passed
        setVerified(true);
      })
      .catch(() => {
        // Firestore unreachable (offline) — fall back to email check only
        setVerified(user.email === ADMIN_EMAIL);
      })
      .finally(() => setChecking(false));
  }, [user, authLoading]);

  return { verified, checking: authLoading || checking };
}
