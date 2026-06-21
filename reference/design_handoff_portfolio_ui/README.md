# Handoff: Portfolio UI — "Anchored" Direction

## Overview
This is the content/UI layer for **Lucas Freitas's portfolio**, which already has a working
3D scene (a stylized clay/low-poly room) rendered with **Three.js**, where the camera
flies to a different object as the visitor moves between sections:

| Section | Camera frames | Scene object |
|---|---|---|
| 01 · Hello | wide establishing shot | the whole room / workspace |
| 02 · About | window shelf | books on the shelf |
| 03 · Projects | the desk | dual monitors |
| 04 · Experience | the desk | keyboard / desk surface |
| 05 · Contact | the green door | mail slot + envelopes (the "mailbox") |

The **chosen UI direction is "Anchored"**: content lives in asymmetric, semi-transparent
"glass" cards floating in the negative space of the scene, with a small pulsing **pin**
that points at the scene object each section relates to. This keeps the 3D scene the star
while giving the content room to breathe. (Two other directions — a docked Side Rail and a
mobile-style Bottom Sheet — were explored in the same prototype and can be ignored for
implementation; see *Other directions* at the bottom if you want them as fallbacks.)

---

## About the Design Files
**The files in this bundle are design references created in HTML.** They are prototypes that
demonstrate the intended look, layout, motion, and behavior — **not production code to copy
verbatim.** Your job is to **recreate the "Anchored" design inside the existing portfolio
codebase** (React + Three.js + Vite) using its established patterns, the real `<canvas>`
Three.js scene, and real scroll/camera wiring.

In particular:
- In the prototype, the "3D scene" is faked by **panning/zooming a still PNG** of the scene
  per section. **In the real app you already have the live Three.js scene and camera** — so
  you will *delete the PNG-backdrop mechanism* and instead drive your real camera to the
  keyframes you already defined. The prototype's camera presets exist only to communicate
  *intent* (which object is framed, roughly how tight). See **Camera mapping** below.
- The content, layout, type, color, spacing, and interactions **are** the spec — implement
  those faithfully.

---

## Fidelity
**High-fidelity.** Colors, typography, spacing, motion, and interactions are final and
intended to be matched closely. Use the exact tokens in the **Design Tokens** section. The
one thing that is *not* final is the underlying scene rendering mechanism (you have the real
one).

---

## Stack & Architecture (target)
- **React + Three.js + Vite** (the existing portfolio).
- Recommended structure:
  ```
  src/
    scene/            # existing Three.js scene, camera rig, keyframes
    portfolio/
      data.ts         # all copy/content (port from data.jsx in this bundle)
      sections.ts     # section list + which camera keyframe each maps to
      useActiveSection.ts   # scroll position -> active section index
      AnchoredLayout.tsx    # the chosen UI
      cards/          # AnchorCard, ProjectMini, WorkItem, ContactLinks, Pin
      Chrome.tsx      # brand mark, nav ticks, scroll progress
    styles/tokens.css # design tokens (port from :root in styles.css)
  ```
- **No layout switcher** in production — that was a prototype affordance to compare the three
  directions. Ship only Anchored.
- The **Tweaks panel** is also prototype-only (do not ship it). It exposed: typeface, accent
  color, scene↔content balance, and an anchor-pins toggle. If you want any of these as real
  user-facing settings, treat them as nice-to-haves; otherwise hardcode the chosen values
  (defaults listed in Design Tokens).

---

## Scroll & Camera Engine

### Scroll model
- The page is a **full-viewport fixed stage**. Scrolling does **not** move content in normal
  document flow. Instead there is a vertical **scroll track** (one full-height empty spacer
  per section, `scroll-snap-type: y mandatory`, `scroll-snap-stop: always`) that acts purely
  as a **scrubber**.
- A scroll listener maps `scrollTop / clientHeight` (rounded) → **active section index**.
- The **content layer is `position: fixed`** over the stage (so cards stay on screen) but is
  a **DOM child of the scroll track**, so wheel/touch over a card still bubbles up and scrolls
  the track. This is important — don't make the content layer a sibling of the track or wheel
  events over cards won't scroll.
