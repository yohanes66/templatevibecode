import { Mockup } from '../components/Mockup'
import { ctaPoints } from '../data/content'
import { delay } from '../lib/motion'

export function Cta() {
  return (
    <section className="section cta" id="cta">
      <div className="container cta-grid">
        <div className="cta-copy" data-reveal>
          <h2>Join 4,000+ startups growing with Scalar.ai</h2>
          <ul>
            {ctaPoints.map((item) => (
              <li key={item}><img src="/icons/cta-bullet.svg" width="26.57" height="28" alt="" />{item}</li>
            ))}
          </ul>
          <div className="cta-actions">
            <a className="button secondary" href="#features">Learn more</a>
            <a className="button primary" href="#pricing">Get started</a>
          </div>
        </div>
        <div className="cta-visual" data-reveal style={delay(0.12)}>
          <div className="cta-landscape">
            <img src="/images/cta-landscape.webp" alt="" loading="lazy" />
          </div>
          <Mockup className="cta-mockup" />
        </div>
      </div>
    </section>
  )
}
