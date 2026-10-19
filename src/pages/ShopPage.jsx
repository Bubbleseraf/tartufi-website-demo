import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'
import { products } from '../data/products'

const categories = ['Tutti', 'Fresco', 'Condimenti', 'Conserve', 'Idee regalo']

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('categoria') || 'Tutti'
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'Tutti')
  const [sort, setSort] = useState('featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    if (category === 'Tutti') setSearchParams({}, { replace: true })
    else setSearchParams({ categoria: category }, { replace: true })
  }, [category, setSearchParams])

  const filteredProducts = useMemo(() => {
    const list = category === 'Tutti' ? [...products] : products.filter((product) => product.category === category)
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [category, sort])

  return (
    <>
      <section className="page-hero page-hero--shop">
        <div className="site-container"><span className="eyebrow">La bottega</span><h1>Il profumo del bosco,<br /><em>nella tua cucina.</em></h1><p>Tartufi freschi e specialità selezionate, spediti con cura per preservarne tutta l’identità.</p></div>
      </section>
      <section className="shop-section section">
        <div className="site-container">
          <div className="shop-toolbar">
            <div className="category-tabs" role="tablist" aria-label="Categorie prodotti">
              {categories.map((item) => <button key={item} className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <button className="filter-mobile" onClick={() => setFiltersOpen(!filtersOpen)}>Filtri <Icon name="chevron" size={16} /></button>
            <label className={`sort-select ${filtersOpen ? 'is-open' : ''}`}><span>Ordina per</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">In evidenza</option><option value="price-asc">Prezzo crescente</option><option value="price-desc">Prezzo decrescente</option><option value="name">Nome</option></select></label>
          </div>
          <div className="shop-results-meta"><p>{filteredProducts.length} prodotti</p><span>Disponibilità aggiornata in base alla stagione</span></div>
          <div className="product-grid product-grid--shop">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      <section className="shop-note"><div className="site-container"><Icon name="leaf" size={28} /><p><strong>Il fresco segue la natura.</strong> Quantità e varietà possono cambiare durante la settimana: è il nostro modo di rispettare la stagione.</p></div></section>
    </>
  )
}
