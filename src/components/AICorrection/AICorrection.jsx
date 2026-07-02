import './AICorrection.css';

function noteColor(note) {
  if (note >= 15) return '#16A34A';
  if (note >= 10) return '#D97706';
  return '#DC2626';
}

export default function AICorrection({ correction }) {
  if (!correction) return null;

  const date = correction.createdAt?.toDate ? correction.createdAt.toDate() : new Date();

  return (
    <div className="correction-card">
      <div className="correction-head">
        <span className="correction-note" style={{ background: noteColor(correction.note) }}>{correction.note}/20</span>
        <span className="correction-date">{date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      <div className="correction-section">
        <div className="correction-section-title">✅ Correction</div>
        <div className="correction-section-text">{correction.correction}</div>
      </div>

      <div className="correction-section">
        <div className="correction-section-title">💡 Explication</div>
        <div className="correction-section-text">{correction.explanation}</div>
      </div>

      <div className="correction-section">
        <div className="correction-section-title">📝 Bonne réponse</div>
        <div className="correction-section-text">{correction.suggestedAnswer}</div>
      </div>

      {correction.weaknesses?.length > 0 && (
        <div className="correction-section">
          <div className="correction-section-title">⚠️ Points faibles</div>
          <div>
            {correction.weaknesses.map((w, i) => <span className="weakness-tag" key={i}>{w}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
