import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { SEARCH_DELAY } from '../config/shop'
import type { Filters } from '../types/filters'

interface FiltersContextValue {
  filters: Filters
  // Texte affiché dans le champ : filters.search ne le rattrape que 300 ms après la dernière frappe
  searchInput: string
  setSearch: (search: string) => void
  setCategory: (category: string) => void
  setMaxPrice: (maxPrice: number | null) => void
  setPage: (page: number) => void
  resetFilters: () => void
  showCategory: (category: string) => void
}

const DEFAULT_FILTERS: Filters = {
  search: '',
  category: '',
  maxPrice: null,
  page: 1,
}

// null par défaut : useFilters lève une erreur si on oublie le provider
const FiltersContext = createContext<FiltersContextValue | null>(null)

interface FiltersProviderProps {
  children: ReactNode
}

export function FiltersProvider({ children }: FiltersProviderProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [searchInput, setSearchInput] = useState('')
  // useRef et pas useState : l'id du minuteur doit être gardé entre les rendus sans en provoquer
  const searchTimer = useRef<number | undefined>(undefined)

  // Chaque changement de critère ramène à la page 1 : l'ancienne page peut ne plus exister
  function setSearch(search: string) {
    setSearchInput(search)
    // Une nouvelle frappe annule le minuteur précédent : on filtre 300 ms après la dernière
    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => {
      // Mise à jour à partir de la valeur actuelle : un filtre a pu changer pendant les 300 ms
      setFilters((current) => ({ ...current, search, page: 1 }))
    }, SEARCH_DELAY)
  }

  function setCategory(category: string) {
    setFilters({ ...filters, category, page: 1 })
  }

  function setMaxPrice(maxPrice: number | null) {
    setFilters({ ...filters, maxPrice, page: 1 })
  }

  function setPage(page: number) {
    setFilters({ ...filters, page })
  }

  function resetFilters() {
    clearTimeout(searchTimer.current)
    setSearchInput('')
    setFilters(DEFAULT_FILTERS)
  }

  // Tuiles de l'accueil : resetFilters() puis setCategory() ne marcherait pas,
  // setCategory repartirait de l'ancien filters et remettrait l'ancienne recherche
  function showCategory(category: string) {
    clearTimeout(searchTimer.current)
    setSearchInput('')
    setFilters({ ...DEFAULT_FILTERS, category })
  }

  return (
    <FiltersContext
      value={{
        filters,
        searchInput,
        setSearch,
        setCategory,
        setMaxPrice,
        setPage,
        resetFilters,
        showCategory,
      }}
    >
      {children}
    </FiltersContext>
  )
}

// Hook gardé à côté de son provider (archi du CDC) : seul effet, ce fichier se recharge en entier en dev
// oxlint-disable-next-line react/only-export-components
export function useFilters() {
  const context = useContext(FiltersContext)
  if (context === null) {
    throw new Error('useFilters doit être utilisé dans un FiltersProvider')
  }
  return context
}
