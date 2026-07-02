import Header from '../components/Header/Header.jsx';
import Statistiques from '../components/Statistiques/Statistiques.jsx';

export default function StatistiquesPage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="📊 Bilan" title="Statistiques" subtitle="Ta progression en un coup d'œil" onMenuClick={onMenuClick} />
      <Statistiques />
    </div>
  );
}
