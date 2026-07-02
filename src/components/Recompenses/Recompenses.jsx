import { BADGES } from '../../data/badges.js';
import { useStats } from '../../hooks/useStats.js';
import { useGamification } from '../../hooks/useGamification.js';
import { useDailyMissions } from '../../hooks/useDailyMissions.js';
import GamificationHeader from '../Gamification/GamificationHeader.jsx';
import DailyChest from '../Gamification/DailyChest.jsx';
import DailyMissions from '../Gamification/DailyMissions.jsx';
import './Recompenses.css';

export default function Recompenses() {
  const calendarStats = useStats();
  const { stats, canClaimChest, claimChest } = useGamification();
  const { missions, claimMission } = useDailyMissions();
  const earnedCount = BADGES.filter((b) => b.check(calendarStats)).length;

  return (
    <div className="badges-body">
      <GamificationHeader stats={stats} />
      <DailyChest canClaim={canClaimChest()} onClaim={claimChest} />
      <DailyMissions missions={missions} onClaim={claimMission} />

      <div className="badges-progress">
        <strong>{earnedCount}</strong> / {BADGES.length} succès débloqués
      </div>
      <div className="badges-grid">
        {BADGES.map((badge) => {
          const earned = badge.check(calendarStats);
          return (
            <div key={badge.key} className={`badge-card ${earned ? '' : 'locked'}`}>
              <div className="badge-emoji">{earned ? badge.emoji : '🔒'}</div>
              <div className="badge-title">{badge.title}</div>
              <div className="badge-desc">{badge.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
