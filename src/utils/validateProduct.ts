import { SHOP_CATEGORIES } from '../config/shop'
import type { ProductFormErrors, ProductFormValues } from '../types/form'

// Des chiffres, puis éventuellement un point suivi de 1 ou 2 chiffres : « 12 », « 12.5 », « 12.99 »
const PRICE_FORMAT = /^\d+(\.\d{1,2})?$/

// Renvoie un message par champ en erreur : un objet vide veut dire que le formulaire est valide
export function validateProduct(values: ProductFormValues): ProductFormErrors {
  const errors: ProductFormErrors = {}

  const title = values.title.trim()
  if (title.length < 3 || title.length > 80) {
    errors.title = 'Le nom doit contenir entre 3 et 80 caractères.'
  }

  if (values.brand.trim() === '') {
    errors.brand = 'La marque est obligatoire.'
  }

  if (!SHOP_CATEGORIES.some((category) => category.value === values.category)) {
    errors.category = 'Choisissez une catégorie.'
  }

  const price = Number(values.price)
  if (values.price === '') {
    errors.price = 'Le prix est obligatoire.'
  } else if (price < 1 || price > 5000) {
    errors.price = 'Le prix doit être compris entre 1 et 5 000 $.'
  } else if (!PRICE_FORMAT.test(values.price)) {
    errors.price =
      'Le prix doit être un nombre avec 2 décimales maximum (ex. 499.99).'
  }

  // Stock facultatif : un champ vide est accepté et vaudra 0
  const stock = Number(values.stock)
  if (values.stock !== '' && (!Number.isInteger(stock) || stock < 0)) {
    errors.stock = 'Le stock doit être un nombre entier, 0 ou plus.'
  }

  if (values.description.trim().length < 10) {
    errors.description = 'La description doit contenir au moins 10 caractères.'
  }

  return errors
}
