import ProductGrid from '../components/products/ProductGrid'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist()

  return (
    <>
      <title>Ma wishlist | Mobilo</title>
      <div className="flex flex-wrap items-baseline gap-x-md gap-y-sm mb-lg">
        <h1 className="text-2xl sm:text-3xl">Ma wishlist</h1>
        {items.length > 0 && (
          <p className="text-muted">
            {items.length}{' '}
            {items.length > 1 ? 'produits sauvegardés' : 'produit sauvegardé'}
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState message="Votre wishlist est vide">
          <Button to="/products">Découvrir le catalogue</Button>
        </EmptyState>
      ) : (
        <ProductGrid products={items} onRemove={removeFromWishlist} />
      )}
    </>
  )
}
