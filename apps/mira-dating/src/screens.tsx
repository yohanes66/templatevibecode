import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUp,
  BatteryFull,
  Briefcase,
  CalendarBlank,
  CaretRight,
  CellSignalFull,
  ChatCircle,
  Compass,
  DotsThree,
  Heart,
  Lightning,
  MagnifyingGlass,
  MapPin,
  Microphone,
  PaperPlaneTilt,
  PencilSimple,
  SealCheck,
  SlidersHorizontal,
  Sparkle,
  UserCircle,
  WifiHigh,
  Wine,
  X,
} from "@phosphor-icons/react";
import {
  conversations,
  fallbackReply,
  img,
  newMatches,
  profiles,
  quickReplies,
  replies,
} from "./content";

export type Tab = "Discover" | "Mira" | "Likes" | "Chats" | "You";

export function Orb({ size = 20 }: { size?: number }) {
  return <span className="orb" style={{ width: size, height: size }} aria-hidden />;
}

export function Chip({ children, accent, outline, icon }: { children: ReactNode; accent?: boolean; outline?: boolean; icon?: ReactNode }) {
  return (
    <span className={`chip ${accent ? "is-accent" : ""} ${outline ? "is-outline" : ""}`}>
      {icon}
      {children}
    </span>
  );
}

/** iPhone frame. The 393×852 screen inside is scaled to whatever width the frame gets. */
export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(([e]) => el.style.setProperty("--k", String(e.contentRect.width / 417)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className={`phone ${className}`}>
      <div className="phone-body">
        <div className="screen">{children}</div>
        <i className="island" />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="status">
      <span>9:41</span>
      <span className="status-icons">
        <CellSignalFull size={17} />
        <WifiHigh size={17} />
        <BatteryFull size={24} weight="fill" />
      </span>
    </div>
  );
}

const TABS: [Tab, typeof Compass][] = [
  ["Discover", Compass],
  ["Mira", Sparkle],
  ["Likes", Heart],
  ["Chats", ChatCircle],
  ["You", UserCircle],
];

function TabBar({ active, onTab }: { active: Tab; onTab?: (t: Tab) => void }) {
  return (
    <nav className="tabbar" aria-label="App">
      {TABS.map(([t, Icon]) => {
        const on = t === active;
        const live = onTab && ["Discover", "Mira", "Chats"].includes(t);
        return (
          <button key={t} className={on ? "on" : ""} onClick={() => live && onTab(t)} aria-current={on || undefined} disabled={!!onTab && !live} title={onTab && !live ? "Not in this demo" : undefined}>
            <Icon size={26} weight={on ? "fill" : "regular"} />
            {t}
            {t === "Chats" && !on && <i className="unread" />}
          </button>
        );
      })}
      <i className="home-indicator" />
    </nav>
  );
}

