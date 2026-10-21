export interface Filters {
  search: string
  // '' = toutes les catégories
  category: string
  // null = pas de prix maximum
  maxPrice: number | null
  page: number
}
