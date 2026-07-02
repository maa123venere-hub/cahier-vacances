import { Navigate } from 'react-router-dom';
import { useAdminVerify } from '../../hooks/useAdminVerify.js';
import { useAuth } from '../../context/AuthContext.jsx';
import VerifyEmail from './VerifyEmail.jsx';
import './AdminRoute.css';

export default function AdminRoute({ children }) {
  const { verified, checking } = useAdminVerify();
  const { user, emailVerified } = useAuth();

  if (checking) {
    return (
      <div className="admin-route-loading">
        <div className="admin-route-loading__spinner" />
        <p>Vérification des droits…</p>
      </div>
    );
  }

  if (!verified) {
    return <Navigate to="/" replace />;
  }

  // Même exigence que le reste de l'app : e-mail vérifié obligatoire
  if (user && !emailVerified) return <VerifyEmail />;

  return children;
}
