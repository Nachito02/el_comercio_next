import React from 'react'
import Card from '../Card/Card'
import styles from './Home.module.css'
const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Productos</h2>
            <div className={styles.cardContainer}>
            <Card image='../assets/bermudas/bermuda.jpg' price='150' title='Bermuda' />
            <Card image='/assets/bermudas/bermuda.jpg' price='150' title='Bermuda' />
            <Card image='/assets/bermudas/bermuda.jpg' price='150' title='Bermuda' />
            <Card image='/assets/bermudas/bermuda.jpg' price='150' title='Bermuda' />
            <Card image='/assets/bermudas/bermuda.jpg' price='150' title='Bermuda' />

            </div>
        </div>
    )
}

export default Home