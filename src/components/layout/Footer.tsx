import './Footer.css'

// Calculée une fois au chargement du fichier : un rendu doit toujours donner le même résultat
const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__inner">
        <strong>Mobilo</strong> © {currentYear} · Données fournies par DummyJSON
      </p>
    </footer>
  )
}
