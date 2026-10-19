import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/CartPage'
import { ContactPage, NotFoundPage, RecipesPage, StoryPage, TrufflePage } from './pages/EditorialPages'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import ShopPage from './pages/ShopPage'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/prodotto/:slug" element={<ProductPage />} />
            <Route path="/il-tartufo" element={<TrufflePage />} />
            <Route path="/chi-siamo" element={<StoryPage />} />
            <Route path="/ricette" element={<RecipesPage />} />
            <Route path="/contatti" element={<ContactPage />} />
            <Route path="/carrello" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
