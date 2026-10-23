import type { WishlistItem } from '../../types/product'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: WishlistItem[]
  onRemove?: (id: number) => void
}

// Une liste, pas une grille : on compare les prix d'un coup d'œil, comme sur une ardoise
export default function ProductGrid({ products, onRemove }: ProductGridProps) {
  return (
    <ul className="border-t border-line-soft">
      {products.map((product) => (
        <li key={product.id} className="border-b border-line-soft">
          <ProductCard product={product} onRemove={onRemove} />
        </li>
      ))}
    </ul>
  )
}
