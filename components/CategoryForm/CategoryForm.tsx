import React, { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre de la categoría" onChange={handleChange} />
      <button type="submit">Crear Categoría</button>
    </form>
  )
}

export default CategoryForm
