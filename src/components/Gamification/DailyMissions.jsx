import './Gamification.css';

export default function DailyMissions({ missions, onClaim }) {
  return (
    <div className="missions-card">
      <div className="missions-title">🎯 Missions du jour</div>
      {missions.map((m) => (
        <div className="mission-row" key={m.key}>
          <span className="mission-emoji">{m.emoji}</span>
          <span className={`mission-label ${m.completed ? 'done' : ''}`}>{m.label}</span>
          <button
            className="mission-claim-btn"
            disabled={!m.completed || m.claimed}
            onClick={() => onClaim(m.key)}
          >
            {m.claimed ? '✓ Reçu' : m.completed ? 'Réclamer' : 'En cours'}
          </button>
        </div>
      ))}
    </div>
  );
}
