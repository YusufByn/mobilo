import type { Product } from '../../types/product'

interface ProductSpecsProps {
  product: Product
}

// Tableau à deux colonnes : libellé à gauche, valeur à droite, séparés par de fins traits
// * : tous les enfants (dt et dd) ; [&>dt] : seulement les enfants dt
export default function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <dl className="grid grid-cols-[auto_1fr] w-full border-t border-line-soft *:py-sm *:border-b *:border-line-soft [&>dt]:pr-lg [&>dt]:font-semibold [&>dd]:text-muted">
      <dt>Garantie</dt>
      <dd>{product.warrantyInformation}</dd>
      <dt>Livraison</dt>
      <dd>{product.shippingInformation}</dd>
      <dt>Retours</dt>
      <dd>{product.returnPolicy}</dd>
      <dt>Référence</dt>
      <dd>{product.sku}</dd>
    </dl>
  )
}
