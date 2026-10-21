import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { WISHLIST_STORAGE_KEY } from '../config/shop'
import type { WishlistItem } from '../types/product'

interface WishlistContextValue {
  items: WishlistItem[]
  addToWishlist: (product: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
}

// try/catch : JSON.parse lève une erreur si le contenu a été modifié à la main
function readStoredWishlist(): WishlistItem[] {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    const parsed = stored === null ? [] : JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

// null par défaut : useWishlist lève une erreur si on oublie le provider
const WishlistContext = createContext<WishlistContextValue | null>(null)

interface WishlistProviderProps {
  children: ReactNode
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  // Initialisation lazy : la fonction n'est appelée qu'au premier rendu, pas à chaque rendu
  const [items, setItems] = useState<WishlistItem[]>(readStoredWishlist)

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function isInWishlist(id: number) {
    return items.some((item) => item.id === id)
  }

  function addToWishlist(product: WishlistItem) {
    if (isInWishlist(product.id)) {
      return
    }
    // Copie champ par champ : un Product complet passé ici emporterait aussi ses avis, images…
    const item: WishlistItem = {
      id: product.id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      rating: product.rating,
      thumbnail: product.thumbnail,
    }
    setItems([...items, item])
  }

  function removeFromWishlist(id: number) {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <WishlistContext
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext>
  )
}

// Hook gardé à côté de son provider (archi du CDC) : seul effet, ce fichier se recharge en entier en dev
// oxlint-disable-next-line react/only-export-components
export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === null) {
    throw new Error('useWishlist doit être utilisé dans un WishlistProvider')
  }
  return context
}
