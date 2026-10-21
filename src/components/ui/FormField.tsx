import type { ReactNode } from 'react'
import type { FieldChangeEvent } from '../../types/form'
import './FormField.css'

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
  }

  return (
    <div className="form-field">
      <label htmlFor={name} className="form-field__label">
        {label}
        {required && (
          <span className="form-field__required" aria-hidden="true">
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
        <p id={errorId} className="form-field__error">
          {error}
        </p>
      )}
    </div>
  )
}
