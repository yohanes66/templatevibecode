import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import {
  articles,
  faqs,
  formatCount,
  inquiryUrl,
  logos,
  models,
  processes,
  projects,
  sectors,
  services,
  team,
} from "./content";

const nav = [
  ["Studio", "studio"],
  ["Projects", "projects"],
  ["Services", "services"],
  ["Process", "process"],
  ["Journal", "journal"],
];
const img = (file: string) => `/images/${file}`;

function Arrow({
  children,
  href,
  dark = false,
  download = false,
}: {
  children: ReactNode;
  href: string;
  dark?: boolean;
  download?: boolean;
}) {
  return (
    <a
      className={`arrow-button ${dark ? "dark" : ""}`}
      href={href}
      download={download || undefined}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.href]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.querySelector<HTMLButtonElement>(".menu-button")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-pill">
        <Link to="/" className="brand" aria-label="Sorrel Studio home">
          <span className="brand-mark">S</span>
          <span>Sorrel Studio</span>
        </Link>
        <span className="nav-divider" />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, id]) => (
            <Link key={id} to="/" hash={id}>
              {label}
            </Link>
          ))}
          <Link to="/press">Press</Link>
        </nav>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "−" : "+"}</span> Menu
        </button>
      </div>
      <Link to="/contact" className="arrow-button header-contact">
        Get in touch<span aria-hidden="true">→</span>
      </Link>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {nav.map(([label, id]) => (
            <Link key={id} to="/" hash={id} onClick={() => setOpen(false)}>
              {label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link to="/press">
            Press<span aria-hidden="true">↗</span>
          </Link>
          <Link to="/contact">
            Get in touch<span aria-hidden="true">↗</span>
          </Link>
        </nav>
      )}
    </header>
  );
}

