import { PRICE_OPTIONS, SHOP_CATEGORIES } from '../../config/shop'
import { useFilters } from '../../context/FiltersContext'
import './SearchForm.css'

export default function SearchForm() {
  const {
    filters,
    searchInput,
    setSearch,
    setCategory,
    setMaxPrice,
    resetFilters,
  } = useFilters()

  return (
    <div className="search-form" role="search">
      <div className="search-form__field search-form__field--search">
        <label htmlFor="search" className="search-form__label">
          Recherche
        </label>
        {/* Wrapper pour placer la loupe dessinée en CSS dans le champ */}
        <div className="search-form__search">
          <input
            id="search"
            type="search"
            className="search-form__input"
            placeholder="Rechercher un modèle ou une marque…"
            value={searchInput}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="search-form__field">
        <label htmlFor="category" className="search-form__label">
          Catégorie
        </label>
        <select
          id="category"
          className="search-form__input"
          value={filters.category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Toutes</option>
          {SHOP_CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="search-form__field">
        <label htmlFor="max-price" className="search-form__label">
          Prix max
        </label>
        {/* Un select ne contient que des strings : '' représente « pas de prix max » (null) */}
        <select
          id="max-price"
          className="search-form__input"
          value={filters.maxPrice === null ? '' : String(filters.maxPrice)}
          onChange={(event) =>
            setMaxPrice(
              event.target.value === '' ? null : Number(event.target.value),
            )
          }
        >
          <option value="">Tous les prix</option>
          {PRICE_OPTIONS.map((price) => (
            <option key={price} value={price}>
              Jusqu'à {price.toLocaleString('fr-FR')} $
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="search-form__reset"
        onClick={resetFilters}
      >
        Réinitialiser
      </button>
    </div>
  )
}
