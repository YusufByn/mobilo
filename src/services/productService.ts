import { API_URL } from '../config/api'
import { SHOP_CATEGORIES } from '../config/shop'
import type { CreatedProduct, NewProduct } from '../types/form'
import type { Product, ProductsResponse } from '../types/product'

function isShopProduct(product: Product): boolean {
  return SHOP_CATEGORIES.some((category) => category.value === product.category)
}

// L'API ne sait pas filtrer plusieurs catégories à la fois : on charge tout puis on garde les nôtres
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products?limit=0`)

  // fetch ne lève pas d'erreur sur une réponse 404 ou 500 : il faut vérifier response.ok
  if (!response.ok) {
    throw new Error(`Erreur ${response.status} lors du chargement des produits`)
  }

  // response.json() renvoie any : ce type est une promesse du code, pas une vérification
  const data: ProductsResponse = await response.json()

  return data.products.filter((product) => isShopProduct(product))
}

// null = produit absent de la boutique : la page affiche « Produit introuvable » et pas une erreur
export async function getProductById(id: number): Promise<Product | null> {
  const response = await fetch(`${API_URL}/products/${id}`)

  // 404 : l'id n'existe pas, ce n'est pas une panne, donc pas de bouton « Réessayer »
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(`Erreur ${response.status} lors du chargement du produit`)
  }

  const product: Product = await response.json()

  // L'id peut exister dans l'API mais hors de nos 3 catégories (ex. /products/1, un mascara)
  return isShopProduct(product) ? product : null
}

// DummyJSON simule la création : il renvoie le produit avec un id, mais ne l'enregistre pas
export async function createProduct(
  product: NewProduct,
): Promise<CreatedProduct> {
  const response = await fetch(`${API_URL}/products/add`, {
    method: 'POST',
    // Indique à l'API que le corps de la requête est du JSON
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })

  if (!response.ok) {
    throw new Error(`Erreur ${response.status} lors de l'envoi du produit`)
  }

  const created: CreatedProduct = await response.json()
  return created
}
