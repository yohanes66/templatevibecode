// Demo content for Mira, a fictional AI dating coach. Replace before shipping.

export const img = (name: string) => `/images/${name}.webp`;

export const nav = [
  { label: "How it works", href: "#how" },
  { label: "Safety", href: "#safety" },
  { label: "Stories", href: "#stories" },
  { label: "Journal", href: "#journal" },
];

export const trust = [
  { icon: "star", text: "4.8 on the App Store" },
  { icon: "heart", text: "2M+ first dates planned" },
  { icon: "sparkle", text: "Built with relationship researchers" },
  { icon: "lock", text: "Private by default" },
] as const;

export const chapters = [
  {
    num: "01",
    kicker: "Before the match",
    title: "Fewer swipes, better reasons.",
    body: "Mira learns what you actually respond to, not just what you say you want, and tells you why every match made the cut.",
    points: ["A short daily list, not an endless deck", "A plain-language read on every match", "Red flags called early"],
  },
  {
    num: "02",
    kicker: "In the chat",
    title: "Say the thing, just better.",
    body: "Stuck on a reply? Mira drafts one in your voice, checks the timing, and lets you decide. Nothing sends without you.",
    points: ["Opener and reply drafts", "Tone check before you hit send", "Best time to text, per match"],
  },
  {
    num: "03",
    kicker: "Before the date",
    title: "Plans, not “we should hang sometime”.",
    body: "Pick a vibe and a budget. Mira suggests the place, the time, and the message that turns a maybe into a yes.",
    points: ["Spots that fit both your tastes", "Budget and distance built in", "One tap to send the plan"],
  },
  {
    num: "04",
    kicker: "After the date",
    title: "An honest debrief.",
    body: "Tell Mira how it went. She reads the signals you missed and helps you decide what’s next, kindly but honestly.",
    points: ["Signals you didn’t catch", "When and how to follow up", "Patterns across your dates"],
  },
];

export const datePlan = [
  { icon: "calendar", title: "Thursday, 7:00 PM", sub: "You’re both free after work" },
  { icon: "pin", title: "Night market on 5th St", sub: "12 min for you, 9 for her" },
  { icon: "coffee", title: "Dessert spot after", sub: "4 min walk, quiet tables" },
  { icon: "wine", title: "Drinks optional", sub: "She said “sometimes”" },
] as const;

export const privacy = [
  { title: "You choose what Mira reads", body: "Share one chat or none. Mira never opens a conversation you didn’t hand her." },
  { title: "Nothing sends without you", body: "Every draft waits for your tap. Mira never messages a match on her own." },
  { title: "Wipe her memory anytime", body: "One tap clears everything Mira knows about you. No questions asked." },
] as const;

export const stories = [
  { mira: "Your bio reads like a LinkedIn post. Want a rewrite?", quote: "Mira told me my bio read like a LinkedIn post. I rewrote it and matched with Sarah two days later.", name: "Raka, 29", meta: "Jakarta · 8 months together", photo: "raka" },
  { mira: "She mentioned her dog three times. Just saying.", quote: "The debrief is the best part. It noticed she kept mentioning her dog. Our second date was at a dog park.", name: "Dimas, 31", meta: "Bandung · still dating", photo: "dimas" },
  { mira: "Skip the “hey”. Ask about her trip to Bali.", quote: "I used to send “hey” and hope. Now I send one good question and actually get replies.", name: "Bima, 27", meta: "Surabaya · 3 dates this month", photo: "bima" },
];

// Replace with your real store listings.
export const storeLinks = { appStore: "#", googlePlay: "#" };

export const footer = [
  { title: "Product", links: ["How it works", "Safety", "Mira Plus"] },
  { title: "Company", links: ["About", "Journal", "Careers"] },
  { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
];

// ---------- app data (the user is a man; every match is a woman)

export const profiles = [
  {
    name: "Noor", age: 26, photo: "noor", job: "Nurse", distance: "2 km away", drinks: "Sometimes",
    read: "You both plan Sundays around food and skip small talk. She replies within the hour, which your last three matches didn’t.",
    match: 92, chips: ["Same humor", "Foodie"],
    prompt: ["Typical Sunday", "Dumplings, a long walk, and pretending I’ll do laundry later."],
  },
  {
    name: "Sarah", age: 27, photo: "sarah-lg", job: "Architect", distance: "5 km away", drinks: "Socially",
    read: "She plans ahead and so do you. Her prompts are funny without trying, which is your exact type.",
    match: 87, chips: ["Planner", "Night markets"],
    prompt: ["My simple pleasures", "Window seats, extra sambal, and a playlist that fits the drive."],
  },
  {
    name: "Kirana", age: 25, photo: "kirana-lg", job: "Ceramicist", distance: "3 km away", drinks: "Rarely",
    read: "You both mentioned pottery and slow mornings. She asks questions back, a good sign for chat.",
    match: 84, chips: ["Creative", "Early riser"],
    prompt: ["I’m weirdly good at", "Guessing what someone orders before they do."],
  },
];

export const newMatches = [
  { name: "Noor", photo: "noor", fresh: true },
  { name: "Sarah", photo: "sarah", fresh: true },
  { name: "Kirana", photo: "kirana", fresh: false },
  { name: "Laras", photo: "laras", fresh: false },
];

export const conversations = [
  { name: "Noor", photo: "noor", last: "haha okay that’s actually funny", time: "2m", tag: "move" },
  { name: "Sarah", photo: "sarah", last: "Thursday works! 7pm?", time: "1h", tag: "date" },
  { name: "Maya", photo: "maya", last: "You: hey", time: "2d" },
  { name: "Donita", photo: "donita", last: "See you then :)", time: "3d" },
  { name: "Kirana", photo: "kirana", last: "Wait, you also do pottery??", time: "5d" },
] as const;

export const quickReplies = ["Roast my bio", "Plan a date", "Red flag check"] as const;

// ponytail: canned replies, swap for a model call when there is a backend
export const replies: Record<string, string> = {
  "Roast my bio": "“Love to travel, laugh, and good food” describes every human alive. Tell me one oddly specific thing you’d drive 40 minutes for.",
  "Plan a date": "Sarah said low-key and no loud bars. Thursday 7 PM at the night market on 5th, dessert after. Want me to draft the text?",
  "Red flag check": "Maya took two days to reply “haha yeah”. Not a red flag, just low effort. Ask one easy question, then let her meet you halfway.",
};
export const fallbackReply = "Got it. Give me the context: who, what she said, and what you want to happen next.";
