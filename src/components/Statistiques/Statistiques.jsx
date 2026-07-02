import { useDone } from '../../hooks/useDone.js';
import { useStats } from '../../hooks/useStats.js';
import { useGamification } from '../../hooks/useGamification.js';
import { useLevelData } from '../../hooks/useLevelData.js';
import { useMatiereStats } from '../../hooks/useMatiereStats.js';
import './Statistiques.css';

function formatTime(seconds) {
  if (!seconds) return '0 min';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m} min`;
}

function pctColor(pct) {
  if (pct >= 80) return '#16A34A';
  if (pct >= 60) return '#D97706';
  return '#DC2626';
}

export default function Statistiques() {
  const { done } = useDone();
  const stats = useStats();
  const { stats: gStats } = useGamification();
  const { weeks, jours } = useLevelData();
  const { byMatiere, loading: matiereLoading } = useMatiereStats(jours);

  const weeklyData = weeks.map((w, wi) => ({
    num: w.num,
    color: w.color,
    done: w.days.filter((_, di) => done[`${wi}-${di}`]).length,
    total: w.days.length,
  }));

  const pct = Math.round((stats.totalDone / stats.totalDays) * 100);
  const accuracyPct = stats.totalExercisesDone > 0
    ? Math.round((stats.totalCorrect / stats.totalExercisesDone) * 100)
    : 0;

  return (
    <div className="stats-body">

      {/* ── Journées & progression ── */}
      <div className="stats-section-title">📚 Cahier de vacances</div>
      <div className="stats-cards">
        <div className="stats-card">
          <div className="stats-card-value">{stats.totalDone}/{stats.totalDays}</div>
          <div className="stats-card-label">Journées terminées</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-value">{gStats.streak || 0} 🔥</div>
          <div className="stats-card-label">Série en cours</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-value">{gStats.xp || 0}</div>
          <div className="stats-card-label">XP total</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-value">{stats.totalCorrections}</div>
          <div className="stats-card-label">Corrections IA</div>
        </div>
      </div>

      {/* ── Exercices interactifs ── */}
      <div className="stats-section-title">✏️ Exercices interactifs</div>
      <div className="stats-cards">
        <div className="stats-card">
          <div className="stats-card-value">{stats.totalExercisesDone}</div>
          <div className="stats-card-label">Exercices réalisés</div>
        </div>
        <div className="stats-card stats-card-green">
          <div className="stats-card-value">{stats.totalCorrect}</div>
          <div className="stats-card-label">✅ Bonnes réponses</div>
        </div>
        <div className="stats-card stats-card-red">
          <div className="stats-card-value">{stats.totalWrong}</div>
          <div className="stats-card-label">❌ Mauvaises réponses</div>
        </div>
        <div className="stats-card">
          <div className="stats-card-value">{stats.perfectSessions}</div>
          <div className="stats-card-label">⭐ Sessions parfaites</div>
        </div>
      </div>

      {/* ── Précision & temps ── */}
      <div className="stats-chart-card">
        <div className="stats-chart-title">🎯 Précision globale</div>
        <div className="stats-accuracy-row">
          <div className="stats-accuracy-pct">{accuracyPct}%</div>
          <div className="stats-accuracy-bar-wrap">
            <div className="stats-accuracy-bar" style={{ width: `${accuracyPct}%` }} />
          </div>
        </div>
        <div className="stats-accuracy-sub">
          {stats.totalCorrect} bonnes · {stats.totalWrong} mauvaises · {formatTime(stats.totalTimeSeconds)} de travail
        </div>
      </div>

      {/* ── Sparkline dernières sessions ── */}
      {stats.recentSessions.length > 0 && (
        <div className="stats-chart-card">
          <div className="stats-chart-title">📈 Dernières sessions</div>
          <div className="stats-sparkline">
            {stats.recentSessions.map((s, i) => (
              <div key={i} className="stats-spark-col">
                <div
                  className="stats-spark-bar"
                  style={{ height: `${Math.max(s.pct, 8)}%`, background: s.pct >= 80 ? '#16A34A' : s.pct >= 50 ? '#F59E0B' : '#DC2626' }}
                />
                <div className="stats-spark-label">{s.score}/{s.total}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Progression globale ── */}
      <div className="stats-chart-card">
        <div className="stats-chart-title">🗓️ Taux de complétion</div>
        <div className="donut-wrap">
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: `conic-gradient(#4338CA ${pct * 3.6}deg, #E2E8F0 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 76, height: 76, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#4338CA' }}>
              {pct}%
            </div>
          </div>
          <div className="donut-label">
            Tu as terminé <span className="donut-value">{stats.totalDone}</span><br />journées sur {stats.totalDays}
          </div>
        </div>
      </div>

      {/* ── Barres par semaine ── */}
      <div className="stats-chart-card">
        <div className="stats-chart-title">📊 Progression par semaine</div>
        <div className="bar-chart">
          {weeklyData.map((w) => (
            <div className="bar-col" key={w.num}>
              <span className="bar-value">{w.done}/{w.total}</span>
              <div className="bar-fill" style={{ height: `${Math.max((w.done / w.total) * 100, 4)}%`, background: w.color }} />
              <span className="bar-label">S{w.num}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Matières fortes / faibles (3ème) ── */}
      {!matiereLoading && Object.keys(byMatiere).length > 0 && (() => {
        const matieres = Object.entries(byMatiere)
          .map(([m, v]) => ({ m, pct: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0, correct: v.correct, total: v.total }))
          .sort((a, b) => b.pct - a.pct);
        const fortes  = matieres.filter((x) => x.pct >= 75);
        const faibles = matieres.filter((x) => x.pct < 60);

        return (
          <>
            <div className="stats-section-title">📖 Taux de réussite par matière</div>
            <div className="stats-chart-card">
              {matieres.map(({ m, pct: p, correct, total }) => (
                <div className="stats-matiere-row" key={m}>
                  <div className="stats-matiere-name">{m}</div>
                  <div className="stats-matiere-bar-wrap">
                    <div className="stats-matiere-bar" style={{ width: `${p}%`, background: pctColor(p) }} />
                  </div>
                  <div className="stats-matiere-pct" style={{ color: pctColor(p) }}>{p}%</div>
                  <div className="stats-matiere-detail">{correct}/{total}</div>
                </div>
              ))}
            </div>

            {(fortes.length > 0 || faibles.length > 0) && (
              <div className="stats-mf-row">
                {fortes.length > 0 && (
                  <div className="stats-mf-card stats-mf-fortes">
                    <div className="stats-mf-title">💪 Matières fortes</div>
                    <div className="stats-mf-tags">
                      {fortes.map(({ m }) => <span className="stats-mf-tag stats-mf-tag-green" key={m}>{m}</span>)}
                    </div>
                  </div>
                )}
                {faibles.length > 0 && (
                  <div className="stats-mf-card stats-mf-faibles">
                    <div className="stats-mf-title">⚠️ À retravailler</div>
                    <div className="stats-mf-tags">
                      {faibles.map(({ m }) => <span className="stats-mf-tag stats-mf-tag-red" key={m}>{m}</span>)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        );
      })()}

    </div>
  );
}
