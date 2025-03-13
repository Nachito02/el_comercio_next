import React, { useState } from 'react'
import styles from './CategoryForm.module.css'
const CategoryForm = () => {
  const [category, setCategory] = useState({ name: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      })
      if (res.ok) alert('Categoría creada con éxito')
    } catch (error) {
      console.error('Error al crear categoría:', error)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Crear categoria</h2>

      <div className={styles.inputBox}>
        <input name="name" placeholder="Nombre de la categoría" onChange={handleChange} />

      </div>
      <button className={styles.submitButton} type="submit">Crear Categoría</button>
    </form>
  )
}

export default CategoryForm
