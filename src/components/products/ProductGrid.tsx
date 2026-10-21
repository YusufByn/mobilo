import type { WishlistItem } from '../../types/product'
import ProductCard from './ProductCard'
import './ProductGrid.css'

interface ProductGridProps {
  products: WishlistItem[]
  onRemove?: (id: number) => void
}

export default function ProductGrid({ products, onRemove }: ProductGridProps) {
  return (
    <ul className="product-grid">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  )
}
