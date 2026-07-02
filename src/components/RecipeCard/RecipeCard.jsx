import './RecipeCard.css';

export default function RecipeCard({ recipe, isOpen, onToggleOpen, isFavorite, onToggleFavorite }) {
  return (
    <div className="recipe-card">
      <div className="recipe-header" onClick={onToggleOpen}>
        <span className="recipe-emoji">{recipe.emoji}</span>
        <div className="recipe-info">
          <div className="recipe-name">{recipe.name}</div>
          <div className="recipe-meta">
            <span>⏱ {recipe.duration}</span>
            <span>📊 {recipe.difficulty}</span>
            <span>🔥 {recipe.calories} kcal</span>
          </div>
        </div>
        <button className="recipe-fav" onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={`recipe-detail ${isOpen ? 'open' : ''}`}>
        <div className="recipe-section-title">Ingrédients</div>
        <ul className="recipe-list">
          {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>

        <div className="recipe-section-title">Préparation</div>
        <ol className="recipe-steps">
          {recipe.preparation.map((step, i) => <li key={i}>{step}</li>)}
        </ol>

        <div className="recipe-section-title">Valeurs nutritionnelles</div>
        <div className="nutrition-grid">
          <div className="nutrition-box">
            <div className="nutrition-value">{recipe.calories}</div>
            <div className="nutrition-label">kcal</div>
          </div>
          <div className="nutrition-box">
            <div className="nutrition-value">{recipe.proteines} g</div>
            <div className="nutrition-label">Protéines</div>
          </div>
          <div className="nutrition-box">
            <div className="nutrition-value">{recipe.glucides} g</div>
            <div className="nutrition-label">Glucides</div>
          </div>
          <div className="nutrition-box">
            <div className="nutrition-value">{recipe.lipides} g</div>
            <div className="nutrition-label">Lipides</div>
          </div>
        </div>
      </div>
    </div>
  );
}
