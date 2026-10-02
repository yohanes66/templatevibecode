import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type CSSProperties,
} from "react";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";
import {
  ingredients,
  products,
  readCart,
  reviews,
  stats,
  steps,
  stories,
  studySummary,
  type Cart,
} from "./content";

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
  const [query, setQuery] = useState("");
  const [accountMessage, setAccountMessage] = useState("");
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const count = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
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
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [panel]);
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

  const close = () => setPanel(null);
  return (
    <CartContext.Provider value={{ cart, change }}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        <Link to="/" hash="shop">
          Free shipping on orders over $75 · Try the Discovery Set
        </Link>
      </div>
      <header className="site-header">
        <nav className="nav-left" aria-label="Main navigation">
          <Link to="/" hash="shop">
            Shop
          </Link>
          <Link to="/" hash="ingredients">
            Ingredients
          </Link>
          <Link to="/" hash="journal">
            Journal
          </Link>
        </nav>
        <button
          className="menu-toggle"
          aria-expanded={panel === "menu"}
          aria-controls="mobile-navigation"
          onClick={() => setPanel("menu")}
        >
          Menu
        </button>
        <Link className="logo" to="/" aria-label="Maren home">
          Maren
        </Link>
        <nav className="nav-right" aria-label="Shop tools">
          <button className="search-toggle" onClick={() => setPanel("search")}>
            Search
          </button>
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
        className={`shop-dialog ${panel === "bag" || panel === "checkout" || panel === "menu" ? "bag-dialog" : ""}`}
        onCancel={close}
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="dialog-inner">
          <div className="dialog-heading">
            <h2 id="dialog-title">
              {panel === "search"
                ? "Find your ritual"
                : panel === "menu"
                  ? "Explore Maren"
                  : panel === "account"
                    ? "Your Maren account"
                    : panel === "checkout"
                      ? "Your order preview"
                      : "Your bag"}
            </h2>
            <button
              className="circle-button"
              onClick={close}
              aria-label="Close dialog"
            >
              ×
            </button>
          </div>
          {panel === "menu" && (
            <nav
              id="mobile-navigation"
              className="drawer-navigation"
              aria-label="Mobile navigation"
            >
              {["Shop", "Ingredients", "Journal"].map((label) => (
                <Link
                  key={label}
                  to="/"
                  hash={label.toLowerCase()}
                  onClick={close}
                >
                  {label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
              <button onClick={() => setPanel("search")}>
                Search<span aria-hidden="true">↗</span>
              </button>
              <button onClick={() => setPanel("account")}>
                Account<span aria-hidden="true">↗</span>
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
                      <img src={image(p.image)} alt={p.name} />
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
                  <p role="status">
                    No products found. Try “serum” or “restore”.
                  </p>
                )}
              </div>
            </>
          )}
          {(panel === "bag" || panel === "checkout") && (
            <>
              {!count ? (
                <div className="empty-bag">
                  <p>A little care goes a long way.</p>
                  <p>Your bag is waiting for your ritual.</p>
                  <button className="button" onClick={close}>
                    Continue exploring
                  </button>
                </div>
              ) : (
                <>
                  <div className="bag-items">
                    {products
                      .filter((p) => cart[p.slug])
                      .map((p) => (
                        <article className="bag-item" key={p.slug}>
                          <img src={image(p.image)} alt={p.name} />
                          <div>
                            <Link
                              to="/products/$slug"
                              params={{ slug: p.slug }}
                              onClick={close}
                            >
                              {p.name}
                            </Link>
                            <p>{money(p.price)}</p>
                            <div className="quantity">
                              <button
                                onClick={() => change(p.slug, -1)}
                                aria-label={`Remove one ${p.name}`}
                              >
                                −
                              </button>
                              <span aria-label="Quantity">{cart[p.slug]}</span>
                              <button
                                disabled={cart[p.slug] === 99}
                                onClick={() => change(p.slug, 1)}
                                aria-label={`Add one ${p.name}`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <strong>{money(p.price * cart[p.slug])}</strong>
                        </article>
                      ))}
                  </div>
                  <div className="bag-total">
                    <span>Subtotal</span>
                    <strong>{money(total)}</strong>
                  </div>
                  <p className="muted">
                    {total >= 75
                      ? "Your order qualifies for free shipping."
                      : `${money(75 - total)} away from free shipping.`}
                  </p>
                  {panel === "checkout" ? (
                    <p className="demo-note" role="status">
                      This is a template preview. No payment is collected or
                      order placed. Connect your commerce provider to enable
                      checkout.
                    </p>
                  ) : (
                    <button
                      className="button full-width"
                      onClick={() => setPanel("checkout")}
                    >
                      Preview checkout →
                    </button>
                  )}
                </>
              )}
            </>
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

function SectionTitle({
  eyebrow,
  children,
  action,
}: {
  eyebrow: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{children}</h2>
      </div>
      {action}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const { change } = useCart();
  return (
    <article className="product-card reveal">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="product-image"
      >
        <img
          src={image(product.image)}
          alt={product.name}
          width="321"
          height="420"
          loading="lazy"
        />
        {product.tag && <span className="product-tag">{product.tag}</span>}
      </Link>
      <div className="product-info">
        <p>{product.step}</p>
        <h3>
          <Link to="/products/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
      </div>
      <div className="price-row">
        <span>{money(product.price)}</span>
        <button
          className="add-button"
          onClick={() => change(product.slug, 1)}
          aria-label={`Add ${product.name} to bag`}
        >
          Add to bag
        </button>
      </div>
    </article>
  );
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
  const [step, setStep] = useState(0);
  const [ritualVisible, setRitualVisible] = useState(false);
  const [ritualFocused, setRitualFocused] = useState(false);
  const ritual = useRef<HTMLElement>(null);
  const ritualPlaying = ritualVisible && !ritualFocused;
  const [reviewIndex, setReviewIndex] = useState(0);
  const home = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () =>
      setRitualVisible(inView && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0.2 },
    );
    if (ritual.current) observer.observe(ritual.current);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
    };
  }, []);
  useEffect(() => {
    if (!ritualPlaying) return;
    const timer = setTimeout(
      () => setStep((current) => (current + 1) % steps.length),
      6000,
    );
    return () => clearTimeout(timer);
  }, [step, ritualPlaying]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    home.current?.querySelectorAll(".reveal").forEach((element) => {
      element.setAttribute("data-reveal", "");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={home}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-stack reveal">
            <p className="eyebrow">The Restore Ritual — Scalp & Hair Care</p>
            <h1 id="hero-title">
              Fuller hair starts with a <em>calmer scalp</em>
            </h1>
            <p className="hero-description">
              A three-step botanical ritual built around stinging nettle and
              ginseng, formulated to reduce shedding and support stronger,
              denser growth.
            </p>
            <div className="hero-actions">
              <a className="button" href="#shop">
                Shop the ritual
              </a>
              <a className="button outline" href="#ingredients">
                Explore ingredients
              </a>
            </div>
          </div>
          <div className="trust-row">
            <div>
              <AnimatedNumber value="95%" />
              <p>Naturally derived ingredients</p>
            </div>
            <div>
              <AnimatedNumber value="120 days" />
              <p>Independent clinical study</p>
            </div>
            <div>
              <AnimatedNumber value="4.8/5" />
              <p>From 2,400+ reviews</p>
            </div>
          </div>
        </div>
        <img
          className="hero-image"
          src={image("hero")}
          alt="Woman with long, full brunette hair in warm natural light"
          width="680"
          height="820"
          fetchPriority="high"
        />
      </section>
      <div
        className="ticker"
        aria-label="Botanical formulas, clinically tested, sulfate and silicone free, vegan and cruelty free, made in small batches, dermatologist reviewed"
      >
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy} aria-hidden="true">
              {[
                "Botanical formulas",
                "Clinically tested",
                "Sulfate & silicone free",
                "Vegan & cruelty free",
                "Made in small batches",
                "Dermatologist reviewed",
              ].map((value) => (
                <span key={value}>
                  <em>{value}</em>
                  <b>✦</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section
        className="products section-pad"
        id="shop"
        aria-labelledby="shop-title"
      >
        <SectionTitle
          eyebrow="Shop the ritual"
          action={
            <Link className="text-link" to="/shop">
              Shop all products →
            </Link>
          }
        >
          <span id="shop-title">
            Three steps, one <em>restorative routine</em>
          </span>
        </SectionTitle>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
      <section
        className="ingredients section-pad"
        id="ingredients"
        aria-labelledby="ingredients-title"
      >
        <div className="ingredients-heading reveal">
          <p className="eyebrow">What’s inside</p>
          <h2 id="ingredients-title">
            Five botanicals, <em>one balanced formula</em>
          </h2>
          <p>
            Each formula pairs a hero botanical with supporting extracts and
            oils that work together on the scalp’s natural balance.
          </p>
        </div>
        <div className="ingredient-grid">
          {ingredients.map((ingredient) => (
            <article className="ingredient-card reveal" key={ingredient.name}>
              <img
                src={image(ingredient.image)}
                alt={ingredient.name}
                width="200"
                height="200"
                loading="lazy"
              />
              <h3>{ingredient.name}</h3>
              <p className="latin">{ingredient.latin}</p>
              <p className="benefit">{ingredient.benefit}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        ref={ritual}
        className="ritual section-pad"
        id="ritual"
        data-playing={ritualPlaying}
        aria-labelledby="ritual-title"
      >
        <div className="ritual-images reveal" id="ritual-image">
          {steps.map((item, index) => (
            <img
              key={item.image}
              className={step === index ? "active" : ""}
              src={image(item.image)}
              alt={item.alt}
              aria-hidden={step !== index}
              width="600"
              height="760"
              loading="lazy"
            />
          ))}
          <div className="ritual-caption" key={step}>
            <p className="eyebrow">
              Step 0{step + 1} · {steps[step].duration}
            </p>
            <h3>{steps[step].name}</h3>
            <p>{steps[step].instruction}</p>
          </div>
        </div>
        <div className="ritual-heading reveal">
          <p className="eyebrow">How to use</p>
          <h2 id="ritual-title">
            A three-step ritual for <em>every wash day</em>
          </h2>
        </div>
        <div
          className="ritual-steps reveal"
          onFocusCapture={(event) =>
            setRitualFocused(event.target.matches(":focus-visible"))
          }
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setRitualFocused(false);
          }}
        >
          <span className="ritual-progress" aria-hidden="true">
            <span
              key={`${step}-${ritualPlaying}`}
              style={
                {
                  "--progress-start": step / steps.length,
                  "--progress-end": (step + 1) / steps.length,
                } as CSSProperties
              }
            />
          </span>
          {steps.map((item, index) => (
            <button
              className="ritual-step"
              key={item.name}
              onClick={() => setStep(index)}
              aria-label={`0${index + 1} ${item.name}`}
              aria-pressed={step === index}
              aria-controls="ritual-image"
            >
              <span className="step-number">0{index + 1}</span>
              <span className="step-copy">
                <span className="step-title">{item.name}</span>
                <span className="step-instruction">{item.instruction}</span>
              </span>
              <span className="duration">{item.duration}</span>
            </button>
          ))}
        </div>
      </section>
      <section
        className="results section-pad"
        id="results"
        aria-labelledby="results-title"
      >
        <div className="results-intro reveal">
          <p className="eyebrow">Clinically tested</p>
          <h2 id="results-title">
            Results measured, <em>not promised</em>
          </h2>
          <p className="study-summary">{studySummary}</p>
          <Link
            className="text-link"
            to="/info/$topic"
            params={{ topic: "clinical-summary" }}
          >
            Read the clinical summary →
          </Link>
        </div>
        <div className="stats-grid">
          {stats.map(([value, label]) => (
            <div className="stat reveal" key={value}>
              <AnimatedNumber value={value} />
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="testimonials section-pad"
        aria-labelledby="reviews-title"
      >
        <SectionTitle
          eyebrow="Reviews"
          action={
            <div className="review-controls">
              <button
                className="circle-button"
                aria-label="Previous review"
                onClick={() =>
                  setReviewIndex(
                    (reviewIndex + reviews.length - 1) % reviews.length,
                  )
                }
              >
                ←
              </button>
              <button
                className="circle-button"
                aria-label="Next review"
                onClick={() =>
                  setReviewIndex((reviewIndex + 1) % reviews.length)
                }
              >
                →
              </button>
            </div>
          }
        >
          <span id="reviews-title">
            In their <em>own words</em>
          </span>
        </SectionTitle>
        <div className="review-grid" aria-live="polite">
          {reviews.map((_, index) => {
            const review = reviews[(index + reviewIndex) % reviews.length];
            return (
              <article className="review-card reveal" key={index}>
                <div className="review-quote" key={review.name}>
                  <p className="stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </p>
                  <blockquote>{review.quote}</blockquote>
                </div>
                <div className="review-author">
                  <img
                    src={image(review.image)}
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                  <div>
                    <p>{review.name}</p>
                    <span>Verified buyer · {review.product}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="journal" id="journal" aria-labelledby="journal-title">
        <SectionTitle
          eyebrow="The journal"
          action={
            <Link className="text-link" to="/journal">
              All stories →
            </Link>
          }
        >
          <span id="journal-title">
            Stories behind the <em>formula</em>
          </span>
        </SectionTitle>
        <div className="journal-grid">
          <StoryCard story={stories[0]} featured />
          <div className="side-stories">
            {stories.slice(1).map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>
      <Newsletter />
    </div>
  );
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

function Newsletter() {
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Thanks for trying the preview. Connect your email provider to enable subscriptions.",
    );
  }
  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <p className="eyebrow">Join the list</p>
      <h2 id="newsletter-title">
        10% off your first order, and <em>nothing you won’t read</em>
      </h2>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Email address"
          autoComplete="email"
          required
        />
        <button className="button" type="submit">
          Subscribe
        </button>
      </form>
      <p className="consent">
        By subscribing you agree to receive marketing emails from Maren.
        Unsubscribe anytime. See our{" "}
        <Link to="/info/$topic" params={{ topic: "privacy" }}>
          Privacy Policy
        </Link>
        .
      </p>
      <p className="newsletter-status" role="status">
        {message}
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="footer-tagline">
          Botanical haircare, <em>backed by science.</em>
        </p>
        <div className="footer-column">
          <h3>Shop</h3>
          {products.map((p) => (
            <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }}>
              {p.name}
            </Link>
          ))}
        </div>
        <div className="footer-column">
          <h3>About</h3>
          <Link to="/info/$topic" params={{ topic: "our-story" }}>
            Our story
          </Link>
          <Link to="/" hash="ingredients">
            Ingredients
          </Link>
          <Link to="/" hash="results">
            Clinical results
          </Link>
          <Link to="/journal">Journal</Link>
        </div>
        <div className="footer-column">
          <h3>Help</h3>
          <Link to="/info/$topic" params={{ topic: "delivery" }}>
            Delivery & returns
          </Link>
          <Link to="/info/$topic" params={{ topic: "faq" }}>
            FAQ
          </Link>
          <Link to="/info/$topic" params={{ topic: "contact" }}>
            Contact
          </Link>
        </div>
        <div className="footer-column">
          <h3>Follow</h3>
          <Link to="/info/$topic" params={{ topic: "social" }}>
            Instagram
          </Link>
          <Link to="/info/$topic" params={{ topic: "social" }}>
            TikTok
          </Link>
        </div>
      </div>
      <Link className="footer-wordmark" to="/">
        Maren
      </Link>
      <div className="footer-legal">
        <span>© Maren Botanicals, 2026</span>
        <span>
          <Link to="/info/$topic" params={{ topic: "privacy" }}>
            Privacy Policy
          </Link>{" "}
          ·{" "}
          <Link to="/info/$topic" params={{ topic: "terms" }}>
            Terms of Service
          </Link>
        </span>
        <span>Made in small batches</span>
      </div>
    </footer>
  );
}

function Shop() {
  return (
    <section className="listing-page section-pad">
      <p className="eyebrow">The Restore Ritual</p>
      <h1>
        Care, in <em>three steps.</em>
      </h1>
      <p className="listing-description">
        Botanical haircare for a calmer scalp and a gentler routine.
      </p>
      <div className="product-grid">
        {products.map((product) => (
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
      <img src={image(product.image)} alt={product.name} />
      <div>
        <Link className="text-link" to="/shop">
          ← All products
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
            {product.slug === "the-restore-set"
              ? steps.map((s) => s.instruction).join(" ")
              : steps[products.indexOf(product)].instruction}
          </p>
        </details>
        <details>
          <summary>Our botanicals</summary>
          <p>{ingredients.map((i) => i.name).join(" · ")}</p>
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
        ← The journal
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
    title: "Botanical haircare, backed by science.",
    paragraphs: [
      "Maren is a botanical haircare concept built around a considered, three-step routine. A calmer scalp. Softer lengths. A little everyday care.",
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
      "The preview displays free shipping on orders over $75, as shown in the design.",
      "Set your delivery regions, dispatch times and return policy with your commerce provider before launching this shop. No orders are accepted in the preview.",
    ],
  },
  contact: {
    title: "Let’s talk haircare",
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
  faq: { title: "A few thoughtful answers", paragraphs: [] },
};

function Info() {
  const { topic } = infoRoute.useParams();
  const page = info[topic];
  if (!page) return <NotFound />;
  return (
    <section className="info-page section-pad">
      <Link className="text-link" to="/">
        ← Back to Maren
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
