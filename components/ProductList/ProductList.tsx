import { clientAxios } from '@/config/clientAxios'
import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.css'
import Card from '../Card/Card'
const ProductList = () => {
  const [products, setProducts] = useState([])

    const fetchProducts = async () => {
      try {
        const fetchedProducts = await clientAxios.get('/products')
        setProducts(fetchedProducts.data.products)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchProducts();
    },[])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProducts(products.filter((product: any) => product._id !== id))
        alert('Producto eliminado')
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error)
    }
  }
  return (
    <div>
      <h3>Lista de Productos</h3>
      <ul>
        {products?.map((product: any) => {
          console.log(product)
          return <div key={product._id}>
            <Card image={product.images[0]}  />
          </div>
        })}
      </ul>
    </div>
  )
}

export default ProductList
