import { PRICE_OPTIONS, SHOP_CATEGORIES } from '../../config/shop'
import { useFilters } from '../../context/FiltersContext'
import Button from '../ui/Button'

// Même style pour le champ de recherche et les 2 listes déroulantes
const INPUT_CLASSES =
  'w-full min-h-control px-md bg-surface border-[1.5px] border-field-border rounded-field transition-colors placeholder:text-muted hover:border-ink focus:border-ink'
const LABEL_CLASSES = 'text-sm text-muted'
// min-w-0 : sans lui, une longue option de liste élargirait la colonne de la grille
const FIELD_CLASSES = 'flex flex-col gap-xs min-w-0'

export default function SearchForm() {
  const {
    filters,
    searchInput,
    setSearch,
    setCategory,
    setMaxPrice,
    resetFilters,
  } = useFilters()

  // Mobile : recherche et bouton sur toute la largeur (col-span-full), les 2 filtres côte à côte (CDC)
  // Desktop : une seule ligne, la recherche prend la place restante
  return (
    <div
      className="grid grid-cols-2 gap-x-sm gap-y-md mb-lg lg:grid-cols-[1fr_13rem_13rem_auto] lg:items-end lg:gap-md"
      role="search"
    >
      <div className={`${FIELD_CLASSES} col-span-full lg:col-auto`}>
        <label htmlFor="search" className={LABEL_CLASSES}>
          Recherche
        </label>
        <input
          id="search"
          type="search"
          className={INPUT_CLASSES}
          placeholder="Rechercher un modèle ou une marque…"
          value={searchInput}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className={FIELD_CLASSES}>
        <label htmlFor="category" className={LABEL_CLASSES}>
          Catégorie
        </label>
        <select
          id="category"
          className={INPUT_CLASSES}
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

      <div className={FIELD_CLASSES}>
        <label htmlFor="max-price" className={LABEL_CLASSES}>
          Prix max
        </label>
        {/* Un select ne contient que des strings : '' représente « pas de prix max » (null) */}
        <select
          id="max-price"
          className={INPUT_CLASSES}
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

      <Button
        variant="ghost"
        onClick={resetFilters}
        className="col-span-full self-end lg:col-auto"
      >
        Réinitialiser
      </Button>
    </div>
  )
}
