import type { SubmitEvent } from 'react'
import { SHOP_CATEGORIES } from '../../config/shop'
import type {
  FieldChangeEvent,
  ProductFormErrors,
  ProductFormValues,
} from '../../types/form'
import Button from '../ui/Button'
import FormField from '../ui/FormField'

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
    <form className="flex flex-col gap-lg" onSubmit={onSubmit} noValidate>
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

      {/* Prix et stock l'un sous l'autre, comme tous les champs */}
      <div className="grid grid-cols-1 gap-lg">
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
        <p
          className="p-md font-semibold text-error bg-surface border-2 border-error rounded-field"
          role="alert"
        >
          {submitError}
        </p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Envoi…' : 'Ajouter le produit'}
      </Button>
      <p className="-mt-sm text-sm text-muted">
        Les champs marqués d'un * sont obligatoires.
      </p>
    </form>
  )
}
