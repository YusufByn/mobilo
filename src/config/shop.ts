import type { ProductCategory } from '../types/product'

// Catégories DummyJSON gardées pour la boutique, avec leur libellé affiché
export const SHOP_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'smartphones', label: 'Smartphones' },
  { value: 'tablets', label: 'Tablettes' },
  { value: 'mobile-accessories', label: 'Accessoires' },
]

// Seuils proposés dans le filtre "Prix max", en dollars
export const PRICE_OPTIONS = [50, 100, 300, 500, 1000]

export const PRODUCTS_PER_PAGE = 6

export const WISHLIST_STORAGE_KEY = 'mobilo:wishlist'