- `pointer-events: none` on the content-layer container; `pointer-events: auto` only on the
  actual cards/links/buttons, so empty areas let the user "scroll through" to the scene.
- Section change also driven by: **keyboard** (↑/↓, PageUp/PageDown) and **clicking nav ticks**.
  Programmatic nav calls `track.scrollTo({ top: i * clientHeight, behavior: 'smooth' })`.

### Camera mapping (replace the fake backdrop with your real camera)
The prototype stores, per section, a transform-origin + scale on the PNG. **Discard these
numbers** and instead, on active-section change, tween your real Three.js camera to the
keyframe you already authored for that object. Suggested approach:
```ts
// sections.ts
export const SECTIONS = [
  { id: 'hello',    label: 'Hello',      cameraKey: 'room'     },
  { id: 'about',    label: 'About',      cameraKey: 'shelf'    },
  { id: 'projects', label: 'Projects',   cameraKey: 'monitors' },
  { id: 'work',     label: 'Experience', cameraKey: 'desk'     },
  { id: 'contact',  label: 'Contact',    cameraKey: 'door'     },
];
```
On `activeSection` change, look up `cameraKey` and tween (`gsap`, `@react-spring/three`, or a
manual lerp in your render loop) camera `position` + `target` to that keyframe over ~1.2–1.5s
with an ease similar to `cubic-bezier(0.66, 0, 0.2, 1)`. Match the *feel* of the prototype's
1.5s scene transition.

### The anchor Pin
For the Anchored layout, each section shows a small pulsing ring + text label pointing at the
relevant object. In the prototype the pin is placed with hardcoded `vw/vh` percentages
(approximate screen position of the object for the framed camera). **In the real app, prefer
projecting the object's 3D world position to screen space** (`vector.project(camera)`) each
frame so the pin tracks the object exactly as the camera settles. Hardcoded percentages are an
acceptable fallback if projection is fussy. Pin labels: `the workspace / books & shelf / the
monitors / the desk / the mailbox`.

---

## Screens / Views (Anchored)

All cards use the **`.glass`** surface (see tokens) and the entrance animation (children rise
+ fade, staggered ~70ms, 0.7s, gated so reduced-motion shows final state). Card positions
below are the desktop intent; see **Responsive** for mobile.

### 01 · Hello
- **Purpose**: greeting + identity + jump-off.
- **Layout**: one wide glass card, **bottom-left** (`left: 5vw; bottom: 11vh`), `max-width
  ~540px`. Pin points at the workspace (~`70vw, 64vh`).
- **Components**:
  - Eyebrow: "Hi, I'm Lucas" (accent color, label font).
  - Display headline, 3 lines: "Full-stack" / "engineer building" / "things that ship."
    `clamp(34px, 5vw, 68px)`, weight per typeface, line-height ~0.98.
  - Lede paragraph (`max-width 460px`).
  - Primary button "See projects ↓" (scrolls to Projects), then a row of 3 tags:
    "Python · Django", "React · TypeScript", "PostgreSQL · AWS".

### 02 · About
- **Purpose**: who he is, at a glance.
- **Layout**: two glass cards stacked on the **left** — a wide one top (`left:5vw; top:15vh`)
  and a smaller "Core stack" card bottom (`left:5vw; bottom:10vh`). Pin at books/shelf (~`63vw,40vh`).
- **Components**:
  - Eyebrow "02 · About me".
  - Title: "I own the full lifecycle — from architecture to deploy." (`clamp(24px,2.6vw,38px)`).
  - First about paragraph (`max-width 440px`).
  - **Stat row** (3 stats): `5+` years shipping production software · `6` roles across web,
    data & industrial · `∞` curiosity for new stacks. Stat number = display font, accent color,
    28px; label = 11.5px ink-soft, max-width 130px.
  - Core-stack card: eyebrow "Core stack" + chip row of mini-tags: Python, Django, React,
    TypeScript, PostgreSQL, AWS, Docker, CI/CD, C++, Plotly Dash.

