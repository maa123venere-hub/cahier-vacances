import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './VerifyEmail.css';

const RESEND_COOLDOWN = 60; // secondes entre deux renvois

export default function VerifyEmail() {
  const { user, emailVerified, sendVerification, refreshUser, logOut } = useAuth();
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState(''); // message d'info (envoyé / pas encore validé / erreur)
  const [checking, setChecking] = useState(false);
  const timerRef = useRef(null);

  // Décompte du cooldown de renvoi
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Vérification automatique toutes les 5 s : dès que le lien est cliqué
  // dans la boîte mail, l'app se débloque toute seule.
  useEffect(() => {
    timerRef.current = setInterval(() => { refreshUser(); }, 5000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sécurité : si l'état passe à vérifié, le parent (ProtectedRoute) re-render
  // et cet écran disparaît — rien à faire ici.
  if (emailVerified) return null;

  async function handleResend() {
    setStatus('');
    try {
      await sendVerification();
      setStatus('sent');
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setStatus(err?.code === 'auth/too-many-requests' ? 'rate-limited' : 'error');
    }
  }

  async function handleCheck() {
    setChecking(true);
    setStatus('');
    const ok = await refreshUser();
    if (!ok) setStatus('not-yet');
    setChecking(false);
  }

  return (
    <div className="auth-wrap">
      <div className="auth-header">
        <div className="auth-logo">📚</div>
        <div className="auth-app-title">Calendrier 2k26</div>
        <div className="auth-app-sub">Révisions Été 2026 · Français &amp; Maths · 6e → 3e</div>
      </div>

      <div className="auth-card ve-card">
        <div className="ve-icon">✉️</div>
        <div className="ve-title">Vérifie ton adresse e-mail</div>
        <div className="ve-text">
          Un e-mail de vérification a été envoyé à<br />
          <strong className="ve-email">{user?.email}</strong>
        </div>
        <div className="ve-steps">
          <div className="ve-step"><span className="ve-step-num">1</span> Ouvre ta boîte mail (vérifie aussi les spams)</div>
          <div className="ve-step"><span className="ve-step-num">2</span> Clique sur le lien « Vérifier l'adresse »</div>
          <div className="ve-step"><span className="ve-step-num">3</span> Reviens ici — l'app se débloque automatiquement</div>
        </div>

        {status === 'sent' && <div className="auth-success">E-mail renvoyé ! Vérifie ta boîte de réception.</div>}
        {status === 'not-yet' && <div className="auth-error">Adresse pas encore vérifiée. Clique d'abord sur le lien reçu par e-mail.</div>}
        {status === 'rate-limited' && <div className="auth-error">Trop de demandes. Attends quelques minutes avant de renvoyer.</div>}
        {status === 'error' && <div className="auth-error">L'envoi a échoué. Réessaie dans un instant.</div>}

        <button className="auth-submit" onClick={handleCheck} disabled={checking}>
          {checking ? 'Vérification…' : '✓ J\'ai cliqué sur le lien — Vérifier'}
        </button>

        <button className="ve-resend" onClick={handleResend} disabled={cooldown > 0}>
          {cooldown > 0 ? `Renvoyer l'e-mail (${cooldown}s)` : '↻ Renvoyer l\'e-mail de vérification'}
        </button>

        <button className="auth-link" onClick={logOut}>
          Se déconnecter et utiliser un autre compte
        </button>
      </div>
    </div>
  );
}
