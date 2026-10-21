import { NavLink } from 'react-router'
import './MobileNav.css'

export default function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Navigation principale">
      <NavLink to="/" className="mobile-nav__link">
        <svg
          className="mobile-nav__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M3 11l9-8 9 8M5 9v11h5v-6h4v6h5V9" />
        </svg>
        Accueil
      </NavLink>
      <NavLink to="/products" className="mobile-nav__link">
        <svg
          className="mobile-nav__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
        Catalogue
      </NavLink>
      <NavLink to="/wishlist" className="mobile-nav__link">
        <svg
          className="mobile-nav__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z" />
        </svg>
        Wishlist
      </NavLink>
      <NavLink to="/create" className="mobile-nav__link">
        <svg
          className="mobile-nav__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        Ajouter
      </NavLink>
    </nav>
  )
}
