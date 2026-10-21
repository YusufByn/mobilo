import type { Product } from '../../types/product'
import ProductCard from './ProductCard'
import './ProductGrid.css'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
