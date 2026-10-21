import type { Filters } from '../types/filters'
import type { Product } from '../types/product'

// Filtrage côté client : l'API ne sait pas combiner recherche, catégorie et prix max
export function filterProducts(
  products: Product[],
  filters: Filters,
): Product[] {
  const search = filters.search.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search)
    const matchesCategory =
      filters.category === '' || product.category === filters.category
    const matchesPrice =
      filters.maxPrice === null || product.price <= filters.maxPrice

    return matchesSearch && matchesCategory && matchesPrice
  })
}
