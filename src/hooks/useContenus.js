import { useEffect, useState, useRef } from 'react';
import { fetchJours, fetchSemaines } from '../services/contenusService.js';
import { loadMathsLevel } from '../data/maths/index.js';

// ── Helpers ────────────────────────────────────────────────────

// Transform flat Firestore documents → legacy shapes used by all components
function buildLegacyShapes(jours, semaines) {
  // Sort
  const sortedJours = [...jours].sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0));
  const sortedSemaines = [...semaines].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

  // weeks array (Calendar, Bibliothèque, Stats…)
  const weeksMap = {};
  sortedSemaines.forEach((s) => {
    weeksMap[s.index] = {
      num: s.num,
      theme: s.theme,
      color: s.color,
      light: s.light,
      emoji: s.emoji,
      days: [],
    };
  });

  sortedJours.forEach((j) => {
    const w = weeksMap[j.semaineIndex];
    if (w) {
      w.days.push({
        label: j.label,
        lecon: j.lecon,
        detail: j.detail,
        tip: j.tip,
        type: j.type,
        matiere: j.matiere,
        exercices: j.exercices?.map((e) => e.question).filter(Boolean) || [],
      });
    }
  });

  const weeks = Object.values(weeksMap);

  // lessonPages { "0-0": { lesson, exercises } }
  const lessonPages = {};
  sortedJours.forEach((j) => {
    const key = `${j.semaineIndex}-${j.jourIndex}`;
    if (j.lessonPage || j.exercisesPage) {
      lessonPages[key] = {
        lesson: j.lessonPage || null,
        exercises: j.exercisesPage || null,
      };
    }
  });

  // curriculum { "0-0": { exercises: [...] } }
  const curriculum = {};
  sortedJours.forEach((j) => {
    const key = `${j.semaineIndex}-${j.jourIndex}`;
    curriculum[key] = { exercises: j.exercices || [] };
  });

  return { weeks, lessonPages, curriculum };
}

// Build the static seed fallback shapes for 4ème
// Lazy-imported so it doesn't affect bundle for other levels
let _4emeSeedCache = null;
async function get4emeSeedShapes() {
  if (_4emeSeedCache) return _4emeSeedCache;
  const { buildSeedJours, buildSeedSemaines } = await import('../data/seed/4eme.js');
  const jours = buildSeedJours();
  const semaines = buildSeedSemaines();
  _4emeSeedCache = { jours, semaines, ...buildLegacyShapes(jours, semaines) };
  return _4emeSeedCache;
}

// Build the static seed fallback shapes for 6ème
let _6emeSeedCache = null;
async function get6emeSeedShapes() {
  if (_6emeSeedCache) return _6emeSeedCache;
  const { buildSeedJours, buildSeedSemaines } = await import('../data/seed/6eme.js');
  const jours = buildSeedJours();
  const semaines = buildSeedSemaines();
  _6emeSeedCache = { jours, semaines, ...buildLegacyShapes(jours, semaines) };
  return _6emeSeedCache;
}

// Build the static seed fallback shapes for 5ème
let _5emeSeedCache = null;
async function get5emeSeedShapes() {
  if (_5emeSeedCache) return _5emeSeedCache;
  const { buildSeedJours, buildSeedSemaines } = await import('../data/seed/5eme.js');
  const jours = buildSeedJours();
  const semaines = buildSeedSemaines();
  _5emeSeedCache = { jours, semaines, ...buildLegacyShapes(jours, semaines) };
  return _5emeSeedCache;
}

// Build the static seed fallback shapes for 3ème
let _3emeSeedCache = null;
async function get3emeSeedShapes() {
  if (_3emeSeedCache) return _3emeSeedCache;
  const { buildSeedJours, buildSeedSemaines } = await import('../data/seed/3eme.js');
  const jours = buildSeedJours();
  const semaines = buildSeedSemaines();
  _3emeSeedCache = { jours, semaines, ...buildLegacyShapes(jours, semaines) };
  return _3emeSeedCache;
}

