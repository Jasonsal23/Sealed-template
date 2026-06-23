# CLAUDE.md — "Sealed" · An Envelope Save-the-Date

This file is the build brief for Claude Code. Read it fully before writing code. The goal is a single, **stunning** wedding save-the-date web experience that opens like a real wax-sealed envelope and transitions into an elegant full-page landing site. It is a **portfolio example** — every name, date, photo, and detail is fictional and already provided here. **It must run end-to-end with zero input, no API keys, and no backend.**

---

## 1. The experience (what we're building)

A visitor lands on a quiet cream screen holding a single ivory envelope with a deep-burgundy wax seal stamped with a monogram. A delicate line of script reads _"You're invited…"_ with a prompt to open.

1. **Envelope scene** — The visitor taps the wax seal. The seal cracks and lifts, the flap swings open in smooth 3D, and a folded letter rises out of the envelope.
2. **The reveal** — The letter expands to fill the screen and cross-fades into the landing page. The envelope is gone.
3. **Landing page** — A full, scrollable save-the-date site: couple names, the date, the venue, a **live countdown**, a short story, a photo gallery, and a "reserve your formal invitation" mailing-address form (demo only). It should unmistakably read _wedding · save the date_.

The whole thing is one page. No routing. The envelope→landing handoff is the centerpiece — it must feel **buttery**, physical, and premium, not janky.

---

## 2. Tech stack

- **Vite + React** (JavaScript, not TypeScript unless you prefer it)
- **Tailwind CSS** — current stable setup for Vite (Tailwind v4 via the `@tailwindcss/vite` plugin + `@import "tailwindcss";` in the main CSS). Follow the current official Tailwind-for-Vite docs; don't assume an outdated config.
- **Motion** (the current name for Framer Motion) — `npm install motion`, import from `motion/react`. This drives the seal break, flap open, letter rise, and section reveals.
- **Google Fonts** — loaded via `<link>` in `index.html`.
- No backend, no database, no env vars, no analytics, no auth. If a step seems to need one, you've over-built it.

### Setup commands

```bash
npm create vite@latest . -- --template react
npm install
npm install motion
# Tailwind: follow current official Vite install steps (v4: @tailwindcss/vite plugin + @import "tailwindcss";)
npm run dev
```

Deploy target is **Vercel** (`npm run build` → `dist/`). It should deploy with zero config.

---

## 3. Project structure

```
/
├─ index.html              # Google Fonts <link> here
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx              # owns the stage state, swaps Envelope ↔ Landing
│  ├─ index.css            # Tailwind import + :root design tokens + base styles
│  ├─ data/
│  │  └─ wedding.js        # ALL fictional content lives here (single source of truth)
│  ├─ components/
│  │  ├─ EnvelopeScene.jsx # the envelope, wax seal, flap, letter, open animation
│  │  ├─ WaxSeal.jsx       # the seal + monogram crest (SVG), breaks on open
│  │  ├─ Monogram.jsx      # reusable inline-SVG monogram crest (the signature element)
│  │  ├─ Landing.jsx       # composes the landing sections
│  │  ├─ Hero.jsx
│  │  ├─ Countdown.jsx     # live ticking countdown
│  │  ├─ Details.jsx       # date / venue / "formal invitation to follow"
│  │  ├─ Story.jsx         # short "our story" blurb
│  │  ├─ Gallery.jsx       # photo grid
│  │  ├─ RsvpForm.jsx      # mailing-address capture, demo submit + success state
│  │  └─ Footer.jsx
│  └─ hooks/
│     └─ useReducedMotion.js  # or use Motion's built-in useReducedMotion
└─ CLAUDE.md
```

Keep all copy and data in `src/data/wedding.js`. Components read from it. This makes the example trivially re-skinnable for a real couple later.

---

## 4. The fictional content (use exactly this — do not invent your own)

Put this in `src/data/wedding.js` as a default-exported object.

