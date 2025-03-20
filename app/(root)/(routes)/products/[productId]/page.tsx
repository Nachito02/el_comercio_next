import { clientAxios } from '@/config/clientAxios'
import React from 'react'
import ProductDetail from '@/components/ProductDetail/ProductDetail'
import styles from './ProductPage.module.css'

interface ProductPageProps {
  params: {
    productId: string
  }
}

const ProductPage:React.FC<ProductPageProps> = async ({ params }: { params: { productId: string } }) => {
  let product = null

  try {
    const res = await clientAxios.get(`/products/${params.productId}`)
    product = res.data.product
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
