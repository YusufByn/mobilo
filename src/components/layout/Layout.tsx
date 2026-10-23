import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import MobileNav from './MobileNav'

export default function Layout() {
  // Colonne pleine hauteur : le footer reste en bas même si la page est courte
  // pb-mobile-nav : réserve la place de la barre d'onglets fixée en bas, sinon elle cache le footer
  return (
    <div className="flex flex-col min-h-screen pb-mobile-nav sm:pb-0">
      <Header />
      <main className="flex-1 w-full max-w-page mx-auto px-md pt-xl pb-2xl sm:px-lg sm:pb-3xl lg:px-xl">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
