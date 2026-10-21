import type { ReactNode } from 'react'
import './EmptyState.css'

interface EmptyStateProps {
  message: string
  // L'action change selon la page : bouton « Réinitialiser » ici, lien vers le catalogue ailleurs
  children: ReactNode
}

export default function EmptyState({ message, children }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-state__message">{message}</p>
      {children}
    </div>
  )
}
