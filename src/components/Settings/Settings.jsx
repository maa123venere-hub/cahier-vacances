import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useSettings } from '../../hooks/useSettings.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './Settings.css';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logOut } = useAuth();

  async function handleNotificationsToggle() {
    if (!settings.notifications) {
      if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
        const result = await Notification.requestPermission();
        if (result !== 'granted') return;
      }
      updateSettings({ notifications: true });
    } else {
      updateSettings({ notifications: false });
    }
  }

  return (
    <div className="settings-body">
      <div className="settings-section">
        <div className="settings-row">
          <span className="settings-row-emoji">🌙</span>
          <div className="settings-row-label">
            Mode sombre
            <div className="settings-row-sub">Adapte les couleurs pour les yeux le soir</div>
          </div>
          <button className={`settings-toggle ${theme === 'dark' ? 'on' : ''}`} onClick={toggleTheme}>
            <span className="settings-toggle-knob" />
          </button>
        </div>

        <div className="settings-row">
          <span className="settings-row-emoji">🔔</span>
          <div className="settings-row-label">
            Notifications
            <div className="settings-row-sub">Rappel si tu n'as pas encore révisé aujourd'hui (tant que l'app est ouverte)</div>
          </div>
          <button className={`settings-toggle ${settings.notifications ? 'on' : ''}`} onClick={handleNotificationsToggle}>
            <span className="settings-toggle-knob" />
          </button>
        </div>

        <div className="settings-row">
          <span className="settings-row-emoji">🌍</span>
          <div className="settings-row-label">
            Langue
            <div className="settings-row-sub">D'autres langues arriveront plus tard</div>
          </div>
          <select className="settings-select" value={settings.language} disabled>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <Link className="settings-link-row" to="/confidentialite">
          <span className="settings-row-emoji">🔒</span>
          Politique de confidentialité
        </Link>
      </div>

      <button className="settings-logout" onClick={logOut}>Se déconnecter</button>
    </div>
  );
}
