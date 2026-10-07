import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";

/** Plays every [data-seq] element in DOM order like a live chat. A "typing" item shows dots, then hands over to the next bubble. */
function chatSequence(scope: Element) {
  const tl = gsap.timeline();
  let afterTyping = false;
  for (const el of scope.querySelectorAll<HTMLElement>("[data-seq]")) {
    if (el.dataset.seq === "typing") {
      tl.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25 }, "+=0.2").to(el, { autoAlpha: 0, duration: 0.2 }, "+=0.7");
      afterTyping = true;
      continue;
    }
    tl.from(el, { autoAlpha: 0, y: 8, duration: 0.5, ease: "power2.out" }, afterTyping ? "<" : "+=0.15");
    afterTyping = false;
  }
  return tl;
}

export function initLanding(root: HTMLElement) {
  // ScrollTrigger re-applies the scroll position it remembered when it refreshes on load; forget it.
  ScrollTrigger.clearScrollMemory("manual");
  // Solid nav once the hero is behind us (runs with or without motion).
  const nav = root.querySelector(".nav")!;
  const navST = ScrollTrigger.create({
    trigger: ".hero",
    start: "bottom 72px",
    onEnter: () => nav.classList.add("solid"),
    onLeaveBack: () => nav.classList.remove("solid"),
  });

  const mm = gsap.matchMedia(root);
  mm.add("(prefers-reduced-motion: no-preference)", () => {

    /* ---- hero: intro ---- */
    const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.1 });
    tl.from(".nav", { autoAlpha: 0, duration: 0.8 })
      .from(".hero-tag", { y: 10, autoAlpha: 0, duration: 0.7 }, 0.15)
      .from(".hero-title .w > span", { yPercent: 100, duration: 0.9, stagger: 0.05 }, 0.25)
      .from([".hero-sub", ".hero-ctas"], { y: 12, autoAlpha: 0, duration: 0.7, stagger: 0.08 }, 0.6)
      .from(".hero-phone", { y: 120, autoAlpha: 0, duration: 1.3 }, 0.75)
      .from(".float-inner", { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.15 }, 1.3)
      .add(chatSequence(root.querySelector(".hero-phone")!), 1.4);

    /* ---- hero: scroll parallax (each layer at its own depth) ---- */
    const hero = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero-bg", { yPercent: 22, ease: "none", scrollTrigger: hero });
    gsap.to(".hero-copy", { y: -90, autoAlpha: 0, ease: "none", scrollTrigger: { ...hero, end: "55% top" } });
    gsap.to(".hero-stage", { y: -70, ease: "none", scrollTrigger: hero });
    gsap.to(".float-card.left", { y: -150, ease: "none", scrollTrigger: hero });
    gsap.to(".float-card.right", { y: -210, ease: "none", scrollTrigger: hero });

    /* ---- simple reveals ---- */
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      const targets = el.dataset.reveal === "stagger" ? el.children : el;
      gsap.from(targets, { y: 20, autoAlpha: 0, duration: 0.8, ease: EASE, stagger: 0.08, scrollTrigger: { trigger: el, start: "top 85%" } });
    });

    /* ---- chapters ---- */
    gsap.utils.toArray<HTMLElement>(".chapter").forEach((ch) => {
      const q = gsap.utils.selector(ch);
      const t = gsap.timeline({ defaults: { ease: EASE }, scrollTrigger: { trigger: ch, start: "top 72%" } });
      const has = (sel: string) => q(sel).length > 0;
      t.from(q(".ch-text > *"), { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.07 }).from(q(".ch-visual > .ph"), { autoAlpha: 0, scale: 1.03, duration: 1.1 }, 0.1);
      if (has(".ch-visual > .phone")) t.from(q(".ch-visual > .phone"), { y: 40, autoAlpha: 0, duration: 1 }, 0.3);
      if (has(".pop-card")) t.from(q(".pop-card"), { y: 14, autoAlpha: 0, duration: 0.8 }, 0.5);
      const thread = ch.querySelector(".v4-thread");
      if (thread) t.add(chatSequence(thread), 0.4);
    });

    /* ---- privacy: looping vignettes, only while on screen ---- */
    const whileVisible = (el: Element, tl: gsap.core.Timeline) =>
      ScrollTrigger.create({ trigger: el, start: "top 90%", end: "bottom 10%", onToggle: (st) => (st.isActive ? tl.play() : tl.pause()) });

    const share = root.querySelector(".viz-share");
    if (share) {
      const items = share.querySelectorAll(".share-item");
      const pick = (k: number) => items.forEach((it, n) => it.classList.toggle("active", n === k));
      const tl = gsap.timeline({ paused: true, repeat: -1 });
      [0, 1, 2].forEach((k) => tl.call(pick, [k]).to({}, { duration: 2.4 }));
      whileVisible(share, tl);
    }

    const send = root.querySelector(".viz-send");
    if (send) {
      const btn = send.querySelector(".send-btn")!;
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 });
      tl.to(btn, { scale: 1.08, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: 3 })
        .to(btn, { scale: 0.9, duration: 0.12 })
        .fromTo(send.querySelector(".ripple"), { scale: 1, opacity: 0.7 }, { scale: 2.2, opacity: 0, duration: 0.6, ease: "power2.out" }, "<")
        .to(btn, { scale: 1, duration: 0.2 }, "<0.12")
        .call(() => send.classList.add("sent"))
        .to({}, { duration: 2.2 })
        .call(() => send.classList.remove("sent"))
        .to({}, { duration: 0.8 });
      whileVisible(send, tl);
    }

    const wipe = root.querySelector<HTMLElement>(".viz-wipe");
    if (wipe) {
      const mems = gsap.utils.toArray<HTMLElement>(".mem", wipe);
      // idle: chips drift on their inner element so the fly-in on .mem stays clean
      mems.forEach((m, k) => gsap.to(m.firstElementChild, { y: k % 2 ? 5 : -5, duration: 2.2 + k * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1 }));
      const toCenter = (axis: "x" | "y") => (_: number, el: HTMLElement) =>
        (axis === "x" ? wipe.offsetWidth : wipe.offsetHeight) * ((axis === "x" ? 0.5 : 0.38) - Number(el.dataset[axis]) / 100);
      const tl = gsap.timeline({ paused: true, repeat: -1 });
      const btn = wipe.querySelector(".wipe-btn")!;
      tl.to({}, { duration: 1.4 })
        .to(btn, { scale: 0.92, duration: 0.12, ease: "power2.out" })
        .call(() => wipe.classList.add("wiping"))
        .to(btn, { scale: 1, duration: 0.25, ease: "power2.out" })
        .to(mems, { x: toCenter("x"), y: toCenter("y"), scale: 0.2, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power2.in" }, "-=0.1")
        .to(".wipe-orb", { scale: 1.14, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" }, "-=0.15")
        .fromTo(".wipe-done", { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4 })
        .to({}, { duration: 1.3 })
        .to(".wipe-done", { autoAlpha: 0, duration: 0.3 })
        .call(() => wipe.classList.remove("wiping"))
        .set(mems, { x: 0, y: 0, scale: 0.6 }, "+=0.2")
        .to(mems, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" });
      whileVisible(wipe, tl);
    }

    /* ---- stories: each card replays what Mira told them, one after another ---- */
    gsap.utils.toArray<HTMLElement>(".story").forEach((card, i) => {
      gsap
        .timeline({ delay: i * 0.3, scrollTrigger: { trigger: card, start: "top 85%" } })
        .from(card, { y: 24, autoAlpha: 0, duration: 0.8, ease: EASE })
        .add(chatSequence(card), 0.3);
    });

    /* ---- statement ---- */
    gsap.from(".statement h2", { y: 20, autoAlpha: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: ".statement", start: "top 65%" } });
  });

  return () => {
    navST.kill();
    mm.revert();
  };
}
