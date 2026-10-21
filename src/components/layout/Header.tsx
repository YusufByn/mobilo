import { Link, NavLink } from 'react-router'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Mobilo
        </Link>
        <nav className="header__nav" aria-label="Navigation principale">
          <NavLink to="/" className="header__link">
            Accueil
          </NavLink>
          <NavLink to="/products" className="header__link">
            Catalogue
          </NavLink>
          <NavLink to="/wishlist" className="header__link">
            Wishlist
          </NavLink>
          <NavLink to="/create" className="header__link header__link--button">
            Ajouter un produit
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
