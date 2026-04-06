# Vitesse Eco - Complete Project Plan & Todo List
# خطة المشروع الكاملة مع كل الخطوات

> **How to continue in a new Claude session:**
> 1. Open Claude Code in `d:\vitesse-eco`
> 2. Say: "Read CLAUDE.md and PROJECT_PLAN.md then continue building the website from where we stopped"
> 3. Claude will read both files and know EXACTLY what was done and what's next
>
> **How to track progress:**
> - [x] = Done
> - [ ] = Not done yet
> - Look for the FIRST unchecked [ ] item — that's where to continue
>
> **Important rules for Claude:**
> - Always answer in Arabic
> - Website content in French
> - Do NOT upgrade to Nuxt 4 (IPC bug on Windows)
> - Update this file after completing each task (check the box)

---

## PHASE 0: Foundation ⚡ [IN PROGRESS]
> تأسيس المشروع الأساسي

### ✅ Completed
- [x] Initialize Nuxt 3 project
- [x] Install all core dependencies (Tailwind, i18n, Pinia, Sanity, Icon, Image, Fonts)
- [x] Configure nuxt.config.ts with all modules
- [x] Configure tailwind.config.ts with brand colors (primary, accent, gold)
- [x] Create main.css with custom Tailwind classes (btn-primary, card, badge, etc.)
- [x] Create all 4 translation files (fr.json, es.json, nl.json, de.json) with full UI strings
- [x] Create default layout with AppHeader + AppFooter
- [x] Create AppHeader with navigation, cart icon, language switcher, mobile menu
- [x] Create AppFooter with brand info, quick links, legal links, newsletter form
- [x] Create LanguageSwitcher dropdown component
- [x] Create CartDrawer slide-out component (empty state)
- [x] Create language check script (scripts/check-languages.mjs) — validates keys, detects language mixing, checks for untranslated values
- [x] Run language check: ALL 146 keys pass across 4 locales
- [x] Create Homepage (hero section, values, featured products placeholder, CTA)
- [x] Create Products listing page with filters (category, tire, price) and sort
- [x] Create Product detail page with gallery, specs, color picker, add-to-cart
- [x] Create About page
- [x] Create Contact page with form
- [x] Copy brand assets (logo.png, poster.jpeg) to public/
- [x] Create .env.example
- [x] Fix Nuxt 4 → Nuxt 3 downgrade (Windows IPC bug)

### 🔲 Remaining Phase 0 Tasks
- [ ] **Initialize Sanity CMS project:**
  ```bash
  cd d:/vitesse-eco
  mkdir cms && cd cms
  npm create sanity@latest -- --project-id YOUR_ID --dataset production --template clean
  ```
  Then add SANITY_PROJECT_ID to .env file

- [ ] **Initialize Git repository:**
  ```bash
  cd d:/vitesse-eco
  git init
  git add .
  git commit -m "Initial project setup: Nuxt 3 + Tailwind + i18n + Sanity"
  ```

- [ ] **Connect to GitHub:**
  ```bash
  gh repo create vitesse-eco --public --source=. --push
  ```

- [ ] **Deploy to Vercel:**
  ```bash
  npx vercel --yes
  ```
  Then connect custom domain vitesse-eco.com in Vercel dashboard

- [ ] **Verify deployment:** Site loads on Vercel with all pages

---

## PHASE 1: Catalogue Site — FIRST LAUNCH 🚀
> موقع الكتالوج - الإطلاق الأول

### 1.1 Sanity Schemas (create in cms/schemas/)
- [ ] Create `cms/schemas/objects/localizedString.ts` — { fr, es, nl, de } string fields
- [ ] Create `cms/schemas/objects/localizedText.ts` — { fr, es, nl, de } block/text fields
- [ ] Create `cms/schemas/objects/localizedSlug.ts` — localized URL slugs
- [ ] Create `cms/schemas/objects/seoFields.ts` — title, description, ogImage
- [ ] Create `cms/schemas/objects/colorVariant.ts`:
  - colorName (localizedString), colorHex (string), sku (string)
  - images (array of images), stock (number), priceOverride (number)
