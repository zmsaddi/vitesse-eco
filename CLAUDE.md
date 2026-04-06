# Vitesse Eco - Full Project Documentation
> This file + PROJECT_PLAN.md contain everything needed to continue this project in any session.
> Tell Claude: "Read d:\vitesse-eco\CLAUDE.md and d:\vitesse-eco\PROJECT_PLAN.md then continue"

## Project Overview
Professional e-commerce website for **Vitesse Eco** - French electric fatbike retailer.
- **Domain:** vitesse-eco.com (owned by user)
- **Contact:** contact@vitesse-eco.fr
- **Website URL:** www.vitesse-eco.com
- **Working directory:** `d:\vitesse-eco`
- **Original assets directory:** `d:\vitesse eco` (PDFs, original images)
- **Communication language with user:** Arabic only
- **Website content language:** French (primary) + Spanish, Dutch, German

## Current Status: Phase 0 - ALMOST COMPLETE
- **What works:** Nuxt dev server starts, all 5 pages return HTTP 200
- **What's left in Phase 0:** Sanity CMS init, Git init, GitHub push, Vercel deploy

### Verified Working (tested 2026-04-06):
- ✅ `npm run dev` starts without crashes (http://localhost:3000)
- ✅ Homepage (/) → 200
- ✅ Products page (/produits) → 200
- ✅ About page (/a-propos) → 200
- ✅ Contact page (/contact) → 200
- ✅ Tailwind CSS loading (found in HTML output)
- ✅ i18n module loaded (FR/ES/NL/DE)
- ✅ All 4 translation files complete

### Known Warnings (non-blocking):
- `@nuxtjs/sanity WARN No Sanity project found` → Expected, Sanity not initialized yet
- `Pre-transform error: #app-manifest` → Known Nuxt 3.21.x warning, does NOT affect functionality

## Tech Stack (Installed)
| Layer | Package | Installed Version |
|-------|---------|-------------------|
| Framework | nuxt | 3.21.2 (package.json says ^3.17.5) |
| CSS | @nuxtjs/tailwindcss | 6.14.0 |
| i18n | @nuxtjs/i18n | ^10.2.4 |
| State | @pinia/nuxt | ^0.11.3 |
| State persist | pinia-plugin-persistedstate | ^4.7.1 |
| CMS | @nuxtjs/sanity | ^2.3.0 |
| Icons | @nuxt/icon | ^1.15.0 (v1.x for Nuxt 3 compat) |
| Images | @nuxt/image | ^2.0.0 |
| Fonts | @nuxt/fonts | ^0.14.0 |
| Vue | vue | ^3.5.31 |
| Vue Router | vue-router | ^4.5.0 |

### NOT YET Installed (needed for future phases):
| Package | Phase | Purpose |
|---------|-------|---------|
| stripe + @stripe/stripe-js | Phase 3 | Payment processing |
| drizzle-orm + @neondatabase/serverless | Phase 2 | Database ORM |
| drizzle-kit | Phase 2 | DB migrations (dev dep) |
| nuxt-auth-utils + bcryptjs | Phase 2 | Authentication |
| resend | Phase 3 | Email notifications |
| sanity + @sanity/vision | Phase 0/1 | Sanity Studio (in cms/ folder) |
| zod | Phase 2 | Validation |

## CRITICAL: Known Issue - Nuxt 4 Does NOT Work
**Problem:** Nuxt 4.4.x has IPC connection bug on Windows + Node 22.20.0
**Error:** `Error: IPC connection closed` at vite-node.mjs:140 - crashes on every HTTP request
**Solution:** Use Nuxt 3.x (currently 3.21.2) - works perfectly
**DO NOT upgrade to Nuxt 4 until this Windows bug is fixed upstream**

## Commands
```bash
cd d:/vitesse-eco
npm run dev          # Start dev server → http://localhost:3000
npm run build        # Build for production
npm run generate     # Generate static site
npm run preview      # Preview production build
npm run check:langs  # ⚡ MANDATORY: Run language & spell check (must pass before every commit)
npm run check:all    # Same as check:langs (will include more checks later)
```

## MANDATORY RULE: Language Check Before Every Step
**Every time you modify translation files or add new UI text:**
1. Run `npm run check:langs`
2. It must show `🎉 ALL CHECKS PASSED!`
3. If it fails, fix the issues BEFORE continuing
4. This applies to ALL phases, not just translation work

**What the check validates:**
- All 4 locale files (FR/ES/NL/DE) have identical keys (no missing translations)
- No empty or placeholder values
- Language detection: ensures French text isn't in German file, etc.
- Duplicate detection: ensures values aren't just copied from French without translating

## Brand Identity
| Element | Value |
|---------|-------|
| Logo | Golden deer head with gear (public/logo.png) |
| Primary color (dark navy) | #0A1628 |
| Secondary dark | #1E293B |
| Accent green (buttons) | #4ADE80 |
| Gold (luxury details) | #D4A843 |
| Text primary | #FFFFFF |
| Text secondary | #94A3B8 |
| Body font | Inter |
| Heading font | Montserrat |
| Style | Luxury + sporty + eco-friendly |

## Complete File Inventory (what exists now)
```
d:/vitesse-eco/
├── CLAUDE.md                              ← THIS FILE (project docs)
├── PROJECT_PLAN.md                        ← Full step-by-step plan with checkboxes
├── .env.example                           ← All env vars needed
├── .gitignore                             ← Standard Nuxt gitignore
├── nuxt.config.ts                         ← All modules + i18n + sanity + fonts + vite config
├── tailwind.config.ts                     ← Brand colors + fonts
├── tsconfig.json                          ← TypeScript config
├── package.json                           ← All dependencies
├── package-lock.json                      ← Lock file
│
├── scripts/
│   └── check-languages.mjs               ← MANDATORY: Language validation script (run before every commit)
│
├── app/
│   ├── app.vue                            ← Root component (NuxtLayout + NuxtPage)
│   ├── assets/css/main.css                ← Tailwind directives + custom classes (btn-primary, card, badge, input-field, etc.)
│   ├── components/global/
│   │   ├── AppHeader.vue                  ← Sticky header: logo, nav links, cart icon with badge, user icon, mobile menu, language switcher
│   │   ├── AppFooter.vue                  ← Footer: brand, quick links, legal links, newsletter, social icons, payment icons
│   │   ├── LanguageSwitcher.vue           ← Dropdown to switch FR/ES/NL/DE with auto-close on click outside
│   │   └── CartDrawer.vue                 ← Slide-out cart panel (currently shows empty state only)
│   ├── layouts/
│   │   └── default.vue                    ← AppHeader + slot + AppFooter
│   └── pages/
│       ├── index.vue                      ← Homepage: hero with poster.jpeg background, brand values grid, featured products (3 placeholder cards), CTA section
│       ├── produits/
│       │   ├── index.vue                  ← Products listing: sidebar filters (category, tire, price), sort dropdown, grid/list toggle, 11 placeholder product cards with colors
│       │   └── [slug].vue                 ← Product detail: breadcrumb, image gallery placeholder, specs table, color picker, quantity selector, add-to-cart button, description, related products
│       ├── a-propos.vue                   ← About: story section with poster.jpeg, 3 value cards (quality, delivery, SAV)
│       └── contact.vue                    ← Contact: info cards (email, web, hours), contact form (name, email, subject, message)
│
├── i18n/locales/
│   ├── fr.json                            ← French: ALL keys translated (nav, home, products, product, cart, checkout, account, auth, about, contact, footer, common)
│   ├── es.json                            ← Spanish: ALL keys translated
│   ├── nl.json                            ← Dutch: ALL keys translated
│   └── de.json                            ← German: ALL keys translated
│
├── public/
│   ├── logo.png                           ← Golden deer + gear logo (277 KB)
│   └── poster.jpeg                        ← Fatbike promotional poster (151 KB)
│
├── server/                                ← Empty directories created, ready for API routes
│   ├── api/auth/
│   ├── api/cart/
│   ├── api/checkout/
│   ├── api/orders/
│   ├── api/promo/
│   ├── api/webhook/
│   ├── api/contact/
│   ├── database/
│   └── utils/
│
├── app/components/                        ← Empty directories created, ready for components
│   ├── home/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── account/
│   └── blog/
│
├── app/composables/                       ← Empty, ready for composables
├── app/middleware/                         ← Empty, ready for auth middleware
├── app/plugins/                           ← Empty, ready for plugins
├── app/stores/                            ← Empty, ready for Pinia stores
│
└── node_modules/                          ← Installed (1285 packages)
```

## Products from Catalogue (QMWHEEL - Shenzhen Qingmai Bicycle Co.)
Manufacturer: China factory + Poland EU factory + EU warehouse
All models: 250W motor, hydraulic brakes

| # | Model | Tire | Battery | Range | Key Feature | Colors |
|---|-------|------|---------|-------|-------------|--------|
| 1 | V20Mini | 16" | 36V 13AH | 30-40km | For teenagers | Rose gold, Purple, Black, Green, Nardo Grey |
| 2 | V20Pro | 20" | 48V 15.6AH | 40-50km | Bestseller, expand seats, double suspension | Black, Nardo gray, Dark gray |
| 3 | V20Limited | 20" | 48V 18.2AH | 50-60km | Long seat, upgrade back suspension | Black, Nardo gray, Dark gray, Brown |
| 4 | S20Pro | 20" | 48V 18.2AH | 50-60km | Unique design seat | Black, Nardo gray, Dark gray |
| 5 | V20Cross | 70/100-17" | 48V 22AH | 60-70km | Most advanced offroad + bluetooth speaker | - |
| 6 | Q30 | 20" | 48V 15.6AH | 40-50km | FOLDABLE, adjustable seat & handlebar | Black, Nardo gray, White |
| 7 | D50 | 20" | 48V 18.2AH | 50-60km | Lady friendly, removable saddle | Black, Green, Beige, Dark gray, Purple |
| 8 | C28 | 20" | 48V 15.6AH | 40-50km | Lady friendly, removable saddle | Black, Rose gold, Green, Purple |
| 9 | EB30 | 20" | 15.6AH×2 | 90-100km | Dual batteries, dual suspension, basket | - |
| 10 | V20Max | 24" | 48V 18.2AH | 50-60km | For riders taller than 175cm | - |
| 11 | V20Limited Pro | 20" | 48V 15.6AH×2 | 100km | Double battery, super long range | - |

**Note:** Owner also has products from OTHER brands not in this catalogue.

## nuxt.config.ts Key Settings
- `compatibilityDate: '2024-11-01'` (Nuxt 3 mode)
- Vite IPC workaround: `viteNode.maxRetryAttempts: 8`
- Tailwind: `cssPath: ['~/assets/css/main.css', { injectPosition: 'first' }]`
- i18n: `strategy: 'prefix_except_default'`, FR default, browser auto-detect enabled
- Sanity: projectId from env var (not set yet)
- Fonts: Inter + Montserrat from Google
- RuntimeConfig: all Stripe/Resend/DB/Auth keys mapped to env vars

## Environment Variables (.env.example)
```
SANITY_PROJECT_ID=        ← Get from sanity.io after creating project
SANITY_DATASET=production
SANITY_TOKEN=             ← Write token for order sync
STRIPE_SECRET_KEY=        ← Get from stripe.com dashboard
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
DATABASE_URL=             ← Get from neon.tech after creating DB
RESEND_API_KEY=           ← Get from resend.com
AUTH_SECRET=              ← Generate random 32-char string
NUXT_PUBLIC_SITE_URL=https://vitesse-eco.com
```
