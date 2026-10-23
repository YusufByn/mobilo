import { useEffect, useState } from 'react'
import Pagination from '../components/products/Pagination'
import ProductGrid from '../components/products/ProductGrid'
import SearchForm from '../components/products/SearchForm'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { PRODUCTS_PER_PAGE, SHOP_CATEGORIES } from '../config/shop'
import { useFilters } from '../context/FiltersContext'
import { getProducts } from '../services/productService'
import type { Product } from '../types/product'
import { filterProducts } from '../utils/filterProducts'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { filters, setPage, resetFilters } = useFilters()

  // Les setState sont dans les callbacks de la promesse, donc appelés après la réponse
  function loadProducts() {
    getProducts()
      .then((data) => setProducts(data))
      // Message fixe : une coupure réseau renvoie une erreur en anglais (« Failed to fetch »)
      .catch(() =>
        setError(
          'Impossible de charger les produits. Vérifiez votre connexion.',
        ),
      )
      .finally(() => setLoading(false))
  }

  // Au premier rendu, loading vaut déjà true : la remise à zéro n'est utile qu'au réessai
  function handleRetry() {
    setLoading(true)
    setError(null)
    loadProducts()
  }

  // Sinon, en cliquant « Suivant » en bas de liste, on resterait en bas de la nouvelle page
  function handlePageChange(page: number) {
    setPage(page)
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Calculés à chaque rendu plutôt que stockés : ils restent toujours à jour avec les filtres
  const filteredProducts = filterProducts(products, filters)
  const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const start = (filters.page - 1) * PRODUCTS_PER_PAGE
  const pageProducts = filteredProducts.slice(start, start + PRODUCTS_PER_PAGE)
  const showResults = !loading && !error
  const category = SHOP_CATEGORIES.find((c) => c.value === filters.category)

  // data-category : la couleur de la catégorie choisie colore toute la page (variables.css)
  return (
    <div data-category={filters.category}>
      <title>Catalogue | Mobilo</title>
      {/* Bandeau à la couleur du rayon choisi : il change dès qu'on change de catégorie */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-md gap-y-xs mb-lg px-lg py-xl text-on-accent bg-accent rounded-tile transition-colors">
        <h1 className="text-2xl sm:text-3xl">
          {category ? category.label : 'Tout le catalogue'}
        </h1>
        {/* aria-live : le nouveau nombre de résultats est annoncé à chaque filtre */}
        {showResults && (
          <p
            className="font-display text-lg font-stretch-(--stretch-condensed) font-black"
            aria-live="polite"
          >
            {filteredProducts.length}{' '}
            {filteredProducts.length > 1
              ? 'modèles disponibles'
              : 'modèle disponible'}
          </p>
        )}
      </div>

      <SearchForm />

      {loading && <Loader message="Chargement des produits…" />}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {showResults && filteredProducts.length === 0 && (
        <EmptyState message="Aucun produit ne correspond à votre recherche">
          <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
        </EmptyState>
      )}
      {showResults && filteredProducts.length > 0 && (
        <ProductGrid products={pageProducts} />
      )}
      {showResults && filteredProducts.length > 0 && (
        <Pagination
          page={filters.page}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
