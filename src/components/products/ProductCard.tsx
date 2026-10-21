import { Link } from 'react-router'
import type { WishlistItem } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import Rating from '../ui/Rating'
import WishlistButton from './WishlistButton'
import './ProductCard.css'

interface ProductCardProps {
  // WishlistItem = exactement les champs affichés : la carte sert au catalogue et à la wishlist
  product: WishlistItem
  // Fourni par la page Wishlist : un bouton « Retirer » remplace le cœur
  onRemove?: (id: number) => void
}

export default function ProductCard({ product, onRemove }: ProductCardProps) {
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

      {/* Hors du Link : un bouton à l'intérieur d'un lien est du HTML invalide */}
      {onRemove ? (
        <button
          type="button"
          className="product-card__remove"
          aria-label={`Retirer ${product.title} de la wishlist`}
          onClick={() => onRemove(product.id)}
        >
          Retirer
        </button>
      ) : (
        <div className="product-card__wishlist">
          <WishlistButton product={product} />
        </div>
      )}
    </article>
  )
}
