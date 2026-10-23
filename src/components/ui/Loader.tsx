interface LoaderProps {
  message: string
}

export default function Loader({ message }: LoaderProps) {
  return (
    <div className="flex items-center gap-md py-xl font-semibold" role="status">
      {/* Cercle gris dont seul le bord du haut est foncé : en tournant, il dessine le spinner */}
      <span
        className="shrink-0 size-loader border-2 border-line-soft border-t-ink rounded-full animate-spin"
        aria-hidden="true"
      ></span>
      <p>{message}</p>
    </div>
  )
}
