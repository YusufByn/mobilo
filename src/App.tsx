import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import { FiltersProvider } from './context/FiltersContext'
import { WishlistProvider } from './context/WishlistContext'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <BrowserRouter>
      {/* Au-dessus des routes : les filtres survivent au passage catalogue → fiche → catalogue */}
      <FiltersProvider>
        <WishlistProvider>
          <Routes>
            {/* Route sans path : Layout entoure toutes les pages, qui s'affichent dans son Outlet */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </WishlistProvider>
      </FiltersProvider>
    </BrowserRouter>
  )
}