```js
const wedding = {
  partnerA: "Eleanor",
  partnerB: "Julian",
  partnerAFull: "Eleanor Hayes",
  partnerBFull: "Julian Bennett",
  monogram: "E & J",
  hashtag: "#HayesToBennett",

  // Target date for the countdown — fixed, in the future relative to today.
  // ISO string, local-ish. Saturday, May 15, 2027, 4:30 PM.
  date: "2027-05-15T16:30:00",
  dateDisplay: "Saturday, the Fifteenth of May",
  yearDisplay: "Two Thousand Twenty-Seven",

  venueName: "Willow & Vine Estate",
  venueCity: "Sonoma, California",

  // Short, warm, specific. Not lorem ipsum.
  story:
    "It started with a wrong table at a crowded wine bar and a conversation that " +
    "outlasted last call. Four years, two cross-country moves, and one very " +
    "opinionated rescue dog later, we're doing the most natural thing in the world.",

  envelopeIntro: "You're invited",
  envelopePrompt: "Press the seal to open",
  letterGreeting: "Together with our families",
  letterLine: "we invite you to save our date",
  formalNote: "A formal invitation will follow by post.",

  // Royalty-free Unsplash photos (free for commercial use, no attribution required).
  // Swap freely. Sized via URL params; keep these as-is to run out of the box.
  heroImage:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1563808599481-34a342e44508?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1550784718-990c6de52adf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80",
  ],
};

export default wedding;
```

All images above are real, currently-valid Unsplash CDN URLs (free, no attribution required). They load with no API key.

---

## 5. Design system

**Direction:** classic & elegant. Cream + antique gold, high-contrast romantic serif, a burgundy wax accent. Restrained and expensive-feeling — think letterpress stationery, not a glittery template. Spend the boldness in **one** place: the wax seal + monogram crest. Everything else stays quiet.

### Color tokens — put in `index.css` `:root`

```css
:root {
  --cream: #f8f4ed; /* page background */
  --parchment: #efe6d6; /* cards, envelope paper, letter */
  --gold: #b6924e; /* primary accent, hairlines, monogram */
  --gold-light: #cbb07c; /* subtle gradients, foil highlights */
  --ink: #2e2a24; /* text — warm near-black, never pure #000 */
  --wax: #7a2e3a; /* wax seal — deep oxblood/burgundy */
  --sage: #8c9a7c; /* optional botanical line-art accent only */
}
```

### Typography (Google Fonts)

- **Cormorant Garamond** — display headings, couple names, countdown numbers. Use light/medium weights at large sizes; lean into its high contrast. Italics for romantic emphasis.
- **Pinyon Script** — the script flourishes only: "You're invited", "Save the Date". Use sparingly and large; never for body or anything that must be read fast.
- **EB Garamond** — body copy and the story. For tiny labels/eyebrows (e.g. "WHEN", "WHERE", day/hour labels) use EB Garamond in **uppercase with wide letter-spacing** (~0.2em).

Set a clear type scale with `clamp()` so it's fluid from mobile to desktop. Couple names should be a genuine showstopper at the top of the landing page.

### Texture & detail

- Background: cream with a very faint paper grain (subtle CSS noise or a low-opacity SVG grain overlay). Keep it whisper-quiet.
- Dividers: thin **gold hairline rules**, sometimes with a small centered diamond/floral SVG ornament.
- Optional sage botanical **line-art** sprigs (thin SVG strokes) in section corners — restrained, never clip-arty.
- Generous whitespace. This is a luxury stationery piece; let it breathe.

### Signature element

The **monogram crest** (`Monogram.jsx`): an inline SVG — a fine gold ring/laurel framing "E & J" in Cormorant. It appears stamped on the wax seal, again small in the footer, and as the success-state mark on the form. This is the one motif that ties the whole piece together.

---

## 6. Build spec — Phase 1: Envelope scene

