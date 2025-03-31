import { clientAxios } from '@/config/clientAxios'
import React, { useEffect, useState } from 'react'
import styles from './ProductList.module.css'
import Card from '../Card/Card'
import { CircleX } from 'lucide-react'
import { useRouter } from 'next/navigation'
const ProductList = ({ products, onDeleteProduct }: { products: any[]; onDeleteProduct: () => void }) => {

  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      await clientAxios.delete(`/products/${id}`)
      alert('Producto eliminado')
      onDeleteProduct() // 👈 Actualizar la lista
    } catch (error) {
      console.error('Error al eliminar producto:', error)
    }

  }
  return (
    <div>
      <h3>Lista de Productos</h3>
      <ul className={styles.list}>
        {products?.map((product: any) => {
          console.log(product)
          return <div onClick={() => router.push(`/edit/${product._id}`)} key={product._id}>
            <>
              <div className={styles.listCard}>
                <CircleX className={styles.deleteButton} onClick={() => handleDelete(product._id)} />
                <Card
                  key={product._id}
                  image={product.images[0] || '/assets/default.jpg'}
                  price={product.price}
                  title={product.name}
                  stock={product.stock}
                  sizes={product.sizes}
                  images={product.images}
                  description={product.description}
                  colors={product.colors}
                  category={product.category}
                  brand={product.brand}
                  isAdmin={true}
                />
              </div>
            </>
          </div>
        })}
      </ul>
    </div>
  )
}

export default ProductList
