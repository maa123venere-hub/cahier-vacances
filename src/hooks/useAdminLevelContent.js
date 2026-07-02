import { useEffect, useState, useCallback } from 'react';
import { fetchJours, fetchSemaines, saveJour, deleteJour, saveSemaine } from '../services/contenusService.js';

function newExerciceId(jourId) {
  return `${jourId}-${Date.now()}`;
}

export function useAdminLevelContent(niveau) {
  const [jours, setJours] = useState([]);
  const [semaines, setSemaines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Load Firestore data
      const [fsJours, fsSemaines] = await Promise.all([
        fetchJours(niveau),
        fetchSemaines(niveau),
      ]);

      // For 4ème: if Firestore is empty, fall back to static seed
      if (fsJours.length === 0 && niveau === '4eme') {
        const { buildSeedJours, buildSeedSemaines } = await import('../data/seed/4eme.js');
        setJours(buildSeedJours().map((j) => ({ ...j, fromFirestore: false })));
        setSemaines(buildSeedSemaines().map((s) => ({ ...s, fromFirestore: false })));
      } else {
        setJours(fsJours.map((j) => ({ ...j, fromFirestore: true })).sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0)));
        setSemaines(fsSemaines.sort((a, b) => (a.index ?? 0) - (b.index ?? 0)));
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [niveau]);

  useEffect(() => { load(); }, [load]);

  async function handleSaveJour(id, data) {
    await saveJour(niveau, id, data);
    await load();
  }

  async function handleDeleteJour(id) {
    await deleteJour(niveau, id);
    await load();
  }

  async function handleAddJour(id, data) {
    // Compute ordre = max existing + 1
    const maxOrdre = jours.reduce((m, j) => Math.max(m, j.ordre ?? 0), -1);
    await saveJour(niveau, id, { ...data, ordre: maxOrdre + 1 });
    await load();
  }

  async function handleSaveExercice(jourId, exercice) {
    const jour = jours.find((j) => j.id === jourId);
    const existing = jour?.exercices || [];
    const idx = existing.findIndex((e) => e.id === exercice.id);
    let updated;
    if (idx >= 0) {
      updated = existing.map((e, i) => (i === idx ? exercice : e));
    } else {
      updated = [...existing, { ...exercice, id: exercice.id || newExerciceId(jourId) }];
    }
    await saveJour(niveau, jourId, { exercices: updated });
    await load();
  }

  async function handleDeleteExercice(jourId, exerciceId) {
    const jour = jours.find((j) => j.id === jourId);
    const updated = (jour?.exercices || []).filter((e) => e.id !== exerciceId);
    await saveJour(niveau, jourId, { exercices: updated });
    await load();
  }

  async function handleSaveSemaine(index, data) {
    await saveSemaine(niveau, index, data);
    await load();
  }

  return {
    jours, semaines, loading, error, load,
    saveJour: handleSaveJour,
    deleteJour: handleDeleteJour,
    addJour: handleAddJour,
    saveExercice: handleSaveExercice,
    deleteExercice: handleDeleteExercice,
    saveSemaine: handleSaveSemaine,
  };
}
