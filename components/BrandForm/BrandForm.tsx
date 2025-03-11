import React, { useState } from 'react'

const brandForm = () => {
    const [brand, setBrand] = useState({ name: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand({ ...brand, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/brand', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(brand),
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

export default brandForm
