import { useWeekSessions } from '../../hooks/useWeekSessions.js';
import './BrevetBlanc.css';

// Map exercise pct → note /20
function pctToNote20(pct) {
  if (pct >= 95) return 20;
  if (pct >= 90) return 19;
  if (pct >= 85) return 18;
  if (pct >= 80) return 17;
  if (pct >= 75) return 16;
  if (pct >= 70) return 14;
  if (pct >= 65) return 13;
  if (pct >= 60) return 12;
  if (pct >= 55) return 11;
  if (pct >= 50) return 10;
  if (pct >= 45) return 9;
  if (pct >= 40) return 8;
  if (pct >= 30) return 6;
  return 4;
}

// DNB mention from average /20
function getMention(avg) {
  if (avg >= 16) return { label: 'Très bien', color: '#16A34A', emoji: '🏆' };
  if (avg >= 14) return { label: 'Bien', color: '#16A34A', emoji: '⭐' };
  if (avg >= 12) return { label: 'Assez bien', color: '#2563EB', emoji: '📘' };
  if (avg >= 10) return { label: 'Passable', color: '#D97706', emoji: '📗' };
  return { label: 'Insuffisant', color: '#DC2626', emoji: '📕' };
}

// Generate personalised conseils based on weak matieres
function genConseils(strong, weak, mention, isFinal) {
  const tips = [];

  if (mention.label === 'Très bien' || mention.label === 'Bien') {
    tips.push(`Félicitations ! Tu es prêt${isFinal ? ' pour le brevet' : ' pour la suite'}. Continue de ne pas relâcher tes efforts en ${weak[0] || 'Maths'}.`);
  } else if (mention.label === 'Assez bien') {
    tips.push('Tu es sur la bonne voie. Encore quelques révisions et tu décroches le brevet !');
  } else {
    tips.push('Ne te décourage pas ! Revois les leçons des semaines précédentes et refais les exercices difficiles.');
  }

  if (strong.length) {
    tips.push(`Tes points forts : ${strong.slice(0, 3).join(', ')}. Appuie-toi dessus le jour J pour gagner des points.`);
  }

  if (weak.length) {
    const conseillMatiere = {
      français: 'Relis tes figures de style, pratique la dictée et entraîne-toi à l\'argumentation écrite.',
      maths: 'Refais les exercices de géométrie et de calcul algébrique, et entraîne-toi au calcul mental et aux identités remarquables.',
      histoire: 'Mémorise les dates clés et les grandes périodes. Rédige des paragraphes de réponse organisée.',
      géographie: 'Travaille les cartes et les problématiques de développement durable.',
      emc: 'Revois les institutions de la République et les valeurs républicaines.',
      svt: 'Refais les schémas du corps humain et les bilans des écosystèmes.',
      'physique-chimie': 'Entraîne-toi sur les calculs de vitesse, d\'énergie et les formules chimiques.',
      technologie: 'Révise les algorithmes simples et les systèmes techniques.',
      anglais: 'Écoute des ressources audio courtes et révise le vocabulaire thématique.',
    };
    weak.slice(0, 2).forEach((m) => {
      const tip = conseillMatiere[m.toLowerCase()] || `Revois attentivement ton cours de ${m}.`;
      tips.push(`${m} : ${tip}`);
    });
  }

  return tips;
}

