import { Link, NavLink } from 'react-router'
import { useWishlist } from '../../context/WishlistContext'
import ThemeToggle from './ThemeToggle'

// NavLink ajoute lui-même aria-current="page" sur le lien de la page affichée
// Barre en ombre interne plutôt qu'un soulignement, qui se propagerait sous la pastille
const LINK_CLASSES =
  'flex items-center min-h-control px-sm font-medium text-ink no-underline transition-colors hover:text-action aria-[current=page]:text-action aria-[current=page]:shadow-[inset_0_-2px_0_var(--color-action)]'

export default function Header() {
  const { items } = useWishlist()

  // sticky : la navigation reste à portée en faisant défiler
  return (
    <header className="sticky top-0 z-10 bg-page border-b border-line-soft">
      <div className="flex items-center justify-between gap-lg max-w-page min-h-header mx-auto px-md sm:px-lg lg:px-xl">
        {/* Le texte reste « Mobilo » pour les lecteurs d'écran, la minuscule est purement visuelle */}
        <Link
          to="/"
          className="font-display text-xl font-stretch-(--stretch-display) font-black lowercase text-ink no-underline"
        >
          Mobilo
        </Link>
        {/* Sur mobile, les liens sont dans la barre d'onglets du bas (MobileNav) */}
        <nav
          className="hidden sm:flex flex-1 items-center gap-md"
          aria-label="Navigation principale"
        >
          <NavLink to="/" className={LINK_CLASSES}>
            Accueil
          </NavLink>
          <NavLink to="/products" className={LINK_CLASSES}>
            Catalogue
          </NavLink>
          <NavLink to="/wishlist" className={LINK_CLASSES}>
            Wishlist
            {items.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-lg h-lg ml-xs px-xs text-sm font-semibold tabular-nums text-on-count bg-count rounded-full">
                {items.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/create"
            className="flex items-center min-h-control ml-auto px-lg font-semibold text-on-button no-underline bg-button rounded-full transition-colors hover:bg-button-hover aria-[current=page]:bg-button-hover"
          >
            Ajouter un produit
          </NavLink>
        </nav>
        {/* Hors de la nav : la nav est masquée sur mobile, le bouton doit rester visible */}
        <ThemeToggle />
      </div>
    </header>
  )
}
