'use client'
import { clientAxios } from "@/config/clientAxios"
import { useEffect, useState } from "react"
import styles from "./Admin.module.css"
import ProductForm from "@/components/ProductForm/ProductForm"
import ProductList from "@/components/ProductList/ProductList"
import CategoryForm from "@/components/CategoryForm/CategoryForm"
import CategoryList from "@/components/CategoryList/CategoryList"
import BrandForm from "@/components/BrandForm/BrandForm"
import BrandList from "@/components/BrandList/BrandList"
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

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await clientAxios.get('/products')
      setProducts(fetchedProducts.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBrands()
    fetchCategories()
    fetchProducts()
  }, [])

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Panel de Administración</h1>

      <div className={styles.nav}>
        <button onClick={() => setActiveTab('products')}>Productos</button>
        <button onClick={() => setActiveTab('categories')}>Categorías</button>
        <button onClick={() => setActiveTab('brand')}>Marcas</button>
      </div>

      <div className={styles.content}>
        {activeTab === 'products' ? (
          <>
            <h2 className={styles.subtitle}>Administrar Productos</h2>
            <ProductForm 
              brands={brands} 
              categories={categories} 
              onProductCreated={fetchProducts} // 👈 Actualiza la lista
            />
            <ProductList 
              products={products} 
              onDeleteProduct={fetchProducts} // 👈 Actualiza al eliminar
            />
          </>
        ) : activeTab === 'categories' ? (
          <>
            <h2 className={styles.subtitle}>Administrar Categorías</h2>
            <CategoryForm />
            <CategoryList categories={categories} />
          </>
        ) : (
          <>
            <h2 className={styles.subtitle}>Administrar Marcas</h2>
            <BrandForm />
            <BrandList brand={brands} />
          </>
        )}
      </div>
    </div>
  )
}

export default AdminPage
