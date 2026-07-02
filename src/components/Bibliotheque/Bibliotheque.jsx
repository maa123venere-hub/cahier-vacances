import { useMemo, useState } from 'react';
import { useFavorites } from '../../hooks/useFavorites.js';
import { useLevelData } from '../../hooks/useLevelData.js';
import PDFViewer from '../Lesson/PDFViewer.jsx';
import './Bibliotheque.css';

// Fallback pour les leçons sans page dans le cahier PDF :
// on génère une fiche imprimable à partir du résumé de la leçon.
function downloadAsPdf(lesson) {
  const win = window.open('', '_blank');
  win.document.write(`
    <html><head><title>${lesson.lecon}</title>
    <style>body{font-family:sans-serif;padding:40px;color:#1E293B}h1{color:#4338CA;font-size:20px}p{line-height:1.6}</style>
    </head><body>
    <h1>${lesson.lecon}</h1>
    <p><strong>Semaine ${lesson.weekNum} — ${lesson.label}</strong></p>
    <p>${lesson.detail}</p>
    <p><em>💡 ${lesson.tip}</em></p>
    </body></html>
  `);
  win.document.close();
  win.print();
}

export default function Bibliotheque() {
  const { favorites, toggleFavorite } = useFavorites('library');
  const { weeks, lessonPages, meta } = useLevelData();
  const [search, setSearch] = useState('');
  const [weekFilter, setWeekFilter] = useState('all');
  const [openId, setOpenId] = useState(null);
  // Viewer PDF : { page, label, color } quand ouvert, null sinon
  const [viewer, setViewer] = useState(null);

  const lessons = useMemo(() =>
    weeks.flatMap((w, wi) =>
      w.days.map((d, di) => {
        const id = `${wi}-${di}`;
        return {
          id,
          weekNum: w.num,
          weekColor: w.color,
          label: d.label,
          lecon: d.lecon,
          detail: d.detail,
          tip: d.tip,
          // Page réelle dans le cahier PDF (si disponible pour ce niveau/matière)
          pdfPage: lessonPages[id]?.lesson || null,
          exercisesPage: lessonPages[id]?.exercises || null,
        };
      })
    ), [weeks, lessonPages]);

  const filtered = useMemo(() => {
    return lessons.filter((l) => {
      if (weekFilter === 'favorites' && !favorites.includes(l.id)) return false;
      if (weekFilter !== 'all' && weekFilter !== 'favorites' && String(l.weekNum) !== weekFilter) return false;
      if (search && !l.lecon.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [lessons, search, weekFilter, favorites]);

  const hasPdf = !!meta?.pdfFile;

  // ── Viewer plein écran : le cahier s'ouvre à la bonne page ──
  if (viewer) {
    return (
      <PDFViewer
        pdfUrl={meta.pdfFile}
        startPage={viewer.page}
        label={viewer.label}
        color={viewer.color}
        onClose={() => setViewer(null)}
      />
    );
  }

  return (
    <div className="biblio-body">
      <div className="biblio-controls">
        <input className="biblio-search" placeholder="🔍 Rechercher une leçon…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="biblio-filters">
          <button className={`biblio-filter-btn ${weekFilter === 'all' ? 'active' : ''}`} onClick={() => setWeekFilter('all')}>Toutes</button>
          <button className={`biblio-filter-btn ${weekFilter === 'favorites' ? 'active' : ''}`} onClick={() => setWeekFilter('favorites')}>❤️ Favoris</button>
          {weeks.map((w) => (
            <button key={w.num} className={`biblio-filter-btn ${weekFilter === String(w.num) ? 'active' : ''}`} onClick={() => setWeekFilter(String(w.num))}>
              S{w.num}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && <div className="biblio-empty">Aucune leçon ne correspond à ta recherche.</div>}

      {filtered.map((lesson) => (
        <div key={lesson.id} className="biblio-card">
          <div className="biblio-card-head" onClick={() => setOpenId((prev) => (prev === lesson.id ? null : lesson.id))}>
            <div className="biblio-card-info">
              <div className="biblio-card-week" style={{ color: lesson.weekColor }}>Semaine {lesson.weekNum} · {lesson.label}</div>
              <div className="biblio-card-title">{lesson.lecon}</div>
            </div>
            <button className="biblio-card-fav" onClick={(e) => { e.stopPropagation(); toggleFavorite(lesson.id); }}>
              {favorites.includes(lesson.id) ? '❤️' : '🤍'}
            </button>
          </div>
          <div className={`biblio-card-detail ${openId === lesson.id ? 'open' : ''}`}>
            <div className="detail-box">{lesson.detail}</div>
            <div className="tip-box" style={{ marginTop: 10 }}>
              <span className="tip-icon">💡</span>
              <span className="tip-text">{lesson.tip}</span>
            </div>
            <div className="biblio-card-actions">
              {hasPdf && lesson.pdfPage ? (
                <>
                  <button
                    className="biblio-pdf-btn"
                    onClick={() => setViewer({ page: lesson.pdfPage, label: `📖 ${lesson.lecon}`, color: lesson.weekColor })}
                  >
                    📄 Ouvrir le cahier — p. {lesson.pdfPage}
                  </button>
                  {lesson.exercisesPage && lesson.exercisesPage !== lesson.pdfPage && (
                    <button
                      className="biblio-pdf-btn"
                      onClick={() => setViewer({ page: lesson.exercisesPage, label: `✏️ Exercices — ${lesson.lecon}`, color: lesson.weekColor })}
                    >
                      ✏️ Exercices — p. {lesson.exercisesPage}
                    </button>
                  )}
                </>
              ) : (
                <button className="biblio-pdf-btn" onClick={() => downloadAsPdf(lesson)}>📄 Télécharger en PDF</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
