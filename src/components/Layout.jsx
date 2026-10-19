import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { products } from '../data/products'
import CartDrawer from './CartDrawer'
import Icon from './Icon'

const navItems = [
  ['/', 'Home'],
  ['/shop', 'Shop'],
  ['/il-tartufo', 'Il tartufo'],
  ['/chi-siamo', 'Chi siamo'],
  ['/ricette', 'Ricette'],
  ['/contatti', 'Contatti'],
]

const currentYear = new Date().getFullYear()

function Logo({ light = false }) {
  return (
    <Link className={`brand ${light ? 'brand--light' : ''}`} to="/" aria-label="TARTUFI&TARTUFI, torna alla home">
      <svg viewBox="0 0 34 34" aria-hidden="true"><path d="M17 2C9 6 5 12 7 20c2 8 10 12 18 8 7-4 6-13 2-19C24 5 21 3 17 2Z"/><path d="M10 23c4-7 8-11 14-15M13 16c2 0 4 1 6 3M16 11c1 0 3 .5 5 2"/></svg>
      <span><strong>TARTUFI&amp;TARTUFI</strong><small>Sicilia · Italia</small></span>
    </Link>
  )
}

function SearchPanel({ open, onClose }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const matches = useMemo(() => {
    if (!query.trim()) return products.slice(0, 3)
    const normalized = query.toLowerCase()
    return products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(normalized)).slice(0, 4)
  }, [query])

  const goToProduct = (slug) => {
    onClose()
    setQuery('')
    navigate(`/prodotto/${slug}`)
  }

  return (
    <div className={`search-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="site-container search-panel__inner">
        <div className="search-panel__top">
          <span className="eyebrow">Cerca nella selezione</span>
          <button className="icon-button" onClick={onClose} aria-label="Chiudi ricerca"><Icon name="close" /></button>
        </div>
        <label className="search-field">
          <Icon name="search" size={26} />
          <input autoFocus={open} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tartufo fresco, olio, crema…" />
        </label>
        <div className="search-results">
          {matches.length ? matches.map((product) => (
            <button key={product.id} onClick={() => goToProduct(product.slug)}>
              <img src={product.image} alt="" />
              <span><small>{product.category}</small>{product.name}</span>
              <Icon name="arrow" size={18} />
            </button>
          )) : <p>Nessun prodotto trovato. Prova con un termine diverso.</p>}
        </div>
      </div>
    </div>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { count, setCartOpen } = useCart()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      <header className="site-header">
        <div className="site-container site-header__inner">
          <button className="icon-button mobile-only" onClick={() => setMenuOpen(true)} aria-label="Apri menu"><Icon name="menu" /></button>
          <Logo />
          <nav className="desktop-nav" aria-label="Navigazione principale">
            {navItems.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
          </nav>
          <div className="header-actions">
            <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Cerca"><Icon name="search" /></button>
            <button className="icon-button bag-button" onClick={() => setCartOpen(true)} aria-label={`Carrello, ${count} prodotti`}>
              <Icon name="bag" />
              {count > 0 && <span>{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu__top"><Logo light /><button className="icon-button icon-button--light" onClick={() => setMenuOpen(false)} aria-label="Chiudi menu"><Icon name="close" /></button></div>
        <nav aria-label="Navigazione mobile">
          {navItems.map(([to, label], index) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</NavLink>)}
        </nav>
        <div className="mobile-menu__footer"><p>Dalla Sicilia alla tavola,<br />senza scorciatoie.</p><a href="mailto:info@tartufietartufi.it">info@tartufietartufi.it</a></div>
      </div>
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      {searchOpen && <button className="drawer-backdrop is-visible search-backdrop" onClick={() => setSearchOpen(false)} aria-label="Chiudi ricerca" />}
      <CartDrawer />
    </>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo light />
            <p>Un’azienda siciliana dedicata ai tartufi e alle specialità artigianali, nata per raccontare il territorio con autenticità.</p>
          </div>
          <div className="footer-column"><h3>Esplora</h3><Link to="/shop">Shop</Link><Link to="/il-tartufo">Il tartufo</Link><Link to="/ricette">Ricette</Link><Link to="/chi-siamo">Chi siamo</Link></div>
          <div className="footer-column"><h3>Assistenza</h3><Link to="/contatti">Contatti</Link><a href="#spedizioni">Spedizioni</a><a href="#resi">Resi</a><a href="#faq">Domande frequenti</a></div>
          <div className="footer-column"><h3>Seguici</h3><a href="#instagram">Instagram</a><a href="#facebook">Facebook</a><p>Lun–Ven<br />9:00–18:00</p></div>
        </div>
        <div className="footer-bottom"><span>© {currentYear} TARTUFI&amp;TARTUFI — Concept dimostrativo</span><div><a href="#privacy">Privacy</a><a href="#cookie">Cookie</a><a href="#termini">Termini</a></div></div>
      </div>
    </footer>
  )
}

export default function Layout({ children }) {
  return <><Header /><main>{children}</main><Footer /></>
}
