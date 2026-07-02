import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { isAdmin } from '../../utils/admin.js';

const LINKS = [
  { to: '/', emoji: '📚', label: 'Cahier de vacances' },
  { to: '/planning', emoji: '📅', label: 'Planning' },
  { to: '/repas', emoji: '🍽️', label: 'Repas' },
  { to: '/sport', emoji: '🏃', label: 'Sport' },
  { to: '/bibliotheque', emoji: '📖', label: 'Bibliothèque' },
  { to: '/assistant', emoji: '🤖', label: 'Assistant IA' },
  { to: '/recompenses', emoji: '🏆', label: 'Récompenses' },
  { to: '/statistiques', emoji: '📊', label: 'Statistiques' },
  { to: '/profil', emoji: '👤', label: 'Mon profil' },
  { to: '/parametres', emoji: '⚙️', label: 'Paramètres' },
];

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <nav className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-title">Calendrier 2k26</div>
          <div className="sidebar-sub">Révisions Été 2026</div>
        </div>
        <div className="sidebar-nav">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-emoji">{link.emoji}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
          {isAdmin(user) && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `sidebar-link sidebar-link-admin ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-emoji">🛡️</span>
              <span>Administration</span>
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
}
