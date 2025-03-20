import { ICategory } from '@/interfaces'
import React, { useState } from 'react'
import styles from './CategoryList.module.css'
import { clientAxios } from '@/config/clientAxios'

const CategoryList = ({ categories, onDeletedCategory }: { categories: ICategory[], onDeletedCategory: () => void }) => {
  const [category, setCategories] = useState([categories])

  const handleDelete = async (id: string) => {
    try {

      const deletedCategory = await clientAxios.delete(`/categories/${id}`)
      setCategories(category.filter((cat: any) => cat._id !== id))
      alert('Categoría eliminada')
      onDeletedCategory()
    } catch (error) {
      console.error('Error al eliminar categoría:', error)
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Lista de Categorías</h3>
      <ul className={styles.list}>
        {categories.map((cat: any) => (
          <li key={cat._id} className={styles.item}>
            <span className={styles.itemName}>{cat.name}</span>
            <button
              onClick={() => handleDelete(cat._id)}
              className={styles.deleteButton}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryList
