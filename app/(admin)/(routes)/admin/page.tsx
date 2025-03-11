'use client'
import React, { useEffect, useState } from 'react'
import styles from './Admin.module.css'
import CategoryForm from '@/components/CategoryForm/CategoryForm'
import ProductForm from '@/components/ProductForm/ProductForm'
import ProductList from '@/components/ProductList/ProductList'
import CategoryList from '@/components/CategoryList/CategoryList'
import BrandForm from '@/components/BrandForm/BrandForm'
import BrandList from '@/components/BrandList/BrandList'
import { clientAxios } from '@/config/clientAxios'
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products')

  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await clientAxios.get('/categories')
      setCategories(fetchedCategories.data.categories)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBrands = async () => {
    try {
      const fetchedBrands = await clientAxios.get('/brand')
      setBrands(fetchedBrands.data.brands)
    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    fetchBrands();
    fetchCategories();
  
  }, [])

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Panel de Administración</h1>

      {/* Navegación entre productos y categorías */}
      <div className={styles.nav}>
        <button onClick={() => setActiveTab('products')}>Productos</button>
        <button onClick={() => setActiveTab('categories')}>Categorías</button>
        <button onClick={() => setActiveTab('brand')}>Marcas</button>
      </div>

      <div className={styles.content}>
        {activeTab === 'products' ? (
          <>
            <h2 className={styles.subtitle}>Administrar Productos</h2>
            <ProductForm brands={brands} categories={categories} />
            <ProductList />
          </>
        ) : activeTab === 'categories' ? (
          <>
            <h2>Administrar Categorías</h2>
            <CategoryForm />
            <CategoryList categories={categories} />
          </>
        ) : (
          <>
            <h2>Administrar Marcas</h2>
            <BrandForm />
            <BrandList brand={brands} /></>
        )
        }
      </div>
    </div>
  )
}

export default AdminPage
