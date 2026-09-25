import { Mockup } from '../components/Mockup'

export function Hero() {
  return (
    <section className="hero">
      <img className="hero-bg" src="/images/hero-landscape.webp" alt="" />

      <div className="hero-copy container" data-reveal>
        <h1>Make Your Brand Discoverable Across Every AI Search</h1>
        <p>Leverage AI to improve your visibility across search engines, generative answers, and answer-based platforms with smarter optimization for SEO, GEO, and AEO.</p>
        <a className="button primary" href="#pricing">Get Started</a>
      </div>

      <Mockup className="hero-mockup" />
    </section>
  )
}
