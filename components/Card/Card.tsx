import { IBrand, ICategory } from '@/interfaces'
import styles from './Card.module.css'

interface CardProps {
  image: string
  title: string
  price: string
  stock: number
  sizes: string[]
  images: string[]
  description: string
  colors: string[]
  category: ICategory
  brand: IBrand
  isAdmin?: boolean
}

const Card: React.FC<CardProps> = ({ image, title, price, brand, category, colors, description, images, sizes, stock, isAdmin = false }) => {

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardPrice}>${price}</p>
        {isAdmin && (
          <>
            <p>{description}</p>
            <p>Stock: {stock}</p>
            <p>Tallas: {sizes.join(', ')}</p>
            <p>Colores: {colors.join(', ')}</p>
            <p>Categoría: {category?.name}</p>
            <p>Marca: {brand?.name}</p>

          </>
        )}
      </div>
    </div>
  )
}

export default Card
