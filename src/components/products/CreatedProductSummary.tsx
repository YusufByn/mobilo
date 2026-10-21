import { SHOP_CATEGORIES } from '../../config/shop'
import type { CreatedProduct } from '../../types/form'
import { formatPrice } from '../../utils/formatPrice'
import './CreatedProductSummary.css'

interface CreatedProductSummaryProps {
  product: CreatedProduct
}

export default function CreatedProductSummary({
  product,
}: CreatedProductSummaryProps) {
  const category = SHOP_CATEGORIES.find(
    (shopCategory) => shopCategory.value === product.category,
  )

  return (
    <div className="created-product" role="status">
      <p className="created-product__title">
        Produit créé avec succès (id {product.id})
      </p>
      <dl className="created-product__details">
        <dt>Nom</dt>
        <dd>{product.title}</dd>
        <dt>Marque</dt>
        <dd>{product.brand}</dd>
        <dt>Catégorie</dt>
        <dd>{category ? category.label : product.category}</dd>
        <dt>Prix</dt>
        <dd>{formatPrice(product.price)}</dd>
        <dt>Stock</dt>
        <dd>{product.stock}</dd>
        <dt>Description</dt>
        <dd>{product.description}</dd>
      </dl>
      <p className="created-product__note">
        DummyJSON simule la création : ce produit n'apparaîtra pas dans le
        catalogue.
      </p>
    </div>
  )
}
