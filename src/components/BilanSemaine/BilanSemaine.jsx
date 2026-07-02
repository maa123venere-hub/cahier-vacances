import { useWeekSessions } from '../../hooks/useWeekSessions.js';
import './BilanSemaine.css';

function pctToEmoji(pct) {
  if (pct >= 85) return '🏆';
  if (pct >= 70) return '⭐';
  if (pct >= 50) return '📈';
  return '💪';
}

function pctToLabel(pct) {
  if (pct >= 85) return 'Excellente semaine !';
  if (pct >= 70) return 'Très bonne semaine !';
  if (pct >= 50) return 'Bonne semaine !';
  return 'Continue tes efforts !';
}

function pctToColor(pct) {
  if (pct >= 85) return '#16A34A';
  if (pct >= 70) return '#D97706';
  if (pct >= 50) return '#2563EB';
  return '#DC2626';
}

function conseils(byMatiere) {
  const weak = Object.entries(byMatiere)
    .filter(([, v]) => v.total > 0 && v.correct / v.total < 0.6)
    .map(([m]) => m);
  const strong = Object.entries(byMatiere)
    .filter(([, v]) => v.total > 0 && v.correct / v.total >= 0.8)
    .map(([m]) => m);

  const tips = [];
  if (strong.length) tips.push(`Tu excelles en ${strong.slice(0, 2).join(', ')} — garde ce rythme !`);
  if (weak.length) tips.push(`Révise encore ${weak.slice(0, 2).join(', ')} la semaine prochaine.`);
  if (!tips.length) tips.push('Continue sur ta lancée, tu progresses bien !');
  return tips;
}

export default function BilanSemaine({ semaineIndex, weekColor, weekTheme, jours, totalDaysInWeek }) {
  const { sessions, byMatiere, loading } = useWeekSessions(semaineIndex, jours);

  if (loading) {
    return (
      <div className="bilan-wrap">
        <div className="bilan-loading">Chargement du bilan…</div>
      </div>
    );
  }

  const totalCorrect = sessions.reduce((s, d) => s + (d.score || 0), 0);
  const totalExos    = sessions.reduce((s, d) => s + (d.total || 0), 0);
  const pct = totalExos > 0 ? Math.round((totalCorrect / totalExos) * 100) : null;
  const hasSessions = sessions.length > 0;
  const color = pct != null ? pctToColor(pct) : weekColor;
  const tips = hasSessions ? conseils(byMatiere) : [];

  return (
    <div className="bilan-wrap">
      <div className="bilan-header" style={{ borderColor: weekColor }}>
        <div className="bilan-eyebrow" style={{ color: weekColor }}>Bilan de la semaine</div>
        <div className="bilan-title">{weekTheme}</div>
      </div>

      {!hasSessions ? (
        <div className="bilan-empty">
          Termine les exercices interactifs pour voir ton bilan de semaine.
        </div>
      ) : (
        <>
          {pct != null && (
            <div className="bilan-score-block">
              <div className="bilan-emoji">{pctToEmoji(pct)}</div>
              <div className="bilan-score" style={{ color }}>{pct}%</div>
              <div className="bilan-score-label" style={{ color }}>{pctToLabel(pct)}</div>
              <div className="bilan-score-bar-wrap">
                <div className="bilan-score-bar" style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="bilan-score-sub">{totalCorrect} bonne{totalCorrect > 1 ? 's' : ''} réponse{totalCorrect > 1 ? 's' : ''} sur {totalExos}</div>
            </div>
          )}

          {Object.keys(byMatiere).length > 0 && (
            <div className="bilan-matieres">
              <div className="bilan-section-title">Par matière</div>
              {Object.entries(byMatiere).map(([m, v]) => {
                const p = v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0;
                const c = pctToColor(p);
                return (
                  <div className="bilan-matiere-row" key={m}>
                    <div className="bilan-matiere-name">{m}</div>
                    <div className="bilan-matiere-bar-wrap">
                      <div className="bilan-matiere-bar" style={{ width: `${p}%`, background: c }} />
                    </div>
                    <div className="bilan-matiere-pct" style={{ color: c }}>{p}%</div>
                  </div>
                );
              })}
            </div>
          )}

          {tips.length > 0 && (
            <div className="bilan-conseils">
              <div className="bilan-section-title">💡 Conseils</div>
              {tips.map((t, i) => (
                <div className="bilan-conseil-item" key={i}>{t}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
