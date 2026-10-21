import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { THEME_STORAGE_KEY } from '../config/shop'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

function readStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  // Rien d'enregistré (ou valeur modifiée à la main) : on suit le réglage de l'appareil
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// null par défaut : useTheme lève une erreur si on oublie le provider
const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialisation lazy : le localStorage n'est lu qu'au premier rendu
  const [theme, setTheme] = useState<Theme>(readStoredTheme)

  // L'attribut data-theme sur <html> active les couleurs sombres de variables.css
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}

// Hook gardé à côté de son provider (archi du CDC) : seul effet, ce fichier se recharge en entier en dev
// oxlint-disable-next-line react/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === null) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider')
  }
  return context
}
