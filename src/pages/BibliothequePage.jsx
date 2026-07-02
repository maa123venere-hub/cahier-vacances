import Header from '../components/Header/Header.jsx';
import Bibliotheque from '../components/Bibliotheque/Bibliotheque.jsx';

export default function BibliothequePage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="📖 Ressources" title="Bibliothèque" subtitle="Toutes les leçons de l'été" onMenuClick={onMenuClick} />
      <Bibliotheque />
    </div>
  );
}
