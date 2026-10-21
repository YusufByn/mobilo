import type { SubmitEvent } from 'react'
import { SHOP_CATEGORIES } from '../../config/shop'
import type {
  FieldChangeEvent,
  ProductFormErrors,
  ProductFormValues,
} from '../../types/form'
import FormField from '../ui/FormField'
import './ProductForm.css'

interface ProductFormProps {
  values: ProductFormValues
  errors: ProductFormErrors
  submitting: boolean
  submitError: string | null
  onChange: (event: FieldChangeEvent) => void
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

export default function ProductForm({
  values,
  errors,
  submitting,
  submitError,
  onChange,
  onSubmit,
}: ProductFormProps) {
  // noValidate : on affiche nos propres messages, pas les bulles du navigateur
  return (
    <form className="product-form" onSubmit={onSubmit} noValidate>
      <FormField
        name="title"
        label="Nom du produit"
        value={values.title}
        onChange={onChange}
        required
        error={errors.title}
      />
      <FormField
        name="brand"
        label="Marque"
        value={values.brand}
        onChange={onChange}
        required
        error={errors.brand}
      />
      <FormField
        name="category"
        label="Catégorie"
        type="select"
        value={values.category}
        onChange={onChange}
        required
        error={errors.category}
      >
        <option value="">Choisir une catégorie</option>
        {SHOP_CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </FormField>

      <div className="product-form__row">
        <FormField
          name="price"
          label="Prix ($)"
          type="number"
          value={values.price}
          onChange={onChange}
          required
          error={errors.price}
        />
        <FormField
          name="stock"
          label="Stock"
          type="number"
          value={values.stock}
          onChange={onChange}
          error={errors.stock}
        />
      </div>

      <FormField
        name="description"
        label="Description"
        type="textarea"
        value={values.description}
        onChange={onChange}
        required
        error={errors.description}
      />

      {submitError && (
        <p className="product-form__error" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className="product-form__submit"
        disabled={submitting}
      >
        {submitting ? 'Envoi…' : 'Ajouter le produit'}
      </button>
      <p className="product-form__note">
        Les champs marqués d'un * sont obligatoires.
      </p>
    </form>
  )
}