- [ ] Create `cms/schemas/documents/category.ts` — name, slug, description, image
- [ ] Create `cms/schemas/documents/brand.ts` — name, slug, logo, description
- [ ] Create `cms/schemas/documents/product.ts`:
  - name (localizedString), slug (localizedSlug), brand (ref), category (ref)
  - shortDescription (localizedString), description (localizedText)
  - mainImage, gallery (images array)
  - price (number EUR), compareAtPrice (number), isOnSale (boolean)
  - variants (array of colorVariant)
  - specifications: { motor, battery, tireSize, maxLoad, range, brakeType, weight, dimensions, maxSpeed, suspension, frame, chargeTime }
  - isAvailable, isFeatured, isNew, sortOrder
  - seo (seoFields), relatedProducts (refs)
- [ ] Create `cms/schemas/documents/testimonial.ts` — name, rating, text, photo
- [ ] Create `cms/schemas/singletons/siteSettings.ts` — logo, contact info, social links
- [ ] Create `cms/schemas/singletons/homePage.ts` — hero banner, values, featured title
- [ ] Create `cms/schemas/singletons/aboutPage.ts` — story, values content
- [ ] Create `cms/schemas/singletons/contactPage.ts` — address, phone, hours, map
- [ ] Create `cms/schemas/singletons/legalPages.ts` — mentions legales, privacy, CGV
- [ ] Create `cms/structure/deskStructure.ts` — organize Sanity Studio navigation
- [ ] Register all schemas in `cms/schemas/index.ts`
- [ ] Deploy Sanity Studio: `cd cms && npx sanity deploy`

### 1.2 Enter Content in Sanity
- [ ] Create categories: Urban, Off-Road, Pliable, Lady, Long Range
- [ ] Create brand: QMWHEEL (+ any other brands)
- [ ] Enter all 11 products with full specs, images, colors, prices
- [ ] Enter homepage content (hero title/subtitle/image, values, testimonials)
- [ ] Enter about page content
- [ ] Enter contact info
- [ ] Enter legal texts (mentions légales, privacy policy, CGV)

### 1.3 Connect Frontend to Sanity
- [ ] Create `app/composables/useSanityContent.ts` — helper to pick localized field based on current locale
- [ ] Update `app/pages/index.vue` — fetch homepage data + featured products from Sanity
- [ ] Update `app/pages/produits/index.vue` — fetch all products, implement real filtering/sorting
- [ ] Update `app/pages/produits/[slug].vue` — fetch single product by slug
- [ ] Update `app/pages/a-propos.vue` — fetch about page content
- [ ] Update `app/pages/contact.vue` — fetch contact info
- [ ] Create `app/pages/mentions-legales.vue` — fetch from Sanity
- [ ] Create `app/pages/politique-confidentialite.vue` — fetch from Sanity
- [ ] Create `app/pages/cgv.vue` — fetch from Sanity

### 1.4 SEO & Performance
- [ ] Add meta tags to all pages (title, description, og:image)
- [ ] Add JSON-LD structured data (Product schema) on product pages
- [ ] Configure sitemap generation
- [ ] Configure robots.txt
- [ ] Add favicon (use logo.png)
- [ ] Create 404 error page
- [ ] Create 500 error page
- [ ] Lazy load images with @nuxt/image
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Test Google Translate compatibility (semantic HTML, lang attribute)

### 1.5 Deploy Phase 1
- [ ] Git commit and push
- [ ] Verify Vercel auto-deployment
- [ ] Test all pages on production URL
- [ ] **🎉 SITE IS LIVE AS CATALOGUE!**

---

## PHASE 2: Shopping Cart & User Accounts 🛒
> سلة المشتريات وحسابات المستخدمين

### 2.1 Cart System
- [ ] Create `app/stores/cart.ts` — Pinia store:
  ```ts
  // Items: { productId, variantSku, quantity, snapshotPrice, snapshotName, snapshotImage, colorName }
  // Actions: addItem, removeItem, updateQuantity, clearCart, getTotal, getCount
  // Persist to localStorage with pinia-plugin-persistedstate
  ```
- [ ] Create `app/plugins/cart-init.client.ts` — hydrate cart from localStorage on client
- [ ] Update `app/components/global/CartDrawer.vue` — show real cart items, quantities, total
- [ ] Create `app/components/cart/CartItem.vue` — single cart item with qty controls and remove
- [ ] Create `app/components/cart/CartSummary.vue` — subtotal, shipping, total display
- [ ] Create `app/pages/panier.vue` — full cart page with all items and checkout CTA
- [ ] Update `app/pages/produits/[slug].vue` — wire "Add to cart" button to Pinia store
- [ ] Update `app/components/global/AppHeader.vue` — connect cart badge count to store

