import Button from './Button'

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-start gap-md px-lg py-xl bg-surface border-[1.5px] border-error rounded-card"
      role="alert"
    >
      <p className="font-semibold text-error">{message}</p>
      <Button onClick={onRetry}>Réessayer</Button>
    </div>
  )
}
