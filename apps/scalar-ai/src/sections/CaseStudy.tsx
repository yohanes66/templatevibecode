import { delay } from '../lib/motion'

export function CaseStudy() {
  return (
    <section className="case-study">
      <div className="container case-copy" data-reveal>
        <span className="eyebrow">Our Study Case</span>
        <h2>World Cup 2026: Social Sentiment, Odds &amp; the Favorites’ Curse</h2>
        <p>What bookmaker odds, prediction markets, and 67,625 US social conversations say about the biggest World Cup in history — as of June 12, 2026 (Day 2)</p>
        <a className="button primary" href="#pricing">View Case Study</a>
      </div>
      <div className="container case-shot" data-reveal style={delay(0.1)}>
        <div className="case-clip">
          <div className="case-frame">
            <img src="/images/dashboard-screen.webp" alt="Scalar.ai case study dashboard" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