### 2.2 Database Setup
- [ ] Create Neon Postgres database at neon.tech
- [ ] Install: `npm install drizzle-orm @neondatabase/serverless`
- [ ] Install dev: `npm install -D drizzle-kit`
- [ ] Create `server/database/schema.ts`:
  ```ts
  // customers: id, email, passwordHash, firstName, lastName, phone, defaultShippingAddress, timestamps
  // orders: id, orderNumber (VE-YYYYMMDD-NNN), customerId, status, items (jsonb), subtotal, discount, shipping, total, stripePaymentIntentId, trackingNumber, timestamps
  // sessions: id, customerId, expiresAt
  ```
- [ ] Create `drizzle.config.ts`
- [ ] Run migrations: `npx drizzle-kit push`
- [ ] Create `server/database/index.ts` — DB connection utility
- [ ] Add DATABASE_URL to .env and Vercel env vars

### 2.3 Authentication
- [ ] Install: `npm install nuxt-auth-utils bcryptjs`
- [ ] Add `nuxt-auth-utils` to nuxt.config.ts modules
- [ ] Create `server/api/auth/register.post.ts` — email + password registration
- [ ] Create `server/api/auth/login.post.ts` — email + password login
- [ ] Create `server/api/auth/logout.post.ts` — clear session
- [ ] Create `server/api/auth/me.get.ts` — get current user
- [ ] Create `app/stores/auth.ts` — Pinia auth store (user state, login/logout actions)
- [ ] Create `app/middleware/auth.ts` — redirect to login if not authenticated
- [ ] Create `app/middleware/guest.ts` — redirect to account if already logged in

### 2.4 Auth & Account Pages
- [ ] Create `app/pages/connexion.vue` — login form
- [ ] Create `app/pages/inscription.vue` — registration form
- [ ] Create `app/layouts/account.vue` — account layout with sidebar nav
- [ ] Create `app/pages/compte/index.vue` — account dashboard
- [ ] Create `app/pages/compte/profil.vue` — edit profile (name, email, phone, address)
- [ ] Create `app/pages/compte/commandes.vue` — order history (empty for now)
- [ ] Update AppHeader — show user name/icon when logged in, logout button

### 2.5 Deploy Phase 2
- [ ] Git commit and push
- [ ] Test cart persistence (add items → close browser → reopen)
- [ ] Test auth flow (register → login → view profile → logout)

---

## PHASE 3: Checkout & Payments 💳
> نظام الدفع والشراء

### 3.1 Promo Codes
- [ ] Create `cms/schemas/documents/promoCode.ts` in Sanity:
  - code, discountType (percentage/fixed), discountValue
  - minOrderAmount, maxUses, currentUses, validFrom, validUntil, isActive
  - applicableProducts (refs, optional)
- [ ] Create `server/api/promo/validate.post.ts` — validate promo code server-side
- [ ] Create `app/components/cart/PromoCodeInput.vue` — input field + apply button
- [ ] Wire promo to cart store (store discount amount)

### 3.2 Checkout Flow
- [ ] Create `app/layouts/checkout.vue` — minimal layout (logo + steps, no full nav)
- [ ] Create `app/components/checkout/CheckoutSteps.vue` — step indicator (shipping → payment → review)
- [ ] Create `app/components/checkout/ShippingForm.vue` — address form (French format)
- [ ] Create `app/components/checkout/PaymentForm.vue` — Stripe Payment Element
- [ ] Create `app/components/checkout/OrderReview.vue` — final summary before payment
- [ ] Create `app/pages/checkout/index.vue` — multi-step checkout page
- [ ] Create `app/pages/checkout/confirmation.vue` — order confirmation with order number
- [ ] Create `app/composables/useCheckout.ts` — checkout state management
- [ ] Create `server/api/cart/validate.post.ts` — re-validate cart prices against Sanity before payment

### 3.3 Stripe Integration
- [ ] Install: `npm install stripe @stripe/stripe-js`
- [ ] Create Stripe account, get keys (test mode first)
- [ ] Create `server/utils/stripe.ts` — Stripe server client
- [ ] Create `server/api/checkout/create-payment-intent.post.ts`:
  - Validate cart server-side (re-fetch prices from Sanity)
  - Apply promo code discount
  - Create Stripe PaymentIntent with total
  - Return clientSecret
- [ ] Create `server/api/webhook/stripe.post.ts`:
  - Verify webhook signature
  - Handle `payment_intent.succeeded`:
    1. Create order in Postgres
    2. Sync order to Sanity (for owner dashboard)
    3. Decrement stock in Sanity (mutate variant stock)
    4. Send confirmation email
  - Handle `payment_intent.payment_failed`: log error
