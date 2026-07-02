import { useEffect, useState } from 'react';
import Header from '../Header/Header.jsx';
import Calendar from '../Calendar/Calendar.jsx';
import AnnouncementBanner from '../Announcements/AnnouncementBanner.jsx';
import SubjectSwitcher from '../SubjectSwitcher/SubjectSwitcher.jsx';
import { useDone } from '../../hooks/useDone.js';
import { useLevelData } from '../../hooks/useLevelData.js';

export default function CahierVacances({ onMenuClick }) {
  const { done, toggleDone } = useDone();
  const { weeks, meta, loading, jours, niveau, matiere } = useLevelData();
  const totalDays = weeks.reduce((s, w) => s + w.days.length, 0);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [openDay, setOpenDay] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  // Reset navigation when the subject changes (weeks differ between Français and Maths)
  useEffect(() => {
    setCurrentWeek(0);
    setOpenDay(null);
  }, [matiere]);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone;
    if (isIOS && !isStandalone) setShowInstallBanner(true);
  }, []);

  const totalDone = Object.values(done).filter(Boolean).length;
  const pct = Math.round((totalDone / (totalDays || 1)) * 100);

  function handleChangeWeek(i) {
    if (i < 0 || i >= weeks.length) return;
    setCurrentWeek(i);
    setOpenDay(null);
  }

  function handleToggleDay(j) {
    setOpenDay((prev) => (prev === j ? null : j));
  }

  return (
    <div className="page-fade">
      <Header label="📚 Révisions Été 2026" title="Calendrier 2k26" subtitle={meta.description} onMenuClick={onMenuClick}>
        <div className="progress-wrap">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="progress-label">{totalDone} / {totalDays} journées terminées</div>
        </div>
      </Header>

      {showInstallBanner && (
        <div className="install-banner">
          <div className="install-icon">📲</div>
          <div className="install-text">
            <div className="install-title">Ajouter à l'écran d'accueil</div>
            <div className="install-sub">iOS : bouton Partager → "Sur l'écran d'accueil"</div>
          </div>
          <button className="install-close" onClick={() => setShowInstallBanner(false)}>✕</button>
        </div>
      )}

      <AnnouncementBanner />

      <SubjectSwitcher />

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 12, color: 'var(--text-muted, #888)' }}>
          <div style={{ fontSize: '2rem' }}>📚</div>
          <p style={{ margin: 0 }}>Chargement du calendrier…</p>
        </div>
      ) : weeks.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 16, color: 'var(--text-muted, #888)', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem' }}>🚧</div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)' }}>Contenu bientôt disponible</p>
          <p style={{ margin: 0, fontSize: '0.9rem', maxWidth: 260 }}>Le cahier de vacances pour ce niveau est en cours de préparation. Reviens bientôt !</p>
        </div>
      ) : (
        <Calendar
          weeks={weeks}
          currentWeek={Math.min(currentWeek, weeks.length - 1)}
          onChangeWeek={handleChangeWeek}
          openDay={openDay}
          onToggleDay={handleToggleDay}
          done={done}
          onToggleDone={toggleDone}
          jours={jours}
          niveau={niveau}
        />
      )}
    </div>
  );
}
