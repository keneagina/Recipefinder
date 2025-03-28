function CategorySelector({ categories, onSelect }) {
  return (
    <div className="category-selector">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className="category-button"
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategorySelector