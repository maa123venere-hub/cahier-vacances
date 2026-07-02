import { useAdminStats } from '../../hooks/useAdminStats.js';
import './AdminStats.css';

function KPICard({ icon, value, label, sub, color }) {
  return (
    <div className="kpi-card" style={{ '--kpi-color': color }}>
      <span className="kpi-icon">{icon}</span>
      <div className="kpi-value">{value}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  );
}

function BarChart({ data, valueKey, labelKey, color = '#2563eb', title }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  const BAR_H = 120;

  return (
    <div className="chart-wrap">
      {title && <div className="chart-title">{title}</div>}
      <svg
        viewBox={`0 0 ${data.length * 28} ${BAR_H + 24}`}
        className="bar-chart-svg"
        aria-label={title}
      >
        {data.map((d, i) => {
          const barH = Math.max(2, Math.round((d[valueKey] / max) * BAR_H));
          const x = i * 28 + 4;
          const y = BAR_H - barH;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={20}
                height={barH}
                rx={4}
                fill={color}
                opacity={d[valueKey] === 0 ? 0.15 : 0.85}
              />
              {d[valueKey] > 0 && (
                <text x={x + 10} y={y - 3} textAnchor="middle" fontSize={9} fill="var(--text-secondary,#888)">
                  {d[valueKey]}
                </text>
              )}
              <text
                x={x + 10}
                y={BAR_H + 14}
                textAnchor="middle"
                fontSize={8}
                fill="var(--text-secondary,#aaa)"
              >
                {d[labelKey]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function HBarChart({ data, title }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="chart-wrap">
      {title && <div className="chart-title">{title}</div>}
      <div className="hbar-list">
        {data.map((d) => (
          <div key={d.key} className="hbar-row">
            <span className="hbar-label">{d.key}</span>
            <div className="hbar-track">
              <div
                className="hbar-fill"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
            <span className="hbar-count">{d.count}</span>
          </div>
        ))}
        {data.length === 0 && <p className="hbar-empty">Pas encore de données.</p>}
      </div>
    </div>
  );
}

export default function AdminStats() {
  const {
    loading,
    error,
    totalUsers,
    newUsersLast7d,
    activeLast7d,
    totalSessions,
    sessionsLast7d,
    avgScore,
    totalExercisesDone,
    daily,
    topDays,
  } = useAdminStats();

  const dailyLabels = daily.map((d) => {
    const date = d.date;
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const dailyData = daily.map((d, i) => ({
    sessions: d.sessions,
    label: dailyLabels[i],
  }));

  if (error) {
    return (
      <div className="admin-stats-error">
        ⚠️ Erreur de chargement : {error}
        <br />
        <small>Vérifiez que l'index collectionGroup "exerciseSessions" est activé dans Firestore.</small>
      </div>
    );
  }

  return (
    <div className="admin-stats">
      <div className="kpi-grid">
        <KPICard
          icon="👥"
          value={loading ? '…' : totalUsers}
          label="Utilisateurs inscrits"
          sub={`+${newUsersLast7d} cette semaine`}
          color="#2563eb"
        />
        <KPICard
          icon="🟢"
          value={loading ? '…' : activeLast7d}
          label="Actifs (7 derniers jours)"
          sub="utilisateurs avec exercices"
          color="#16a34a"
        />
        <KPICard
          icon="✏️"
          value={loading ? '…' : totalSessions}
          label="Sessions d'exercices"
          sub={`${sessionsLast7d} cette semaine`}
          color="#d97706"
        />
        <KPICard
          icon="🎯"
          value={loading ? '…' : `${avgScore}%`}
          label="Score moyen global"
          sub={`${totalExercisesDone} questions répondues`}
          color="#7c3aed"
        />
      </div>

      {!loading && (
        <>
          <div className="charts-row">
            <div className="chart-card">
              <BarChart
                data={dailyData}
                valueKey="sessions"
                labelKey="label"
                color="#2563eb"
                title="📅 Sessions par jour (14 derniers jours)"
              />
            </div>
            <div className="chart-card">
              <HBarChart
                data={topDays}
                title="🏆 Exercices les plus pratiqués"
              />
            </div>
          </div>
        </>
      )}

      {loading && (
        <div className="admin-stats-loading">
          <div className="admin-stats-spinner" />
          <span>Chargement des statistiques…</span>
        </div>
      )}
    </div>
  );
}
