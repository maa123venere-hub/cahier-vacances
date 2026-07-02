import { Navigate } from 'react-router-dom';
import Auth from '../components/Auth/Auth.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthPage() {
  const { user, loading } = useAuth();
  if (!loading && user) return <Navigate to="/" replace />;
  return <Auth />;
}