`App.jsx` owns a `stage` state: `"sealed" → "opening" → "revealed"`. Use `<AnimatePresence>` to swap `<EnvelopeScene>` out and `<Landing>` in.

Layout: full-viewport cream screen, the envelope centered, script line above, prompt below.

**Envelope anatomy** (all CSS/SVG, no images):

- Envelope body: parchment rectangle with subtle inner shadow and a faint gold edge.
- Back flap: a triangle that sits closed over the top. Give the scene container `perspective: 1200px` and the flap `transform-style: preserve-3d; transform-origin: top center;`.
- Wax seal: `WaxSeal.jsx` — a burgundy circle with slightly irregular edges (SVG, a touch of drip), embossed monogram in gold, soft drop shadow. It's a real `<button>` (`aria-label="Open your invitation"`), keyboard-activatable.
- Folded letter: a parchment sheet tucked behind/inside the envelope, initially clipped/hidden below the flap.

**Open sequence** (on seal click → `stage = "opening"`), orchestrated with Motion, roughly in this order:

1. **Seal breaks** (~0.5s): the seal scales up slightly, then splits — either two halves rotating + sliding apart and fading, or the seal lifting (translateY up, slight rotate, fade out). Make it feel like it cracks.
2. **Flap opens** (~0.9s, starts as the seal finishes): `rotateX: 0 → -180deg`, `transform-origin: top`, eased (a gentle spring or `easeInOut`). Add a subtle shadow shift so the underside reads as it swings.
3. **Letter rises** (~0.9s): the folded letter translates up out of the envelope (`y` from inside to above), scales from ~0.92 → 1, with a soft shadow growing beneath it.
4. **Takeover** (~0.6s): the letter scales/expands to fill the viewport and cross-fades; on complete, set `stage = "revealed"` and `<AnimatePresence>` swaps in `<Landing>` with a fade. The envelope unmounts.

Tune the timings so the whole thing lands around **2.5–3s** and never feels sluggish or abrupt. Stagger, don't stack everything at once. Add a gentle idle micro-motion before opening (the seal "breathes" — a tiny scale loop) to signal it's tappable.

**Reduced motion:** if `prefers-reduced-motion` is set, skip the choreography — show the closed envelope, and on click do a simple quick fade straight to `<Landing>`. No 3D, no rise.

---

## 7. Build spec — Phase 2: Landing page

Scrollable, composed in `Landing.jsx`. Each section reveals on scroll (Motion `whileInView`, subtle fade + 16–24px rise, `once: true`). Keep reveals understated — too much motion reads as AI-generated; let the content carry it.

**Sections, in order:**

1. **Hero** — full-height. `heroImage` as a background with a cream/gold gradient scrim for legibility. Centered: a Pinyon Script _"Save the Date"_ flourish, then the couple names **Eleanor & Julian** huge in Cormorant (the ampersand can be an oversized gold glyph), then the date line and venue city beneath a gold hairline. A small downward cue invites scrolling.

2. **Countdown** (`Countdown.jsx`) — live, ticking every second toward `wedding.date`. Four units: **Days · Hours · Minutes · Seconds**, numbers in large Cormorant, labels in wide-tracked uppercase EB Garamond, separated by thin gold rules. `useEffect` + `setInterval(…, 1000)`, cleared on unmount. If the date is in the past, show a graceful message ("Today's the day" / "Just married") instead of negative numbers.

3. **Details** (`Details.jsx`) — elegant two- or three-column block: **WHEN** (`dateDisplay`, `yearDisplay`), **WHERE** (`venueName`, `venueCity`), and a line for `formalNote` — "A formal invitation will follow by post." Gold hairlines and a small ornament between columns. Stacks on mobile.

4. **Story** (`Story.jsx`) — the `story` blurb in EB Garamond, generous leading, narrow measure (~60ch), centered, with a script or small-caps heading like "Our Story" and a botanical sprig.

