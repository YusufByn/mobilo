import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Les variables doivent être chargées avant les styles qui les utilisent
import './styles/variables.css'
import './styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
