import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { createRootRoute, createRoute, createRouter, Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  AppleLogo,
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  Coffee,
  EyeSlash,
  GooglePlayLogo,
  Heart,
  Lightning,
  LockSimple,
  MapPin,
  PaperPlaneTilt,
  Quotes,
  ShieldCheck,
  Sparkle,
  Star,
  Trash,
  Wine,
} from "@phosphor-icons/react";
import { chapters, datePlan, footer, img, nav, privacy, stories, storeLinks, trust } from "./content";
import { Chip, Orb, Phone, Screen } from "./screens";
import { initLanding } from "./motion";

const ICONS = {
  star: <Star size={18} weight="fill" />,
  heart: <Heart size={18} />,
  sparkle: <Sparkle size={18} />,
  lock: <LockSimple size={18} />,
  calendar: <CalendarBlank size={18} />,
  pin: <MapPin size={18} />,
  coffee: <Coffee size={18} />,
  wine: <Wine size={18} />,
};

/** Words wrapped for the masked rise animation. */
function Words({ text }: { text: string }) {
  return text.split(" ").map((w, i) => (
    <Fragment key={i}>
      <span className="w"><span>{w}</span></span>{" "}
    </Fragment>
  ));
}

/* ---------------- landing ---------------- */

function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <Link to="/" className="wordmark">mira</Link>
      <div className="nav-links">
        {nav.map((n) => <a key={n.label} href={n.href}>{n.label}</a>)}
      </div>
      <a href="#download" className="btn nav-cta">Get the app</a>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="hero-bg" aria-hidden>
        <div className="hero-bg-inner">
          <img src={img("meadow")} alt="" />
        </div>
      </div>
      <div className="hero-copy">
        <span className="hero-tag"><Orb size={18} /> Your AI dating coach</span>
        <h1 className="hero-title"><Words text="Date with a second opinion." /></h1>
        <p className="hero-sub">Mira reads the room so you don’t overthink it.</p>
        <div className="hero-ctas">
          <a href="#download" className="btn white lg">Get Mira, it’s free</a>
          <a href="#how" className="btn glass lg">See how it works <ArrowRight size={18} /></a>
        </div>
      </div>
      <div className="hero-stage">
        <div className="hero-phone" aria-hidden inert>
          <Phone><Screen tab="Mira" /></Phone>
        </div>
        <div className="float-card left" aria-hidden>
          <div className="float-inner card">
            <p className="t-micro row muted"><Orb /> 92% match · Noor</p>
            <p className="t-headline">You both skip small talk.</p>
          </div>
        </div>
        <div className="float-card right" aria-hidden>
          <div className="float-inner card row">
            <span className="icon-tile accent-tile"><CalendarBlank size={20} /></span>
            <span className="col">
              <b className="t-title">Date with Sarah</b>
              <span className="t-caption muted">Thu, 7:00 PM · Night market</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Trust() {
  return (
    <section className="trust" aria-label="Highlights" data-reveal>
      <div className="trust-track">
        {[0, 1].map((copy) =>
          trust.map((t) => (
            <span key={copy + t.text} className={`t-micro row ${copy ? "dup" : ""}`} aria-hidden={copy ? true : undefined}>
              {ICONS[t.icon]} {t.text}
            </span>
          )),
        )}
      </div>
    </section>
  );
}

