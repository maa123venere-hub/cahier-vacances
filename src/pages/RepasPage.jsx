import Header from '../components/Header/Header.jsx';
import Repas from '../components/Repas/Repas.jsx';

export default function RepasPage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="🍽️ Alimentation" title="Repas" subtitle="Recettes variées et équilibrées, du petit-déj au dîner" onMenuClick={onMenuClick} />
      <Repas />
    </div>
  );
}
