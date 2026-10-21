import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Filters } from '../types/filters'

interface FiltersContextValue {
  filters: Filters
  setSearch: (search: string) => void
  setCategory: (category: string) => void
  setMaxPrice: (maxPrice: number | null) => void
  setPage: (page: number) => void
  resetFilters: () => void
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

  // Chaque changement de critère ramène à la page 1 : l'ancienne page peut ne plus exister
  function setSearch(search: string) {
    setFilters({ ...filters, search, page: 1 })
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
    setFilters(DEFAULT_FILTERS)
  }

  return (
    <FiltersContext
      value={{
        filters,
        setSearch,
        setCategory,
        setMaxPrice,
        setPage,
        resetFilters,
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
