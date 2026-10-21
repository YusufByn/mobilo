import { useEffect, useState } from 'react'
import Pagination from '../components/products/Pagination'
import ProductGrid from '../components/products/ProductGrid'
import SearchForm from '../components/products/SearchForm'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { PRODUCTS_PER_PAGE } from '../config/shop'
import { useFilters } from '../context/FiltersContext'
import { getProducts } from '../services/productService'
import type { Product } from '../types/product'
import { filterProducts } from '../utils/filterProducts'
import './Products.css'

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

  return (
    <>
      <div className="products__header">
        <h1 className="products__title">Catalogue</h1>
        {showResults && (
          <p className="products__count">
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
          <button
            type="button"
            className="products__reset"
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </button>
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
    </>
  )
}
