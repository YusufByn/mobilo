import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Tailwind et le thème : global.css importe lui-même variables.css
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
