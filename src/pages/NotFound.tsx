import { Link } from 'react-router'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="not-found__title">Page introuvable</h1>
      <p className="not-found__text">
        L'adresse demandée ne correspond à aucune page de Mobilo.
      </p>
      <Link to="/" className="not-found__link">
        Retour à l'accueil
      </Link>
    </section>
  )
}
