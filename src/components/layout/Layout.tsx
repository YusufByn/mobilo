import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'
import MobileNav from './MobileNav'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
    </div>
  )
}
