import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as pdfjsLib from 'pdfjs-dist';
import './PDFViewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export default function PDFViewer({ pdfUrl, startPage, label, color, onClose }) {
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(startPage || 1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const renderTaskRef = useRef(null);

  // Charger le document PDF
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
    loadingTask.promise.then(pdf => {
      if (cancelled) return;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setLoading(false);
    }).catch(err => {
      // Le cleanup (StrictMode / démontage) appelle destroy() → rejet « Loading aborted » à ignorer
      if (cancelled) return;
      setError('Impossible de charger le PDF.');
      setLoading(false);
      console.error(err);
    });
    return () => { cancelled = true; loadingTask.destroy?.(); };
  }, [pdfUrl]);

  // Rendre la page courante
  const renderPage = useCallback(async (pdf, pageNum) => {
    if (!pdf || !canvasRef.current) return;
    // Annuler le rendu précédent si en cours
    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }
    try {
      const page = await pdf.getPage(pageNum);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const viewport = page.getViewport({ scale: 1 });
      const scale = (containerWidth / viewport.width) * dpr;
      const scaledViewport = page.getViewport({ scale });
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;
      canvas.style.width = containerWidth + 'px';
      canvas.style.height = (scaledViewport.height / dpr) + 'px';
      const ctx = canvas.getContext('2d');
      const renderTask = page.render({ canvasContext: ctx, viewport: scaledViewport });
      renderTaskRef.current = renderTask;
      await renderTask.promise;
      renderTaskRef.current = null;
    } catch (err) {
      if (err?.name !== 'RenderingCancelledException') {
        console.error('Erreur rendu page:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (pdfDoc) renderPage(pdfDoc, currentPage);
  }, [pdfDoc, currentPage, renderPage]);

  return createPortal(
    <div className="pdfv-fullscreen">
      {/* Barre de navigation */}
      <div className="pdfv-bar" style={{ background: color }}>
        <button className="pdfv-back" onClick={onClose}>← Retour</button>
        <span className="pdfv-title">{label} — p.{currentPage}</span>
        <a className="pdfv-ext" href={`${pdfUrl}#page=${currentPage}`} target="_blank" rel="noreferrer">↗</a>
      </div>

      {/* Zone de scroll avec le canvas */}
      <div className="pdfv-scroll">
        {loading && (
          <div className="pdfv-loading">
            <div className="pdfv-spinner" />
            <p>Chargement du cahier…</p>
          </div>
        )}
        {error && (
          <div className="pdfv-error">
            <p>{error}</p>
            <a href={`${pdfUrl}#page=${currentPage}`} target="_blank" rel="noreferrer">
              Ouvrir dans un nouvel onglet ↗
            </a>
          </div>
        )}
        {!loading && !error && <canvas ref={canvasRef} className="pdfv-canvas" />}
      </div>

      {/* Barre de navigation pages */}
      {!loading && !error && totalPages > 1 && (
        <div className="pdfv-nav">
          <button
            className="pdfv-nav-btn"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
          >‹ Préc.</button>
          <span className="pdfv-nav-info">Page {currentPage} / {totalPages}</span>
          <button
            className="pdfv-nav-btn"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
          >Suiv. ›</button>
        </div>
      )}
    </div>,
    document.body
  );
}
