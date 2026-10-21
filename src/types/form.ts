// Tout reste en string pendant la saisie : un input renvoie toujours une string
export interface ProductFormValues {
  title: string
  brand: string
  category: string
  price: string
  stock: string
  description: string
}

export type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>

// Données envoyées à l'API, après conversion des nombres
export interface NewProduct {
  title: string
  brand: string
  category: string
  price: number
  stock: number
  description: string
}
