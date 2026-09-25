import { reviewColumns } from '../data/content'

export function Reviews() {
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <header className="section-heading" data-reveal>
          <h2>Our reviews</h2>
          <p>Hear first-hand from our incredible community of customers.</p>
        </header>
        <div className="review-columns" data-reveal>
          {reviewColumns.map((column, c) => (
            <div className="review-col" key={c}>
              <div className="review-track">
                {[0, 1].map((copy) => (
                  <div className="review-set" key={copy} aria-hidden={copy === 1 || undefined}>
                    {column.map((review) => (
                      <article className="review-card" key={review.name}>
                        <div className="review-body">
                          <img className="company-logo" src={`/logos/${review.logo}.svg`} alt={copy ? '' : review.company} loading="lazy" />
                          <p>{review.quote}</p>
                        </div>
                        <div className="reviewer">
                          <img className="reviewer-avatar" src={`/images/avatar-${review.avatar}.png`} alt="" loading="lazy" />
                          <span>
                            <strong>{review.name}<img src="/icons/verified.svg" width="16" height="16" alt={copy ? '' : 'Verified'} /></strong>
                            <small>{review.role}</small>
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
