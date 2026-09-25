import { useState } from 'react'
import { plans } from '../data/content'
import { delay } from '../lib/motion'

export function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section className="section pricing" id="pricing">
      <img className="pricing-glow" src="/images/pricing-glow.svg" alt="" />
      <div className="container">
        <header className="section-heading" data-reveal>
          <h2>Select the best plan for your AI visibility goals.</h2>
          <p>Track how your brand appears across search engines, generative answers, and answer-based platforms — then improve it with actionable insights.</p>
          <div className="billing-toggle" data-active={yearly ? 'yearly' : 'monthly'} role="group" aria-label="Billing frequency">
            <button className={!yearly ? 'active' : ''} type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
            <button className={yearly ? 'active' : ''} type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly <span>20% OFF</span></button>
          </div>
        </header>
        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <article className={`price-card ${plan.featured ? 'featured' : ''}`} key={plan.name} data-reveal style={delay(i * 0.08)}>
              <div className="price-top">
                {plan.featured && <img className="growth-decor" src="/icons/growth-decor.svg" alt="" />}
                <div className="plan-title">
                  <h3>{plan.name}</h3>
                  {plan.featured && <span>Best Value</span>}
                </div>
                <p>{plan.copy}</p>
                <div className="price">
                  <strong key={yearly ? 'y' : 'm'}>${yearly ? Math.round(plan.monthly * 0.8) : plan.monthly}</strong>
                  <span>/month</span>
                </div>
                <a className={`button ${plan.featured ? 'primary' : 'secondary'}`} href="#cta">{plan.cta}</a>
              </div>
              <ul className="price-points">
                {plan.points.map(([pre, bold, post]) => (
                  <li key={bold}>
                    <img src={plan.featured ? '/icons/bullet-gold.svg' : '/icons/bullet.svg'} width="9.49" height="10" alt="" />
                    <span>{pre}<b>{bold}</b>{post}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