function Visual({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="ch-visual v1" aria-hidden inert>
        <img className="ph" src={img("noor")} alt="" />
        <Phone><Screen tab="Discover" /></Phone>
      </div>
    );
  if (i === 1)
    return (
      <div className="ch-visual v2" aria-hidden inert>
        <img className="ph" src={img("cafe-man")} alt="" />
        <div className="card pop-card">
          <p className="t-micro row muted"><Orb /> Mira suggests</p>
          <p className="t-headline">“Chaos weekends deserve one calm dinner. Free Thursday?”</p>
          <div className="row wrap">
            <Chip accent icon={<Lightning size={14} />}>Opener score 8/10</Chip>
            <Chip>Warm, not pushy</Chip>
          </div>
          <div className="row end">
            <span className="btn ghost">Rewrite</span>
            <span className="btn primary"><PaperPlaneTilt size={16} /> Send to Noor</span>
          </div>
        </div>
      </div>
    );
  if (i === 2)
    return (
      <div className="ch-visual v3" aria-hidden inert>
        <img className="ph" src={img("abstract")} alt="" />
        <Phone><Screen tab="Chats" /></Phone>
        <div className="card pop-card plan">
          <p className="t-micro row muted"><Orb /> Date plan for Sarah</p>
          {datePlan.map((d) => (
            <div key={d.title} className="row plan-row">
              <span className="icon-tile">{ICONS[d.icon]}</span>
              <span className="col">
                <b className="t-title">{d.title}</b>
                <span className="t-caption muted">{d.sub}</span>
              </span>
            </div>
          ))}
          <span className="btn primary block"><PaperPlaneTilt size={16} /> Send plan to Sarah</span>
        </div>
      </div>
    );
  return (
    <div className="ch-visual v4" aria-hidden inert>
      <img className="ph" src={img("coffee")} alt="" />
      <div className="v4-thread">
        <div className="row bottom">
          <Orb size={32} />
          <p className="bubble mira" data-seq="1">How did it go with Sarah?</p>
        </div>
        <p className="bubble me" data-seq="2">Good I think? She laughed a lot.</p>
        <div className="seq-slot">
          <span className="typing" data-seq="typing"><i /><i /><i /></span>
          <div className="card debrief" data-seq="3">
            <p className="t-micro row muted"><Orb /> Mira’s debrief</p>
            <p className="t-headline">She asked three questions about your Jogja trip. That’s interest. Text her tomorrow morning, not tonight.</p>
            <div className="row wrap">
              <Chip accent icon={<Sparkle size={14} weight="fill" />}>Spark: high</Chip>
              <Chip icon={<Heart size={14} />}>Second date: likely</Chip>
              <Chip>You talked 60%</Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function How() {
  return (
    <section id="how" className="how">
      <div className="how-intro" data-reveal="stagger">
        <p className="t-micro muted">How Mira works</p>
        <h2 className="t-h2">From first like to second date.</h2>
        <p className="t-lead muted">Four moments where most people overthink. Mira sits in on all of them.</p>
      </div>
      {chapters.map((c, i) => (
        <article key={c.num} className={`chapter ${i % 2 ? "flip" : ""}`}>
          <div className="ch-text">
            <p className="t-micro row"><span className="accent">{c.num}</span> <span className="muted">{c.kicker}</span></p>
            <h3 className="t-h3">{c.title}</h3>
            <p className="t-webbody muted">{c.body}</p>
            <ul>
              {c.points.map((p) => (
                <li key={p}><CheckCircle size={20} /> {p}</li>
              ))}
            </ul>
          </div>
          <Visual i={i} />
        </article>
      ))}
    </section>
  );
}

function Statement() {
  return (
    <section className="statement">
      <div className="statement-media">
        <img src={img("couple")} alt="A couple walking home after dinner at dusk" />
      </div>
      <h2 className="t-h2">Honest like your best friend. Private like your diary.</h2>
    </section>
  );
}

/** Looping vignette per privacy promise; motion.ts drives them while the tile is on screen. */
function PrivacyDemo({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="viz viz-share" aria-hidden>
        {[["Maya", "maya", "“haha yeah”"], ["Sarah", "sarah", "Thursday works!"], ["Noor", "noor", "that’s actually funny"]].map(([n, ph, last], k) => (
          <div key={n} className={`share-item ${k === 0 ? "active" : ""}`} style={{ "--y": `${(k - 1) * 64}px` } as CSSProperties}>
            <img src={img(ph)} alt="" />
            <span className="col grow">
              <b className="t-label">{n}</b>
              <span className="t-caption faint truncate">
                <span className="off">{last}</span>
                <span className="on accent">Mira can read this</span>
              </span>
            </span>
            <span className="switch"><i /></span>
          </div>
        ))}
      </div>
    );
  if (i === 1)
    return (
      <div className="viz viz-send" aria-hidden>
        <div className="send-stack">
          <div className="draft-card">
            <span className="send-label t-micro">
              <span className="wait">Draft for Sarah</span>
              <span className="done">Sent by you · just now</span>
            </span>
            <p className="t-small">Free Thursday? There’s a night market on 5th.</p>
          </div>
          <span className="send-btn">
            <i className="ripple" />
            <PaperPlaneTilt size={18} />
          </span>
        </div>
      </div>
    );
  return (
    <div className="viz viz-wipe" aria-hidden>
      {[["Dumplings", 22, 18], ["Jogja trip", 78, 16], ["Dog person", 18, 58], ["No small talk", 82, 56]].map(([m, x, y]) => (
        <span key={m} className="mem" style={{ left: `${x}%`, top: `${y}%` }} data-x={x} data-y={y}>
          <Chip>{m}</Chip>
        </span>
      ))}
      <span className="wipe-orb"><Orb size={52} /></span>
      <span className="wipe-done t-caption row"><CheckCircle size={14} weight="fill" /> Memory cleared</span>
      <div className="wipe-cta">
        <span className="btn wipe-btn"><Trash size={16} /> Clear memory</span>
      </div>
    </div>
  );
}

function Privacy() {
  return (
    <section id="safety" className="privacy">
      <div className="split-head" data-reveal="stagger">
        <div className="col gap-20">
          <p className="t-micro muted">Privacy &amp; control</p>
          <h2 className="t-h2">Your love life stays yours.</h2>
        </div>
        <p className="t-webbody muted">Mira only sees what you share, never acts on her own, and forgets on command. Coaching works better when you trust the coach.</p>
      </div>
      <div className="grid-3" data-reveal="stagger">
        {privacy.map((p, i) => (
          <div key={p.title} className="tile">
            <PrivacyDemo i={i} />
            <div className="col gap-8">
              <h3 className="t-headline">{p.title}</h3>
              <p className="t-webbody muted">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section id="stories" className="stories">
      <div className="col gap-20" data-reveal="stagger">
        <p className="t-micro muted">Stories</p>
        <h2 className="t-h2">First dates, better ones.</h2>
      </div>
      <div className="grid-3">
        {stories.map((s) => (
          <figure key={s.name} className="story">
            <div className="col gap-20">
              <div className="row bottom mira-note">
                <Orb size={28} />
                <div className="seq-slot">
                  <span className="typing" data-seq="typing" aria-hidden><i /><i /><i /></span>
                  <p className="bubble mira" data-seq="1"><span className="t-micro faint">Mira</span>{s.mira}</p>
                </div>
              </div>
              <blockquote className="t-lead" data-seq="2">
                <Quotes size={22} weight="fill" className="accent" /> {s.quote}
              </blockquote>
            </div>
            <figcaption className="row" data-seq="3">
              <img src={img(s.photo)} alt="" />
              <span className="col">
                <b className="t-title">{s.name}</b>
                <span className="t-caption muted">{s.meta}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const DATES = ["first dates.", "coffee dates.", "second dates.", "dates, honestly."];

/** Types, holds, backspaces and swaps the phrase; `talking` is true while Mira "speaks" (types). Runs only while on screen. */
function useTypeCycle(target: RefObject<HTMLElement | null>) {
  const [text, setText] = useState(DATES[0]);
  const [talking, setTalking] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let word = 0;
    let len = DATES[0].length;
    let mode: "hold" | "delete" | "type" = "hold";
    let timer = 0;
    const tick = () => {
      if (mode === "hold") {
        setTalking(false);
        mode = "delete";
        timer = window.setTimeout(tick, 2200);
      } else if (mode === "delete") {
        if (len > 0) {
          setText(DATES[word].slice(0, --len));
          timer = window.setTimeout(tick, 38);
        } else {
          word = (word + 1) % DATES.length;
          mode = "type";
          timer = window.setTimeout(tick, 380);
        }
      } else if (len < DATES[word].length) {
        setTalking(true);
        setText(DATES[word].slice(0, ++len));
        timer = window.setTimeout(tick, 55 + Math.random() * 70);
      } else {
        mode = "hold";
        tick();
      }
    };
    const io = new IntersectionObserver(([e]) => {
      clearTimeout(timer);
      if (e.isIntersecting) timer = window.setTimeout(tick, 600);
      else setTalking(false);
    });
    io.observe(target.current!);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [target]);
  return { text, talking };
}

function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { text, talking } = useTypeCycle(ref);
  return (
    <section ref={ref} id="download" className="cta" data-reveal="stagger">
      <span className={`orb-voice ${talking ? "is-talking" : ""}`} aria-hidden>
        <i className="wave" />
        <i className="wave" />
        <Orb size={72} />
      </span>
      <h2 className="t-display-web" aria-label="Go on better first dates.">
        <span aria-hidden>
          Go on better <span className="typed">{text}</span>
          <span className={`caret ${talking ? "is-typing" : ""}`} />
        </span>
      </h2>
      <p className="t-lead muted">Free on iPhone and Android. Mira Plus when you want more.</p>
      <div className="row wrap center-x">
        <a href={storeLinks.appStore} className="store dark">
          <AppleLogo size={24} weight="fill" />
          <span className="col"><small>Download on the</small><b>App Store</b></span>
        </a>
        <a href={storeLinks.googlePlay} className="store">
          <GooglePlayLogo size={24} weight="fill" />
          <span className="col"><small>Get it on</small><b>Google Play</b></span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="journal">
      <div className="col gap-12">
        <span className="wordmark">mira</span>
        <span className="t-caption faint">© 2026 Mira Labs. A demo brand made for a free website template.</span>
      </div>
      <div className="footer-cols">
        {footer.map((c) => (
          <div key={c.title} className="col gap-12">
            <span className="t-micro faint">{c.title}</span>
            {c.links.map((l) => <a key={l} href="#">{l}</a>)}
          </div>
        ))}
      </div>
    </footer>
  );
}

function Landing() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => initLanding(root.current!), []);
  return (
    <div ref={root} className="landing">
      <Nav />
      <Hero />
      <main>
        <Trust />
        <How />
        <Statement />
        <Privacy />
        <Stories />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- interactive app demo ---------------- */

function AppDemo() {
  const [tab, setTab] = useState<"Discover" | "Mira" | "Chats">("Mira");
  return (
    <main className="demo">
      <div className="demo-copy">
        <Link to="/" className="wordmark">mira</Link>
        <p className="t-micro muted">Interactive demo</p>
        <h1 className="t-h2">Meet Mira, up close.</h1>
        <p className="t-webbody muted">Tap a suggestion to get a reply, swipe through today’s picks, or check who’s waiting on you. Nothing is sent anywhere.</p>
        <Link to="/" className="btn ghost"><ArrowLeft size={16} /> Back to site</Link>
      </div>
      <Phone className="demo-phone">
        <Screen tab={tab} onTab={(t) => setTab(t as typeof tab)} interactive />
      </Phone>
    </main>
  );
}

/* ---------------- router ---------------- */

function Root() {
  const { pathname } = useLocation();
  useLayoutEffect(() => window.scrollTo(0, 0), [pathname]);
  return <Outlet />;
}

const rootRoute = createRootRoute({ component: Root });
const routeTree = rootRoute.addChildren([
  createRoute({ getParentRoute: () => rootRoute, path: "/", component: Landing }),
  createRoute({ getParentRoute: () => rootRoute, path: "/app", component: AppDemo }),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
