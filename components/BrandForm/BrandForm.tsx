import React, { useState } from 'react'
import styles from './BrandForm.module.css'
import { clientAxios } from '@/config/clientAxios'
const brandForm = ({onBrandCreated} : {onBrandCreated: () => void}) => {
    const [brand, setBrand] = useState({ name: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand({ ...brand, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const brandAdded = await clientAxios.post('/brand', brand)
            alert('Marca agregada correctamente')
            setBrand({ name: '' })
            onBrandCreated();
        } catch (error) {
            console.error('Error al crear categoría:', error)
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
                <input name="name" placeholder="Nombre de la categoría" onChange={handleChange} />
            </div>
            <button className={styles.submitButton} type="submit">Crear Marca</button>
        </form>
    )
}

export default brandForm
