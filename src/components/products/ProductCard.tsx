import { Link } from 'react-router'
import type { WishlistItem } from '../../types/product'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../ui/Button'
import Rating from '../ui/Rating'
import WishlistButton from './WishlistButton'

interface ProductCardProps {
  // WishlistItem = exactement les champs affichés : la carte sert au catalogue et à la wishlist
  product: WishlistItem
  // Fourni par la page Wishlist : un bouton « Retirer » remplace le cœur
  onRemove?: (id: number) => void
}

// Une ligne d'ardoise : photo, nom et marque, note, puis le prix aligné à droite
// Mobile : photo à gauche (sur 4 rangées), marque, nom, note et prix empilés à droite
// Tablette et desktop (md:) : une seule ligne, colonnes alignées d'une ligne à l'autre
export default function ProductCard({ product, onRemove }: ProductCardProps) {
  // group : les enfants réagissent au survol de la ligne entière (group-hover:)
  // hover: (souris seulement) la ligne prend la couleur du rayon
  return (
    <article className="group relative grid grid-cols-1 rounded-card transition-colors hover:text-on-accent hover:bg-accent md:grid-cols-[1fr_auto] md:items-center md:pr-sm">
      <Link
        to={`/products/${product.id}`}
        className="grid grid-cols-[var(--spacing-row-image)_1fr] items-center gap-x-md py-md pl-sm pr-heart text-inherit no-underline rounded-card focus-visible:outline-offset-0 md:grid-cols-[var(--spacing-row-image)_1fr_5rem_minmax(9rem,auto)] md:gap-x-lg md:pr-sm"
      >
        <div className="row-span-4 flex items-center justify-center size-row-image p-xs bg-image-bg rounded-field md:row-span-2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="size-full object-contain transition-transform ease-out group-hover:scale-108"
          />
        </div>
        <p className="text-sm text-muted group-hover:text-inherit md:self-end">
          {product.brand}
        </p>
        {/* line-clamp-2 : deux lignes maximum, puis « … » */}
        <h2 className="line-clamp-2 text-lg font-semibold leading-display tracking-tight md:col-start-2 md:row-start-2 md:self-start">
          {product.title}
        </h2>
        <p className="text-sm md:col-start-3 md:row-span-2 md:row-start-1">
          <Rating value={product.rating} />
        </p>
        {/* Le prix : chiffres condensés et tabulaires, pour que les colonnes de chiffres s'alignent */}
        <p className="font-display text-2xl font-stretch-(--stretch-condensed) font-black tabular-nums leading-none whitespace-nowrap md:col-start-4 md:row-span-2 md:row-start-1 md:justify-self-end md:text-price">
          {formatPrice(product.price)}
        </p>
      </Link>

      {/* Hors du Link : un bouton à l'intérieur d'un lien est du HTML invalide */}
      {onRemove ? (
        <Button
          variant="outline"
          label={`Retirer ${product.title} de la wishlist`}
          onClick={() => onRemove(product.id)}
          className="justify-self-start mb-md ml-row-text md:m-0"
        >
          Retirer
        </Button>
      ) : (
        <div className="absolute top-sm right-0 md:static">
          <WishlistButton product={product} />
        </div>
      )}
    </article>
  )
}
