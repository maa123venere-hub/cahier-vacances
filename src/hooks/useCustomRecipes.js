import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { useAuth } from '../context/AuthContext.jsx';

// Recettes personnelles (générées par l'IA puis sauvegardées).
// Stockage : users/{uid}/recipes/custom -> { list: [recette, ...] }
export function useCustomRecipes() {
  const { user } = useAuth();
  const [customRecipes, setCustomRecipes] = useState([]);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'recipes', 'custom');
    const unsubscribe = onSnapshot(ref, (snap) => {
      setCustomRecipes(snap.exists() ? snap.data().list || [] : []);
    });
    return unsubscribe;
  }, [user]);

  function persist(list) {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'recipes', 'custom');
    setDoc(ref, { list, updatedAt: new Date().toISOString() }).catch(() => {});
  }

  function saveRecipe(recipe) {
    const withId = {
      ...recipe,
      id: recipe.id || `ai-${recipe.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}-${Date.now()}`,
    };
    setCustomRecipes((prev) => {
      const list = [withId, ...prev].slice(0, 50); // garde au plus 50 recettes perso
      persist(list);
      return list;
    });
    return withId.id;
  }

  function removeRecipe(id) {
    setCustomRecipes((prev) => {
      const list = prev.filter((r) => r.id !== id);
      persist(list);
      return list;
    });
  }

  return { customRecipes, saveRecipe, removeRecipe };
}