function Heading({
  label,
  children,
  center = false,
}: {
  label: string;
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`} data-reveal>
      <p className="eyebrow">{label}</p>
      <h2>{children}</h2>
    </div>
  );
}

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
      ? 1
      : 0,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const time = Math.min((now - start) / 1200, 1);
          setProgress(1 - Math.pow(1 - time, 3));
          if (time < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    const finish = () => {
      if (media.matches) {
        cancelAnimationFrame(frame);
        observer.disconnect();
        setProgress(1);
      }
    };
    media.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      media.removeEventListener("change", finish);
    };
  }, [value]);
  return (
    <span ref={ref} className="metric-counter" data-complete={progress === 1}>
      <span className="sr-only">{value}</span>
      <span className="count-measure" aria-hidden="true">
        {value}
      </span>
      <span className="count-number" aria-hidden="true">
        {formatCount(value, progress)}
      </span>
    </span>
  );
}

function Accordion({
  title,
  children,
  subtitle,
  open,
  onToggle,
  compact = false,
  badge,
}: {
  title: string;
  children: ReactNode;
  subtitle?: string;
  open: boolean;
  onToggle: () => void;
  compact?: boolean;
  badge?: number;
}) {
  const id = useId();
  return (
    <div
      className={`accordion ${compact ? "compact" : ""} ${open ? "expanded" : ""}`}
    >
      <h3>
        <button
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="accordion-trigger"
        >
          <span className="accordion-title">
            {title}
            {badge !== undefined && (
              <span className="count-badge">{badge}</span>
            )}
          </span>
          {subtitle && <span className="accordion-subtitle">{subtitle}</span>}
          <span className="toggle-icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </h3>
      <div
        id={id}
        className="accordion-panel"
        inert={!open}
        aria-hidden={!open}
      >
        <div>
          <div className="accordion-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Comparison({
  project,
  eager = false,
}: {
  project: (typeof projects)[number];
  eager?: boolean;
}) {
  const [before, setBefore] = useState(false);
  return (
    <figure
      className="comparison"
      aria-label={`${project.name} before and after renovation`}
    >
      <img
        className="comparison-image"
        aria-hidden={before}
        src={img(project.image)}
        alt={`${project.name}, completed interior`}
        loading={eager ? "eager" : "lazy"}
        width="1536"
        height="1024"
      />
      <img
        className={`comparison-image before-image ${before ? "active" : ""}`}
        aria-hidden={!before}
        src={img(project.before)}
        alt={`${project.name}, AI-generated concept of the interior before renovation`}
        loading={eager ? "eager" : "lazy"}
        width="1536"
        height="1024"
      />
      <div
        className="comparison-toggle"
        role="group"
        aria-label={`Compare ${project.name}`}
      >
        <span
          className={`toggle-track ${before ? "before" : ""}`}
          aria-hidden="true"
        />
        {[true, false].map((value) => (
          <button
            key={String(value)}
            aria-pressed={before === value}
            onClick={() => setBefore(value)}
          >
            {value ? "Before" : "After"}
          </button>
        ))}
      </div>
      <figcaption className="sr-only" aria-live="polite">
        {before
          ? "Before renovation — AI-generated concept"
          : "After renovation"}
      </figcaption>
    </figure>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="project-card" data-reveal>
      <div className="project-top">
        <div>
          <h3>
            <Link to="/projects/$slug" params={{ slug: project.slug }}>
              {project.name}
            </Link>
          </h3>
          <p>{project.summary}</p>
        </div>
        <div className="project-metric">
          <strong>
            <CountUp value={project.metric} />
          </strong>
          <span>{project.result}</span>
        </div>
      </div>
      <Comparison project={project} />
      <div className="project-bottom">
        <span>
          {project.location} · {project.year}
        </span>
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          aria-label={`View ${project.name} project`}
          className="tag"
        >
          {project.sector}
          <span className="sr-only"> — View project</span>
        </Link>
      </div>
    </article>
  );
}

function ArticleCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <Link
      to="/journal/$slug"
      params={{ slug: article.slug }}
      className="article-card"
      data-reveal
    >
      <div className="article-image">
        <img
          src={img(article.image)}
          alt={article.title}
          loading="lazy"
          width="1536"
          height="1024"
        />
        <span className="tag">{article.category}</span>
      </div>
      <h3>{article.title}</h3>
      <p>
        By {article.author} · {article.time}
      </p>
    </Link>
  );
}

function ContactCTA() {
  return (
    <section
      id="contact"
      className="contact-cta"
      aria-labelledby="contact-heading"
    >
      <img
        className="contact-background"
        src={img("b6391.webp")}
        alt="Garden-facing lounge at Rumah Kebun"
        loading="lazy"
        width="1536"
        height="1024"
      />
      <div className="contact-card" data-reveal>
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-heading">Let’s make a place worth staying in.</h2>
          <div className="actions">
            <Link to="/contact" className="arrow-button dark">
              Start a project<span aria-hidden="true">→</span>
            </Link>
            <Arrow href="mailto:hello@sorrel.studio">hello@sorrel.studio</Arrow>
          </div>
        </div>
        <img
          src={img("d6cfb.webp")}
          alt="A detail of Kaia House Hotel"
          loading="lazy"
          width="180"
          height="220"
        />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="brand-shapes" aria-hidden="true">
        <div />
        <div />
        <div />
      </div>
      <div className="footer-columns">
        <div>
          <p className="eyebrow">Site</p>
          {nav.slice(0, 4).map(([label, id]) => (
            <Link key={id} to="/" hash={id}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <p className="eyebrow">More</p>
          <Link to="/journal">Journal</Link>
          <Link to="/press">Press room</Link>
          <a href="mailto:jobs@sorrel.studio">Careers</a>
          <Link to="/contact">Get in touch</Link>
        </div>
        <div>
          <p className="eyebrow">Follow</p>
          <a
            href="https://www.instagram.com/sorrel.studio/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram — @sorrel.studio
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
            Pinterest
          </a>
        </div>
        <div>
          <p className="eyebrow">Join us</p>
          <a href="mailto:jobs@sorrel.studio">jobs@sorrel.studio</a>
          <p>We hire twice a year</p>
        </div>
      </div>
      <div className="footer-studios">
        <div>
          <p className="eyebrow">Jakarta</p>
          <p>
            Jl. Kemang Raya No. 18
            <br />
            South Jakarta 12730
            <br />
            +62 21 0000 0000
          </p>
        </div>
        <div>
          <p className="eyebrow">Bali</p>
          <p>
            Jl. Raya Pengosekan No. 7<br />
            Ubud, Gianyar 80571
            <br />
            +62 361 000 000
          </p>
        </div>
        <div>
          <p className="eyebrow">Singapore</p>
          <p>
            12 Duxton Road, #03-01
            <br />
            Singapore 089484
            <br />
            +65 0000 0000
          </p>
        </div>
        <div>
          <p className="eyebrow">Press</p>
          <a href="mailto:press@sorrel.studio">press@sorrel.studio</a>
          <p>Media kit on request</p>
        </div>
      </div>
      <div className="footer-legal">
        <p>© Sorrel Studio 2026 · All rights reserved</p>
        <Link to="/privacy">Privacy policy</Link>
      </div>
    </footer>
  );
}

function Home() {
  const [openProcess, setOpenProcess] = useState<number | null>(0);
  const [openSector, setOpenSector] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-main">
          <div className="hero-copy">
            <div className="hero-copy-stack">
              <p className="eyebrow">Interior & hospitality design studio</p>
              <h1 id="hero-heading">
                Interior design
                <br />
                <mark>partner</mark> for
                <br />
                hospitality brands.
              </h1>
              <p className="hero-description">
                We design places guests remember, teams enjoy working in and
                owners see a return on.
              </p>
              <div className="actions">
                <Link to="/contact" className="arrow-button dark">
                  Book a discovery call<span aria-hidden="true">→</span>
                </Link>
                <Arrow href="/sorrel-company-profile.pdf" download>
                  Download company profile (PDF)
                </Arrow>
              </div>
            </div>
            <p className="credential">
              <img src={img("3ba18.svg")} width="6" height="6" alt="" />
              Trusted by 40+ hotels, restaurants and workplaces across Southeast
              Asia
            </p>
          </div>
          <figure className="hero-feature">
            <img
              className="hero-photo"
              src={img("d6cfb.webp")}
              alt="Kaia House Hotel lobby with a navy sofa, woven pendants and tropical garden"
              width="1122"
              height="1402"
              fetchPriority="high"
            />
            <figcaption>
              <span>Kaia House Hotel — Seminyak, Bali, 2025</span>
              <Link to="/projects/$slug" params={{ slug: "kaia-house-hotel" }}>
                View project →
              </Link>
            </figcaption>
          </figure>
        </div>
        <div className="hero-meta">
          <div>
            <span>Established</span>
            <p>2014, Jakarta</p>
          </div>
          <div>
            <span>Studios</span>
            <p>Jakarta · Bali · Singapore</p>
          </div>
          <div>
            <span>Focus</span>
            <p>Hospitality, residential, workplace</p>
          </div>
          <Link to="/" hash="studio">
            Scroll to explore ↓
          </Link>
        </div>
      </section>
      <section className="client-logos" aria-label="Trusted clients">
        <p className="eyebrow">Trusted by</p>
        {logos.map((file, i) => (
          <img
            key={file}
            src={img(file)}
            alt={
              [
                "Kaia",
                "Teduh",
                "Lantai Tiga",
                "Rumah Kebun",
                "Seraya",
                "Meridian",
              ][i]
            }
            width="120"
            height="32"
            loading="lazy"
          />
        ))}
      </section>
      <section id="studio" className="studio-band">
        <span className="script-word" aria-hidden="true">
          Sorrel
        </span>
        <div className="studio-intro" data-reveal>
          <p className="eyebrow">The studio</p>
          <h2>
            Sorrel is a collective of interior designers, architects and makers
            building spaces with a point of view.
          </h2>
          <p>
            We have a taste for the unexpected and a stubborn respect for detail
            — from the master plan down to the door handle.
          </p>
        </div>
        <div className="studio-stats" data-reveal>
          {[
            ["2014", "Founded in Jakarta"],
            ["120+", "Projects delivered"],
            ["3", "Studios — Jakarta, Bali, Singapore"],
            ["28", "Designers, architects and makers"],
          ].map(([value, label]) => (
            <div key={value}>
              <strong>
                <CountUp value={value} />
              </strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section id="projects" className="section projects-section">
        <span className="script-word" aria-hidden="true">
          Projects
        </span>
        <Heading label="Selected projects">
          Spaces with a story — and
          <br className="desktop-break" /> the numbers to show for it
        </Heading>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <Link to="/projects" className="section-link">
          Explore selected projects<span aria-hidden="true">→</span>
        </Link>
      </section>
      <section id="services" className="section services-section">
        <Heading label="Our services" center>
          We act as your <mark>in-house</mark>
          <br />
          design department
        </Heading>
        <p className="section-intro" data-reveal>
          One team from first sketch to opening night — working inside your
          timeline, not around it.
        </p>
        <div className="service-grid">
          {services.map((service, i) => (
            <article className="service-card" key={service.name} data-reveal>
              <span className="service-number">{i + 1}</span>
              <h3>{service.name}</h3>
              <p>{service.copy}</p>
              <div className="tags">
                {service.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="process" className="section process-section">
        <Heading label="How we work">
          We shape the process
          <br />
          around your project
        </Heading>
        <div className="accordion-list" data-reveal>
          {processes.map((process, i) => (
            <Accordion
              key={process.name}
              title={`${i + 1}. ${process.name}`}
              subtitle={process.summary}
              open={openProcess === i}
              onToggle={() => setOpenProcess(openProcess === i ? null : i)}
            >
              <ul className="process-points">
                {process.points.map(([title, body]) => (
                  <li key={title}>
                    <strong>{title}</strong> {body}
                  </li>
                ))}
              </ul>
            </Accordion>
          ))}
        </div>
      </section>
      <section className="section models-section">
        <Heading label="Ways to work with us" center>
          Different projects need
          <br />
          <span className="muted">different setups</span>
        </Heading>
        <div className="model-grid">
          {models.map((model) => (
            <Link
              to="/contact"
              search={{ model: model.name }}
              className="model-card"
              key={model.name}
              data-reveal
            >
              <p>{model.question}</p>
              <div>
                <h3>
                  <span aria-hidden="true">→</span>
                  {model.name}
                </h3>
                <span className="model-duration">{model.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section testimonials-section">
        <Heading label="Client stories" center>
          Clients come for the design.
          <br />
          <span className="muted">They stay for the partnership.</span>
        </Heading>
        <div className="featured-testimonial" data-reveal>
          <div>
            <div className="tags">
              <span className="tag">Hospitality</span>
              <span className="tag">Boutique hotel</span>
            </div>
            <blockquote>
              “Sorrel worked like part of our team for two years. They
              understood the guest before we briefed them, and the hotel
              reopened with a character people now travel for.”
            </blockquote>
            <div className="quote-author">
              <img
                src={img("4770d.webp")}
                alt=""
                width="44"
                height="44"
                loading="lazy"
              />
              <div>
                <strong>Putu Ayu Wirawan</strong>
                <span>General Manager, Kaia House Hotel</span>
              </div>
            </div>
          </div>
          <div className="testimonial-metric">
            <strong>
              <CountUp value="+38%" />
            </strong>
            <span>
              RevPAR within 6 months
              <br />
              of reopening
            </span>
          </div>
        </div>
        <div className="testimonial-row">
          {[
            {
              tags: ["Workplace", "Fintech HQ"],
              quote:
                "They designed an office people actually choose to come to. Attendance went up without a single policy change.",
              name: "Dimas Prakoso",
              role: "COO, Lantai Tiga",
              avatar: "9521f.webp",
              metric: "+27%",
              result: "Weekly attendance",
            },
            {
              tags: ["F&B", "Restaurant"],
              quote:
                "Every detail — from the table height to the light at 8pm — was considered. Guests notice, and they come back.",
              name: "Clara Hutagalung",
              role: "Founder, Teduh Dining Room",
              avatar: "599c4.webp",
              metric: "4.9★",
              result: "Guest rating",
            },
          ].map((quote) => (
            <article className="testimonial" key={quote.name} data-reveal>
              <div className="tags">
                {quote.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <blockquote>“{quote.quote}”</blockquote>
              <div className="testimonial-bottom">
                <div className="quote-author">
                  <img
                    src={img(quote.avatar)}
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                  <div>
                    <strong>{quote.name}</strong>
                    <span>{quote.role}</span>
                  </div>
                </div>
                <div className="testimonial-metric">
                  <strong>
                    <CountUp value={quote.metric} />
                  </strong>
                  <span>{quote.result}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section experience-section">
        <Heading label="Experience" center>
          Spaces delivered across
          <br />
          <span className="muted">every kind of brief</span>
        </Heading>
        <div className="accordion-list" data-reveal>
          {sectors.map((sector, i) => (
            <Accordion
              compact
              key={sector.name}
              title={sector.name}
              badge={sector.count}
              open={openSector === i}
              onToggle={() => setOpenSector(openSector === i ? null : i)}
            >
              <div className="experience-table">
                {sector.rows.map(([name, description, year]) => (
                  <div key={name}>
                    <strong>{name}</strong>
                    <span>{description}</span>
                    <span>{year}</span>
                  </div>
                ))}
              </div>
            </Accordion>
          ))}
        </div>
      </section>
      <section id="team" className="section team-section">
        <div className="team-heading">
          <Heading label="The collective">
            The people behind
            <br />
            the spaces
          </Heading>
          <p data-reveal>
            Twenty-eight designers, architects and makers across three studios,
            led by four partners.
          </p>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <article className="team-card" key={person.name} data-reveal>
              <div className="team-image">
                <img
                  src={img(person.image)}
                  alt={person.name}
                  width="1024"
                  height="1536"
                  loading="lazy"
                />
              </div>
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="journal" className="section journal-section">
        <span className="script-word" aria-hidden="true">
          Notes
        </span>
        <Heading label="A design column, unfiltered" center>
          Notes from the studio
        </Heading>
        <Link
          to="/journal/$slug"
          params={{ slug: articles[0].slug }}
          className="featured-article"
          data-reveal
        >
          <img
            src={img(articles[0].image)}
            alt="A sculptural blue lounge chair in a hotel lobby"
            width="1536"
            height="1024"
            loading="lazy"
          />
          <div className="article-date">
            <span>N.004</span>
            <span>12 · SEP · 26</span>
          </div>
          <div className="article-overlay">
            <h3>{articles[0].title}</h3>
            <span>Read the column →</span>
          </div>
        </Link>
        <div className="article-grid">
          {articles.slice(1).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <Link to="/journal" className="section-link">
          All notes from the studio<span aria-hidden="true">→</span>
        </Link>
      </section>
      <section id="faq" className="section faq-section">
        <div>
          <Heading label="FAQ">
            You have questions.
            <br />
            <span className="muted">We have answers.</span>
          </Heading>
          <p>
            Still curious? Write to{" "}
            <a href="mailto:hello@sorrel.studio">hello@sorrel.studio</a> and a
            partner will reply within two working days.
          </p>
        </div>
        <div className="accordion-list" data-reveal>
          {faqs.map(([question, answer], i) => (
            <Accordion
              key={question}
              title={question}
              compact
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <p>{answer}</p>
            </Accordion>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}

function ProjectsPage() {
  const [sector, setSector] = useState("All");
  return (
    <div className="inner-page">
      <Heading label="Selected project archive">
        Places with a point of view.
      </Heading>
      <p className="page-lede">
        Four featured case studies across hospitality, dining, workplace and
        residential design.
      </p>
      <div className="filters" role="group" aria-label="Filter projects">
        {["All", ...projects.map((p) => p.sector)].map((type) => (
          <button
            key={type}
            aria-pressed={sector === type}
            onClick={() => setSector(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {projects
          .filter((p) => sector === "All" || p.sector === sector)
          .map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
      </div>
      <ContactCTA />
    </div>
  );
}

function ProjectPage() {
  const { slug } = projectRoute.useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFound />;
  return (
    <div className="inner-page project-detail">
      <Link to="/projects" className="back-link">
        ← Selected projects
      </Link>
      <p className="eyebrow">
        {project.sector} · {project.location} · {project.year}
      </p>
      <h1>{project.name}</h1>
      <p className="page-lede">{project.summary}</p>
      <Comparison project={project} eager />
      <p className="image-note">
        Before views are AI-generated renovation concepts for this template.
      </p>
      <div className="project-story">
        <div>
          <p className="eyebrow">The outcome</p>
          <strong>{project.metric}</strong>
          <p>{project.result}</p>
        </div>
        <div>
          <h2>The brief</h2>
          <p>{project.brief}</p>
          <h2>Our approach</h2>
          <p>{project.approach}</p>
          <p>{project.detail}</p>
        </div>
      </div>
      <ContactCTA />
    </div>
  );
}

function JournalPage() {
  return (
    <div className="inner-page journal-archive">
      <Heading label="Notes from the studio">
        A design column,
        <br />
        unfiltered.
      </Heading>
      <p className="page-lede">
        Thoughts on the places we make, the materials we live with and the
        details that matter.
      </p>
      <div className="article-grid">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}

function ArticlePage() {
  const { slug } = articleRoute.useParams();
  const article = articles.find((a) => a.slug === slug);
  if (!article) return <NotFound />;
  return (
    <article className="inner-page article-detail">
      <Link to="/journal" className="back-link">
        ← All notes
      </Link>
      <p className="eyebrow">
        {article.category} · {article.date}
      </p>
      <h1>{article.title}</h1>
      <p className="page-lede">
        By {article.author} · {article.time}
      </p>
      <img
        className="article-cover"
        src={img(article.image)}
        alt={article.title}
        width="1536"
        height="1024"
      />
      <div className="article-body">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="image-note">
          Editorial demonstration content for the Sorrel Studio template.
        </p>
        <Link to="/journal" className="section-link">
          More notes from the studio<span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

function ContactPage() {
  const { model } = contactRoute.useSearch();
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.location.href = inquiryUrl(
      String(data.get("name")),
      String(data.get("email")),
      String(data.get("type")),
      String(data.get("message")),
    );
    setPrepared(true);
  }
  return (
    <div className="inner-page contact-page">
      <div>
        <Heading label="Start a conversation">
          Tell us about
          <br />
          your space.
        </Heading>
        <p className="page-lede">
          A new hotel, a restaurant, a place to work or a home to grow into.
          We’d love to hear what you have in mind.
        </p>
        <a href="mailto:hello@sorrel.studio">hello@sorrel.studio ↗</a>
      </div>
      <form onSubmit={submit}>
        <label>
          Your name
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Alex Tan"
            maxLength={120}
          />
        </label>
        <label>
          Email address
          <input
            required
            name="email"
            autoComplete="email"
            type="email"
            placeholder="alex@company.com"
            maxLength={254}
          />
        </label>
        <label>
          What do you have in mind?
          <select name="type" defaultValue={model || "Hospitality"}>
            {[
              "Hospitality",
              "Residential",
              "Workplace & Retail",
              ...models.map((m) => m.name),
            ].map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          A little about your project
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Location, scope, timeline and anything else you’d like us to know."
            maxLength={5000}
          />
        </label>
        <button className="arrow-button dark" type="submit">
          Prepare email inquiry<span aria-hidden="true">→</span>
        </button>
        <p className="form-note">
          This opens your email app with your inquiry. Nothing is submitted or
          stored on this website.
        </p>
        {prepared && (
          <p role="status" className="form-status">
            Your email draft is ready in your email app. You can also write
            directly to hello@sorrel.studio.
          </p>
        )}
      </form>
    </div>
  );
}

function PressPage() {
  return (
    <div className="inner-page press-page">
      <Heading label="Press room">
        Stories worth
        <br />
        sharing.
      </Heading>
      <p className="page-lede">
        Sorrel is a collective of interior designers, architects and makers
        across Jakarta, Bali and Singapore.
      </p>
      <div className="press-grid">
        <img
          src={img("d6cfb.webp")}
          alt="Kaia House Hotel interior"
          width="1122"
          height="1402"
        />
        <div>
          <h2>Company profile</h2>
          <p>
            Meet the studio, explore our services, and discover four selected
            projects.
          </p>
          <Arrow href="/sorrel-company-profile.pdf" download>
            Download company profile (PDF)
          </Arrow>
          <h2>Media enquiries</h2>
          <p>
            For project photography, interviews and studio information, contact
            our press team.
          </p>
          <Arrow href="mailto:press@sorrel.studio">press@sorrel.studio</Arrow>
        </div>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <article className="inner-page legal-page">
      <Heading label="Privacy">Your privacy.</Heading>
      <div className="article-body">
        <p>
          This demonstration template does not use analytics, advertising
          cookies or a server-side contact database.
        </p>
        <h2>Contact enquiries</h2>
        <p>
          The contact form prepares a draft in your own email application. The
          website does not transmit or store the information you enter. Sending
          that email is your choice.
        </p>
        <h2>External links</h2>
        <p>
          Links to social platforms open third-party websites, which apply their
          own privacy policies.
        </p>
        <h2>Before and after imagery</h2>
        <p>
          Before-renovation images are AI-generated concepts used to demonstrate
          the comparison interaction.
        </p>
        <p>
          Contact: <a href="mailto:hello@sorrel.studio">hello@sorrel.studio</a>
        </p>
      </div>
    </article>
  );
}

function NotFound() {
  return (
    <div className="inner-page">
      <p className="eyebrow">404</p>
      <h1>
        This space is
        <br />
        still on the drawing board.
      </h1>
      <p className="page-lede">
        The page you’re looking for could not be found.
      </p>
      <Link to="/" className="arrow-button dark">
        Back to the studio<span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    const project = projects.find((p) => pathname === `/projects/${p.slug}`);
    const article = articles.find((a) => pathname === `/journal/${a.slug}`);
    const title =
      project?.name ||
      article?.title ||
      (
        {
          "/projects": "Selected projects",
          "/journal": "Notes from the studio",
          "/contact": "Start a project",
          "/press": "Press room",
          "/privacy": "Privacy",
        } as Record<string, string>
      )[pathname];
    document.title = title
      ? `${title} — Sorrel Studio`
      : "Sorrel Studio — Interior & Hospitality Design";
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight)
        element.classList.add("reveal-ready");
      observer.observe(element);
    });
    const revealAll = () =>
      document
        .querySelectorAll(".reveal-ready")
        .forEach((el) => el.classList.add("is-visible"));
    media.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", revealAll);
    };
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFound,
});
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects",
  component: ProjectsPage,
});
const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/projects/$slug",
  component: ProjectPage,
});
const journalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/journal",
  component: JournalPage,
});
const articleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/journal/$slug",
  component: ArticlePage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
  validateSearch: (search: Record<string, unknown>): { model?: string } => ({
    model:
      typeof search.model === "string" &&
      models.some((m) => m.name === search.model)
        ? search.model
        : undefined,
  }),
});
const pressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/press",
  component: PressPage,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});
export const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    projectsRoute,
    projectRoute,
    journalRoute,
    articleRoute,
    contactRoute,
    pressRoute,
    privacyRoute,
  ]),
  scrollRestoration: true,
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
