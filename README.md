# TechOf Solution — Next.js Website

A full rebuild of the TechOf Solution site on Next.js 15 (App Router),
TypeScript, Tailwind CSS v4 and GSAP.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build && npm run start` for a
production build.

> **Note:** fonts are loaded via `next/font/google` (Bricolage Grotesque +
> Manrope). The very first `dev`/`build` run needs internet access to fetch
> them once — after that they're cached locally.

## Project structure

```
src/
  app/                   Pages (App Router) — one folder per route
    services/[slug]/     Individual service detail pages (SEO-targeted)
    api/contact/         Contact form endpoint
    layout.tsx           Root layout, global metadata, fonts
    globals.css          ★ Design tokens — colors, fonts, radii live here
    fonts.ts             ★ Typeface configuration
  components/            All UI building blocks
  lib/data/               ★ All site content — edit text/projects/team here
public/assets/            Images (placeholders included — see below)
```

## What's new in this revision

- **Light/dark rhythm** — sections now alternate between the dark palette and a `.section-light` variant (see `globals.css`) instead of being uniformly dark. Wrap any section in `className="section-light"` to opt it into the light half of the same color tokens.
- **Awwwards-style "What We Do"** — `ServicesShowcase.tsx` on the homepage shows a cursor-following preview image per service on hover (desktop). Preview images live at `public/assets/services/*-preview.svg`.
- **Services dropdown** — hovering "Services" in the navbar reveals a panel linking to all four service pages (`Navbar.tsx`); mobile gets an expandable version of the same list.
- **Autoplaying testimonials** — `Testimonials.tsx` advances every 3 seconds with a smooth GSAP crossfade, pauses on hover, and resets its timer on manual navigation.
- **Redesigned service pages** — each `/services/[slug]` page now runs: hero with background image → "What we do" offering grid → sliding technology marquee (image tiles) → industries served + client-logo marquee → alternating image/text capability rows → process → FAQ.
- **Smoother work-filter tabs** — `/works` category tabs now cross-fade out/in with GSAP instead of an instant show/hide.
- **Contact page polish** — a floating ambient glow and the flight-path motif for a touch more presence around the form.

## Making it yours

**1. Colors & fonts — one file each.**
Every color in the site (`--color-accent`, `--color-ink`, etc.) is defined
once in `src/app/globals.css` inside the `@theme` block. Change a hex value
there and it updates everywhere the corresponding utility class is used
(`bg-accent`, `text-accent`, `border-accent`...). Fonts work the same way —
swap the Google Fonts imports in `src/app/fonts.ts` for any other pairing.

**2. Content.**
All copy that isn't page-specific prose lives in `src/lib/data/`:
- `site.ts` — company name, contact details, social links, nav, stats
- `services.ts` — the four services, their process, stack and FAQs
- `projects.ts` — portfolio items shown on Home and /works
- `team.ts` — team members, testimonials, client-logo marquee names

**3. Images.**
`public/assets/` currently contains generated placeholder SVGs (project
covers, team portraits, the logo, and the Open Graph image) so the site
runs out of the box. Replace them with real photos/logos using the **same
file names** referenced in `src/lib/data/*.ts`, and everything updates
automatically. For best results use JPG/PNG for photos at roughly the same
aspect ratio as the placeholder (project covers are 4:3, portraits 3:4).

**4. Contact form.**
The form posts to `src/app/api/contact/route.ts`, which currently logs the
submission and returns success. Wire it to a real provider by adding a few
lines inside that file — the comments in the file walk through the
simplest option (Resend). Add any API keys to a `.env.local` file (see
`.env.example`), never commit them.

**5. Wording.**
Copy throughout was written fresh in a confident, premium tone based on
your real projects, clients and team — but intentionally avoids inventing
false claims (like a specific "years in business" figure) that don't match
the company's actual history. Feel free to adjust tone or add real
founding-year/history details once you decide what you want stated.

## SEO included

- Per-page `<title>` / meta description / canonical URL via the Metadata API
- Open Graph + Twitter card images
- `sitemap.xml` and `robots.txt` generated from `src/app/sitemap.ts` /
  `robots.ts` (auto-includes every service page)
- JSON-LD Organization structured data in the root layout
- Semantic headings, alt text on every image, keyboard-visible focus states

Once your domain is live, double-check `site.url` in `src/lib/data/site.ts`
— everything above (canonical URLs, sitemap, OG images, JSON-LD) is derived
from it.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · GSAP 3 · Lenis ·
react-fast-marquee · lucide-react
