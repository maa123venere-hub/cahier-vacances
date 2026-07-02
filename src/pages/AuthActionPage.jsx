import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import '../components/Auth/Auth.css';
import '../components/Auth/VerifyEmail.css';

// Page cible des liens envoyés par e-mail (vérification d'adresse,
// réinitialisation de mot de passe). Configurée comme « action URL »
// dans Firebase Auth : les liens des e-mails arrivent directement ici.
export default function AuthActionPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const mode = params.get('mode');
  const oobCode = params.get('oobCode');
  const continueUrl = params.get('continueUrl');

  const [state, setState] = useState('working'); // working | success | error | reset-form | reset-done
  const [errorMsg, setErrorMsg] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [countdown, setCountdown] = useState(4);

  // Où renvoyer l'élève après succès : le domaine d'origine s'il est fourni, sinon l'accueil
  const appUrl = continueUrl || '/';

  useEffect(() => {
    if (!mode || !oobCode) {
      setErrorMsg('Lien incomplet. Réessaie depuis l\'e-mail reçu.');
      setState('error');
      return;
    }

    if (mode === 'verifyEmail' || mode === 'recoverEmail') {
      applyActionCode(auth, oobCode)
        .then(() => setState('success'))
        .catch((err) => {
          setErrorMsg(
            err?.code === 'auth/expired-action-code'
              ? 'Ce lien a expiré. Retourne dans l\'application et clique sur « Renvoyer l\'e-mail ».'
              : err?.code === 'auth/invalid-action-code'
              ? 'Ce lien a déjà été utilisé ou n\'est plus valide. Si ton adresse est déjà vérifiée, ouvre simplement l\'application.'
              : 'Impossible de valider ce lien. Réessaie depuis l\'application.'
          );
          setState('error');
        });
    } else if (mode === 'resetPassword') {
      verifyPasswordResetCode(auth, oobCode)
        .then((email) => {
          setResetEmail(email);
          setState('reset-form');
        })
        .catch(() => {
          setErrorMsg('Ce lien de réinitialisation a expiré ou a déjà été utilisé. Refais une demande depuis « Mot de passe oublié ».');
          setState('error');
        });
    } else {
      setErrorMsg('Type de lien inconnu.');
      setState('error');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirection automatique après vérification réussie
  useEffect(() => {
    if (state !== 'success') return;
    if (countdown <= 0) {
      window.location.href = appUrl;
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [state, countdown, appUrl]);

  async function handleResetSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErrorMsg('');
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setState('reset-done');
    } catch (err) {
      setErrorMsg(err?.code === 'auth/weak-password'
        ? 'Le mot de passe doit contenir au moins 6 caractères.'
        : 'La réinitialisation a échoué. Refais une demande depuis « Mot de passe oublié ».');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-wrap">
      <div className="auth-header">
        <div className="auth-logo">📚</div>
        <div className="auth-app-title">Calendrier 2k26</div>
        <div className="auth-app-sub">Révisions Été 2026 · Français &amp; Maths · 6e → 3e</div>
      </div>

      <div className="auth-card ve-card">
        {state === 'working' && (
          <>
            <div className="ve-icon">⏳</div>
            <div className="ve-title">Validation en cours…</div>
            <div className="ve-text">Un instant, on vérifie ton lien.</div>
          </>
        )}

        {state === 'success' && (
          <>
            <div className="ve-icon">✅</div>
            <div className="ve-title">Adresse vérifiée !</div>
            <div className="ve-text">
              Ton compte est activé. Redirection vers l'application dans <strong>{countdown}s</strong>…
            </div>
            <button className="auth-submit" onClick={() => { window.location.href = appUrl; }}>
              Ouvrir l'application maintenant →
            </button>
          </>
        )}

        {state === 'reset-form' && (
          <>
            <div className="ve-icon">🔑</div>
            <div className="ve-title">Nouveau mot de passe</div>
            <div className="ve-text">Pour le compte <strong className="ve-email">{resetEmail}</strong></div>
            {errorMsg && <div className="auth-error">{errorMsg}</div>}
            <form onSubmit={handleResetSubmit}>
              <div className="auth-field" style={{ textAlign: 'left' }}>
                <label className="auth-label">Nouveau mot de passe</label>
                <input
                  className="auth-input"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                  autoFocus
                />
              </div>
              <button className="auth-submit" type="submit" disabled={busy}>
                {busy ? 'Patience…' : 'Changer le mot de passe'}
              </button>
            </form>
          </>
        )}

        {state === 'reset-done' && (
          <>
            <div className="ve-icon">✅</div>
            <div className="ve-title">Mot de passe changé !</div>
            <div className="ve-text">Tu peux maintenant te connecter avec ton nouveau mot de passe.</div>
            <button className="auth-submit" onClick={() => navigate('/auth')}>
              Se connecter →
            </button>
          </>
        )}

        {state === 'error' && (
          <>
            <div className="ve-icon">⚠️</div>
            <div className="ve-title">Lien invalide</div>
            <div className="ve-text">{errorMsg}</div>
            <button className="auth-submit" onClick={() => { window.location.href = appUrl; }}>
              Retour à l'application
            </button>
          </>
        )}
      </div>
    </div>
  );
}
