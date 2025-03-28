import { useState, useEffect } from 'react'

function RecipeDetail({ recipe, onBack }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe}`)
      .then(res => res.json())
      .then(data => {
        setDetails(data.meals[0])
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching recipe:', error)
        setLoading(false)
      })
  }, [recipe])

  if (loading) return (
    <div className="recipe-detail">
      <button onClick={onBack} className="back-button">← Back</button>
      <div style={{ textAlign: 'center', padding: '40px' }}>Loading recipe details...</div>
    </div>
  )

  if (!details) return (
    <div className="recipe-detail">
      <button onClick={onBack} className="back-button">← Back</button>
      <div style={{ textAlign: 'center', padding: '40px' }}>Recipe not found</div>
    </div>
  )

  // Get all ingredients and measurements
  const ingredients = Array.from({ length: 20 })
    .map((_, i) => {
      const ingredient = details[`strIngredient${i + 1}`]
      const measure = details[`strMeasure${i + 1}`]
      if (ingredient && ingredient.trim()) {
        return `${measure?.trim() || ''} ${ingredient.trim()}`
      }
      return null
    })
    .filter(Boolean)

  return (
    <div className="recipe-detail">
      <button onClick={onBack} className="back-button">← Back to Recipes</button>
      <h2>{details.strMeal}</h2>
      <img src={details.strMealThumb} alt={details.strMeal} />
      
      {details.strCategory && (
        <div style={{ textAlign: 'center', margin: '10px 0', color: '#666' }}>
          Category: {details.strCategory} | Area: {details.strArea || 'Not specified'}
        </div>
      )}
      
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Cooking Instructions</h3>
      <p>{details.strInstructions}</p>
    </div>
  )
}

export default RecipeDetail