import { useAuth } from '../../context/AuthContext.jsx';
import { useStats } from '../../hooks/useStats.js';
import { useGamification } from '../../hooks/useGamification.js';
import { BADGES } from '../../data/badges.js';
import { levelFromXp } from '../../data/gamification.js';
import './Profile.css';

export default function Profile() {
  const { user, logOut } = useAuth();
  const stats = useStats();
  const { stats: gamiStats } = useGamification();

  const pct = Math.round((stats.totalDone / stats.totalDays) * 100);
  const level = levelFromXp(gamiStats.xp || 0);
  const earnedBadges = BADGES.filter((b) => b.check(stats)).length;

  const initial = (user?.displayName || user?.email || '?').charAt(0).toUpperCase();

  return (
    <div className="profile-body">
      <div className="profile-card">
        <div className="profile-avatar">{initial}</div>
        <div>
          <div className="profile-name">{user?.displayName || 'Élève'}</div>
          <div className="profile-email">{user?.email}</div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-value">{pct}%</div>
          <div className="stat-label">Progression</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{stats.totalDone}/{stats.totalDays}</div>
          <div className="stat-label">Jours terminés</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">🎓 {level}</div>
          <div className="stat-label">Niveau</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">🔥 {gamiStats.streak || 0}</div>
          <div className="stat-label">Série de jours</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{stats.averageNote}/20</div>
          <div className="stat-label">Note moyenne IA</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">🏆 {earnedBadges}/{BADGES.length}</div>
          <div className="stat-label">Succès débloqués</div>
        </div>
      </div>

      <button className="profile-logout" onClick={logOut}>Se déconnecter</button>
    </div>
  );
}
