import type { ReactNode } from 'react'

interface EmptyStateProps {
  message: string
  // L'action change selon la page : bouton « Réinitialiser » ici, lien vers le catalogue ailleurs
  children: ReactNode
}

// Sobre : une phrase et l'action qui débloque la situation
export default function EmptyState({ message, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-md px-lg py-xl bg-surface rounded-card">
      <p className="text-xl font-semibold leading-display tracking-tight">
        {message}
      </p>
      {children}
    </div>
  )
}
