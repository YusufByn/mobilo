import { NavLink } from 'react-router'
import { useWishlist } from '../../context/WishlistContext'

// NavLink ajoute lui-même aria-current="page" sur le lien de la page affichée
const LINK_CLASSES =
  'flex flex-col items-center justify-center gap-xs text-sm font-medium text-ink no-underline aria-[current=page]:font-semibold aria-[current=page]:text-action'

export default function MobileNav() {
  const { items } = useWishlist()

  // Bascule en CSS uniquement (sm:hidden) : à partir de 640px, les liens sont dans le Header
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-4 h-mobile-nav bg-surface border-t border-line-soft sm:hidden"
      aria-label="Navigation principale"
    >
      <NavLink to="/" className={LINK_CLASSES}>
        <svg
          className="size-lg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 11l9-8 9 8M5 9v11h5v-6h4v6h5V9" />
        </svg>
        Accueil
      </NavLink>
      <NavLink to="/products" className={LINK_CLASSES}>
        <svg
          className="size-lg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
        Catalogue
      </NavLink>
      <NavLink to="/wishlist" className={LINK_CLASSES}>
        <span className="relative flex">
          <svg
            className="size-lg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z" />
          </svg>
          {/* Pastille posée en haut à droite de l'icône, comme le compteur du header */}
          {items.length > 0 && (
            <span className="absolute -top-sm -right-md min-w-lg px-xs text-sm font-semibold leading-display text-center text-on-count bg-count rounded-full">
              {items.length}
            </span>
          )}
        </span>
        Wishlist
      </NavLink>
      <NavLink to="/create" className={LINK_CLASSES}>
        <svg
          className="size-lg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        Ajouter
      </NavLink>
    </nav>
  )
}
