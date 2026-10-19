import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart-context'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tartufi-e-tartufi-cart') ?? localStorage.getItem('nero-terra-cart')) ?? []
    } catch {
      return []
    }
  })
  const [isCartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('tartufi-e-tartufi-cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1, option = product.unit) => {
    const key = `${product.id}-${option}`
    setItems((current) => {
      const existing = current.find((item) => item.key === key)
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...current, { ...product, key, quantity, option }]
    })
    setCartOpen(true)
  }

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) return removeItem(key)
    setItems((current) => current.map((item) => (item.key === key ? { ...item, quantity } : item)))
  }

  const removeItem = (key) => setItems((current) => current.filter((item) => item.key !== key))
  const clearCart = () => setItems([])

  const count = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const value = useMemo(
    () => ({ items, count, subtotal, isCartOpen, setCartOpen, addItem, updateQuantity, removeItem, clearCart }),
    [items, count, subtotal, isCartOpen],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

