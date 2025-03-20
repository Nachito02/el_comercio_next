'use client'

import { useEffect, useState } from "react"
import styles from "./Admin.module.css"
import ProductForm from "@/components/ProductForm/ProductForm"
import ProductList from "@/components/ProductList/ProductList"
import CategoryForm from "@/components/CategoryForm/CategoryForm"
import CategoryList from "@/components/CategoryList/CategoryList"
import BrandForm from "@/components/BrandForm/BrandForm"
import BrandList from "@/components/BrandList/BrandList"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products')
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const fetchData = async (endpoint, setter) => {
    try {
      const res = await fetch(`${API_URL}/${endpoint}`);
      if (!res.ok) throw new Error(`Error al obtener ${endpoint}`);
      const data = await res.json();
      setter(data[endpoint]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData("brand", setBrands);
    fetchData("categories", setCategories);
    fetchData("products", setProducts);
  }, []);

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
            <ProductForm brands={brands} categories={categories} onProductCreated={() => fetchData("products", setProducts)} />
            <ProductList products={products} onDeleteProduct={() => fetchData("products", setProducts)} />
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
            <BrandForm onBrandCreated={() => fetchData("brand", setBrands)} />
            <BrandList brand={brands} onBrandCreated={() => fetchData("brand", setBrands)} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;