import { SHOP_CATEGORIES } from '../../config/shop'
import type { CreatedProduct } from '../../types/form'
import { formatPrice } from '../../utils/formatPrice'

interface CreatedProductSummaryProps {
  product: CreatedProduct
}

export default function CreatedProductSummary({
  product,
}: CreatedProductSummaryProps) {
  const category = SHOP_CATEGORIES.find(
    (shopCategory) => shopCategory.value === product.category,
  )

  // Succès : cadre au contour vert, même forme que les cartes
  // [&>dt] : « les enfants dt de cette liste », pour ne pas répéter les classes sur chaque ligne
  return (
    <div
      className="flex flex-col gap-md mb-xl p-lg bg-surface border-2 border-success rounded-card"
      role="status"
    >
      <p className="font-display text-lg font-stretch-(--stretch-product) font-bold text-success">
        Produit créé avec succès (id {product.id})
      </p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-lg gap-y-xs [&>dt]:font-semibold [&>dd]:text-muted [&>dd]:wrap-anywhere">
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
      <p className="text-sm text-muted">
        DummyJSON simule la création : ce produit n'apparaîtra pas dans le
        catalogue.
      </p>
    </div>
  )
}
