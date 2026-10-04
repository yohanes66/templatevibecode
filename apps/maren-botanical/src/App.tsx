import {
  ArrowLeft,
  ArrowRight,
  CaretLeft,
  CaretRight,
  List,
  Minus,
  Plus,
  X,
} from "@phosphor-icons/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";
import {
  ingredients,
  beautyProducts,
  products,
  readCart,
  stats,
  steps,
  stories,
  studySummary,
  type Cart,
} from "./content";

import { BeautyHome, BeautyFooter, BeautyCard, ProductImage } from "./Beauty";

const image = (name: string) => `/images/${name}.png`;
const money = (value: number) => `$${value.toFixed(0)}`;
const CartContext = createContext<{
  cart: Cart;
  change: (slug: string, delta: number) => void;
} | null>(null);
function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("Cart requires the shop layout");
  return value;
}

function Shell() {
  const [cart, setCart] = useState<Cart>(() => {
    try {
      return readCart(localStorage.getItem("maren-bag"));
    } catch {
      return {};
    }
  });
  const [panel, setPanel] = useState<
    "search" | "bag" | "account" | "checkout" | "menu" | null
  >(null);
  const [closing, setClosing] = useState(false);
  const [query, setQuery] = useState("");
  const [accountMessage, setAccountMessage] = useState("");
  const [notice, setNotice] = useState("");
  const [promoVisible, setPromoVisible] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);
  const promos = [
    "Free shipping over $50 · A free mini with every order",
    "Meet Cloud Tint · Five shades, one effortless finish",
    "Join the Maren Club · A little more beauty, every day",
  ];
  const dialog = useRef<HTMLDialogElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const count = products.reduce(
    (sum, product) => sum + (cart[product.slug] ?? 0),
    0,
  );
  const total = products.reduce(
    (sum, product) => sum + product.price * (cart[product.slug] ?? 0),
    0,
  );

  useEffect(() => {
    try {
      localStorage.setItem("maren-bag", JSON.stringify(cart));
    } catch {
      /* The bag still works when storage is unavailable. */
    }
  }, [cart]);
  useEffect(() => {
    if (panel) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [panel]);
  useEffect(() => {
    if (!closing) return;
    let cancelled = false;
    const animations = dialog.current?.getAnimations() ?? [];
    Promise.allSettled(animations.map((animation) => animation.finished)).then(
      () => {
        if (!cancelled) {
          dialog.current?.close();
          setPanel(null);
          setClosing(false);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, [closing]);
  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  function change(slug: string, delta: number) {
    const product = products.find((p) => p.slug === slug);
    if (!product || !Number.isInteger(delta)) return;
    setCart((previous) => {
      const next = { ...previous };
      const quantity = Math.max(0, Math.min(99, (next[slug] ?? 0) + delta));
      if (quantity) next[slug] = quantity;
      else delete next[slug];
      return next;
    });
    if (delta > 0) {
      setNotice(`${product.name} added to your bag`);
      clearTimeout(noticeTimer.current);
      noticeTimer.current = setTimeout(() => setNotice(""), 2500);
    }
  }

  const close = () => setClosing(true);
  return (
    <CartContext.Provider value={{ cart, change }}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {promoVisible && (
        <div className="announcement">
          <div className="promo-arrows">
            <button
              aria-label="Previous promotion"
              onClick={() =>
                setPromoIndex(
                  (index) => (index + promos.length - 1) % promos.length,
                )
              }
            >
              <CaretLeft size={16} aria-hidden="true" />
            </button>
            <button
              aria-label="Next promotion"
              onClick={() =>
                setPromoIndex((index) => (index + 1) % promos.length)
              }
            >
              <CaretRight size={16} aria-hidden="true" />
            </button>
          </div>
          <Link
            className="promo-message"
            to="/"
            hash={["shop", "shades", "rewards"][promoIndex]}
            aria-live="polite"
            key={promoIndex}
          >
            {promos[promoIndex]}
          </Link>
          <button
            className="promo-close"
            aria-label="Close promotion"
            onClick={() => setPromoVisible(false)}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      <header
        className="site-header"
        onClickCapture={(event) => {
          // Safari needs a focused trigger for native dialog focus restoration.
          (event.target as HTMLElement).closest("button")?.focus();
        }}
      >
        <nav className="nav-left" aria-label="Main navigation">
          <Link to="/" hash="shop">
            Shop
          </Link>
          <Link to="/" hash="skin">
            Skin
          </Link>
          <Link to="/" hash="shades">
            Lip
          </Link>
          <Link to="/" hash="body">
            Body
          </Link>
          <Link to="/" hash="sets">
            Sets
          </Link>
          <Link to="/" hash="shades">
            Find your shade
          </Link>
        </nav>
        <button
          className="menu-toggle"
          aria-expanded={panel === "menu"}
          aria-controls="mobile-navigation"
          onClick={() => setPanel("menu")}
        >
          <List size={20} aria-hidden="true" /> Menu
        </button>
        <Link className="logo" to="/" aria-label="Maren home">
          maren
        </Link>
        <nav className="nav-right" aria-label="Shop tools">
          <button className="search-toggle" onClick={() => setPanel("search")}>
            Search
          </button>
          <Link className="rewards-toggle" to="/" hash="rewards">
            Rewards
          </Link>
          <button
            className="account-toggle"
            onClick={() => setPanel("account")}
          >
            Account
          </button>
          <button onClick={() => setPanel("bag")}>Bag ({count})</button>
        </nav>
      </header>
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <div className={`toast ${notice ? "is-visible" : ""}`} role="status">
        {notice}
      </div>
      <dialog
        ref={dialog}
        aria-labelledby="dialog-title"
        className={`shop-dialog ${panel === "menu" ? "menu-dialog" : panel === "bag" || panel === "checkout" ? "bag-dialog" : ""} ${closing ? "is-closing" : ""}`}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => {
          setPanel(null);
          setClosing(false);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="dialog-inner">
          <div className="dialog-heading">
            <h2 id="dialog-title">
              {panel === "search" ? (
                "Find your essentials"
              ) : panel === "menu" ? (
                "Explore Maren"
              ) : panel === "account" ? (
                "Your Maren account"
              ) : panel === "checkout" ? (
                "Your order preview"
              ) : (
                <>
                  Your bag <span className="bag-title-count">({count})</span>
                </>
              )}
            </h2>
            <button
              className="circle-button"
              onClick={close}
              aria-label="Close dialog"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          {panel === "menu" && (
            <nav
              id="mobile-navigation"
              className="drawer-navigation"
              aria-label="Mobile navigation"
            >
              {[
                ["Shop", "shop"],
                ["Skin", "skin"],
                ["Lip", "shades"],
                ["Body", "body"],
                ["Sets", "sets"],
                ["Find your shade", "shades"],
                ["Rewards", "rewards"],
              ].map(([label, hash]) => (
                <Link key={label} to="/" hash={hash} onClick={close}>
                  {label}
                  <CaretRight size={18} aria-hidden="true" />
                </Link>
              ))}
              <button onClick={() => setPanel("search")}>
                Search
                <CaretRight size={18} aria-hidden="true" />
              </button>
              <button onClick={() => setPanel("account")}>
                Account
                <CaretRight size={18} aria-hidden="true" />
              </button>
            </nav>
          )}
          {panel === "search" && (
            <>
              <label className="sr-only" htmlFor="search">
                Search products
              </label>
              <input
                id="search"
                className="search-input"
                type="search"
                placeholder="Search products…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="search-results">
                {products
                  .filter((p) =>
                    `${p.name} ${p.step}`
                      .toLowerCase()
                      .includes(query.toLowerCase()),
                  )
                  .map((p) => (
                    <Link
                      to="/products/$slug"
                      params={{ slug: p.slug }}
                      key={p.slug}
                      onClick={close}
                    >
                      <ProductImage product={p} />
                      <span>
                        {p.name}
                        <small>{p.step}</small>
                      </span>
                      <span>{money(p.price)}</span>
                    </Link>
                  ))}
                {!products.some((p) =>
                  `${p.name} ${p.step}`
                    .toLowerCase()
                    .includes(query.toLowerCase()),
                ) && (
                  <p role="status">No products found. Try “mist” or “tint”.</p>
                )}
              </div>
            </>
          )}
          {(panel === "bag" || panel === "checkout") && (
            <div className="bag-content">
              {!count ? (
                <div className="empty-bag">
                  <p>Your bag is empty.</p>
                  <p>Discover your next everyday essential.</p>
                  <button className="button" onClick={close}>
                    Continue exploring
                  </button>
                </div>
              ) : (
                <>
                  <div className="bag-shipping">
                    <p>
                      {total >= 50
                        ? "Your order qualifies for free shipping."
                        : `${money(50 - total)} away from free shipping.`}
                    </p>
                    <progress
                      value={Math.min(total, 50)}
                      max={50}
                      aria-label="Progress toward free shipping"
                    />
                  </div>
                  <div className="bag-items">
                    {products
                      .filter((p) => cart[p.slug])
                      .map((p) => (
                        <article className="bag-item" key={p.slug}>
                          <div className="bag-thumbnail">
                            <ProductImage product={p} eager />
                          </div>
                          <div className="bag-item-details">
                            <Link
                              to="/products/$slug"
                              params={{ slug: p.slug }}
                              onClick={close}
                            >
                              {p.name}
                            </Link>
                            <p>
                              {p.step} · {money(p.price)} each
                            </p>
                            <div className="quantity">
                              <button
                                onClick={() => change(p.slug, -1)}
                                aria-label={`Remove one ${p.name}`}
                              >
                                <Minus size={14} aria-hidden="true" />
                              </button>
                              <span aria-label="Quantity">{cart[p.slug]}</span>
                              <button
                                disabled={cart[p.slug] === 99}
                                onClick={() => change(p.slug, 1)}
                                aria-label={`Add one ${p.name}`}
                              >
                                <Plus size={14} aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                          <strong>{money(p.price * cart[p.slug])}</strong>
                        </article>
                      ))}
                  </div>
                  <div className="bag-summary">
                    <div className="bag-total">
                      <span>Subtotal</span>
                      <strong>{money(total)}</strong>
                    </div>
                    <p className="muted">
                      Shipping and taxes calculated at checkout.
                    </p>
                    {panel === "checkout" ? (
                      <p className="demo-note" role="status">
                        This is a template preview. No payment is collected or
                        order placed. Connect your commerce provider to enable
                        checkout.
                      </p>
                    ) : (
                      <button
                        className="button bag-checkout"
                        onClick={() => setPanel("checkout")}
                      >
                        <span>Preview checkout</span>
                        <ArrowRight size={20} aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          {panel === "account" && (
            <form
              className="account-form"
              onSubmit={(e) => {
                e.preventDefault();
                setAccountMessage(
                  "Account access is a preview. Connect your authentication provider to send sign-in links.",
                );
              }}
            >
              <p>Enter your email to continue to your account.</p>
              <label htmlFor="account-email">Email address</label>
              <input
                id="account-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
              <button className="button" type="submit">
                Continue
              </button>
              <p className="muted" role="status">
                {accountMessage ||
                  "Demo template · Account sign-in is not connected."}
              </p>
            </form>
          )}
        </div>
      </dialog>
    </CartContext.Provider>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const { change } = useCart();
  return <BeautyCard product={product} onAdd={change} />;
}

function AnimatedNumber({ value }: { value: string }) {
  const element = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (motion.matches || !match || !element.current) return;
    const [, prefix, number, suffix] = match;
    const decimals = number.includes(".") ? number.split(".")[1].length : 0;
    const format = (amount: number) =>
      `${prefix}${amount.toFixed(decimals)}${suffix}`;
    setDisplay(format(0));
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start: number | undefined;
        const count = (time: number) => {
          start ??= time;
          const progress = Math.min(1, (time - start) / 1300);
          setDisplay(
            progress === 1
              ? value
              : format(Number(number) * (1 - (1 - progress) ** 3)),
          );
          if (progress < 1) frame = requestAnimationFrame(count);
        };
        frame = requestAnimationFrame(count);
      },
      { threshold: 0.2 },
    );
    observer.observe(element.current);
    const stop = () => {
      if (!motion.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
    motion.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", stop);
    };
  }, [value]);
  return (
    <span
      className="animated-number"
      ref={element}
      role="img"
      aria-label={value}
    >
      <span className="number-width" aria-hidden="true">
        {value}
      </span>
      <span className="number-value" aria-hidden="true">
        {display}
      </span>
    </span>
  );
}

function Home() {
  const { change } = useCart();
  return <BeautyHome onAdd={change} />;
}

function StoryCard({
  story,
  featured = false,
}: {
  story: (typeof stories)[number];
  featured?: boolean;
}) {
  return (
    <Link
      className={`story-card reveal ${featured ? "featured-story" : ""}`}
      to="/journal/$slug"
      params={{ slug: story.slug }}
    >
      <img src={image(story.image)} alt={story.title} loading="lazy" />
      <div className="story-copy">
        <p className="eyebrow">{story.category}</p>
        <h3>{story.title}</h3>
        {featured && <span className="text-link">Read the story →</span>}
      </div>
    </Link>
  );
}

function Footer() {
  return <BeautyFooter />;
}

function Shop() {
  return (
    <section className="listing-page section-pad">
      <p className="eyebrow">The Maren edit</p>
      <h1>
        Your everyday <em>essentials.</em>
      </h1>
      <p className="listing-description">
        A considered edit of skin, lip and body care.
      </p>
      <div className="beauty-grid">
        {beautyProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}

function Product() {
  const { slug } = productRoute.useParams();
  const product = products.find((p) => p.slug === slug);
  const { change } = useCart();
  if (!product) return <NotFound />;
  return (
    <section className="product-detail section-pad">
      <ProductImage product={product} />
      <div>
        <Link className="text-link" to="/shop">
          <ArrowLeft size={16} aria-hidden="true" /> All products
        </Link>
        <p className="eyebrow">{product.step}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <span className="detail-price">{money(product.price)}</span>
        <button className="button" onClick={() => change(product.slug, 1)}>
          Add to bag — {money(product.price)}
        </button>
        <details>
          <summary>How to use</summary>
          <p>
            Apply as part of your daily routine. Follow the directions supplied with your product.
          </p>
        </details>
        <details>
          <summary>Formula notes</summary>
          <p>
            A considered formula designed to fit into your everyday routine. See the product packaging for the complete ingredient list.
          </p>
        </details>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section className="listing-page section-pad">
      <p className="eyebrow">The journal</p>
      <h1>
        Stories behind the <em>formula</em>
      </h1>
      <div className="journal-list">
        {stories.map((story) => (
          <StoryCard key={story.slug} story={story} />
        ))}
      </div>
    </section>
  );
}

function Article() {
  const { slug } = articleRoute.useParams();
  const story = stories.find((s) => s.slug === slug);
  if (!story) return <NotFound />;
  return (
    <article className="article-page section-pad">
      <Link className="text-link" to="/journal">
        <ArrowLeft size={16} aria-hidden="true" /> The journal
      </Link>
      <p className="eyebrow">{story.category}</p>
      <h1>{story.title}</h1>
      <img src={image(story.image)} alt={story.title} />
      <div className="article-body">
        {story.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Link className="button outline" to="/shop">
        Explore the ritual
      </Link>
    </article>
  );
}

const info: Record<string, { title: string; paragraphs: string[] }> = {
  "our-story": {
    title: "Beauty, with intention.",
    paragraphs: [
      "A considered edit of skin, lip and body essentials — fewer steps, better formulas, made to fit into your day.",
      "This independent template contains demonstration brand content. Replace the product copy, claims and policies with your own before launching.",
    ],
  },
  "clinical-summary": {
    title: "The clinical summary",
    paragraphs: [
      studySummary,
      "These figures reproduce the supplied Figma design as sample brand content; a clinical report is not included with this template. Publish substantiated claims and link your actual study before launch.",
    ],
  },
  delivery: {
    title: "Delivery & returns",
    paragraphs: [
      "The preview displays free shipping on orders over $50, as shown in the design.",
      "Set your delivery regions, dispatch times and return policy with your commerce provider before launching this shop. No orders are accepted in the preview.",
    ],
  },
  contact: {
    title: "Let’s talk beauty",
    paragraphs: [
      "Thanks for exploring Maren. Add your business email and customer service details here before publishing your store.",
    ],
  },
  social: {
    title: "A little everyday inspiration",
    paragraphs: [
      "Connect your brand’s Instagram and TikTok profiles here before launch.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    paragraphs: [
      "This preview stores your shopping bag in this browser. Account and newsletter forms do not send your information to a server.",
      "Replace this sample page with your business’s privacy policy before enabling account access, analytics, payments or marketing emails.",
    ],
  },
  terms: {
    title: "Terms of Service",
    paragraphs: [
      "This is a demonstration storefront. No payment is collected and no order is placed.",
      "Add your business’s terms before launching a live shop.",
    ],
  },
  rewards: {
    title: "The Maren Club",
    paragraphs: [
      "Earn points, discover new launches and make room for a thoughtful routine.",
      "Rewards and subscriptions are demonstration flows in this storefront preview.",
    ],
  },
  account: {
    title: "Your Maren account",
    paragraphs: [
      "Use Account in the navigation to explore the sign-in preview. Account and order services require a connected commerce provider.",
    ],
  },
  accessibility: {
    title: "Care for everyone",
    paragraphs: [
      "Browse with your keyboard, choose your Cloud Tint shade with arrow keys, and explore at any screen size. Motion follows your device’s reduced-motion preference.",
    ],
  },
  faq: { title: "A few thoughtful answers", paragraphs: [] },
};

function Info() {
  const { topic } = infoRoute.useParams();
  const page = info[topic];
  if (!page) return <NotFound />;
  return (
    <section className="info-page section-pad">
      <Link className="text-link" to="/">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Maren
      </Link>
      <p className="eyebrow">Maren Botanicals</p>
      <h1>{page.title}</h1>
      {page.paragraphs.map((text) => (
        <p key={text}>{text}</p>
      ))}
      {topic === "clinical-summary" && (
        <div className="info-stats">
          {stats.map(([value, label]) => (
            <div key={value}>
              <h2>
                <AnimatedNumber value={value} />
              </h2>
              <p>{label}</p>
            </div>
          ))}
        </div>
      )}
      {topic === "faq" &&
        steps.map((s) => (
          <details key={s.name}>
            <summary>How do I {s.name.toLowerCase()}?</summary>
            <p>{s.instruction}</p>
          </details>
        ))}
      <Link className="button outline" to="/shop">
        Explore the ritual
      </Link>
    </section>
  );
}

function NotFound() {
  return (
    <section className="info-page section-pad">
      <p className="eyebrow">404</p>
      <h1>
        A little <em>lost?</em>
      </h1>
      <p>This page could not be found.</p>
      <Link className="button" to="/">
        Back to Maren
      </Link>
    </section>
  );
}

const rootRoute = createRootRoute({
  component: Shell,
  notFoundComponent: NotFound,
});
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: Shop,
});
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$slug",
  component: Product,
});
const journalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/journal",
  component: Journal,
});
const articleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/journal/$slug",
  component: Article,
});
const infoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/info/$topic",
  component: Info,
});
export const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    shopRoute,
    productRoute,
    journalRoute,
    articleRoute,
    infoRoute,
  ]),
  scrollRestoration: true,
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
