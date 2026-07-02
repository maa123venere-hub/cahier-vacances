import { useState } from 'react';
import PDFViewer from './PDFViewer.jsx';
import { useLevelData } from '../../hooks/useLevelData.js';
import './LessonPage.css';

export default function LessonPage({ day, dayKey, weekColor, onComplete }) {
  const { lessonPages, meta } = useLevelData();
  const pages = lessonPages[dayKey];
  const lessonPage = pages?.lesson;
  const exoPage = pages?.exercises;
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerPage, setViewerPage] = useState(lessonPage);

  function openViewer(page) {
    setViewerPage(page);
    setViewerOpen(true);
  }

  if (viewerOpen) {
    const label = viewerPage === lessonPage ? '📖 Leçon' : '✏️ Exercices';
    return (
      <PDFViewer
        pdfUrl={meta.pdfFile}
        startPage={viewerPage}
        label={label}
        color={weekColor}
        onClose={() => setViewerOpen(false)}
      />
    );
  }

  return (
    <div className="lesson-page">

      {/* En-tête coloré */}
      <div className="lesson-header" style={{ background: weekColor }}>
        <div className="lesson-header-emoji">📖</div>
        <div className="lesson-header-title">{day.lecon}</div>
      </div>

      {/* Bouton principal : ouvrir la leçon dans le viewer */}
      {lessonPage && (
        <button
          className="lesson-pdf-btn"
          style={{ borderColor: weekColor, color: weekColor }}
          onClick={() => openViewer(lessonPage)}
        >
          <span className="lesson-pdf-btn-icon">📄</span>
          <span className="lesson-pdf-btn-text">
            <span className="lesson-pdf-btn-main">Lire la leçon dans le cahier</span>
            <span className="lesson-pdf-btn-sub">Page {lessonPage} du cahier de vacances</span>
          </span>
          <span className="lesson-pdf-btn-arrow">→</span>
        </button>
      )}

      {/* Résumé du contenu de la leçon */}
      <div className="lesson-summary-card">
        <div className="lesson-summary-label">📌 Ce que tu vas apprendre</div>
        <div className="lesson-detail-text">{day.detail}</div>
      </div>

      {/* Conseil */}
      {day.tip && (
        <div className="lesson-tip">
          <span className="lesson-tip-icon">💡</span>
          <span className="lesson-tip-text">{day.tip}</span>
        </div>
      )}

      {/* Exercices à faire dans le cahier */}
      {exoPage && (
        <button
          className="lesson-exo-link"
          onClick={() => openViewer(exoPage)}
        >
          ✏️ Exercices du cahier — page {exoPage}
        </button>
      )}

      {/* Bouton J'ai compris */}
      <button
        className="lesson-done-btn"
        style={{ background: weekColor }}
        onClick={onComplete}
      >
        ✓ J'ai compris — Passer aux exercices
      </button>

    </div>
  );
}
