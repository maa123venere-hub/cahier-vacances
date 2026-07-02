import { useAuth } from '../../context/AuthContext.jsx';
import { SUBJECTS } from '../../data/subjects.js';
import './SubjectSwitcher.css';

// Segmented toggle to switch the active subject (Français / Maths).
export default function SubjectSwitcher() {
  const { matiere, setMatiere } = useAuth();
  const current = matiere || 'francais';

  return (
    <div className="subject-switcher" role="tablist" aria-label="Choisir la matière">
      {SUBJECTS.map((s) => {
        const active = s.id === current;
        return (
          <button
            key={s.id}
            role="tab"
            aria-selected={active}
            className={`subject-tab ${active ? 'active' : ''}`}
            onClick={() => { if (!active) setMatiere(s.id); }}
          >
            <span className="subject-tab-emoji">{s.emoji}</span>
            <span className="subject-tab-label">{s.short}</span>
          </button>
        );
      })}
    </div>
  );
}
