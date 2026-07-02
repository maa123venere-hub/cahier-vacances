import Header from '../components/Header/Header.jsx';
import Recompenses from '../components/Recompenses/Recompenses.jsx';

export default function RecompensesPage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="🏆 Motivation" title="Récompenses" subtitle="Tes succès débloqués" onMenuClick={onMenuClick} />
      <Recompenses />
    </div>
  );
}