- [ ] Configure Stripe webhook URL in Stripe dashboard
- [ ] Add all Stripe keys to .env and Vercel env vars
- [ ] Configure payment methods: Cards, Apple Pay, Google Pay, iDEAL (NL), Bancontact (BE)

### 3.4 Email Notifications
- [ ] Install: `npm install resend`
- [ ] Create Resend account, get API key
- [ ] Create `server/utils/email.ts` — Resend client + email templates
- [ ] Create order confirmation email template (HTML, localized)
- [ ] Create `server/api/contact/send.post.ts` — contact form email handler
- [ ] Wire contact page form to API endpoint

### 3.5 Order Management
- [ ] Create `server/api/checkout/confirm-order.post.ts` — create order in DB after payment
- [ ] Create `server/api/orders/index.get.ts` — list user's orders
- [ ] Create `server/api/orders/[id].get.ts` — get single order detail
- [ ] Create `app/pages/compte/commandes/[id].vue` — order detail page
- [ ] Update `app/pages/compte/commandes.vue` — show real orders
- [ ] Generate order numbers: `VE-YYYYMMDD-NNN`

### 3.6 Deploy Phase 3
- [ ] Test full purchase flow with Stripe test cards (4242 4242 4242 4242)
- [ ] Test webhook receives payment confirmation
- [ ] Test order appears in user account
- [ ] Test confirmation email arrives
- [ ] Git commit and push

---

## PHASE 4: Stock, Orders & Discounts Management 📦
> إدارة المخزون والطلبات والتخفيضات

### 4.1 Stock Management
- [ ] Add stock decrement logic in Stripe webhook (Sanity mutation API)
- [ ] Update product detail page — show "Out of stock" when variant stock = 0
- [ ] Add "Low stock" indicator (e.g., "Plus que 2 en stock !")
- [ ] Prevent add-to-cart for out-of-stock variants (disable button)
- [ ] Add stock validation during checkout (before creating PaymentIntent)
- [ ] Handle race condition: if stock runs out between cart and payment

### 4.2 Sanity Order Dashboard
- [ ] Create `cms/schemas/documents/order.ts` in Sanity (read-only, synced from server):
  - orderNumber, status, customer info, items, totals, dates
- [ ] Create `cms/plugins/orderDashboard.tsx` — custom order list view in Sanity Studio
- [ ] Add order status update capability (owner can change: processing → shipped → delivered)
- [ ] When status changes to "shipped" → trigger shipping email with tracking number
- [ ] Add order filtering by status, date, customer name

### 4.3 Discount & Sale UI
- [ ] Show compare-at-price with strikethrough on product cards and detail
- [ ] Show discount percentage badge (e.g., "-20%")
- [ ] Add "PROMO" badge on discounted product cards
- [ ] Add "NOUVEAU" badge on new products
- [ ] Add "SOLDE" badge on sale products
- [ ] Create Sanity interface for managing promo codes (create/edit/deactivate)

### 4.4 Shipping Notification Emails
- [ ] Create shipping notification email template
- [ ] Include tracking number and tracking link
- [ ] Trigger email when order status changes to "shipped"
- [ ] Create welcome email template (sent on registration)

### 4.5 Deploy Phase 4
- [ ] Test stock decrements after purchase
- [ ] Test out-of-stock blocking
- [ ] Test order status changes in Sanity trigger emails
- [ ] Git commit and push

---

## PHASE 5: Blog, Translations & CMS Guide 📚
> المدونة والترجمات ودليل الاستخدام

### 5.1 Blog System
- [ ] Create `cms/schemas/documents/blogPost.ts`:
  - title (localizedString), slug, author, publishDate
  - content (localized portable text), coverImage, category, tags
  - seo (seoFields)
- [ ] Create `app/components/blog/BlogCard.vue`
- [ ] Create `app/components/blog/BlogContent.vue` — portable text renderer
- [ ] Create `app/pages/blog/index.vue` — blog listing
- [ ] Create `app/pages/blog/[slug].vue` — blog post detail
- [ ] Add blog link to navigation

### 5.2 Complete Translations
- [ ] Review and complete all ES translations for Sanity content
- [ ] Review and complete all NL translations for Sanity content
- [ ] Review and complete all DE translations for Sanity content
- [ ] Test full user journey in each language (FR, ES, NL, DE)
- [ ] Verify browser language auto-detection works correctly

