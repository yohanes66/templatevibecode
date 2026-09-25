import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { Logo } from '../components/Logo'
import { Mockup } from '../components/Mockup'

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="hero">
      <img className="hero-bg" src="/images/hero-landscape.webp" alt="" />
      <nav className="nav container" aria-label="Main navigation">
        <Logo />
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
        </div>
        <a className="button primary nav-cta" href="#pricing">Create Account</a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <List />}
        </button>
      </nav>

      <div className="hero-copy container" data-reveal>
        <h1>Make Your Brand Discoverable Across Every AI Search</h1>
        <p>Leverage AI to improve your visibility across search engines, generative answers, and answer-based platforms with smarter optimization for SEO, GEO, and AEO.</p>
        <a className="button primary" href="#pricing">Get Started</a>
      </div>

      <Mockup className="hero-mockup" />
    </section>
  )
}
