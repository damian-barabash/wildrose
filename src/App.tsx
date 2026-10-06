import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { DraftBar, MobileBar } from './components/Chrome'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { NewsletterPopup } from './components/Newsletter'
import { Vines } from './components/Vines'
import { scrollToId, scrollToTop, useReveal, useSmoothScroll } from './lib/motion'
import { About } from './pages/About'
import { Help } from './pages/Help'
import { Contact } from './pages/Contact'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Support } from './pages/Support'
import { Transparency } from './pages/Transparency'

export function App() {
  const { pathname, hash } = useLocation()
  useSmoothScroll()
  useReveal(pathname)

  useEffect(() => {
    if (hash) requestAnimationFrame(() => scrollToId(hash.slice(1)))
    else scrollToTop()
  }, [pathname, hash])

  return (
    <>
      <a className="skip" href="#tresc">Przejdź do treści</a>
      <DraftBar />
      <Header />
      <main id="tresc" key={pathname} className="page">
        <Vines />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pomoc" element={<Help />} />
          <Route path="/wspolpraca" element={<Support />} />
          <Route path="/o-fundacji" element={<About />} />
          <Route path="/przejrzystosc" element={<Transparency />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
      <NewsletterPopup />
    </>
  )
}