### 03 · Projects
- **Purpose**: showcase recent GitHub projects.
- **Layout**: a small title card top-left (`left:5vw; top:13vh`) + **four `.proj-mini` cards**
  scattered in a loose 2-column cluster on the left half:
  - card 0 → `left:5vw, top:40vh`
  - card 1 → `left:24vw, top:30vh`
  - card 2 → `left:5vw, top:66vh`
  - card 3 → `left:24vw, top:56vh`
  Pin at monitors (~`72vw, 52vh`). (On the real app you may prefer a tidy staggered column;
  keep the asymmetric, "pinned to the scene" feeling.)
- **Each project mini-card** (`width 250px`, glass, hover lift `translateY(-4px)`):
  - top color bar (30×4px, rounded) tinted per project (teal / lavender / coral / navy).
  - Project name (display font, 17px).
  - Blurb (12.5px, ink-soft, line-height 1.45).
  - Footer: tag chips + an "↗" arrow in accent. Whole card links to the GitHub repo
    (`target=_blank`).
  - Projects: **Protetoras Três Lagoas** (teal), **Fornecedores** (lavender), **adote.me**
    (coral), **GitPeep** (navy). URLs + blurbs in `data.jsx`.

### 04 · Experience
- **Purpose**: work history + education.
- **Layout**: one tall wide glass card on the **left**, internally scrollable
  (`top:13vh; bottom:13vh; max-height:74vh; overflow-y:auto; max-width: min(46vw,520px)`).
  Pin at desk (~`66vw, 66vh`).
- **Components**: eyebrow "04 · Work experience", title "Where I've been building.", then a
  list of **work items** (5) + an education row. Each work item:
  - Top row: role + ` · org` (org in accent) on the left, period on the right (label font,
    10.5px, no-wrap).
  - Place line (12px ink-soft).
  - Bullet list (custom accent dot bullets, 12.5px, line-height 1.45).
  - Tech chips (mini-tags, 10px, bordered, radius 5px).
  - Items separated by `1px var(--line)` bottom borders.
  - Roles, in order: Icetek (Mar 2025–Present), Mercos (Jan 2024–Mar 2025), Before TI
    (Mar 2021–Jan 2024, → Team Lead), Absolutier internship (Aug 2020–Feb 2021), BackSCNR
    founding dev (Jan 2019–Jun 2020). Education: B.Sc. Software Engineering, UFMS, 2021.

### 05 · Contact
- **Purpose**: the payoff — get in touch, tied to the mailbox.
- **Layout**: one wide glass card on the **right** (`right:5vw; bottom:12vh`). Pin at the door/
  mail slot (~`41vw, 58vh`). The right-side placement is intentional so the card sits opposite
  the door and the pin reads clearly.
- **Components**:
  - Eyebrow "05 · Contact me".
  - Display title "Let's build something." (`clamp(30px,3.4vw,48px)`).
  - Lede (`max-width 380px`).
  - Primary button = email (`mailto:`), shown as the address with a "→".
  - **Link list**: GitHub (@Lucas0liveira), LinkedIn (/in/lucas-freitas), Résumé (Download PDF).
    Rows with label (small, ink-faint) over handle (15px, 600), arrow on the right, hover slides
    the row right by 10px, `1px` separators.
  - ⚠️ **Placeholders to replace**: email is `lucasoliveira96@outlook.com`; LinkedIn + Résumé URLs
    are `#`. Get the real values from Lucas.

---

## Interactions & Behavior
- **Scroll / ↑↓ / PageUp-Down / nav-tick click** → change active section (snap, smooth).
- **Camera** tweens to the section's object on change (~1.2–1.5s, ease
  `cubic-bezier(0.66,0,0.2,1)`).
- **Pointer parallax (desktop only)**: the scene shifts a few px opposite the cursor
  (`±22px x, ±16px y`), throttled via `requestAnimationFrame`, disabled on coarse pointers.
  In the real app, apply a subtle equivalent to the camera or scene root.
