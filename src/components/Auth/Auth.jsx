import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import './Auth.css';
import './GradeSelect.css';

const GRADES = [
  { id: '6eme', label: '6ème', emoji: '🌱', sub: 'Entrée au collège' },
  { id: '5eme', label: '5ème', emoji: '📘', sub: '2e année de collège' },
  { id: '4eme', label: '4ème', emoji: '📗', sub: '3e année de collège' },
  { id: '3eme', label: '3ème', emoji: '🎯', sub: 'Préparation brevet' },
];

function mapAuthError(code) {
  switch (code) {
    case 'auth/invalid-email': return "L'adresse e-mail n'est pas valide.";
    case 'auth/email-already-in-use': return "Un compte existe déjà avec cet e-mail.";
    case 'auth/weak-password': return "Le mot de passe doit contenir au moins 6 caractères.";
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found': return "E-mail ou mot de passe incorrect.";
    case 'auth/too-many-requests': return "Trop de tentatives. Réessaie plus tard.";
    default: return "Une erreur est survenue. Réessaie.";
  }
}

export default function Auth() {
  const { signUp, signIn, resetPassword } = useAuth();
  const [mode, setMode] = useState('login'); // login | signup | forgot
  const [signupStep, setSignupStep] = useState(1); // 1 = infos, 2 = choix classe
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  function switchMode(next) {
    setMode(next);
    setSignupStep(1);
    setSelectedGrade(null);
    setError('');
    setSuccess('');
  }

  async function handleLoginOrForgot(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setBusy(true);
    try {
      if (mode === 'login') {
        await signIn(email, password, rememberMe);
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccess('E-mail de réinitialisation envoyé. Vérifie ta boîte de réception.');
      }
    } catch (err) {
      setError(mapAuthError(err.code));
    } finally {
      setBusy(false);
    }
  }

  function handleSignupStep1(e) {
    e.preventDefault();
    setError('');
    setSignupStep(2);
  }

  async function handleSignupFinish() {
    if (!selectedGrade) return;
    setError('');
    setBusy(true);
    try {
      sessionStorage.setItem('pendingGrade', selectedGrade);
      await signUp(email, password, name);
    } catch (err) {
      setError(mapAuthError(err.code));
      setSignupStep(1);
    } finally {
      setBusy(false);
    }
  }

  // ── Signup step 2 : choix de classe ─────────────────────────────
  if (mode === 'signup' && signupStep === 2) {
    return (
      <div className="auth-wrap">
        <div className="auth-header">
          <div className="auth-logo">📚</div>
          <div className="auth-app-title">Calendrier 2k26</div>
          <div className="auth-app-sub">Révisions Été 2026</div>
        </div>

        <div className="auth-card">
          <button className="auth-link" style={{ marginBottom: 12 }} onClick={() => setSignupStep(1)}>
            ← Retour
          </button>
          <div className="gs-question">Dans quelle classe es-tu ?</div>
          <div className="gs-hint">Choisis ton niveau pour commencer</div>

          {error && <div className="auth-error">{error}</div>}

          <div className="gs-grid" style={{ marginTop: 16 }}>
            {GRADES.map(g => (
              <button
                key={g.id}
                className={`gs-option ${selectedGrade === g.id ? 'selected' : ''}`}
                onClick={() => setSelectedGrade(g.id)}
              >
                <span className="gs-option-emoji">{g.emoji}</span>
                <span className="gs-option-label">{g.label}</span>
                <span className="gs-option-sub">{g.sub}</span>
                {selectedGrade === g.id && <span className="gs-check">✓</span>}
              </button>
            ))}
          </div>

          <button
            className="auth-submit"
            onClick={handleSignupFinish}
            disabled={!selectedGrade || busy}
            style={{ marginTop: 8 }}
          >
            {busy ? 'Création du compte…' : 'Créer mon compte →'}
          </button>
        </div>
      </div>
    );
  }

  // ── Connexion / Inscription step 1 / Mot de passe oublié ────────
  return (
    <div className="auth-wrap">
      <div className="auth-header">
        <div className="auth-logo">📚</div>
        <div className="auth-app-title">Calendrier 2k26</div>
        <div className="auth-app-sub">Révisions Été 2026 · Français &amp; Maths · 6e → 3e</div>
      </div>

      <div className="auth-card">
        {mode !== 'forgot' && (
          <div className="auth-tabs">
            <button className={`auth-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => switchMode('login')}>Connexion</button>
            <button className={`auth-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => switchMode('signup')}>Inscription</button>
          </div>
        )}

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={mode === 'signup' ? handleSignupStep1 : handleLoginOrForgot}>
          {mode === 'signup' && (
            <div className="auth-field">
              <label className="auth-label">Prénom</label>
              <input className="auth-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">E-mail</label>
            <input className="auth-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {mode !== 'forgot' && (
            <div className="auth-field">
              <label className="auth-label">Mot de passe</label>
              <input className="auth-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
            </div>
          )}

          {mode === 'login' && (
            <label className="auth-remember">
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Rester connecté
            </label>
          )}

          <button className="auth-submit" type="submit" disabled={busy}>
            {busy ? 'Patience…' : mode === 'login' ? 'Se connecter' : mode === 'signup' ? 'Continuer →' : 'Réinitialiser le mot de passe'}
          </button>
        </form>

        {mode === 'login' && (
          <button className="auth-link" onClick={() => switchMode('forgot')}>Mot de passe oublié ?</button>
        )}
        {mode === 'forgot' && (
          <button className="auth-link" onClick={() => switchMode('login')}>← Retour à la connexion</button>
        )}
      </div>
    </div>
  );
}
