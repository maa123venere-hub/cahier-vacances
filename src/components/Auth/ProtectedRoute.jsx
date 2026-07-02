import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import VerifyEmail from './VerifyEmail.jsx';

export default function ProtectedRoute({ children }) {
  const { user, loading, emailVerified } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', color: '#94A3B8', fontSize: 14 }}>
        Chargement…
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  // Compte connecté mais adresse e-mail non vérifiée → écran de vérification
  if (!emailVerified) return <VerifyEmail />;

  return children;
}