- **Card entrance**: children rise+fade staggered when a section becomes active.
- **Pin**: pulsing ring (`ping` keyframes, 2.6s), disabled under reduced-motion.
- **Project cards**: hover lift; click → open repo in new tab.
- **Contact links**: hover slide-right.
- **Nav ticks** (right edge): active tick is wider + accent; label fades in on hover/active.
- **Scroll progress** (bottom-left): "NN / 05" + a progress bar + current section label.
- **Reduced motion**: all entrance/parallax/pulse animations collapse to final state.

## State Management
- `activeSection: number` (0–4) — derived from scroll position; also set by nav/keyboard.
- `go(i)` — imperative scroll-to-section.
- That's essentially it. No data fetching (content is static in `data.ts`). If you keep any
  Tweaks as real settings (typeface/accent), persist them in `localStorage`.

---

## Design Tokens

### Color (scene-derived palette)
| Token | Hex | Use |
|---|---|---|
| `--sage` | `#aec5a2` | scene wall (reference) |
| `--cream` | `#efeae4` | warm light surface base |
| `--lav` | `#8f7bd8` | accent option / project tint |
| `--coral` | `#e2774f` | **default accent** / project tint |
| `--teal` | `#2f9e8f` | accent option / project tint |
| `--navy` | `#343a64` | accent option / project tint |
| `--book-red` | `#b9503c` | accent option |
| `--ink` | `#262019` | primary text |
| `--ink-soft` | `#5b5246` | secondary text |
| `--ink-faint` | `#8d8275` | tertiary text / ticks |
| `--line` | `rgba(38,32,25,0.12)` | hairline borders |
| **Accent (default)** | `#F76440` (coral) | buttons, eyebrows, pins, active states. Options offered: coral, lavender `#8a74d8`, teal `#2f9e8f`, navy `#3a3f6b`, book-red `#b9503c`. |
| Accent ink | `#ffffff` | text on accent |

### Glass surface (the signature look)
- Default (matches prototype "balance" ≈ 42%):
  `background: rgba(250,248,244,0.62)`; solid variant `rgba(250,248,244,0.94)`.
- `backdrop-filter: blur(16px) saturate(1.25)` (blur ranges ~10–26px with the balance control).
- Border: `1px solid rgba(38,32,25,0.08)`.
- Shadow: `0 1px 0 rgba(255,255,255,0.5) inset, 0 24px 50px -30px rgba(38,32,25,0.55)`.
- Radius: `18px` (`--radius`).
- A radial vignette scrim sits over the scene (`opacity` scales with balance) so cards always
  have contrast.

### Typography (4 options; default = "grotesque")
All loaded from Google Fonts. The label font is uppercase + letter-spaced except in "mono".
| Theme | Display | Body | Label | Display weight / tracking |
|---|---|---|---|---|
| **grotesque (default)** | Hanken Grotesk | Hanken Grotesk | Hanken Grotesk | 760 / -0.028em |
| geometric | Outfit | Outfit | Outfit | 700 / -0.03em |
| editorial | Instrument Serif | Hanken Grotesk | Hanken Grotesk | 400 / -0.005em |
| mono | Space Grotesk | Hanken Grotesk | Space Mono | 600 / -0.02em |

Type scale (clamped, responsive): hero `clamp(34px,5vw,68px)`; section titles
`clamp(24px,2.6vw,38px)` / `clamp(30px,3.4vw,48px)` for contact; lede `clamp(15px,1.15vw,18px)`,
line-height 1.5; eyebrow/label 11–13px, letter-spacing ~0.14–0.18em, uppercase; body small
12.5px. **Min on-screen text 11px** (labels); body ≥12.5px.

### Spacing / radius / motion
- Card padding: `22px 24px` (default), project minis `16px 18px`.
- Radius: cards `18px`, sheet/rail `22–26px`, pills/buttons `100px`, mini-tags `5px`.
- Buttons: `padding 12px 20px`, pill, accent bg, hover `translateY(-2px)` + glow shadow;
  ghost variant = transparent + `1px solid ink`, inverts on hover.
