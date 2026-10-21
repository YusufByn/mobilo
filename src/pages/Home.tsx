import { Link } from 'react-router'
import './Home.css'

export default function Home() {
  return (
    <section className="home">
      <h1 className="home__title">Les meilleurs smartphones, simplement.</h1>
      <p className="home__text">
        Smartphones, tablettes et accessoires des plus grandes marques, réunis
        dans un seul catalogue.
      </p>
      <div className="home__actions">
        <Link to="/products" className="home__link home__link--primary">
          Voir le catalogue
        </Link>
        <Link to="/wishlist" className="home__link">
          Ma wishlist
        </Link>
      </div>
    </section>
  )
}
