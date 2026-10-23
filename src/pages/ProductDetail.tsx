import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ProductReviews from '../components/products/ProductReviews'
import ProductSpecs from '../components/products/ProductSpecs'
import ProductStock from '../components/products/ProductStock'
import WishlistButton from '../components/products/WishlistButton'
import ErrorMessage from '../components/ui/ErrorMessage'
import Loader from '../components/ui/Loader'
import Rating from '../components/ui/Rating'
import { getProductById } from '../services/productService'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/formatPrice'

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
      <section className="flex flex-col items-start gap-md py-2xl">
        <title>Produit introuvable | Mobilo</title>
        <h1 className="text-2xl sm:text-3xl">Produit introuvable</h1>
        <p>Ce produit n'existe pas ou ne fait pas partie de notre catalogue.</p>
        <Link to="/products">Retour au catalogue</Link>
      </section>
    )
  }

  return (
    <div className="flex flex-col gap-xl">
      {/* Une seule chaîne via un template : <title> n'accepte pas plusieurs morceaux de texte */}
      <title>{`${product.title} | Mobilo`}</title>
      <Link
        to="/products"
        className="self-start flex items-center min-h-control font-semibold underline-offset-4"
      >
        Retour au catalogue
      </Link>

      {/* Desktop : deux colonnes, le cadre photo à gauche, les informations à droite */}
      <div className="grid grid-cols-1 gap-xl lg:grid-cols-2 lg:items-start lg:gap-2xl">
        {/* Grand cadre à contour noir : la photo est l'autre héros de la fiche, avec le prix */}
        <div className="flex items-center justify-center p-lg bg-image-bg border-2 border-line rounded-card sm:p-xl">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full max-h-detail-image aspect-square object-contain"
          />
        </div>

        <div className="flex flex-col items-start gap-lg">
          {/* Wrapper de mise en page : marque, titre et note restent groupés */}
          <div className="flex flex-col gap-sm w-full">
            <p className="text-muted">{product.brand}</p>
            <div className="flex items-start justify-between gap-md">
              <h1 className="text-2xl sm:text-3xl">{product.title}</h1>
              <WishlistButton product={product} />
            </div>
            <Rating value={product.rating} />
          </div>
          {/* La grande étiquette de prix */}
          <p className="px-md py-sm font-display text-2xl font-stretch-(--stretch-product) font-black tabular-nums leading-display text-on-tag bg-tag border-2 border-on-tag rounded-tag">
            {formatPrice(product.price)}
          </p>
          <ProductStock
            status={product.availabilityStatus}
            stock={product.stock}
          />
          <p className="max-w-measure text-muted">{product.description}</p>
          <ProductSpecs product={product} />
        </div>
      </div>

      <ProductReviews reviews={product.reviews} />
    </div>
  )
}
