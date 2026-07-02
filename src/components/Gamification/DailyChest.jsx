import { useState } from 'react';
import './Gamification.css';

export default function DailyChest({ canClaim, onClaim }) {
  const [result, setResult] = useState(null);

  function handleClaim() {
    const reward = onClaim();
    if (reward) setResult(reward);
  }

  return (
    <div className="chest-card">
      <div className="chest-emoji">{canClaim ? '🎁' : '✅'}</div>
      <div className="chest-title">Coffre quotidien</div>
      <div className="chest-sub">{canClaim ? 'Ouvre ton coffre pour gagner des pièces bonus !' : 'Tu as déjà ouvert ton coffre aujourd\'hui. Reviens demain !'}</div>
      <button className="chest-btn" onClick={handleClaim} disabled={!canClaim}>
        {canClaim ? 'Ouvrir le coffre' : 'Déjà ouvert'}
      </button>
      {result !== null && <div className="chest-result">🪙 +{result} pièces gagnées !</div>}
    </div>
  );
}
