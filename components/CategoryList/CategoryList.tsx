import { ICategory } from '@/interfaces'
import React, {  useState } from 'react'

const CategoryList = ({categories} : {categories: ICategory[]}) => {

  const [category, setCategories] = useState([categories])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setCategories(category.filter((cat: any) => cat._id !== id))
        alert('Categoría eliminada')
      }
    } catch (error) {
      console.error('Error al eliminar categoría:', error)
    }
  }

  return (
    <div>
      <h3>Lista de Categorías</h3>
      <ul>
        {categories.map((cat: any) => (
          <li key={cat._id}>
            {cat.name}
            <button onClick={() => handleDelete(cat._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
