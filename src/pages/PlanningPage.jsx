import Header from '../components/Header/Header.jsx';
import Planning from '../components/Planning/Planning.jsx';

export default function PlanningPage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="📅 Organisation" title="Planning complet" subtitle="Emploi du temps de la journée" onMenuClick={onMenuClick} />
      <Planning />
    </div>
  );
}
