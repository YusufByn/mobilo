import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex flex-col items-start gap-md pt-lg">
      <title>Page introuvable | Mobilo</title>
      <h1 className="text-3xl">Page introuvable</h1>
      <p className="max-w-measure text-lg text-muted">
        L'adresse demandée ne correspond à aucune page de Mobilo.
      </p>
      <Button to="/" className="mt-sm">
        Retour à l'accueil
      </Button>
    </section>
  )
}
