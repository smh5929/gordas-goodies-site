# Gorda's Goodies — Website Project Brief

This file is the working spec for the Gorda's Goodies website. It's meant to be
read by Claude Code (drop this whole project folder into VS Code, `cd` into it,
run `claude`) as persistent project context, and by Sam as the plan of record.
Update it as decisions change — it's the source of truth, not a one-time doc.

## 1. The business

- **Name:** Gorda's Goodies LLC
- **What it sells:** Handmade desserts, primarily **alfajores** — a Peruvian
  shortbread cookie sandwich filled with dulce de leche (manjar blanco). Also
  makes flan, tres leches, pionono, crumb cake, and rice pudding, and does
  custom/catering orders for events.
- **Tagline (from current site):** "Signature sweets... Peruvian Alfajores...
  ¡qué rico!"
- **Location:** Springfield, VA. Also does events in Herndon, VA. Generally
  serves Northern Virginia.
- **Contact:** gordasgoodies@gmail.com · 703-586-7359
- **Social:** Instagram @gordasgoodiesllc (~400-600 followers)
- **Current site:** gordasgoodies.wixsite.com/my-site (being replaced by this
  project)
- **Scale:** small home-based/local business — the site needs to be fast to
  build, easy to keep running with zero code maintenance from the owner, and
  should not overpromise capacity (no "ships nationwide," no big storefront
  energy — this is a local, personal, handmade brand).

## 2. Brand

- **Logo:** `Final_Original_GordasGoodies.png` — high-res (6251×4167), white
  background, transparent-friendly composition. Features a smiling character
  in braids wearing a traditional hat, with two alfajor cookies forming the
  "OO" in "GOODIES."
- **Color direction:** logo is a deep brick/crimson red (~`#a02a2a`–`#8c1f1f`
  range — grab the exact hex from the logo file when building) on white.
  Recommend pairing that red with a warm cream/tan (echoing the dulce de leche
  filling) and white as the neutral base. Keep it warm and handmade-feeling,
  not corporate — this is a family bakery, not a chain.
- **Type direction:** the logo uses a rounded, friendly display font for the
  wordmark. Pair with a clean, readable sans-serif (e.g. system font stack,
  or a free Google Font like "Nunito" or "Poppins") for body text — don't
  fight the logo's personality with a second decorative font.
- **Tone:** warm, personal, a little playful — family recipe energy, not a
  polished chain-bakery vibe. First person "we" language is appropriate.

**TODO (needs mom's input):** confirm exact brand hex codes if a style guide
exists anywhere beyond the logo file; confirm whether the Peruvian-hat
character has a name (useful for copy/voice).

## 3. Site structure

Plain HTML/CSS/JS, mobile-first, no framework (see §5 for why). One
lightweight multi-page site, not a SPA. Contact + location live in a
**footer that appears on every page**, per your call.

1. **Home** — hero photo + logo, one-line tagline, 2-3 best product shots,
   a clear "Order Now" call-to-action pointing at the Square store, short
   teaser of the story, nav into About/Menu/Gallery.
2. **About** — the story (who's the "Gorda," why alfajores, why Peru,
   how long the business has been running). This is a content gap right now
   — the current Wix site doesn't have real About copy indexed. **TODO:
   get 2-4 paragraphs of actual story from mom**, or record a voice note and
   I'll help turn it into copy.
3. **Menu** — product list with descriptions. **TODO: real menu items,
   sizes, and prices** — the current site doesn't list these publicly, so
   this needs to come from your mom directly. Until then, use placeholder
   structure (Alfajores — Original / Chocolate-Dipped / Anise, sold by the
   dozen; Flan; Tres Leches; Pionono; etc.) so the layout is ready to fill in.
4. **Gallery** — photo grid, pulls from the broader photo library (weddings,
   holidays, graduations, everyday orders). This doubles as informal social
   proof ("look what we've made for events like yours").
5. **Contact/Order (footer, all pages)** — email, phone, service area
   (Springfield / Herndon / Northern VA), Instagram link, and the primary
   "Order on Square" button.

**Optional 6th section, worth a decision:** "Special Events / Custom Orders."
The old site had a dedicated Special Events page, and the photo library is
full of wedding/graduation/holiday catering shots. If custom/catering orders
are a real revenue stream (not just occasional), this deserves its own page
rather than being buried in About. Flag for you and your mom to decide.

## 4. Commerce: Square (hybrid approach)

Per the direction you picked: this site does **not** build its own checkout,
accounts, or login system. Instead:

- Set up a **Square Online** store (free tier works for a business this
  size) with the menu items, and turn on **Square Loyalty** for the
  points/rewards program you described (McDonald's-app style).
- Square accounts handle customer login and repeat-order history — you don't
  build or maintain any of that.
- The custom site links or embeds to the Square store's checkout for
  ordering, and can pull the Square "Buy Button" embed code directly into
  the Menu page so people can order without leaving the site.
- **TODO:** confirm whether Gorda's Goodies already has a Square account, or
  if this needs to be created from scratch (needs mom's business info: EIN
  or SSN for payouts, bank account for deposits).

## 5. Tech stack

- **Plain HTML/CSS/JS.** No React/Next.js — there's no client-side state or
  dynamic data this site needs to manage; Square owns the transactional
  complexity. Plain HTML is faster to build, free to host, and trivially
  easy for Claude Code to generate/edit correctly.
- **Hosting:** static hosting — GitHub Pages, Netlify, or Vercel's static
  tier all work and are free at this scale.
- **Images:** the source photos are large (some 1-3MB+ straight off a phone).
  Before going live, compress/resize for web (aim for ~150-400KB per photo,
  responsive `srcset` for the hero image). Claude Code can script this with
  a tool like `sharp` (Node) or `Pillow` (Python) — don't skip this step,
  unoptimized images are the #1 cause of slow small-business sites.

## 6. Assets on hand

Located in `/assets/` (staged from the "Baby Shower" folder — actually the
mom's full photo/branding archive, not baby-shower-specific):

- `Final_Original_GordasGoodies.png` — logo, use as-is for the header/favicon
  source (generate a favicon from it).
- Starter photo set (19 images) — a first-pass curated selection for
  Home/Menu/Gallery: assorted trays, close-ups showing the dulce de leche
  filling, gift box shots, and a couple of lifestyle/outdoor shots.

**Note:** the full archive has 200+ additional photos organized by occasion
(weddings, holidays, graduations, sports teams) and by other products (flan,
tres leches, pionono, crumb cake, rice pudding). Only pull more in if the
Gallery or a future Special Events page needs them — no reason to stage all
200+ into this repo.

## 7. Open questions before/while building

- Real menu items, sizes, and prices (from mom)
- About/story copy (from mom)
- Whether "Special Events/Catering" is its own page
- Square account status (existing vs. new)
- Any brand guide beyond the logo file