### 5.3 Create CMS User Guide (for owner)
- [ ] Write guide: "How to add a new product" (with screenshots)
  - Go to Sanity Studio → Products → Create new
  - Fill name (all languages), slug, select brand & category
  - Upload main image + gallery photos (drag & drop)
  - Set price, compare-at-price if on sale
  - Add color variants with photos and stock quantities
  - Fill specifications table
  - Save and publish
- [ ] Write guide: "How to edit product details & prices"
- [ ] Write guide: "How to upload and manage photos"
- [ ] Write guide: "How to manage stock levels"
- [ ] Write guide: "How to create and manage promo codes"
- [ ] Write guide: "How to view and process orders"
- [ ] Write guide: "How to update homepage content"
- [ ] Write guide: "How to edit about/contact/legal pages"
- [ ] Write guide: "How to add blog posts"
- [ ] Compile all guides into single PDF or web page

### 5.4 Final QA & Testing
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge
- [ ] Mobile testing: iOS Safari, Android Chrome
- [ ] Lighthouse audit — target 90+ on all scores (Performance, Accessibility, SEO, Best Practices)
- [ ] Accessibility audit: keyboard navigation, screen reader, color contrast
- [ ] Security review: CSP headers, rate limiting on auth endpoints, input sanitization
- [ ] GDPR compliance: cookie consent banner, privacy policy, data handling
- [ ] Test all payment methods work in production (Stripe live mode)
- [ ] Performance: check image loading times, LCP, CLS metrics

### 5.5 Production Launch
- [ ] Switch Stripe to live mode
- [ ] Set all production env vars in Vercel
- [ ] Connect custom domain vitesse-eco.com
- [ ] Set up SSL certificate (auto via Vercel)
- [ ] Final deployment
- [ ] **🎉 FULL STORE IS LIVE!**

---

## PHASE 6 (Future): AI Features 🤖
> الذكاء الاصطناعي

- [ ] Install Claude/OpenAI SDK
- [ ] Create AI chatbot floating widget component
- [ ] Train chatbot on product catalogue data
- [ ] Implement product recommendation engine based on browsing
- [ ] Create automated Q&A system for customer queries
- [ ] AI-powered auto-selling assistant

---

## Environment Variables Needed
```env
# Sanity CMS (get from sanity.io dashboard)
SANITY_PROJECT_ID=xxxx
SANITY_DATASET=production
SANITY_TOKEN=xxxx          # Write token for order sync

# Stripe (get from stripe.com dashboard)
STRIPE_SECRET_KEY=sk_test_xxxx
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

# Database (get from neon.tech dashboard)
DATABASE_URL=postgresql://xxxx

# Email (get from resend.com dashboard)
RESEND_API_KEY=re_xxxx

# Auth
AUTH_SECRET=random-32-char-string

# Site
NUXT_PUBLIC_SITE_URL=https://vitesse-eco.com
```

## How to Continue in New Session
1. Tell Claude: "Continue building Vitesse Eco website. Read CLAUDE.md and PROJECT_PLAN.md"
2. Claude will read the files and know exactly where we stopped
3. Check the todo list for next uncompleted task
4. Continue from there

## Quick Progress Tracker
| Phase | Description | Status | Tasks Done | Tasks Total |
|-------|-------------|--------|------------|-------------|
| 0 | Foundation (Nuxt + Tailwind + i18n) | 🟡 Almost done | 24/29 | 29 |
| 1 | Catalogue site (Sanity + pages + SEO) | ⬜ Not started | 0/35 | 35 |
| 2 | Cart + Accounts (Pinia + DB + Auth) | ⬜ Not started | 0/26 | 26 |
| 3 | Checkout + Payments (Stripe) | ⬜ Not started | 0/25 | 25 |
| 4 | Stock + Orders + Discounts | ⬜ Not started | 0/20 | 20 |
| 5 | Blog + Translations + Guide + QA | ⬜ Not started | 0/25 | 25 |
| 6 | AI Features (future) | ⬜ Not started | 0/6 | 6 |
| **TOTAL** | | | **22/164** | **164** |

## Important Rules
- Always answer in Arabic
- Website content in French (main language)
- Owner is non-developer — CMS must be simple with full guide
- Design: luxury + sporty + eco-friendly (dark theme)
- Mobile-first responsive design
- Google Translate compatible (semantic HTML)
- **DO NOT upgrade to Nuxt 4** (Windows IPC bug)
- **MANDATORY: Run `npm run check:langs` before every commit** — must pass with 0 issues
- Update this file after completing each task
