import { clientAxios } from '@/config/clientAxios'
import { IBrand } from '@/interfaces'
import React, { useState } from 'react'

const CategoryList = ({ brand, onBrandCreated }: { brand: IBrand[], onBrandCreated: () => void }) => {
    const [brands, setBrands] = useState([brand])

    const handleDelete = async (id: string) => {
        try {
            const brandDeleted = await clientAxios.delete(`/brand/${id}`)
            setBrands(brands.filter((cat: any) => cat._id !== id))
            alert('Categoría eliminada')
            onBrandCreated()

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
