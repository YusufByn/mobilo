import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ProductReviews from '../components/products/ProductReviews'
import ProductSpecs from '../components/products/ProductSpecs'
import WishlistButton from '../components/products/WishlistButton'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import Rating from '../components/ui/Rating'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/formatPrice'
import './ProductDetail.css'

export default function ProductDetail() {
  // useParams renvoie une string (ou undefined) : Number() donne NaN si l'id n'est pas un nombre
  const { id } = useParams()
  const productId = Number(id)
  const isValidId = Number.isInteger(productId) && productId > 0

  const [product, setProduct] = useState<Product | null>(null)
  // Avec un id invalide, on n'appelle pas l'API : rien à charger
  const [loading, setLoading] = useState(isValidId)
  const [error, setError] = useState<string | null>(null)

  function loadProduct(idToLoad: number) {
    getProductById(idToLoad)
      .then((data) => setProduct(data))
      // Message fixe : une coupure réseau renvoie une erreur en anglais (« Failed to fetch »)
      .catch(() =>
        setError('Impossible de charger ce produit. Vérifiez votre connexion.'),
      )
      .finally(() => setLoading(false))
  }

  function handleRetry() {
    setLoading(true)
    setError(null)
    loadProduct(productId)
  }

  // Dépendances : si l'id de l'URL change, on recharge le bon produit
  useEffect(() => {
    if (isValidId) {
      loadProduct(productId)
    }
  }, [productId, isValidId])

  if (loading) {
    return <Loader message="Chargement du produit…" />
  }
  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />
  }
  if (!product) {
    return (
      <section className="product-detail__not-found">
        <title>Produit introuvable · Mobilo</title>
        <h1 className="product-detail__title">Produit introuvable</h1>
        <p>Ce produit n'existe pas ou ne fait pas partie de notre catalogue.</p>
        <Link to="/products">Retour au catalogue</Link>
      </section>
    )
  }

  return (
    <div className="product-detail">
      {/* Une seule chaîne via un template : <title> n'accepte pas plusieurs morceaux de texte */}
      <title>{`${product.title} · Mobilo`}</title>
      <Link to="/products" className="product-detail__back">
        ← Retour au catalogue
      </Link>

      <div className="product-detail__layout">
        <div className="product-detail__image-wrapper">
          <img
            src={product.images[0]}
            alt={product.title}
            className="product-detail__image"
          />
        </div>

        <div className="product-detail__info">
          {/* Wrapper de mise en page : marque, titre et note restent groupés */}
          <div className="product-detail__summary">
            <p className="product-detail__brand">{product.brand}</p>
            <div className="product-detail__heading">
              <h1 className="product-detail__title">{product.title}</h1>
              <WishlistButton product={product} />
            </div>
            <Rating value={product.rating} />
          </div>
          <p className="product-detail__price">{formatPrice(product.price)}</p>
          <p className="product-detail__description">{product.description}</p>
          <ProductSpecs product={product} />
        </div>
      </div>

      <ProductReviews reviews={product.reviews} />
    </div>
  )
}
