import Header from '../components/Header/Header.jsx';
import Settings from '../components/Settings/Settings.jsx';

export default function SettingsPage({ onMenuClick }) {
  return (
    <div className="page-fade">
      <Header label="⚙️ Réglages" title="Paramètres" onMenuClick={onMenuClick} />
      <Settings />
    </div>
  );
}
