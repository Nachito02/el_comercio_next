import styles from './Card.module.css'

interface CardProps {
  image: string
  title: string
  price: string
}

const Card: React.FC<CardProps> = ({ image, title, price }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardPrice}>${price}</p>
      </div>
    </div>
  )
}

export default Card
