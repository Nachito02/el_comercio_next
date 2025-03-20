import React from 'react'
import ProductDetail from '@/components/ProductDetail/ProductDetail'
import styles from './ProductPage.module.css'

const ProductPage = async ({ params }) => {
  let product = null
  const { productId } = await params

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`)
    const data = await res.json()

    product = data.product
  } catch (error) {
    console.error('Error al obtener el producto:', error)
  }
  if (!product) {
    return <div className={styles.notFound}>Producto no encontrado</div>
  }



  return (
    <div className={styles.productPage}>
      <ProductDetail product={product} />
    </div>
  )
}

export default ProductPage
