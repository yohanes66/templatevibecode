import { useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { Logo } from './Logo'
import { useScrolled } from '../lib/motion'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useScrolled()

  return (
    <header className={`nav-bar ${scrolled ? 'is-scrolled' : ''}`}>
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
    </header>
  )
}
