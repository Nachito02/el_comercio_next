import { clientAxios } from '@/config/clientAxios'
import React from 'react'
import styles from './Home.module.css'
import Link from 'next/link'
import Card from '@/components/Card/Card'
const Page = async () => {
  let products = []

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      cache: 'no-store'
    })
    if (!res.ok) throw new Error('Error en la API')
    const data = await res.json()

    products = data.products
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
  return (

    <div className={styles.container}>
      <h2 className={styles.title}>Productos</h2>
      <div className={styles.cardContainer}>
        {products.length > 0 ? (
          products.map((product: any) => (
            <Link href={`/products/${product._id}`} key={product._id}>
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
              /></Link>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  )


}

export default Page