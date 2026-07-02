import { useAdminAdvancedStats } from '../../hooks/useAdminAdvancedStats.js';
import './AdminAdvancedStats.css';

// ── Helpers ───────────────────────────────────
function fmtTime(sec) {
  if (!sec) return '0 s';
  if (sec < 60) return `${sec} s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s ? `${m} min ${s} s` : `${m} min`;
}

function fmtTotalTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h} h ${m} min`;
  return `${m} min`;
}

function pctColor(pct) {
  if (pct >= 80) return '#16a34a';
  if (pct >= 50) return '#d97706';
  return '#dc2626';
}

// ── KPI card ──────────────────────────────────
function KPI({ icon, value, label, sub, color = '#2563eb' }) {
  return (
    <div className="as-kpi" style={{ '--kc': color }}>
      <span className="as-kpi__icon">{icon}</span>
      <span className="as-kpi__val">{value}</span>
      <span className="as-kpi__lbl">{label}</span>
      {sub && <span className="as-kpi__sub">{sub}</span>}
    </div>
  );
}

// ── Bar chart (vertical SVG) ──────────────────
function BarChart({ data, valueKey, labelKey, color = '#2563eb', title, height = 140 }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  const W   = data.length * 30;
  return (
    <div className="as-chart-wrap">
      {title && <div className="as-chart-title">{title}</div>}
      <svg viewBox={`0 0 ${W} ${height + 28}`} className="as-svg">
        {data.map((d, i) => {
          const bh = Math.max(2, Math.round((d[valueKey] / max) * height));
          const x  = i * 30 + 5;
          const y  = height - bh;
          const c  = typeof color === 'function' ? color(d) : color;
          return (
            <g key={i}>
              <rect x={x} y={y} width={20} height={bh} rx={4} fill={c} opacity={d[valueKey] === 0 ? 0.15 : 0.85} />
              {d[valueKey] > 0 && (
                <text x={x + 10} y={y - 3} textAnchor="middle" fontSize={8} fill="var(--text-secondary,#888)">
                  {d[valueKey]}
                </text>
              )}
              <text x={x + 10} y={height + 16} textAnchor="middle" fontSize={7} fill="var(--text-secondary,#aaa)">
                {d[labelKey]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Horizontal bar ────────────────────────────
function HBar({ label, value, max, color, suffix = '' }) {
  const pct = max ? (value / max) * 100 : 0;
  return (
    <div className="as-hbar">
      <span className="as-hbar__lbl">{label}</span>
      <div className="as-hbar__track">
        <div className="as-hbar__fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="as-hbar__val" style={{ color }}>{value}{suffix}</span>
    </div>
  );
}

// ── Day table ─────────────────────────────────
function DayTable({ rows, title, highlight }) {
  return (
    <div className="as-table-wrap">
      <div className="as-chart-title">{title}</div>
      <table className="as-table">
        <thead>
          <tr>
            <th>Jour</th>
            <th>Sessions</th>
            <th>Score moy.</th>
            <th>Temps moy.</th>
            <th>% parfaits</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.dayKey} className={highlight === 'low' ? 'as-row--low' : 'as-row--high'}>
              <td><span className="as-day-key">{r.dayKey}</span></td>
              <td>{r.count}</td>
              <td>
                <span className="as-pct-badge" style={{ background: pctColor(r.avgPct) + '22', color: pctColor(r.avgPct) }}>
                  {r.avgPct}%
                </span>
              </td>
              <td>{fmtTime(r.avgTime)}</td>
              <td>{r.perfectRate}%</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary,#aaa)', padding: '16px' }}>Pas encore de données.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Main ──────────────────────────────────────
export default function AdminAdvancedStats() {
  const {
    loading, error,
    daily30, hardestDays, easiestDays, mostPracticed,
    scoreDist, timeDist,
    totalSessions, avgScore, avgTimeSec, perfectRate, totalTime,
  } = useAdminAdvancedStats();

  if (loading) {
    return (
      <div className="as-loading">
        <div className="as-spinner" />
        <span>Analyse des sessions en cours…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="as-error">
        ⚠️ Erreur : {error}
        <br /><small>Vérifiez que l'index collectionGroup "exerciseSessions" est actif dans Firestore.</small>
      </div>
    );
  }

  const daily30sessions = daily30.map((d) => ({ ...d, label: d.label }));
  const daily30scores   = daily30.map((d) => ({ ...d }));

  const scoreMax = Math.max(...scoreDist.map((d) => d.count), 1);
  const timeMax  = Math.max(...timeDist.map((d) => d.count), 1);

  return (
    <div className="admin-advanced-stats">

      {/* ── KPI row ── */}
      <div className="as-kpi-grid">
        <KPI icon="🎯" value={`${avgScore}%`}       label="Score moyen global"     sub={`${totalSessions} sessions`}      color="#2563eb" />
        <KPI icon="⏱️" value={fmtTime(avgTimeSec)}  label="Temps moyen / session"  sub={`Total : ${fmtTotalTime(totalTime)}`} color="#d97706" />
        <KPI icon="✨" value={`${perfectRate}%`}     label="Sessions parfaites"     sub="score = 100%"                     color="#16a34a" />
        <KPI icon="📅" value={daily30.filter((d) => d.sessions > 0).length} label="Jours actifs (30j)" sub="au moins 1 session" color="#7c3aed" />
      </div>

      {/* ── Daily activity chart ── */}
      <div className="as-card">
        <BarChart
          data={daily30sessions}
          valueKey="sessions"
          labelKey="label"
          color="#2563eb"
          title="📅 Activité quotidienne — 30 derniers jours (sessions)"
          height={120}
        />
      </div>

      {/* ── Score distribution & time distribution ── */}
      <div className="as-row-2">
        <div className="as-card">
          <div className="as-chart-title">🎯 Distribution des scores</div>
          <div className="as-hbar-list">
            {scoreDist.map((d) => (
              <HBar
                key={d.label}
                label={d.label}
                value={d.count}
                max={scoreMax}
                suffix=" sess."
                color={
                  d.label.startsWith('80') ? '#16a34a' :
                  d.label.startsWith('60') ? '#65a30d' :
                  d.label.startsWith('40') ? '#d97706' :
                  '#dc2626'
                }
              />
            ))}
          </div>
        </div>

        <div className="as-card">
          <div className="as-chart-title">⏱️ Distribution des temps</div>
          <div className="as-hbar-list">
            {timeDist.map((d) => (
              <HBar
                key={d.label}
                label={d.label}
                value={d.count}
                max={timeMax}
                suffix=" sess."
                color="#7c3aed"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Score per day chart ── */}
      <div className="as-card">
        <BarChart
          data={daily30scores.filter((d) => d.sessions > 0)}
          valueKey="avgPct"
          labelKey="label"
          color={(d) => pctColor(d.avgPct)}
          title="📊 Score moyen par jour (30 derniers jours)"
          height={120}
        />
      </div>

      {/* ── Hardest / easiest days ── */}
      <div className="as-row-2">
        <DayTable rows={hardestDays}  title="😓 Jours les plus difficiles" highlight="low" />
        <DayTable rows={easiestDays}  title="😊 Jours les plus faciles"    highlight="high" />
      </div>

      {/* ── Most practiced ── */}
      <div className="as-card">
        <div className="as-chart-title">🏆 Exercices les plus pratiqués</div>
        <div className="as-hbar-list">
          {mostPracticed.map((d) => (
            <HBar
              key={d.dayKey}
              label={d.dayKey}
              value={d.count}
              max={mostPracticed[0]?.count || 1}
              suffix=" sess."
              color="#2563eb"
            />
          ))}
          {mostPracticed.length === 0 && <p className="as-empty">Pas encore de données.</p>}
        </div>
      </div>

    </div>
  );
}
