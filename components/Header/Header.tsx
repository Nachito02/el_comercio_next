'use client'
import { useState } from 'react'
import { Search, Menu } from 'lucide-react'
import styles from './Header.module.css'
import Link from 'next/link'
const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>El Comercio</h1>
       
        {/* Ícono del menú hamburguesa */}
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
          <Menu />
        </button>
      </div>

      {/* Menú de navegación */}

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul>
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/camisas">Camisas</Link></li>
          <li><Link href="/remeras">Remeras</Link></li>
          <li><Link href="/shorts">Shorts</Link></li>
          <li><Link href="/bermudas">Bermudas</Link></li>
          <li><Link href="/camisetas">Camisetas</Link></li>
        </ul>
      </nav>
      {/* Barra de búsqueda */}
      <div className={styles.searchBar}>
        <Search />
        <input type="text" placeholder="Buscar productos..." />
      </div>

     
    </header>
  )
}

export default Header