export default function BrevetBlanc({ semaineIndex, weekColor, weekTheme, jours, isFinal }) {
  const { sessions, byMatiere, loading } = useWeekSessions(semaineIndex, jours);

  if (loading) {
    return (
      <div className="bb-wrap">
        <div className="bb-loading">Calcul de ton brevet blanc…</div>
      </div>
    );
  }

  const totalCorrect = sessions.reduce((s, d) => s + (d.score || 0), 0);
  const totalExos    = sessions.reduce((s, d) => s + (d.total || 0), 0);
  const hasSessions  = sessions.length > 0;

  // Global pct → note /100 et /20
  const globalPct   = totalExos > 0 ? Math.round((totalCorrect / totalExos) * 100) : 0;
  const noteSur100  = globalPct;
  const noteSur20   = pctToNote20(globalPct);
  const mention     = getMention(noteSur20);

  // Per matière notes
  const matiereNotes = Object.entries(byMatiere).map(([m, v]) => {
    const p = v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0;
    const n = pctToNote20(p);
    return { matiere: m, pct: p, note: n };
  });

  const strong = matiereNotes.filter((m) => m.note >= 14).map((m) => m.matiere);
  const weak   = matiereNotes.filter((m) => m.note < 10).map((m) => m.matiere);
  const toWork  = matiereNotes.filter((m) => m.note >= 10 && m.note < 14).map((m) => m.matiere);

  const tips = hasSessions ? genConseils(strong, weak, mention, isFinal) : [];

  return (
    <div className="bb-wrap">
      {/* Header */}
      <div className="bb-header" style={{ background: weekColor }}>
        <div className="bb-header-emoji">{isFinal ? '🏆' : '📋'}</div>
        <div className="bb-header-title">{weekTheme}</div>
        <div className="bb-header-sub">{isFinal ? 'Grand Brevet Blanc Final' : 'Brevet Blanc Intermédiaire'}</div>
      </div>

      {!hasSessions ? (
        <div className="bb-empty">
          Termine les exercices de la semaine pour voir tes résultats de brevet blanc.
        </div>
      ) : (
        <>
          {/* Score principal */}
          <div className="bb-score-section">
            <div className="bb-score-row">
              <div className="bb-score-main">
                <div className="bb-score-num">{noteSur100}</div>
                <div className="bb-score-denom">/100</div>
              </div>
              <div className="bb-score-divider" />
              <div className="bb-score-main">
                <div className="bb-score-num">{noteSur20}</div>
                <div className="bb-score-denom">/20</div>
              </div>
            </div>
            <div className="bb-score-bar-wrap">
              <div className="bb-score-bar" style={{ width: `${noteSur100}%`, background: mention.color }} />
            </div>
            <div className="bb-mention" style={{ background: mention.color }}>
              {mention.emoji} {mention.label}
            </div>
            {isFinal && (
              <div className="bb-estimation">
                <div className="bb-estimation-label">Estimation note au Brevet</div>
                <div className="bb-estimation-value" style={{ color: mention.color }}>
                  {noteSur20 >= 14
                    ? `${noteSur20}/20 — Mention ${mention.label} probable`
                    : noteSur20 >= 10
                    ? `${noteSur20}/20 — Diplôme probable`
                    : `${noteSur20}/20 — Révisions nécessaires`}
                </div>
              </div>
            )}
          </div>

          {/* Compétences maîtrisées */}
          {strong.length > 0 && (
            <div className="bb-section">
              <div className="bb-section-title">✅ Compétences maîtrisées</div>
              <div className="bb-tags">
                {strong.map((m) => (
                  <span className="bb-tag bb-tag-green" key={m}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* À consolider */}
          {toWork.length > 0 && (
            <div className="bb-section">
              <div className="bb-section-title">📘 À consolider</div>
              <div className="bb-tags">
                {toWork.map((m) => (
                  <span className="bb-tag bb-tag-blue" key={m}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Compétences à retravailler */}
          {weak.length > 0 && (
            <div className="bb-section">
              <div className="bb-section-title">⚠️ Compétences à retravailler</div>
              <div className="bb-tags">
                {weak.map((m) => (
                  <span className="bb-tag bb-tag-red" key={m}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Détail par matière */}
          {matiereNotes.length > 0 && (
            <div className="bb-section">
              <div className="bb-section-title">📊 Résultats par matière</div>
              {matiereNotes.map(({ matiere, pct: p, note: n }) => {
                const c = getMention(n).color;
                return (
                  <div className="bb-matiere-row" key={matiere}>
                    <div className="bb-matiere-name">{matiere}</div>
                    <div className="bb-matiere-bar-wrap">
                      <div className="bb-matiere-bar" style={{ width: `${p}%`, background: c }} />
                    </div>
                    <div className="bb-matiere-note" style={{ color: c }}>{n}/20</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Conseils personnalisés */}
          {tips.length > 0 && (
            <div className="bb-section bb-section-last">
              <div className="bb-section-title">💡 Conseils personnalisés</div>
              {tips.map((t, i) => (
                <div className="bb-conseil" key={i}>{t}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
