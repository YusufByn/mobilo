import { Link } from 'react-router'
import { SHOP_CATEGORIES } from '../config/shop'
import { useFilters } from '../context/FiltersContext'
import type { ProductCategory } from '../types/product'
import { formatPrice } from '../utils/formatPrice'

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
    <div className="flex flex-col gap-lg">
      {/* React 19 déplace tout seul cette balise dans le <head> de la page */}
      <title>Mobilo, boutique de téléphones</title>
      {/* Pas de slogan : une ligne qui dit ce qu'on vend, et on entre tout de suite dans les rayons */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-md gap-y-sm">
        <h1 className="text-xl sm:text-2xl">
          Smartphones, tablettes et accessoires
        </h1>
        <Link to="/products" className="font-semibold underline-offset-4">
          Voir tout le catalogue
        </Link>
      </div>

      {/* Desktop : les trois rayons côte à côte, les smartphones (16 produits sur 33) un peu plus larges */}
      <ul
        className="grid grid-cols-1 gap-md lg:grid-cols-[1.4fr_1fr_1fr]"
        aria-label="Rayons"
      >
        {SHOP_CATEGORIES.map((category) => (
          // data-category : chaque tuile prend la couleur de son rayon (variables.css)
          <li key={category.value} data-category={category.value}>
            {/* Une tuile = un aplat de la couleur du rayon, la photo détourée en grand, le prix de départ */}
            <Link
              to="/products"
              className="group grid grid-rows-[auto_1fr_auto] h-full min-h-96 p-lg text-on-accent no-underline bg-accent rounded-tile focus-visible:outline-offset-4 lg:min-h-136"
              onClick={() => showCategory(category.value)}
            >
              <span className="text-2xl font-semibold leading-display tracking-tight">
                {category.label}
              </span>
              {/* alt vide : image décorative, le nom du rayon décrit déjà le lien */}
              <img
                src={CATEGORY_TILES[category.value].image}
                alt=""
                className="self-center justify-self-center w-4/5 max-h-64 object-contain transition-transform ease-out group-hover:-translate-y-sm group-hover:scale-105 lg:max-h-88"
              />
              <span className="font-display text-price-lg font-stretch-(--stretch-condensed) font-black tabular-nums leading-none">
                <span className="font-text text-lg font-stretch-normal font-semibold">
                  dès
                </span>{' '}
                {formatPrice(CATEGORY_TILES[category.value].fromPrice)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
