import { useState, useEffect } from 'react'

function RecipeList({ category, onRecipeSelect }) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setLoading(true)
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(async data => {
          const limitedRecipes = data.meals?.slice(0, 10) || []
          
          const recipesWithDetails = await Promise.all(
            limitedRecipes.map(async recipe => {
              const detailRes = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`
              )
              const detailData = await detailRes.json()
              return detailData.meals[0]
            })
          )
          setRecipes(recipesWithDetails)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching recipes:', error)
          setLoading(false)
        })
    }
  }, [category])

  const estimateCookingTime = (recipe) => {
    const instructions = recipe.strInstructions.toLowerCase()
    const hours = instructions.includes('hour') ? 
      parseInt(instructions.match(/(\d+)\s*hour/)?.[1] || 0) : 0
    const minutes = instructions.includes('minute') ? 
      parseInt(instructions.match(/(\d+)\s*minute/)?.[1] || 0) : 0
    
    if (hours === 0 && minutes === 0) return '30-45 min' // default
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`
  }

  if (loading) {
    return <div className="recipe-list loading">Loading recipes...</div>
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div 
          key={recipe.idMeal} 
          className="recipe-card"
          onClick={() => onRecipeSelect(recipe.idMeal)}
        >
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <div className="recipe-card-content">
            <h3>{recipe.strMeal}</h3>
            <div className="recipe-card-meta">
              <span className="cooking-time">
                ⏱️ {estimateCookingTime(recipe)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecipeList