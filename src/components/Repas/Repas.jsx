import { useMemo, useState } from 'react';
import { RECIPES, RECIPE_CATEGORIES } from '../../data/recipes.js';
import { useFavorites } from '../../hooks/useFavorites.js';
import { useCustomRecipes } from '../../hooks/useCustomRecipes.js';
import { generateRecipeAI, marmitonSearchUrl } from '../../services/aiRecipe.js';
import RecipeCard from '../RecipeCard/RecipeCard.jsx';
import './Repas.css';

export default function Repas() {
  const { favorites, toggleFavorite } = useFavorites();
  const { customRecipes, saveRecipe, removeRecipe } = useCustomRecipes();
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [aiRecipe, setAiRecipe] = useState(null);   // recette générée (pas encore sauvegardée)
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState('');

  const q = search.trim().toLowerCase();
  const customIds = useMemo(() => new Set(customRecipes.map((r) => r.id)), [customRecipes]);

  // Recherche dans toutes les recettes (catalogue + recettes perso) : nom + ingrédients
  const matches = (r) =>
    !q ||
    r.name.toLowerCase().includes(q) ||
    (r.ingredients || []).some((ing) => ing.toLowerCase().includes(q));

  const allRecipes = useMemo(() => [...customRecipes, ...RECIPES], [customRecipes]);

  const recipes = allRecipes.filter((r) => {
    if (!matches(r)) return false;
    if (q) return true; // en mode recherche, on ignore les filtres de catégorie
    if (filter === 'favorites') return favorites.includes(r.id);
    if (filter === 'custom') return customIds.has(r.id);
    if (filter !== 'all') return r.category === filter;
    return true;
  });

  async function handleGenerate() {
    setAiBusy(true);
    setAiError('');
    setAiRecipe(null);
    try {
      const recipe = await generateRecipeAI(search.trim());
      setAiRecipe(recipe);
      setOpenId('__ai__');
    } catch {
      setAiError('L\'IA n\'a pas pu créer cette recette. Réessaie, ou cherche sur Marmiton.');
    } finally {
      setAiBusy(false);
    }
  }

  function handleSaveAiRecipe() {
    if (!aiRecipe) return;
    const id = saveRecipe(aiRecipe);
    setAiRecipe(null);
    setOpenId(id);
  }

  function handleSearchChange(value) {
    setSearch(value);
    setAiRecipe(null);
    setAiError('');
  }

  return (
    <div className="repas-body">
      {/* ── Barre de recherche ── */}
      <div className="repas-search-wrap">
        <input
          className="repas-search"
          placeholder="🔍 Cherche un plat : lasagnes, crêpes, poulet curry…"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {q && (
          <button className="repas-search-clear" onClick={() => handleSearchChange('')}>✕</button>
        )}
      </div>

      {!q && (
        <div className="repas-filters">
          <button className={`repas-filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Toutes</button>
          <button className={`repas-filter-btn ${filter === 'favorites' ? 'active' : ''}`} onClick={() => setFilter('favorites')}>❤️ Favoris</button>
          {customRecipes.length > 0 && (
            <button className={`repas-filter-btn ${filter === 'custom' ? 'active' : ''}`} onClick={() => setFilter('custom')}>✨ Mes recettes</button>
          )}
          {RECIPE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`repas-filter-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Recette générée par l'IA (pas encore sauvegardée) ── */}
      {aiRecipe && (
        <div className="repas-ai-result">
          <div className="repas-ai-banner">✨ Recette créée pour toi — clique sur le cœur pour la garder dans « Mes recettes »</div>
          <RecipeCard
            recipe={aiRecipe}
            isOpen={openId === '__ai__'}
            onToggleOpen={() => setOpenId((prev) => (prev === '__ai__' ? null : '__ai__'))}
            isFavorite={false}
            onToggleFavorite={handleSaveAiRecipe}
          />
        </div>
      )}

      {/* ── Résultats ── */}
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isOpen={openId === recipe.id}
          onToggleOpen={() => setOpenId((prev) => (prev === recipe.id ? null : recipe.id))}
          isFavorite={customIds.has(recipe.id) ? true : favorites.includes(recipe.id)}
          onToggleFavorite={() => (customIds.has(recipe.id) ? removeRecipe(recipe.id) : toggleFavorite(recipe.id))}
        />
      ))}

      {/* ── Recherche sans résultat local : IA + Marmiton ── */}
      {q && !aiRecipe && (
        <div className="repas-search-actions">
          {recipes.length === 0 && (
            <div className="repas-search-empty">Aucune recette « {search.trim()} » dans le catalogue… mais on peut la créer !</div>
          )}
          {aiError && <div className="repas-ai-error">{aiError}</div>}
          <button className="repas-ai-btn" onClick={handleGenerate} disabled={aiBusy}>
            {aiBusy ? '👨‍🍳 L\'IA écrit ta recette…' : `✨ Créer la recette « ${search.trim()} » avec l'IA`}
          </button>
          <a
            className="repas-marmiton-btn"
            href={marmitonSearchUrl(search.trim())}
            target="_blank"
            rel="noreferrer"
          >
            🍳 Chercher « {search.trim()} » sur Marmiton ↗
          </a>
        </div>
      )}

      {!q && recipes.length === 0 && (
        <div style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center', padding: 30 }}>
          {filter === 'favorites' ? 'Aucune recette favorite pour l\'instant.' : 'Aucune recette dans cette catégorie.'}
        </div>
      )}
    </div>
  );
}
