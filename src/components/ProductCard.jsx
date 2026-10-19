import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { formatPrice } from '../data/products'
import Icon from './Icon'

export default function ProductCard({ product, priority = false }) {
  const { addItem } = useCart()

  return (
    <article className="product-card">
      <Link className="product-card__image" to={`/prodotto/${product.slug}`} aria-label={`Scopri ${product.name}`}>
        {product.badge && <span className="product-card__badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} loading={priority ? 'eager' : 'lazy'} />
        <span className="product-card__discover">Scopri il prodotto <Icon name="arrow" size={17} /></span>
      </Link>
      <div className="product-card__body">
        <div>
          <p className="product-card__category">{product.category}</p>
          <Link to={`/prodotto/${product.slug}`}><h3>{product.name}</h3></Link>
          <p className="product-card__price">{formatPrice(product.price)} <span>/ {product.unit}</span></p>
        </div>
        <button className="product-card__add" onClick={() => addItem(product)} aria-label={`Aggiungi ${product.name} al carrello`}>
          <Icon name="plus" size={19} />
        </button>
      </div>
    </article>
  )
}
