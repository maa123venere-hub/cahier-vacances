import { useAuth } from '../context/AuthContext.jsx';
import { getLevelMeta } from '../data/levels/index.js';
import { getMathsMeta } from '../data/maths/index.js';
import { useContenus } from './useContenus.js';

export function useLevelData() {
  const { niveau, matiere } = useAuth();
  const resolvedNiveau = niveau || '4eme';
  const resolvedMatiere = matiere || 'francais';
  const contenus = useContenus(resolvedNiveau, resolvedMatiere);

  // Metadata differs per subject. Maths uses a light meta registry; Français merges
  // the base registry entry with its level-specific .data.meta overrides.
  const meta = resolvedMatiere === 'maths'
    ? getMathsMeta(resolvedNiveau)
    : { ...getLevelMeta(resolvedNiveau), ...getLevelMeta(resolvedNiveau)?.data?.meta };

  return {
    // Legacy shapes — same interface as before, all components unchanged
    weeks: contenus.weeks,
    lessonPages: contenus.lessonPages,
    curriculum: contenus.curriculum,
    // Raw Firestore documents (admin + future use)
    jours: contenus.jours,
    semaines: contenus.semaines,
    // Metadata
    meta,
    niveau: resolvedNiveau,
    matiere: resolvedMatiere,
    loading: contenus.loading,
    seeded: contenus.seeded,
  };
}