5. **Gallery** (`Gallery.jsx`) — the six `gallery` photos in a refined grid (varied sizes/an editorial layout, not a plain even grid). Rounded-none or very slight radius; thin gold frame on hover; `loading="lazy"`, `decoding="async"`. Subtle hover scale.

6. **RSVP / address capture** (`RsvpForm.jsx`) — see Phase 3.

7. **Footer** (`Footer.jsx`) — the monogram crest, the `hashtag`, and a closing line ("We can't wait to celebrate with you"). Quiet, centered.

**Move focus** to the landing's first heading when it mounts (accessibility — the visitor's keyboard/screen-reader context shouldn't be stranded on the unmounted envelope).

---

## 8. Build spec — Phase 3: The form (demo only)

`RsvpForm.jsx`. Framing copy: _"Be the first to receive our formal invitation"_ — collect a mailing address. **It is a demo. No backend, no network call, no storage required.**

- Fields: Full name, Email (optional), Street address, City, State, ZIP.
- **Do not use a raw HTML `<form>` submit that reloads.** Use `onClick`/controlled inputs with `useState`, and `e.preventDefault()` if you keep a form element.
- Validation: require name + street + city + state + ZIP; show gentle inline messages, not alerts.
- On submit: brief simulated pending state (~700–900ms `setTimeout`), then swap the form for an elegant **success state** — the monogram crest, a confirmation like _"You're on the list. Your invitation will arrive by post."_, and the couple's hashtag. No real data leaves the page.
- Optional nicety: persist the "submitted" flag to `localStorage` so a returning visitor sees the confirmed state. (Fine here — this is a standalone Vite app, not a sandboxed artifact.) Keep it optional; React state alone is the baseline.

Style inputs to match the stationery: parchment fields, gold underlines or hairline borders, ink text, a gold/burgundy button. Errors are calm and directive, in the page's voice.

---

## 9. Quality floor (non-negotiable)

- **Responsive** down to ~360px. The envelope scales; landing sections stack; type uses `clamp()`. Test mobile early.
- **Accessibility:** the seal and all controls are real, focusable, keyboard-operable elements with visible focus rings; images have meaningful `alt`; color contrast for ink-on-cream is comfortable; `prefers-reduced-motion` fully respected.
- **Performance:** preload the hero image; `loading="lazy"` + `decoding="async"` on gallery images; no layout shift; 60fps on the open animation (animate `transform`/`opacity` only — never animate layout properties like width/height/top).
- **No console errors or warnings.**
- **Clean handoff:** the envelope fully unmounts after reveal; no leftover fixed overlays trapping scroll.

---

## 10. Guardrails — do NOT

- Add a backend, database, API key, env var, or any third-party service. It must `npm install && npm run dev` with nothing else.
- Replace the provided content with lorem ipsum or different fake names. Use the `wedding.js` data exactly.
- Over-animate the landing page. The envelope is the spectacle; the landing is quietly elegant. Restraint is the brief.
- Reach for the three AI-default looks (terracotta-on-cream startup, black + acid-green, broadsheet hairlines). This is wedding stationery: cream, antique gold, burgundy wax, romantic serif.
- Animate layout/box properties in the open sequence (kills the framerate). Transforms and opacity only.

---

## 11. Definition of done

- [ ] Loads to the sealed envelope on a cream screen with the script intro and prompt.
- [ ] Tapping the seal plays the full break → flap → letter rise → takeover, smoothly (~2.5–3s).
- [ ] Cross-fades into the landing page; envelope unmounts cleanly.
- [ ] Hero, **live countdown**, details, story, gallery, address form, footer all present and styled.
- [ ] Countdown ticks every second toward May 15, 2027 and handles the past-date case.
- [ ] Form validates, shows a pending state, then an elegant success state — no network call.
- [ ] Fully responsive, keyboard-accessible, reduced-motion path works, no console errors.
- [ ] Runs with zero config and deploys to Vercel as-is.

Build it section by section, check it in the browser as you go, and treat the wax-seal open as the moment worth getting perfect.
