import { useEffect, useState } from 'react'
import ProductGrid from '../components/products/ProductGrid'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import { getProducts } from '../services/productService'
import type { Product } from '../types/product'
import './Products.css'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <>
      <div className="products__header">
        <h1 className="products__title">Catalogue</h1>
        {!loading && !error && (
          <p className="products__count">
            {products.length} modèles disponibles
          </p>
        )}
      </div>

      {loading && <Loader message="Chargement des produits…" />}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}
      {!loading && !error && <ProductGrid products={products} />}
    </>
  )
}
