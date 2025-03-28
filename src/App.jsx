import { useState } from 'react'

import CategorySelector from './components/CategorySelector'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const categoryMapping = {
    'Chicken': 'Chicken',
    'Beef': 'Beef',
    'Fish': 'Seafood',
    'Vegetables': 'Vegetarian',
    'Pasta': 'Pasta'
  }

  const categories = Object.keys(categoryMapping)

  const handleCategorySelect = (category) => {
    setSelectedCategory(categoryMapping[category])
  }

  return (
    <div className="app">
      <div className="hero">
        <h1>Recipe Finder</h1>
        <p className="hero-text">
          Discover delicious recipes from around the world. 
          Select a category below and start cooking!
        </p>
        
      </div>
      <CategorySelector 
        categories={categories} 
        onSelect={handleCategorySelect}
      />
      {!selectedRecipe ? (
        <RecipeList 
          category={selectedCategory}
          onRecipeSelect={setSelectedRecipe}
        />
      ) : (
        <RecipeDetail 
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  )
}

export default App