import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createRootRoute, createRoute, createRouter, Link, Outlet } from "@tanstack/react-router";
import { services, cases, partners, quotes, copy } from "./content";

const image = (name: string) => `/images/${name}`;
const chapters = ["Prologue", "The beginning", "What we do", "Selected work", "Where we come from", "Beyond the headlines", "In their words", "Your chapter"];
type Story = { title: string; body: string; image?: string };

function Photo({ name, alt, eager = false }: { name: string; alt: string; eager?: boolean }) {
  return <img src={image(name)} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />;
}

function ChapterHeader({ number }: { number: number }) {
  return <header className="chapter-header mono"><span>Ch. {String(number).padStart(2, "0")} — {chapters[number]}</span><span>[0{number}/07]</span></header>;
}

function Dialog({ title, children, close, menu = false }: { title: string; children: ReactNode; close: () => void; menu?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const dialog = ref.current!;
    trigger.current ??= document.activeElement as HTMLElement;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; dialog.close(); trigger.current?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className={menu ? "menu-dialog" : "story-dialog"} aria-labelledby="dialog-title" onCancel={close} onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div className="dialog-inner"><header className="dialog-header mono"><span id="dialog-title">{title}</span><button onClick={close} aria-label="Close dialog">[ × Close ]</button></header>{children}</div>
  </dialog>;
}

function ServiceList() {
  const [open, setOpen] = useState<number | null>(0);
  return <div className="service-list">{services.map((service, i) => <article className="service" key={service.name} data-open={open === i}>
    <h3><button className="service-row" aria-expanded={open === i} aria-controls={`discipline-${i}`} onClick={() => setOpen(open === i ? null : i)}>
      <span className="service-index mono">(0{i + 1})</span><span className="service-name">{service.name}</span><span className="service-description">{service.description}</span><span className="service-toggle mono">{open === i ? "[ − Close ]" : "[ + Info ]"}</span>
    </button></h3>
    <div className="service-expansion" id={`discipline-${i}`} inert={open !== i} aria-hidden={open !== i}>
      <div className="service-expansion-inner"><div className="service-strip" role="region" tabIndex={open === i ? 0 : -1} aria-label={`${service.name} photo series, scroll to explore`}>
        {service.images.map((name, j) => <figure key={name}><Photo name={name} alt={`${service.name} — ${["editorial portrait", "brand experience", "creative collaboration", "behind the scenes", "studio moment"][j]}`} /></figure>)}
      </div></div>
    </div>
  </article>)}</div>;
}

function CaseCard({ item, index }: { item: typeof cases[number]; index: number }) {
  return <Link to="/work/$slug" params={{ slug: item.slug }} className="case-card">
    <div className="case-photo photo-hover"><Photo name={item.image} alt={item.title} />{index === 0 && <span className="new-tag mono">New</span>}</div>
    <div className="case-info"><div><h3>{item.title}</h3><span className="mono">{item.year}</span></div><p className="mono">{item.code}</p></div>
  </Link>;
}

function Landing() {
  const [chapter, setChapter] = useState(0);
  const [menu, setMenu] = useState(false);
  const [story, setStory] = useState<Story | null>(null);
  const [newsletter, setNewsletter] = useState(false);
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(el => { reveal.observe(el); el.classList.add("will-reveal"); });
    let queued = false;
    const update = () => {
      queued = false;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      const active = sections.filter(el => el.getBoundingClientRect().top <= window.innerHeight * 0.38).at(-1);
      setChapter(Number(active?.dataset.chapter || 0));
    };
    const scroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    update(); window.addEventListener("scroll", scroll, { passive: true });
    return () => { reveal.disconnect(); window.removeEventListener("scroll", scroll); };
  }, []);

  const subscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) setNewsletter(true);
  };
  const legal = (title: string) => setStory({ title, body: title === "Cookie policy" ? "This preview uses no tracking cookies. Newsletter entries are never sent to a server." : title === "Privacy policy" ? "This is a standalone design preview. No newsletter information is stored or sent to a mailing service." : "Norte is a portfolio design exploration. Brand names, projects and addresses are demonstration content. Photography and typography are used to reproduce the supplied Figma design." });

  return <>
    <a href="#beginning" className="skip-link">Skip to content</a>
    <header className="top-bar mono"><a href="#prologue" aria-label="Norte, back to top">Norte®</a><a href={`#chapter-${chapter}`} className="chapter-progress" aria-label={`Current chapter: ${chapters[chapter]}`}><span>Ch. 0{chapter}</span><span className="progress-track"><span style={{ width: `${15 + chapter / 7 * 85}%` }} /></span><span>/ 07 — {chapters[chapter]}</span></a><a href="#chapter-7">[ Let’s talk ]</a></header>
    <main>
      <div className="wordmark" id="prologue"><h1>NORTE</h1></div>
      <section id="chapter-0" data-chapter="0" className="prologue full-photo">
        <Photo name="prologue.webp" alt="Norte fashion presentation: two models on a concrete runway in Jakarta" eager />
        <div className="hero-meta mono"><span>( Prologue )</span><span>Fashion · Beauty · Lifestyle</span></div>
        <div className="hero-chapter"><span>00</span><a href="#beginning" className="mono">Scroll ↓</a></div>
      <h2 className="hero-statement">We make brands visible.<br /><span>Then unforgettable.</span></h2>
      </section>
      <section id="chapter-1" data-chapter="1" className="beginning">
        <ChapterHeader number={1} /><div id="beginning" className="manifesto" data-reveal>
          <div className="manifesto-sign"><img src={image("emblem-88.svg")} alt="" width="88" height="88" /><p className="mono">Est. 2019 — Jakarta</p></div>
          <div><h2>{copy.manifesto}</h2><div className="manifesto-support"><p>{copy.supporting}</p><ul className="mono"><li>[ Honest ]</li><li>[ Integrated ]</li><li>[ Curious ]</li></ul></div></div>
        </div>
      </section>
      <section id="chapter-2" data-chapter="2" className="disciplines"><ChapterHeader number={2} /><div className="discipline-intro"><h2 data-reveal>Four disciplines. One story, told everywhere.</h2></div><ServiceList /></section>
      <section id="chapter-3" data-chapter="3" className="selected-work"><ChapterHeader number={3} /><p className="work-label mono">( Selected work, 2023 — 2026 )</p><div className="case-track" tabIndex={0} role="region" aria-label="Selected work, scroll horizontally">{cases.map((item, i) => <CaseCard key={item.slug} item={item} index={i} />)}</div><div className="view-all mono"><Link to="/work">[ View all cases ]</Link></div></section>
      <nav className="doors" aria-label="Explore Norte">
        <Link to="/work" className="door"><div className="door-label mono"><span>Our work</span><span>[ See cases ]</span></div><div className="photo-hover"><Photo name="door-work.webp" alt="A white dress on the Norte runway" /></div></Link>
        <a href="#chapter-4" className="door"><div className="door-label mono"><span>Our story</span><span>[ Read more ]</span></div><div className="photo-hover"><Photo name="door-story.webp" alt="The Norte team reviewing creative work in their studio" /></div></a>
        <button className="door" onClick={() => setStory({ title: "The art of a story that travels", image: "door-journal.webp", body: "A story becomes a brand when it is told with care, again and again. From a thoughtful press edit to a creator who truly understands the product, we look for the moments that feel natural. Our working table is full of photographs, conversations and half-finished ideas. That is where the work begins — long before the headline." })}><div className="door-label mono"><span>Our journal</span><span>[ Latest ]</span></div><div className="photo-hover"><Photo name="door-journal.webp" alt="Fashion editorial contact sheets on a studio table" /></div></button>
      </nav>
      <section id="chapter-4" data-chapter="4" className="origin"><ChapterHeader number={4} /><div className="origin-statement"><div data-reveal><p className="mono">Norte©2026</p><h2>Made in Jakarta. Told worldwide.</h2></div><div className="origin-columns mono"><span>Jakarta</span><p>{copy.origin}</p><span>Singapore</span></div><img src={image("emblem-56.svg")} alt="" width="56" height="56" /></div><div className="backstage full-photo"><Photo name="backstage.webp" alt="Models and the Norte team backstage at a Spring/Summer presentation" /><div className="chapter-caption"><span>04</span><span className="mono">Behind the scenes — Spring/Summer presentation</span></div></div></section>
      <section id="chapter-5" data-chapter="5" className="community"><ChapterHeader number={5} /><div className="community-statement" data-reveal><p className="mono">✦ ✦ ✦</p><h2>More than<br />just press.</h2></div><div className="giving"><div data-reveal><p className="mono">Giving back</p><p>{copy.giving}</p></div></div><p className="community-label mono">( Our greater community )</p><div>{partners.map(partner => <article className="partner" key={partner.name}><div className="partner-action mono"><button onClick={() => setStory({ title: partner.name, body: partner.description, image: partner.image })}>[ Visit website ]</button></div><div className="partner-copy"><h3>{partner.name}</h3><p>{partner.description}</p></div><div className="photo-hover"><Photo name={partner.image} alt={partner.name} /></div></article>)}</div></section>
      <section id="chapter-6" data-chapter="6" className="testimonials"><ChapterHeader number={6} /><h2 data-reveal>Said by the brands we build.</h2><div className="quote-grid">{quotes.map((quote, i) => <figure key={quote.name}><figcaption className="mono"><div><span>{quote.name}</span><span>{quote.role}</span></div><span>[0{i + 1}]</span></figcaption><blockquote>{quote.quote}</blockquote></figure>)}</div></section>
      <section id="chapter-7" data-chapter="7" className="contact"><ChapterHeader number={7} /><div className="contact-body" data-reveal><img src={image("emblem-56.svg")} alt="" width="56" height="56" /><h2>{copy.invitation}</h2><div className="contact-actions mono"><a href="mailto:hello@norte.studio">[ Contact us ]</a><a href="mailto:hello@norte.studio">hello@norte.studio</a></div></div></section>
    </main>
    <footer className="footer"><div className="footer-top mono"><nav aria-label="Footer"><a href="#chapter-7">Contact</a><a href="#chapter-1">About</a><Link to="/work">Work</Link><button onClick={() => setStory({ title: "Notes from the studio", image: "door-journal.webp", body: "Ideas, references and conversations from our working table. A closer look at the people and moments behind the brands we build." })}>Journal</button>{["Legal notice", "Privacy policy", "Cookie policy"].map(title => <button key={title} onClick={() => legal(title)}>{title}</button>)}</nav><form onSubmit={subscribe}><label htmlFor="newsletter-email">Subscribe to our newsletter:</label><input id="newsletter-email" name="email" type="email" placeholder="Email" required autoComplete="email" aria-describedby={newsletter ? "newsletter-status" : undefined} /><button type="submit">[ Send ]</button>{newsletter && <p id="newsletter-status" role="status">Thank you — preview only; no email has been sent.</p>}</form></div>
      <div className="footer-info mono"><div><h3>Jakarta</h3><address>Jl. Senopati No. 12, Lt. 3<br />12190 — South Jakarta<br /><a href="tel:+622100000000">+62 21 0000 0000</a></address></div><div><h3>Singapore</h3><address>8 Club Street, #02-01<br />069472 — Singapore<br /><a href="tel:+6500000000">+65 0000 0000</a></address></div><div><h3>Follow us</h3><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">TikTok</a></div></div>
      <a href="#prologue" className="footer-wordmark" aria-label="Norte, back to top">NORTE</a><div className="footer-legal mono"><span>© Norte Communication 2026. All rights reserved.</span><div className="language"><button aria-pressed={language === "EN"} onClick={() => setLanguage("EN")}>{language === "EN" ? "[EN]" : "EN"}</button><button aria-pressed={language === "ID"} onClick={() => { setLanguage("ID"); setStory({ title: "Halo, dari Norte", body: "Kami adalah studio komunikasi di Jakarta untuk brand fashion, kecantikan, dan gaya hidup. Mari menulis bab berikutnya untuk brand Anda. Hubungi hello@norte.studio. Situs eksplorasi ini menggunakan konten editorial berbahasa Inggris." }); }}>{language === "ID" ? "[ID]" : "ID"}</button></div><span>Design & build in-house</span></div>
    </footer>
    <button className="floating-menu mono" onClick={() => setMenu(true)} aria-haspopup="dialog" aria-expanded={menu}>[ Menu ]</button>
    {menu && <Dialog menu title="Norte® — Chapters" close={() => setMenu(false)}><nav aria-label="Chapter menu">{chapters.map((title, i) => <a key={title} href={`#chapter-${i}`} onClick={() => setMenu(false)}><span className="mono">0{i}</span><span>{title}</span><span aria-hidden="true">↗</span></a>)}</nav><a href="mailto:hello@norte.studio" className="menu-contact mono">hello@norte.studio</a></Dialog>}
    {story && <Dialog title={story.title} close={() => setStory(null)}>{story.image && <Photo name={story.image} alt={story.title} />}<h2>{story.title}</h2><p>{story.body}</p><a href="mailto:hello@norte.studio" className="mono">[ Get in touch ]</a></Dialog>}
  </>;
}

