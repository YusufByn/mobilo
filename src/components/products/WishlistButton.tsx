import { useWishlist } from '../../context/WishlistContext'
import type { WishlistItem } from '../../types/product'

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
  // active:scale-85 : réponse au clic, le cœur se contracte une fraction de seconde
  return (
    <button
      type="button"
      className="group flex shrink-0 items-center justify-center size-control rounded-full transition-transform ease-out active:scale-85"
      aria-pressed={inWishlist}
      aria-label={`Ajouter ${product.title} à la wishlist`}
      onClick={handleClick}
    >
      {/* Cœur plein quand le produit est dans la wishlist, piloté par le même attribut que les lecteurs d'écran */}
      <svg
        className="size-icon transition-colors group-aria-pressed:fill-current"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z" />
      </svg>
    </button>
  )
}
