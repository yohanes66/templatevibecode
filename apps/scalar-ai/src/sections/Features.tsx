import { features } from '../data/content'
import { delay, trackPointer } from '../lib/motion'

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <header className="section-heading" data-reveal>
          <h2>We’ve helped hundreds of global companies</h2>
          <p>From managing clients to optimizing progress</p>
        </header>
        <div className="bento" onPointerMove={trackPointer}>
          <div className="bento-row bento-row-lg">
            <div className="bento-cell" data-reveal>
              <div className="bento-text">
                <h3>Know Your AI Reputation</h3>
                <p>Live AI Answer score plus Model Memory baseline to spot gaps between how AI “remembers” you and how you show up in live answers.</p>
              </div>
              <div className="bento-art">
                <div className="skew-wrap rep-wrap">
                  <img className="skew-shot rep-shot" src="/images/bento/reputation.webp" alt="AI reputation article score preview" loading="lazy" />
                </div>
                <img className="mini-card mini-1" src="/images/bento/card-chatgpt.png" alt="ChatGPT reputation: Excellent, 90%" loading="lazy" />
                <img className="mini-card mini-2" src="/images/bento/card-gemini.png" alt="Gemini reputation: Excellent, 90%" loading="lazy" />
                <img className="mini-card mini-3" src="/images/bento/card-chatgpt.png" alt="" loading="lazy" />
              </div>
            </div>
            <div className="bento-cell" data-reveal style={delay(0.08)}>
              <div className="bento-text">
                <h3>Win With Share of Voice</h3>
                <p>Track SoV, position, consistency, and sentiment across intents to measure real visibility quality.</p>
              </div>
              <div className="bento-art">
                <div className="skew-wrap sov-wrap">
                  <img className="skew-shot sov-shot" src="/images/bento/share-of-voice.webp" alt="Share of voice dashboard preview" loading="lazy" />
                </div>
                <img className="sov-chart" src="/images/bento/card-sentiment.png" alt="Sentiment trends chart" loading="lazy" />
              </div>
            </div>
          </div>
          <div className="bento-row bento-row-sm">
            {features.map(([title, copy, image], i) => (
              <div className="bento-cell" data-reveal style={delay(0.16 + i * 0.08)} key={title}>
                <div className="bento-text">
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <div className="bento-art">
                  <img className="bento-shot" src={`/images/bento/${image}.webp`} alt={`${title} interface preview`} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