function IconBtn({ children, size = 40, label, onClick, className = "" }: { children: ReactNode; size?: number; label: string; onClick?: () => void; className?: string }) {
  return (
    <button className={`icon-btn ${className}`} style={{ width: size, height: size }} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

/* ---------------- Discover ---------------- */

export function Discover() {
  const [i, setI] = useState(0);
  const [out, setOut] = useState<"" | "left" | "right">("");
  const p = profiles[i % profiles.length];
  const next = (dir: "left" | "right") => {
    setOut(dir);
    setTimeout(() => {
      setI((n) => n + 1);
      setOut("");
    }, 320);
  };
  return (
    <div className="scr-body discover">
      <div className="row between">
        <span className="wordmark">mira</span>
        <IconBtn label="Filters">
          <SlidersHorizontal size={18} />
        </IconBtn>
      </div>
      <div key={i} className={`profile ${out ? `out-${out}` : ""}`}>
        <div className="profile-head">
          <h3 className="t-name">
            {p.name}, {p.age} <SealCheck size={22} weight="fill" className="accent" />
          </h3>
          <div className="meta">
            <span><Briefcase size={16} /> {p.job}</span>
            <span><MapPin size={16} /> {p.distance}</span>
            <span><Wine size={16} /> {p.drinks}</span>
          </div>
        </div>
        <div className="profile-photo">
          <img src={img(p.photo)} alt={`${p.name}, profile photo`} />
          <IconBtn size={52} label="Pass" className="float l" onClick={() => next("left")}>
            <X size={24} />
          </IconBtn>
          <IconBtn size={52} label="Like" className="float r" onClick={() => next("right")}>
            <Heart size={24} />
          </IconBtn>
        </div>
        <div className="card read">
          <p className="t-micro row"><Orb /> Why Mira picked {p.name}</p>
          <p className="t-headline">{p.read}</p>
          <div className="row wrap">
            <Chip accent icon={<Sparkle size={14} weight="fill" />}>{p.match}% match</Chip>
            {p.chips.map((c) => <Chip key={c}>{c}</Chip>)}
          </div>
        </div>
        <div className="card prompt">
          <p className="t-micro muted">{p.prompt[0]}</p>
          <p className="t-prompt">{p.prompt[1]}</p>
          <IconBtn size={44} label="Like this answer" className="soft">
            <Heart size={20} />
          </IconBtn>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Ask Mira ---------------- */

type Msg = { me: boolean; text: string };

export function AskMira({ interactive = false }: { interactive?: boolean }) {
  const [extra, setExtra] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (extra.length || typing) end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [extra, typing]);

  const send = (text: string) => {
    if (!interactive || !text.trim() || typing) return;
    setExtra((m) => [...m, { me: true, text }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setExtra((m) => [...m, { me: false, text: replies[text] ?? fallbackReply }]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div className="scr-body ask">
      <div className="ask-head">
        <Orb size={40} />
        <div className="col">
          <b className="t-title">Mira</b>
          <span className="t-caption muted">Your dating coach · remembers 4 chats</span>
        </div>
        <IconBtn label="More">
          <DotsThree size={20} />
        </IconBtn>
      </div>
      <div className="thread">
        <div className="context">
          <img src={img("maya")} alt="" />
          <div className="col">
            <b className="t-label">Reading your chat with Maya</b>
            <span className="t-caption faint">Last message 2 days ago</span>
          </div>
          <CaretRight size={18} className="faint" />
        </div>
        <p className="t-caption faint center stamp">Today 8:12 PM</p>
        <p className="bubble me" data-seq="1">Maya just replied “haha yeah”. Is it over?</p>
        <div className="seq-slot">
          <span className="typing" data-seq="typing" aria-hidden><i /><i /><i /></span>
          <p className="bubble mira" data-seq="2">Not over. “haha yeah” is a closed door, not a locked one. Give her something easy and specific to answer.</p>
        </div>
        <div className="card draft" data-seq="3">
          <p className="t-micro row muted"><PencilSimple size={14} /> Draft for Maya</p>
          <p className="t-body">Okay, real question: best dumplings you’ve ever had, and would you defend that opinion in person?</p>
          <div className="row end">
            <button className="btn ghost">Rewrite</button>
            <button className="btn primary"><PaperPlaneTilt size={16} /> Send to Maya</button>
          </div>
        </div>
        <p className="t-caption muted row tip" data-seq="4"><Lightning size={14} className="accent" /> Maya usually replies 7–9 PM. Send it tonight.</p>
        {extra.map((m, k) => (
          <p key={k} className={`bubble ${m.me ? "me" : "mira"} pop`}>{m.text}</p>
        ))}
        {typing && <span className="typing static" aria-label="Mira is typing"><i /><i /><i /></span>}
        <div ref={end} />
      </div>
      <div className="composer">
        <div className="chips-row">
          {quickReplies.map((q, k) => (
            <button key={q} className="chip is-outline" onClick={() => send(q)}>
              {[<Sparkle size={14} key="s" />, <CalendarBlank size={14} key="c" />, <Lightning size={14} key="l" />][k]}
              {q}
            </button>
          ))}
        </div>
        <form className="input" onSubmit={(e) => (e.preventDefault(), send(draft))}>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask Mira anything…" aria-label="Message Mira" disabled={!interactive} />
          <Microphone size={20} className="muted" />
          <button className="send" aria-label="Send"><ArrowUp size={18} weight="bold" /></button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- Chats ---------------- */

export function Chats() {
  return (
    <div className="scr-body chats">
      <div className="row between">
        <h3 className="t-display">Chats</h3>
        <IconBtn label="Search">
          <MagnifyingGlass size={18} />
        </IconBtn>
      </div>
      <div className="col gap-12">
        <p className="t-micro muted">New matches · 4</p>
        <div className="matches">
          <div className="match">
            <span className="likes"><Heart size={26} weight="fill" /></span>
            <span className="t-caption">12 likes</span>
          </div>
          {newMatches.map((m) => (
            <div key={m.name} className="match">
              <span className={`ring ${m.fresh ? "fresh" : ""}`}><img src={img(m.photo)} alt="" /></span>
              <span className="t-caption muted">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card nudge">
        <Orb size={36} />
        <div className="col">
          <b className="t-title">2 chats are going quiet</b>
          <span className="t-small muted">I drafted openers for Maya and Kirana.</span>
        </div>
        <CaretRight size={18} className="faint" />
      </div>
      <div className="col">
        <p className="t-micro muted" style={{ paddingBottom: 4 }}>Conversations</p>
        {conversations.map((c) => (
          <div key={c.name} className="convo">
            <img src={img(c.photo)} alt="" />
            <div className="col grow">
              <b className="t-title">{c.name}</b>
              <span className={`t-small ${"tag" in c && c.tag === "move" ? "" : "muted"} truncate`}>{c.last}</span>
            </div>
            <div className="col end gap-6">
              <span className="t-caption faint">{c.time}</span>
              {"tag" in c && c.tag === "move" && <Chip accent>Your move</Chip>}
              {"tag" in c && c.tag === "date" && <Chip outline icon={<CalendarBlank size={14} />}>Date · Thu</Chip>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Screen shell ---------------- */

export function Screen({ tab, onTab, interactive }: { tab: "Discover" | "Mira" | "Chats"; onTab?: (t: Tab) => void; interactive?: boolean }) {
  return (
    <div className="scr">
      <StatusBar />
      {tab === "Discover" && <Discover />}
      {tab === "Mira" && <AskMira interactive={interactive} />}
      {tab === "Chats" && <Chats />}
      <TabBar active={tab} onTab={onTab} />
    </div>
  );
}
