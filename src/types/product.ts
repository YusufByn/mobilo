export type ProductCategory = 'smartphones' | 'tablets' | 'mobile-accessories'

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
}

// Seuls les champs utilisés par l'application sont typés
export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  brand: string
  sku: string
  availabilityStatus: string
  warrantyInformation: string
  shippingInformation: string
  returnPolicy: string
  reviews: Review[]
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

// Résumé stocké dans le localStorage : de quoi afficher une carte sans rappeler l'API
export type WishlistItem = Pick<
  Product,
  'id' | 'title' | 'brand' | 'price' | 'rating' | 'thumbnail'
>
