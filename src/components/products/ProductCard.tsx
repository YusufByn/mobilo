import { Link } from 'react-router'
import type { Product } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import Rating from '../ui/Rating'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-card__image"
          />
        </div>
        <div className="product-card__body">
          <p className="product-card__brand">{product.brand}</p>
          <h2 className="product-card__title">{product.title}</h2>
          <p className="product-card__rating">
            <Rating value={product.rating} />
          </p>
          <p className="product-card__price">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  )
}
