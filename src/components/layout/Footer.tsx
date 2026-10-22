import './Footer.css'

// Calculée une fois au chargement du fichier : un rendu doit toujours donner le même résultat
const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__inner">
        <strong className="footer__logo">Mobilo</strong> Données produits
        fournies par DummyJSON, {currentYear}.
      </p>
    </footer>
  )
}
