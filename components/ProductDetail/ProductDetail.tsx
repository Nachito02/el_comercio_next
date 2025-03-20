'use client'

import React, { useState } from 'react'
import styles from './ProductDetail.module.css'

const ProductDetails = ({ product }: { product: any }) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [mainImage, setMainImage] = useState<string>(product.images?.[0] || '')

        console.log(product.product);
        
    return (
        <div className={styles.productPage}>
            {/* Sección de la galería */}
            <div className={styles.imageSection}>
                <img
                    src={mainImage || 'eskere'}
                    alt={product.name}
                    className={styles.mainImage}
                />
                <div className={styles.thumbnailContainer}>
                    {product.images?.map((image: string, index: number) => (
                        <img
                            key={index}
                            src={image || 'esker'}
                            alt={`${product.name} ${index + 1}`}
                            className={`${styles.thumbnail} ${mainImage === image ? styles.activeThumbnail : ''}`}
                            onClick={() => setMainImage(image)}
                        />
                    ))}
                </div>
            </div>

            {/* Sección de detalles del producto */}
            <div className={styles.details}>
                <h2 className={styles.title}>{product.name}</h2>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>${product.price}</p>
                <p className={styles.stock}>
                    {product.stock > 0 ? `Stock disponible: ${product.stock}` : 'Sin stock'}
                </p>

                {/* Selección de tallas */}
                {product.sizes?.length > 0 && (
                    <div className={styles.sizes}>
                        <h4>Selecciona tu talla:</h4>
                        <div className={styles.sizeOptions}>
                            {product.sizes.map((size: string, index: number) => (
                                <button
                                    key={index}
                                    className={`${styles.sizeButton} ${selectedSize === size ? styles.selectedSize : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Botón de compra */}
                <div className={styles.buyButtonContainer}>
                    <button
                        className={styles.buyButton}
                        disabled={product.stock === 0 || !selectedSize}
                    >
                        {product.stock > 0 && selectedSize ? 'Comprar ahora' : 'Selecciona una talla'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