- Standard ease: `cubic-bezier(0.66, 0, 0.2, 1)`.
- Entrance: 0.7s, children staggered ~0.07s; scene/camera transition ~1.2–1.5s.

### Chrome
- **Brand mark** top-left: accent dot (11px, with soft accent ring) + "Lucas Freitas" in label
  font.
- **Nav ticks** right-center: vertical stack; tick 26×2px (active 40px + accent); label fades
  in to the left on hover/active.
- **Scroll progress** bottom-left: "NN / 05" + 54×2px bar + section label.
- (Prototype also had a centered **layout switcher** — do not ship.)

---

## Assets
- `scene.png` — a still render of the 3D room, used **only** as the prototype backdrop. **Not
  needed in production** (you have the live Three.js scene). Included here for reference of the
  palette and object positions.
- Fonts: Google Fonts (Hanken Grotesk, Outfit, Instrument Serif, Space Grotesk, Space Mono).
- No icons beyond Unicode arrows (↗ → ↓ ▴) and CSS-drawn dots/rings. Swap for your icon set if
  preferred.

---

## Files in this bundle
- `Portfolio UI Concepts.html` — the multi-file prototype entry (loads the JSX/CSS below).
- `Portfolio UI Concepts -single file-.html` — **self-contained** version (all CSS+JS inlined);
  easiest to open and inspect; this is the canonical visual reference.
- `styles.css` — design system: tokens (`:root`), font themes, chrome, scroll track, shared
  primitives (`.glass`, `.btn`, `.tag`, `.eyebrow`, `.display`, entrance animation).
- `layouts.css` — the three directions' styles. For implementation you only need the
  **`A · ANCHORED ASYMMETRIC BLOCKS`** block (`.anchored-field`, `.anchor-card`, `.anchor-pin`,
  `.proj-mini`) plus the shared content bits (`.stat-row`, `.work-item`, `.link-row`, etc.) and
  the `@media (max-width: 860px)` Anchored rules.
- `layouts.jsx` — React components. Implement **`AnchoredLayout`** + the shared renderers
  (`ProjectBlocks`, `WorkBlocks`, `ContactLinks`, `ColumnContent`). Ignore `RailLayout` /
  `SheetLayout`.
- `app.jsx` — the scroll/camera/section engine, chrome, keyboard nav (the parts to port). Strip
  the layout switcher + Tweaks wiring.
- `scene.jsx` — the **prototype** backdrop (PNG pan/zoom) + the `CAMERA` presets and
  `ANCHOR_POINT` map. Use as *intent reference* for camera framing + pin positions; replace
  with your real Three.js camera tweening.
- `data.jsx` — **all content** (name, role, sections, about, projects, work, contact). Port
  this to `data.ts` and treat as the source of truth. ⚠️ contains placeholder email + LinkedIn/
  résumé URLs to replace.

---

## Other directions (not chosen — reference only)
The prototype also contains **Side rail** (content docked in a left panel, scene fully visible
on the right) and **Bottom sheet** (a peek/expand sheet anchored to the bottom, mobile-style).
These were comparison options. Implement only **Anchored**. If you ever want a fallback for very
small/landscape viewports, the Anchored mobile treatment already converts the floating cards
into a scrollable bottom stack (see the `@media (max-width: 860px)` rules + `.anchored-scroll`).

## Responsive (Anchored)
- Below **860px**: pins are hidden; the floating cards drop their absolute positions and become
  a single **scrollable stack docked to the bottom** (`.anchored-scroll`: `max-height 64vh`,
  `overflow-y:auto`, top fade mask), so the scene stays visible above. Project minis go
  full-width. The Experience card's internal scroll merges into this stack.
- Chrome shrinks: switcher hidden in prod; nav labels hidden (ticks only); brand + progress move
  to 18px insets.
- Keep the live 3D scene behind content on mobile (per Lucas's requirement) — just ensure the
  camera framing still reads with the bottom stack covering ~64vh.
- Hit targets ≥44px on touch.
```
