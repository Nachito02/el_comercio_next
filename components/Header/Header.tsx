'use client'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import styles from './Header.module.css'
import Link from 'next/link'

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/"><h1>El Comercio</h1></Link>
        <div className={styles.searchBar}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input className={styles.searchInput} type="text" placeholder="Buscar productos..." />
          </div>
        </div>
        {/* Ícono del menú hamburguesa */}
      </div>

      <button className={styles.menuButton} onClick={() => setMenuOpen(true)}>
        <Menu />
      </button>
      {/* Menú de navegación */}
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
          <X />
        </button>
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

    </header>
  )
}

export default Header