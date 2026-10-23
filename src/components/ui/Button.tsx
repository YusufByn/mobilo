import type { ReactNode } from 'react'
import { Link } from 'react-router'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  // Avec to, on affiche un <Link> qui a l'air d'un bouton (ex. « Retour à l'accueil »)
  to?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  // aria-label, quand le texte du bouton ne suffit pas hors contexte (« Retirer » quoi ?)
  label?: string
  // Placement propre à la page (marges, alignement), jamais le style du bouton lui-même
  className?: string
}

// Commun à tous les boutons : pastille de 44px de haut, texte en gras
const BASE_CLASSES =
  'inline-flex items-center justify-center min-h-control px-lg rounded-full font-semibold no-underline transition-colors disabled:cursor-not-allowed'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // Action principale : aplat noir (clair en mode sombre)
  primary:
    'text-on-button bg-button hover:not-disabled:bg-button-hover disabled:opacity-60',
  // Pagination : fond blanc, contour discret qui fonce au survol
  secondary:
    'bg-surface border-[1.5px] border-line-soft hover:not-disabled:border-ink disabled:opacity-35',
  // Contour de la couleur du texte : suit la couleur de la ligne survolée (wishlist)
  outline: 'text-inherit border-[1.5px] border-current',
  // Sans fond : action secondaire à côté des filtres
  ghost: 'hover:bg-line-soft',
}

export default function Button({
  children,
  variant = 'primary',
  to,
  type = 'button',
  onClick,
  disabled = false,
  label,
  className = '',
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} aria-label={label}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  )
}
