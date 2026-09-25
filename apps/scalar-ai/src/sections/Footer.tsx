import { Logo } from '../components/Logo'
import { socials } from '../data/content'

export function Footer() {
  return (
    <footer>
      <div className="container">
        <Logo />
        <p className="footer-tagline">Discoverable Across Every AI Search</p>
        <div className="footer-links">
          <a href="#top">Homepage</a>
          <a href="#pricing">Pricing</a>
          <a href="#reviews">Reviews</a>
        </div>
      </div>
      <div className="container">
        <div className="footer-bottom">
          <p>© 2026 Scalar.ai. All rights reserved.</p>
          <div className="socials" aria-label="Social links">
            {socials.map(([icon, label]) => (
              <a href="#top" aria-label={label} key={icon}><img src={`/icons/social-${icon}.svg`} width="24" height="24" alt="" /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
