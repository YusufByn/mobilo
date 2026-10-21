import { useWishlist } from '../../context/WishlistContext'
import type { WishlistItem } from '../../types/product'
import './WishlistButton.css'

interface WishlistButtonProps {
  product: WishlistItem
}

export default function WishlistButton({ product }: WishlistButtonProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  function handleClick() {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  // Libellé fixe : c'est aria-pressed qui annonce si le produit est déjà dans la wishlist
  return (
    <button
      type="button"
      className="wishlist-button"
      aria-pressed={inWishlist}
      aria-label={`Ajouter ${product.title} à la wishlist`}
      onClick={handleClick}
    >
      <svg
        className="wishlist-button__icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z" />
      </svg>
    </button>
  )
}
