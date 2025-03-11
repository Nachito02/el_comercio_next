import { IBrand } from '@/interfaces'
import React, { useEffect, useState } from 'react'

const CategoryList = ({brand} : {brand: IBrand[]}) => {
    const [brands, setBrands] = useState([brand])


    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/brand/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setBrands(brands.filter((cat: any) => cat._id !== id))
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
                {brand.map((cat: any) => (
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
