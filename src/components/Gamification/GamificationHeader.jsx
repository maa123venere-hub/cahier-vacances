import { levelFromXp, xpProgressInLevel } from '../../data/gamification.js';
import './Gamification.css';

export default function GamificationHeader({ stats }) {
  const level = levelFromXp(stats.xp || 0);
  const progress = xpProgressInLevel(stats.xp || 0);

  return (
    <>
      <div className="gami-header-card">
        <div className="gami-level-row">
          <div className="gami-level-badge">{level}</div>
          <div className="gami-level-info">
            <div className="gami-level-title">Niveau {level}</div>
            <div className="gami-level-xp">{progress}/100 XP vers le niveau {level + 1}</div>
          </div>
          <div className="gami-coins">🪙 {stats.coins || 0}</div>
        </div>
        <div className="gami-xp-bar-bg">
          <div className="gami-xp-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="gami-stats-row">
        <div className="gami-stat-box">
          <div className="gami-stat-value">🔥 {stats.streak || 0}</div>
          <div className="gami-stat-label">Jours de série</div>
        </div>
        <div className="gami-stat-box">
          <div className="gami-stat-value">{stats.xp || 0}</div>
          <div className="gami-stat-label">XP total</div>
        </div>
        <div className="gami-stat-box">
          <div className="gami-stat-value">🪙 {stats.coins || 0}</div>
          <div className="gami-stat-label">Pièces</div>
        </div>
      </div>
    </>
  );
}
