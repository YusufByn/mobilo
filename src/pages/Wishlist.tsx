import { Link } from 'react-router'
import ProductGrid from '../components/products/ProductGrid'
import EmptyState from '../components/ui/EmptyState'
import { useWishlist } from '../context/WishlistContext'
import './Wishlist.css'

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist()

  return (
    <>
      <div className="wishlist__header">
        <h1 className="wishlist__title">Ma wishlist</h1>
        {items.length > 0 && (
          <p className="wishlist__count">
            {items.length}{' '}
            {items.length > 1 ? 'produits sauvegardés' : 'produit sauvegardé'}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState message="Votre wishlist est vide">
          <Link to="/products" className="wishlist__link">
            Découvrir le catalogue
          </Link>
        </EmptyState>
      ) : (
        <ProductGrid products={items} onRemove={removeFromWishlist} />
      )}
    </>
  )
}
