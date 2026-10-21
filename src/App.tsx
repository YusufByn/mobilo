import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route sans path : Layout entoure toutes les pages, qui s'affichent dans son Outlet */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
