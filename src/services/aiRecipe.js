import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../firebase/config.js';

const functions = getFunctions(app, 'europe-west1');

// Demande à l'IA d'écrire la recette du plat recherché.
export async function generateRecipeAI(query) {
  const call = httpsCallable(functions, 'generateRecipe');
  const res = await call({ query });
  return res.data.recipe;
}

// URL de recherche Marmiton (ouverte dans un nouvel onglet — l'iframe est
// bloquée par Marmiton lui-même via X-Frame-Options).
export function marmitonSearchUrl(query) {
  return `https://www.marmiton.org/recettes/recherche.aspx?aqt=${encodeURIComponent(query)}`;
}
