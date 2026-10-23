import { useState, type SubmitEvent } from 'react'
import CreatedProductSummary from '../components/products/CreatedProductSummary'
import ProductForm from '../components/products/ProductForm'
import { createProduct } from '../services/productService'
import type {
  CreatedProduct,
  FieldChangeEvent,
  NewProduct,
  ProductFormErrors,
  ProductFormValues,
} from '../types/form'
import { validateProduct } from '../utils/validateProduct'

const EMPTY_VALUES: ProductFormValues = {
  title: '',
  brand: '',
  category: '',
  price: '',
  stock: '',
  description: '',
}

export default function CreateProduct() {
  const [values, setValues] = useState<ProductFormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<ProductFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createdProduct, setCreatedProduct] = useState<CreatedProduct | null>(
    null,
  )

  // Un seul handler : le name de chaque champ est une clé de ProductFormValues
  function handleChange(event: FieldChangeEvent) {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // Sans ça, le navigateur enverrait le formulaire lui-même et rechargerait la page
    event.preventDefault()

    const validationErrors = validateProduct(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    // Conversion au dernier moment : pendant la saisie, tout reste en string
    const newProduct: NewProduct = {
      title: values.title.trim(),
      brand: values.brand.trim(),
      category: values.category,
      price: Number(values.price),
      // Number('') vaut 0 : un stock laissé vide est envoyé à 0
      stock: Number(values.stock),
      description: values.description.trim(),
    }

    setSubmitting(true)
    setSubmitError(null)
    setCreatedProduct(null)
    createProduct(newProduct)
      .then((product) => {
        setCreatedProduct(product)
        setValues(EMPTY_VALUES)
        // La confirmation s'affiche au-dessus du formulaire : on remonte pour la voir
        window.scrollTo({ top: 0 })
      })
      // values n'est pas vidé en cas d'échec : l'utilisateur peut renvoyer sans tout retaper
      .catch(() =>
        setSubmitError(
          "L'envoi a échoué. Vérifiez votre connexion puis réessayez.",
        ),
      )
      .finally(() => setSubmitting(false))
  }

  return (
    // Une seule colonne étroite : plus lisible qu'un formulaire en pleine largeur
    <div className="max-w-form">
      <title>Ajouter un produit | Mobilo</title>
      <h1 className="text-2xl sm:text-3xl">Ajouter un produit</h1>
      <p className="mt-sm mb-xl text-muted">
        Remplissez les informations ci-dessous pour proposer un nouveau produit.
      </p>

      {createdProduct && <CreatedProductSummary product={createdProduct} />}

      <ProductForm
        values={values}
        errors={errors}
        submitting={submitting}
        submitError={submitError}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