// Maths seed shapes cache (per level) — built from the static maths content
const _mathsSeedCache = {};
async function getMathsSeedShapes(niveau) {
  if (_mathsSeedCache[niveau]) return _mathsSeedCache[niveau];
  const mod = await loadMathsLevel(niveau);
  const jours = mod.buildSeedJours();
  const semaines = mod.buildSeedSemaines();
  _mathsSeedCache[niveau] = { jours, semaines, ...buildLegacyShapes(jours, semaines) };
  return _mathsSeedCache[niveau];
}

// ── Hook ───────────────────────────────────────────────────────
export function useContenus(niveau, matiere = 'francais') {
  const [state, setState] = useState({
    jours: [],
    semaines: [],
    weeks: [],
    lessonPages: {},
    curriculum: {},
    loading: true,
    seeded: false,    // true if Firestore has data
  });

  const niveauRef = useRef(niveau);
  niveauRef.current = niveau;
  const matiereRef = useRef(matiere);
  matiereRef.current = matiere;

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true }));

    (async () => {
      // ── Maths: purely static content (no Firestore), served from the seed cache ──
      if (matiere === 'maths') {
        const seed = await getMathsSeedShapes(niveau);
        if (!cancelled && matiereRef.current === 'maths' && niveauRef.current === niveau) {
          setState({
            jours: seed.jours,
            semaines: seed.semaines,
            weeks: seed.weeks,
            lessonPages: seed.lessonPages,
            curriculum: seed.curriculum,
            loading: false,
            seeded: false,
          });
        }
        return;
      }

      // 1. For levels with static seed data, immediately serve it so UI renders instantly
      if (niveau === '4eme') {
        const seed = await get4emeSeedShapes();
        if (!cancelled) {
          setState({
            jours: seed.jours,
            semaines: seed.semaines,
            weeks: seed.weeks,
            lessonPages: seed.lessonPages,
            curriculum: seed.curriculum,
            loading: false,
            seeded: false,
          });
        }
      } else if (niveau === '6eme') {
        const seed = await get6emeSeedShapes();
        if (!cancelled) {
          setState({
            jours: seed.jours,
            semaines: seed.semaines,
            weeks: seed.weeks,
            lessonPages: seed.lessonPages,
            curriculum: seed.curriculum,
            loading: false,
            seeded: false,
          });
        }
      } else if (niveau === '5eme') {
        const seed = await get5emeSeedShapes();
        if (!cancelled) {
          setState({
            jours: seed.jours,
            semaines: seed.semaines,
            weeks: seed.weeks,
            lessonPages: seed.lessonPages,
            curriculum: seed.curriculum,
            loading: false,
            seeded: false,
          });
        }
      } else if (niveau === '3eme') {
        const seed = await get3emeSeedShapes();
        if (!cancelled) {
          setState({
            jours: seed.jours,
            semaines: seed.semaines,
            weeks: seed.weeks,
            lessonPages: seed.lessonPages,
            curriculum: seed.curriculum,
            loading: false,
            seeded: false,
          });
        }
      }

      // 2. Fetch from Firestore (all levels)
      try {
        const [firestoreJours, firestoreSemaines] = await Promise.all([
          fetchJours(niveau),
          fetchSemaines(niveau),
        ]);

        if (cancelled || niveauRef.current !== niveau) return;

        if (firestoreJours.length > 0) {
          // Firestore has data → use it
          const shapes = buildLegacyShapes(firestoreJours, firestoreSemaines);
          setState({
            jours: firestoreJours,
            semaines: firestoreSemaines,
            ...shapes,
            loading: false,
            seeded: true,
          });
        } else if (niveau !== '4eme' && niveau !== '6eme' && niveau !== '5eme' && niveau !== '3eme') {
          // No Firestore data, no static fallback for this level
          setState({
            jours: [], semaines: [], weeks: [], lessonPages: {}, curriculum: {},
            loading: false, seeded: false,
          });
        }
        // For 4ème with empty Firestore: state already set from step 1, keep it
      } catch (err) {
        if (!cancelled) {
          console.error('[useContenus] Firestore error:', err);
          setState((prev) => ({ ...prev, loading: false }));
        }
      }
    })();

    return () => { cancelled = true; };
  }, [niveau, matiere]);

  return state;
}
