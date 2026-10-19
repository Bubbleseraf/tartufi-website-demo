import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { formatPrice } from '../data/products'
import Icon from './Icon'

export default function CartDrawer() {
  const { items, subtotal, isCartOpen, setCartOpen, updateQuantity, removeItem } = useCart()

  return (
    <>
      <button className={`drawer-backdrop ${isCartOpen ? 'is-visible' : ''}`} onClick={() => setCartOpen(false)} aria-label="Chiudi carrello" tabIndex={isCartOpen ? 0 : -1} />
      <aside className={`cart-drawer ${isCartOpen ? 'is-open' : ''}`} aria-hidden={!isCartOpen} aria-label="Carrello">
        <div className="cart-drawer__header">
          <div>
            <span className="eyebrow">Il tuo ordine</span>
            <h2>Carrello</h2>
          </div>
          <button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Chiudi carrello"><Icon name="close" /></button>
        </div>

        <div className="cart-drawer__content">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon"><Icon name="bag" size={30} /></span>
              <h3>Il carrello è vuoto</h3>
              <p>Scopri la selezione e porta a tavola il profumo del bosco.</p>
              <Link className="button button--dark" to="/shop" onClick={() => setCartOpen(false)}>Vai allo shop</Link>
            </div>
          ) : (
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.key}>
                  <img src={item.image} alt="" />
                  <div className="cart-item__info">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.option}</p>
                    </div>
                    <div className="cart-item__bottom">
                      <div className="quantity quantity--small">
                        <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Riduci quantità"><Icon name="minus" size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Aumenta quantità"><Icon name="plus" size={14} /></button>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                    <button className="text-button" onClick={() => removeItem(item.key)}>Rimuovi</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total"><span>Subtotale</span><strong>{formatPrice(subtotal)}</strong></div>
            <p>Spedizione calcolata al passaggio successivo.</p>
            <Link className="button button--dark button--full" to="/carrello" onClick={() => setCartOpen(false)}>Vai al carrello</Link>
          </div>
        )}
      </aside>
    </>
  )
}
