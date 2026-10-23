// Calculée une fois au chargement du fichier : un rendu doit toujours donner le même résultat
const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="text-on-footer bg-footer border-t border-line-soft">
      <p className="max-w-page mx-auto px-md py-lg sm:px-lg lg:px-xl text-sm text-footer-muted">
        <strong className="mr-sm font-display text-lg font-stretch-(--stretch-display) font-black lowercase text-on-footer">
          Mobilo
        </strong>{' '}
        Données produits fournies par DummyJSON, {currentYear}.
      </p>
    </footer>
  )
}
