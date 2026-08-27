# Gorda's Goodies — Website Project Brief

This file is the working spec for the Gorda's Goodies website. It's meant to be
read by Claude Code (drop this whole project folder into VS Code, `cd` into it,
run `claude`) as persistent project context, and by Sam as the plan of record.
Update it as decisions change — it's the source of truth, not a one-time doc.

## 1. The business

- **Name:** Gorda's Goodies LLC
- **What it sells:** Handmade desserts, primarily **alfajores** — a Peruvian
  shortbread cookie sandwich filled with dulce de leche (manjar blanco), sold
  by the box of 6 ($8.50). Also makes Crumb Cake ($7 + tax, 2 slices) and
  Sticky Toffee Cupcakes ($8 + tax, each), and does custom/catering orders
  for events.
- **Tagline (from current site):** "Signature sweets... Peruvian Alfajores...
  ¡qué rico!"
- **Location:** Springfield, VA. Serves Northern Virginia (Herndon is no
  longer a service area as of 2026 — removed from the site per owner).
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
   a clear "Order Now" call-to-action, short teaser of the story, nav into
   About/Menu/Events/Gallery. **Done.**
2. **About** — the story (who's the "Gorda," why alfajores, why Peru,
   how long the business has been running). **Done** — pulled verbatim from
   the old Wix About Us page: Vision/Mission statement, the "Gorda's"
   nickname story, and founder Elsie Hasting's bio (born Callao, Peru;
   raised in DC/Northern VA; started the business after a Dec. 2021 family
   health crisis led her to rework traditional recipes).
3. **Menu** — product list with descriptions. **Done** — real items and
   prices from the owner: Alfajores (box of 6, $8.50, flavors Original/
   Chocolate-Dipped/Anise + seasonal Pumpkin Spice), Crumb Cake ($7 + tax,
   2 slices), Sticky Toffee Cupcake ($8 + tax, each). Flan/Tres Leches/
   Pionono/Rice Pudding were placeholder guesses from an earlier pass and
   have been removed — not actually on the menu.
4. **Gallery** — photo grid, pulls from the broader photo library (weddings,
   holidays, graduations, everyday orders). This doubles as informal social
   proof ("look what we've made for events like yours"). **Done.**
5. **Contact/Order (footer, all pages)** — email, phone, service area
   (Springfield / Northern VA), Instagram link, Venmo/Zelle payment info,
   and "Order Now" CTA. **Done**, except the Venmo handle is a placeholder
   pending confirmation (see §7).
6. **Events** — "Events & Custom Orders" is its own page (decided: yes, it's
   a real revenue stream). Built from the old Special Events page copy:
   birthdays, quinceañeras, sweet sixteens, cultural/patriotic events,
   Mother's/Father's Day, graduations, holidays, religious events, baby/
   bridal showers, corporate functions, dinner parties. Orders need 48
   hours' advance notice (per the old Contact/Order page). **Done.**

## 4. Commerce: Venmo / Zelle (decided, for now)

Square is **not** being used at this stage — the business isn't at the
volume where a full online store pays for itself yet, and Square/Loyalty
adds setup overhead (EIN/SSN, bank linking) that isn't worth it yet. Instead:

- The site lists **Venmo and Zelle** as accepted payment methods (footer on
  every page, and a note on the Menu page). Orders are still arranged
  manually by phone/email/Instagram DM, then paid via Venmo or Zelle.
- **TODO:** the Venmo handle on the site (`@GordasGoodiesLLC`) is a
  placeholder — confirm the real handle with mom. This is intentionally the
  last thing to lock in.
- Revisit Square later if manual order tracking becomes a bottleneck, or if
  self-serve "add to cart and pay" ordering becomes worth the setup cost.

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

- ~~Real menu items, sizes, and prices~~ — done, see §3.
- ~~About/story copy~~ — done, see §3.
- ~~Whether "Special Events/Catering" is its own page~~ — yes, done, see §3.
- ~~Square account status~~ — not using Square for now; Venmo/Zelle instead,
  see §4.
- **Venmo handle** — still a placeholder (`@GordasGoodiesLLC`) pending
  confirmation from mom. Last open item.
- Any brand guide beyond the logo file (unresolved, low priority)
