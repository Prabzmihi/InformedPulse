import React from 'react'
import './category.css'

const Category = ({
  clickedCat,onChangeCat
}) => {
  const categories = [
    'Business', 
    'Crime', 
    'Culture', 
    'Education', 
    'Entertainment', 
    'Environment', 
    'Health', 
    'Lifestyle', 
    'Politics', 
    'Science', 
    'Sports', 
    'Technology', 
    'Travel'
  ];

  const handleOnclick = (value) => {
    onChangeCat(value.category)
  }

  return (
    <div className='categoryContainer'>
      {categories.map(category => (
        <div className="categoryItem" onClick={()=>handleOnclick({category})}>
          {category}
        </div>
      ))}
    </div>
  )
}

export default Category
