import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useCart } from '../context/useCart'
import { formatPrice } from '../data/products'

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const shipping = 8.5

  return (
    <section className="cart-page section">
      <div className="site-container">
        <div className="page-heading"><span className="eyebrow">La tua selezione</span><h1>Carrello</h1></div>
        {items.length === 0 ? <div className="empty-page"><span><Icon name="bag" size={36} /></span><h2>Ancora nessun prodotto</h2><p>La bottega ti aspetta con la selezione del momento.</p><Link className="button button--dark" to="/shop">Esplora lo shop</Link></div> : (
          <div className="cart-page__grid">
            <div className="cart-page__items">
              {items.map((item) => <article className="cart-page-item" key={item.key}><img src={item.image} alt={item.name} /><div className="cart-page-item__content"><div><span>{item.category}</span><h2>{item.name}</h2><p>Formato: {item.option}</p></div><div className="cart-page-item__actions"><div className="quantity"><button onClick={() => updateQuantity(item.key, item.quantity - 1)}><Icon name="minus" size={15} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.key, item.quantity + 1)}><Icon name="plus" size={15} /></button></div><strong>{formatPrice(item.price * item.quantity)}</strong><button className="text-button" onClick={() => removeItem(item.key)}>Rimuovi</button></div></div></article>)}
            </div>
            <aside className="order-summary"><span className="eyebrow">Riepilogo</span><h2>Il tuo ordine</h2><div><span>Subtotale</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Spedizione</span><strong>{formatPrice(shipping)}</strong></div><div className="order-summary__total"><span>Totale</span><strong>{formatPrice(subtotal + shipping)}</strong></div><button className="button button--dark button--full" onClick={() => alert('Checkout dimostrativo: il collegamento al pagamento sarà aggiunto nella fase backend.')}>Procedi al checkout <Icon name="arrow" size={18} /></button><small>Checkout dimostrativo · nessun pagamento verrà effettuato.</small></aside>
          </div>
        )}
      </div>
    </section>
  )
}
