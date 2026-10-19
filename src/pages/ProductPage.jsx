import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/useCart'
import { formatPrice, products } from '../data/products'

export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const [option, setOption] = useState(product?.options[0])
  const [quantity, setQuantity] = useState(1)
  const [openInfo, setOpenInfo] = useState('prodotto')
  const { addItem } = useCart()

  const related = useMemo(() => products.filter((item) => item.id !== product?.id).slice(0, 3), [product])

  if (!product) return <div className="not-found"><span className="eyebrow">Errore 404</span><h1>Prodotto non trovato</h1><Link className="button button--dark" to="/shop">Torna allo shop</Link></div>

  return (
    <>
      <section className="product-detail section">
        <div className="site-container">
          <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><strong>{product.name}</strong></div>
          <div className="product-detail__grid">
            <div className="product-gallery">
              <div className="product-gallery__main">{product.badge && <span>{product.badge}</span>}<img src={product.image} alt={product.name} /></div>
              <div className="product-gallery__details"><div><span>Texture</span><strong>Materia autentica</strong></div><div><span>Selezione</span><strong>Lavorata a mano</strong></div></div>
            </div>
            <div className="product-info">
              <span className="eyebrow">{product.category}</span>
              <h1>{product.name}</h1>
              <p className="product-info__price">{formatPrice(product.price)} <span>IVA inclusa</span></p>
              <p className="product-info__lead">{product.description}</p>
              <div className="option-picker"><div><span>Formato</span><strong>{option}</strong></div><div className="option-picker__buttons">{product.options.map((item) => <button key={item} className={item === option ? 'is-active' : ''} onClick={() => setOption(item)}>{item}</button>)}</div></div>
              <div className="purchase-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Riduci quantità"><Icon name="minus" size={16} /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Aumenta quantità"><Icon name="plus" size={16} /></button></div><button className="button button--dark button--grow" onClick={() => addItem(product, quantity, option)}>Aggiungi al carrello <span>{formatPrice(product.price * quantity)}</span></button></div>
              <div className="delivery-note"><Icon name="truck" /><p><strong>Spedizione protetta in 24/48 ore</strong><span>Confezioniamo il fresco per preservarne aroma e consistenza.</span></p></div>
              <div className="product-accordions">
                {[
                  ['prodotto', 'Il prodotto', product.longDescription],
                  ['origine', 'Origine e selezione', `${product.origin}. Ogni lotto è valutato visivamente e aromaticamente prima della preparazione.`],
                  ['abbinamenti', 'Come utilizzarlo', product.pairing],
                  ['conservazione', 'Conservazione', 'Conservare in frigorifero e seguire le indicazioni riportate sulla confezione.'],
                ].map(([key, title, text]) => <div className={`accordion-item ${openInfo === key ? 'is-open' : ''}`} key={key}><button onClick={() => setOpenInfo(openInfo === key ? '' : key)}><span>{title}</span><Icon name={openInfo === key ? 'minus' : 'plus'} size={17} /></button><div><p>{text}</p></div></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="related-products section section--cream"><div className="site-container"><div className="section-heading-row"><div className="section-title"><span className="eyebrow">Potrebbe piacerti</span><h2>Continua la degustazione</h2></div><Link className="link-arrow desktop-link" to="/shop">Torna allo shop <Icon name="arrow" size={17} /></Link></div><div className="product-grid product-grid--three">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div></div></section>
    </>
  )
}
