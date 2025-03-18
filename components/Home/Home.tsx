import Card from '@/components/Card/Card'
import styles from './Home.module.css'
import { clientAxios } from '@/config/clientAxios'
import Link from 'next/link'

export default async function Home() {
    let products = []

    try {
        const res = await clientAxios.get('/products')
        products = res.data.products
    } catch (error) {
        console.error('Error al obtener productos:', error)
    }
    console.log(products)
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
