import { Link } from 'react-router'
import { SHOP_CATEGORIES } from '../config/shop'
import { useFilters } from '../context/FiltersContext'
import type { ProductCategory } from '../types/product'
import { formatPrice } from '../utils/formatPrice'
import './Home.css'

const CDN = 'https://cdn.dummyjson.com/product-images'

// L'accueil n'appelle pas l'API : photo et prix de départ relevés une fois dans le jeu fixe de DummyJSON
const CATEGORY_TILES: Record<
  ProductCategory,
  { image: string; fromPrice: number }
> = {
  smartphones: {
    image: `${CDN}/smartphones/iphone-x/1.webp`,
    fromPrice: 149.99,
  },
  tablets: {
    image: `${CDN}/tablets/ipad-mini-2021-starlight/1.webp`,
    fromPrice: 349.99,
  },
  'mobile-accessories': {
    image: `${CDN}/mobile-accessories/apple-airpods-max-silver/1.webp`,
    fromPrice: 12.99,
  },
}

export default function Home() {
  const { showCategory } = useFilters()

  return (
    <div className="home">
      {/* React 19 déplace tout seul cette balise dans le <head> de la page */}
      <title>Mobilo, boutique de téléphones</title>
      <div className="home__intro">
        <h1 className="home__title">Smartphones, tablettes et accessoires</h1>
        <Link to="/products" className="home__all">
          Voir tout le catalogue
        </Link>
      </div>

      <ul className="home__categories" aria-label="Rayons">
        {SHOP_CATEGORIES.map((category) => (
          // data-category : chaque tuile prend la couleur de son rayon (variables.css)
          <li
            key={category.value}
            className="home__category"
            data-category={category.value}
          >
            <Link
              to="/products"
              className="home__tile"
              onClick={() => showCategory(category.value)}
            >
              <span className="home__tile-name">{category.label}</span>
              {/* alt vide : image décorative, le nom du rayon décrit déjà le lien */}
              <img
                src={CATEGORY_TILES[category.value].image}
                alt=""
                className="home__tile-image"
              />
              <span className="home__tile-price">
                <span className="home__tile-from">dès</span>{' '}
                {formatPrice(CATEGORY_TILES[category.value].fromPrice)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
