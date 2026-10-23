import type { ReactNode } from 'react'
import type { FieldChangeEvent } from '../../types/form'

interface FormFieldProps {
  // Sert à la fois d'id (pour le label) et de name (pour handleChange)
  name: string
  label: string
  value: string
  onChange: (event: FieldChangeEvent) => void
  type?: 'text' | 'number' | 'select' | 'textarea'
  required?: boolean
  error?: string
  // Les <option> quand type vaut 'select'
  children?: ReactNode
}

// Une seule liste de classes pour les 3 sortes de champs que FormField peut afficher
const FIELD_CLASSES =
  'w-full min-h-control px-md py-sm bg-surface border-2 border-field-border rounded-field focus:border-action aria-invalid:border-error'

export default function FormField({
  name,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  error,
  children,
}: FormFieldProps) {
  const errorId = `${name}-error`
  // Attributs communs aux 3 sortes de champs ; aria-describedby fait lire l'erreur au lecteur d'écran
  const fieldProps = {
    id: name,
    name,
    value,
    onChange,
    required,
    'aria-invalid': error !== undefined,
    'aria-describedby': error ? errorId : undefined,
    className: FIELD_CLASSES,
  }

  return (
    <div className="flex flex-col gap-xs">
      <label htmlFor={name} className="font-semibold">
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {type === 'select' && <select {...fieldProps}>{children}</select>}
      {type === 'textarea' && <textarea rows={5} {...fieldProps} />}
      {(type === 'text' || type === 'number') && (
        <input type={type} {...fieldProps} />
      )}

      {error && (
        <p id={errorId} className="text-sm font-semibold text-error">
          {error}
        </p>
      )}
    </div>
  )
}