function Work() {
  return <main className="work-page"><header className="chapter-header mono"><Link to="/">Norte®</Link><Link to="/" hash="chapter-3">[ Back to the story ]</Link></header><h1>Selected work.</h1><p className="mono">( 2023 — 2026 )</p><div className="all-work-grid">{cases.map((item, i) => <CaseCard key={item.slug} item={item} index={i} />)}</div><a className="mono" href="mailto:hello@norte.studio">[ Write your next chapter with us ]</a></main>;
}
function CaseStudy() {
  const { slug } = caseRoute.useParams();
  const item = cases.find(c => c.slug === slug);
  if (!item) return <main className="work-page"><h1>Case not found.</h1><Link to="/work">[ View all cases ]</Link></main>;
  return <main className="work-page case-study"><header className="chapter-header mono"><Link to="/">Norte®</Link><Link to="/work">[ All cases ]</Link></header><p className="mono">{item.code} / {item.year}</p><h1>{item.title}</h1><Photo name={item.image} alt={item.title} eager /><div className="case-study-copy"><h2>A story worth retelling.</h2><p>Communication, influence, events and content — brought together around {item.title.split(" — ")[0]}. Every touchpoint is part of the same story, from the first introduction to the moments people remember.</p><a href="mailto:hello@norte.studio" className="mono">[ Let’s talk about your brand ]</a></div></main>;
}

const rootRoute = createRootRoute({ component: Outlet, notFoundComponent: () => <main className="work-page"><h1>A chapter yet to be written.</h1><Link to="/">[ Return to Norte ]</Link></main> });
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: Landing });
const workRoute = createRoute({ getParentRoute: () => rootRoute, path: "/work", component: Work });
const caseRoute = createRoute({ getParentRoute: () => rootRoute, path: "/work/$slug", component: CaseStudy });
export const router = createRouter({ routeTree: rootRoute.addChildren([indexRoute, workRoute, caseRoute]), scrollRestoration: true });
declare module "@tanstack/react-router" { interface Register { router: typeof router } }
