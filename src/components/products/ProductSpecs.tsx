import type { Product } from '../../types/product'
import './ProductSpecs.css'

interface ProductSpecsProps {
  product: Product
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <dl className="product-specs">
      <dt>Disponibilité</dt>
      <dd>
        {product.availabilityStatus} ({product.stock} en stock)
      </dd>
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
