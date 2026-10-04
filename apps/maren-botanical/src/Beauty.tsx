import {
  ArrowLeft,
  ArrowRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  Minus,
  Plus,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { beautyProducts, shades, type ShopProduct } from "./content";

const asset = (name: string) => `/images/v5/${name}`;
type Add = (slug: string, delta: number) => void;

export function ProductImage({
  product,
  eager = false,
}: {
  product: ShopProduct;
  eager?: boolean;
}) {
  const spriteRatio = product.shadeIndex !== undefined
    ? 138 / 380
    : product.crop ? product.crop[1] / product.crop[0] : 1;
  const spriteScale = product.shadeIndex !== undefined ? 80 : 100;
  const image = (
    <img
      src={`/images/${product.image}.png`}
      alt={product.name}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      onLoad={
        eager
          ? (event) => {
              void event.currentTarget.decode().catch(() => {});
            }
          : undefined
      }
      draggable="false"
      style={
        product.crop
          ? {
              width: `${product.crop[0]}%`,
              height: `${product.crop[1]}%`,
              left: `${product.crop[2]}%`,
              top: `${product.crop[3]}%`,
            }
          : undefined
      }
    />
  );
  return (
    <div
      className={`product-photo ${product.shadeIndex !== undefined ? "tint-photo" : ""} ${["Sets", "Kit"].includes(product.step) ? "set-photo" : ""}`}
    >
      {product.crop ? (
        <span
          className="catalog-sprite"
          style={{
            width: `${spriteScale * Math.min(spriteRatio, 1)}%`,
            height: `${spriteScale * Math.min(1 / spriteRatio, 1)}%`,
          }}
        >
          {image}
        </span>
      ) : image}
    </div>
  );
}

export function BeautyCard({
  product,
  onAdd,
}: {
  product: ShopProduct;
  onAdd: Add;
}) {
  return (
    <article className="beauty-card">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="card-photo"
      >
        <ProductImage product={product} />
        {product.tag && <span className="beauty-badge">{product.tag}</span>}
        {["overnight-lip-mask", "barrier-mist"].includes(product.slug) && (
          <span className="award-badge">
            Best
            <br />
            of ’26
          </span>
        )}
      </Link>
      <h3>
        <Link to="/products/$slug" params={{ slug: product.slug }}>
          {product.name}
        </Link>
      </h3>
      <p>{product.description}</p>
      <label className="size-select">
        <span className="sr-only">Size for {product.name}</span>
        <select aria-label={`Size for ${product.name}`} defaultValue="">
          <option value="" disabled>
            Select size
          </option>
          <option value="standard">Standard size</option>
        </select>
        <CaretDown size={16} aria-hidden="true" />
      </label>
      <button
        className="add-bar"
        onClick={() => onAdd(product.slug, 1)}
        aria-label={`Add ${product.name} to bag`}
      >
        <span>Add to bag</span>
        <span>${product.price}</span>
      </button>
    </article>
  );
}

function ShadeCarousel({ onAdd }: { onAdd: Add }) {
  const [position, setPosition] = useState(2);
  const [settled, setSettled] = useState(2);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      setSettled(position);
  }, [position]);
  const active = ((position % shades.length) + shades.length) % shades.length;
  const trackStart = Math.floor(Math.min(position, settled) / 5) * 5 - 5;
  const trackCount =
    (Math.abs(Math.floor(position / 5) - Math.floor(settled / 5)) + 3) * 5;
  const start = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const shade = shades[active];
  const select = (delta: number) => setPosition((current) => current + delta);
  const choose = (index: number) =>
    setPosition(
      (current) =>
        current + (((index - (((current % 5) + 5) % 5) + 7) % 5) - 2),
    );
  const swatches = shade.dark
    ? ["630da", "beecc", "1f36a", "89bb9", "97718"]
    : ["a4793", "4e6c2", "51e37", "b18e1", "a0d98"];
  const selectedSwatches = ["cdd68", "584bd", "22b6e", "19418", "04a48"];
  return (
    <section
      id="shades"
      className="shade-section"
      aria-labelledby="shade-heading"
      data-shade={shade.name}
      style={
        {
          "--shade-bg": shade.color,
          "--shade-ink": shade.dark ? "#fff" : "#1f1c1a",
        } as CSSProperties
      }
    >
      <div className="shade-heading">
        <h2 id="shade-heading">The Cloud Tint Collection</h2>
        <p>
          Sheer, buildable colour for lips and cheeks. Five shades, one tube.
        </p>
      </div>
      <div className="shade-carousel">
        <button
          className="shade-arrow"
          aria-label="Previous shade"
          onClick={() => select(-1)}
        >
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <div
          className="shade-stage"
          role="group"
          aria-label="Cloud Tint shades. Swipe or use arrow keys to change shade."
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              select(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
          onPointerDown={(event) => {
            start.current = { x: event.clientX, y: event.clientY };
            dragged.current = false;
          }}
          onPointerUp={(event) => {
            if (!start.current) return;
            const dx = event.clientX - start.current.x,
              dy = event.clientY - start.current.y;
            start.current = null;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
              dragged.current = true;
              select(dx < 0 ? 1 : -1);
            }
          }}
          onPointerCancel={() => {
            start.current = null;
          }}
        >
          <div
            className="shade-track"
            style={
              {
                "--position": position,
                "--track-start": trackStart,
                "--track-count": trackCount,
              } as CSSProperties
            }
            onTransitionEnd={(event) => {
              if (event.target === event.currentTarget) setSettled(position);
            }}
          >
            {Array.from(
              { length: trackCount },
              (_, slot) => trackStart + slot,
            ).map((slot) => {
              const index = ((slot % 5) + 5) % 5;
              const item = shades[index];
              const visible = Math.abs(slot - position) <= 2;
              return (
                <button
                  key={slot}
                  className="shade-product"
                  data-active={slot === position}
                  aria-label={`Select ${item.name} shade`}
                  aria-pressed={slot === position}
                  aria-hidden={!visible}
                  tabIndex={-1}
                  style={{ "--offset": slot } as CSSProperties}
                  onClick={() => {
                    if (!dragged.current) choose(index);
                    dragged.current = false;
                  }}
                >
                  <span className="tint-sprite">
                    <img
                      src={asset("101ca.png")}
                      alt={`Cloud Tint in ${item.name}`}
                      draggable="false"
                      loading="eager"
                      decoding="sync"
                      style={{ left: `${item.left}%` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <button
          className="shade-arrow"
          aria-label="Next shade"
          onClick={() => select(1)}
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="shade-copy" aria-live="polite" aria-atomic="true">
        <h3>Cloud Tint</h3>
        <p>Shade: {shade.name}</p>
        <p className="shade-description" key={shade.name}>
          {shade.description}
        </p>
      </div>
      <div className="shade-swatches" aria-label="Choose a shade">
        {shades.map((item, index) => (
          <button
            key={item.name}
            aria-label={`Shade: ${item.name}`}
            aria-pressed={index === active}
            onClick={() => choose(index)}
          >
            <img
              src={asset(
                `${index === active ? selectedSwatches[index] : swatches[index]}.svg`,
              )}
              alt=""
              width="30"
              height="30"
            />
          </button>
        ))}
      </div>
      <button
        className="shade-add add-bar"
        onClick={() => onAdd(`cloud-tint-${shade.name.toLowerCase()}`, 1)}
        aria-label={`Add Cloud Tint ${shade.name} to bag`}
      >
        <span>Add to bag</span>
        <span>$24</span>
      </button>
      <Link
        className="caps-link"
        to="/products/$slug"
        params={{ slug: `cloud-tint-${shade.name.toLowerCase()}` }}
      >
        Learn more <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </section>
  );
}

function MiniProducts({ slugs }: { slugs: string[] }) {
  return (
    <div className="mini-products">
      {slugs.map((slug) => {
        const product = beautyProducts.find((p) => p.slug === slug)!;
        return (
          <Link key={slug} to="/products/$slug" params={{ slug }}>
            <ProductImage product={product} />
            <h3>{product.name}</h3>
            <span>${product.price}</span>
          </Link>
        );
      })}
    </div>
  );
}

function Sets() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [settled, setSettled] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches)
      setSettled(position);
  }, [position]);
  const sets = beautyProducts.filter((p) => p.step === "Sets");
  const [visible, setVisible] = useState(3);
  const start = useRef<number | null>(null);
  const dragged = useRef(false);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setVisible(
        Number(getComputedStyle(el).getPropertyValue("--set-visible")),
      );
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => observer.disconnect();
  }, []);
  const advance = (direction: number) =>
    setPosition((current) => current + direction);
  const active = ((position % sets.length) + sets.length) % sets.length;
  return (
    <section className="sets-section" id="sets">
      <div className="sets-copy">
        <h2>The Sets</h2>
        <p>
          Our bestsellers, thoughtfully paired. A complete ritual — or a little
          something for someone else.
        </p>
        <Link className="small-link" to="/shop">
          Shop all sets <CaretRight size={12} aria-hidden="true" />
        </Link>
      </div>
      <div className="sets-carousel">
        <button aria-label="Previous set" onClick={() => advance(-1)}>
          <CaretLeft size={24} aria-hidden="true" />
        </button>
        <div
          className="sets-window"
          onPointerDown={(event) => {
            start.current = event.clientX;
            dragged.current = false;
          }}
          onPointerUp={(event) => {
            if (
              start.current !== null &&
              Math.abs(event.clientX - start.current) > 40
            ) {
              dragged.current = true;
              advance(event.clientX < start.current ? 1 : -1);
            }
            start.current = null;
          }}
          onPointerCancel={() => {
            start.current = null;
          }}
          onClickCapture={(event) => {
            if (dragged.current) {
              event.preventDefault();
              dragged.current = false;
            }
          }}
        >
          <div
            className="sets-track"
            ref={track}
            style={{ "--set-position": position } as CSSProperties}
            onTransitionEnd={(event) => {
              if (event.target === event.currentTarget) setSettled(position);
            }}
          >
            {Array.from(
              {
                length:
                  (Math.abs(
                    Math.floor(position / sets.length) -
                      Math.floor(settled / sets.length),
                  ) +
                    4) *
                  sets.length,
              },
              (_, slot) =>
                Math.floor(Math.min(position, settled) / sets.length) *
                  sets.length -
                sets.length +
                slot,
            ).map((slot) => {
              const product =
                sets[((slot % sets.length) + sets.length) % sets.length];
              const shown = slot >= position && slot < position + visible;
              return (
                <Link
                  key={slot}
                  to="/products/$slug"
                  params={{ slug: product.slug }}
                  aria-hidden={!shown}
                  tabIndex={shown ? 0 : -1}
                  style={{ "--set-slot": slot } as CSSProperties}
                >
                  <ProductImage product={product} eager />
                  <h3>{product.name}</h3>
                  <span>${product.price}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <button aria-label="Next set" onClick={() => advance(1)}>
          <CaretRight size={24} aria-hidden="true" />
        </button>
      </div>
      <div className="sets-progress" aria-hidden="true">
        <span style={{ transform: `translateX(${active * 100}%)` }} />
      </div>
    </section>
  );
}

export function BeautyHome({ onAdd }: { onAdd: Add }) {
  const home = useRef<HTMLDivElement>(null);
  const [openReward, setOpenReward] = useState<number | null>(0);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const nodes =
      home.current?.querySelectorAll<HTMLElement>(".beauty-reveal") ?? [];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((node) => {
      node.setAttribute("data-reveal", "");
      observer.observe(node);
    });
    const show = () => {
      if (motion.matches)
        nodes.forEach((node) => node.classList.add("is-revealed"));
    };
    motion.addEventListener("change", show);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", show);
    };
  }, []);
  return (
    <div className="beauty-home" ref={home}>
      <section className="campaign" aria-labelledby="campaign-title">
        <img
          src={asset("24244.png")}
          alt="The Weekend Glow Kit with Cloud Tint, Barrier Mist and Body Oil in warm morning light"
          fetchPriority="high"
        />
        <div className="campaign-card">
          <p className="eyebrow">New</p>
          <h1 id="campaign-title">The Weekend Glow Kit</h1>
          <p>
            Cloud Tint, Barrier Mist and a travel-size Body Oil in a reusable
            linen pouch. Made for slow mornings, wherever they happen.
          </p>
          <Link
            className="small-link"
            to="/products/$slug"
            params={{ slug: "weekend-glow-kit" }}
          >
            Shop the kit <CaretRight size={12} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="category-cards" aria-label="Shop by category">
        {[
          ["Best-selling", "Skin + Tinted Care", "7238f.png", "skin"],
          ["Five shades", "Cloud Tint Lip", "efd94.png", "shades"],
          ["Soothing", "Sensitive-Skin Essentials", "02fe6.png", "shop"],
        ].map(([label, title, img, hash]) => (
          <Link key={title} className="category-card" to="/" hash={hash}>
            <img src={asset(img)} alt="" loading="lazy" />
            <div>
              <p className="eyebrow">{label}</p>
              <h2>{title}</h2>
              <span className="caps-link">
                Shop now <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </section>
      <section className="brand-statement beauty-reveal">
        <h2>
          Beauty, with <em>intention.</em>
        </h2>
        <p>
          A considered edit of skin, lip and body essentials — fewer
          steps, better formulas, made to fit into your day.
        </p>
        <Link
          className="small-link"
          to="/info/$topic"
          params={{ topic: "our-story" }}
        >
          About Maren <CaretRight size={12} aria-hidden="true" />
        </Link>
      </section>
      <ShadeCarousel onAdd={onAdd} />
      <section className="category-block skincare-block" id="skin">
        <div className="category-copy beauty-reveal">
          <h2>Skincare</h2>
          <p>
            Clinically tested formulas to cleanse, treat and protect — in three
            steps.
          </p>
          <Link className="small-link" to="/shop">
            Shop all skincare <CaretRight size={12} aria-hidden="true" />
          </Link>
          <MiniProducts
            slugs={["barrier-mist", "daily-gel-cream", "soft-cleanse-balm"]}
          />
        </div>
        <img
          className="editorial-photo beauty-reveal"
          src={asset("7238f.png")}
          alt="Woman enjoying her skincare ritual with Barrier Mist"
          loading="lazy"
        />
      </section>
      <section className="essentials" id="shop">
        <div className="essentials-heading">
          <h2>Effortless, everyday essentials</h2>
          <Link className="caps-link" to="/shop">
            Shop bestsellers <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="beauty-grid">
          {beautyProducts.slice(0, 4).map((product) => (
            <BeautyCard key={product.slug} product={product} onAdd={onAdd} />
          ))}
        </div>
      </section>
      <section className="category-block body-block" id="body">
        <img
          className="editorial-photo beauty-reveal"
          src={asset("41b71.png")}
          alt="Body Silk Oil and a slow morning body care ritual"
          loading="lazy"
        />
        <div className="category-copy beauty-reveal">
          <h2>Body</h2>
          <p>
            Rich, quick-absorbing textures that turn an everyday shower into a
            small ritual.
          </p>
          <Link className="small-link" to="/shop">
            Shop all body <CaretRight size={12} aria-hidden="true" />
          </Link>
          <MiniProducts
            slugs={["body-silk-oil", "smoothing-body-polish", "hand-cream-duo"]}
          />
        </div>
      </section>
      <Sets />
      <section className="rewards-section" id="rewards">
        <div className="rewards-copy beauty-reveal">
          <h2>Beauty you look forward to.</h2>
          {[
            [
              "Join the Maren Club",
              "Rewards",
              "Earn points on every order and redeem them for minis, early access to launches and members-only offers.",
            ],
            [
              "Subscribe & save",
              "Save 15%",
              "Your everyday essentials, delivered on your schedule. Save 15% on recurring orders and adjust your routine anytime.",
            ],
            [
              "Refill & return",
              "$10 credit",
              "Give your empties a second life. Return eligible packaging and receive credit toward your next ritual.",
            ],
          ].map(([title, pill, copy], index) => (
            <div className="reward-item" key={title}>
              <button
                aria-expanded={openReward === index}
                aria-controls={`reward-${index}`}
                onClick={() =>
                  setOpenReward(openReward === index ? null : index)
                }
              >
                <span>{title}</span>
                <span className="reward-pill">{pill}</span>
                <span className="reward-icon">
                  {openReward === index ? (
                    <Minus size={16} aria-hidden="true" />
                  ) : (
                    <Plus size={16} aria-hidden="true" />
                  )}
                </span>
              </button>
              <div
                className="reward-body"
                id={`reward-${index}`}
                inert={openReward !== index}
                data-open={openReward === index}
              >
                <div>
                  <p>
                    {copy}{" "}
                    <Link to="/info/$topic" params={{ topic: "rewards" }}>
                      Learn more.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <img
          className="beauty-reveal"
          src={asset("be46e.png")}
          alt="Maren essentials on a sunlit vanity"
          loading="lazy"
        />
      </section>
    </div>
  );
}

export function BeautyFooter() {
  const [message, setMessage] = useState("");
  return (
    <footer className="beauty-footer">
      <h2>
        Follow us{" "}
        <Link to="/info/$topic" params={{ topic: "social" }}>
          @maren.beauty
        </Link>
      </h2>
      <div className="social-strip">
        {["7238f.png", "efd94.png", "41b71.png", "be46e.png", "24244.png"].map(
          (img, index) => (
            <Link
              key={img}
              to="/info/$topic"
              params={{ topic: "social" }}
              aria-label={`Maren beauty inspiration ${index + 1}`}
            >
              <img src={asset(img)} alt="" loading="lazy" />
            </Link>
          ),
        )}
      </div>
      <div className="beauty-footer-main">
        <div className="beauty-newsletter" id="newsletter">
          <h2>Stay in the loop</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setMessage(
                "Thanks for exploring Maren. Subscriptions are a preview; no information was sent.",
              );
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email"
              autoComplete="email"
              required
            />
            <label className="sr-only" htmlFor="newsletter-mobile">
              Mobile number (optional)
            </label>
            <input
              id="newsletter-mobile"
              type="tel"
              placeholder="Your mobile (optional — save 15%)"
              autoComplete="tel"
            />
            <p>
              By subscribing you agree to receive marketing emails and texts
              from Maren. Message and data rates may apply. Reply STOP to
              cancel. See{" "}
              <Link to="/info/$topic" params={{ topic: "terms" }}>
                Terms
              </Link>{" "}
              &{" "}
              <Link to="/info/$topic" params={{ topic: "privacy" }}>
                Privacy
              </Link>
              .
            </p>
            <button type="submit">Subscribe</button>
            <p role="status">{message}</p>
          </form>
          <p className="skin-slowly">Skin, slowly.</p>
          <div className="footer-socials">
            {["Instagram", "TikTok", "Pinterest", "YouTube"].map((name) => (
              <Link key={name} to="/info/$topic" params={{ topic: "social" }}>
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="beauty-footer-links">
          <div>
            <h3>Shop</h3>
            {[
              "Shop all",
              "Bestsellers",
              "Skin",
              "Lip",
              "Body",
              "Sets",
            ].map((label) => (
              <Link key={label} to="/shop">
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h3>About</h3>
            {[
              "Our story",
              "Ingredients",
              "Sustainability",
              "Refill program",
              "Press",
              "Careers",
            ].map((label) => (
              <Link
                key={label}
                to="/info/$topic"
                params={{ topic: "our-story" }}
              >
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h3>Help</h3>
            <Link to="/info/$topic" params={{ topic: "contact" }}>
              Contact us
            </Link>
            <Link to="/info/$topic" params={{ topic: "faq" }}>
              FAQs
            </Link>
            <Link to="/info/$topic" params={{ topic: "delivery" }}>
              Shipping & returns
            </Link>
            <Link to="/" hash="shades">
              Find your shade
            </Link>
            <Link to="/info/$topic" params={{ topic: "accessibility" }}>
              Accessibility
            </Link>
          </div>
          <div>
            <h3>Account</h3>
            <Link to="/info/$topic" params={{ topic: "account" }}>
              My account
            </Link>
            <Link to="/info/$topic" params={{ topic: "account" }}>
              My orders
            </Link>
            <Link to="/" hash="rewards">
              Maren Club
            </Link>
            <Link to="/" hash="newsletter">
              SMS sign-up
            </Link>
          </div>
        </div>
      </div>
      <div className="beauty-legal">
        <span>© 2026 Maren Beauty. All rights reserved.</span>
        <div>
          <Link to="/info/$topic" params={{ topic: "terms" }}>
            Terms of use
          </Link>
          <Link to="/info/$topic" params={{ topic: "privacy" }}>
            Privacy policy
          </Link>
          <Link to="/info/$topic" params={{ topic: "privacy" }}>
            Cookie preferences
          </Link>
        </div>
      </div>
    </footer>
  );
}
