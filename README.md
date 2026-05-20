# briroshay.com

Portfolio website for Bri Roshay — paintings and sculptures.

**Stack:** Astro 5 (static) + Sanity Studio (content) + Cloudflare Pages (hosting), with Tailwind v4 for styling and React available for any interactive components.

## Repo layout

```
briroshay-portfolio/
├── src/                  # Astro site
│   ├── components/       # Header, Footer, ArtworkCard, LanguageSwitcher
│   ├── i18n/             # en.json, fr.json, helpers
│   ├── layouts/          # BaseLayout (SEO, hreflang, OG)
│   ├── lib/              # Sanity client, GROQ queries, types
│   ├── pages/            # English routes at /, French at /fr/
│   └── styles/           # global.css (Tailwind + design tokens)
├── studio/               # Sanity Studio (mom's CMS)
│   ├── schemas/          # artwork + localised field types
│   └── sanity.config.ts
├── astro.config.mjs
├── package.json          # the Astro site's deps
└── studio/package.json   # the Studio's deps (separate install)
```

The Astro site and the Sanity Studio live in the same git repo but are independent npm packages with separate `node_modules`. The site reads published content from Sanity's CDN at build time.

## First-time setup (what Matt needs to do)

These are the steps I couldn't do for you because they need browser logins or interactive prompts.

### 1. Install dependencies

```bash
cd /Users/mattroshay/code/roshaym/briroshay-portfolio
npm install
npm --prefix studio install
```

### 2. Create a Sanity project

```bash
cd studio
npx sanity@latest init --env
```

Follow the prompts:
- **Create new project**: yes — name it "briroshay" or similar
- **Use the default dataset configuration**: yes (`production`, public)
- **Project output path**: just press enter (we're already in `/studio`)
- **Add the suggested config files**: **say NO** when it asks to overwrite `sanity.config.ts` and `sanity.cli.ts` — we have our own

After init, copy the generated `.env` values from `studio/.env` into the **site's** `.env` (one level up):

```bash
# /briroshay-portfolio/.env (create this — it's git-ignored)
PUBLIC_SANITY_PROJECT_ID=<your project id from studio/.env>
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-01-01
```

### 3. Run everything locally

In two terminal tabs:

```bash
# tab 1: the website (http://localhost:4321)
npm run dev

# tab 2: Sanity Studio (http://localhost:3333)
npm run studio:dev
```

You won't see any artwork on the site until you've added some in the Studio.

### 4. Deploy the Studio for mom

So mom can use the Studio from her phone, deploy it to Sanity's hosting:

```bash
npm --prefix studio run deploy
```

Pick a hostname like `briroshay` → her Studio lives at `https://briroshay.sanity.studio`. Send her that URL plus a Sanity login invite from sanity.io/manage.

### 5. Push to GitHub & deploy

```bash
git remote add origin https://github.com/mattroshay/briroshay-portfolio.git
git push -u origin main
```

Then in Cloudflare:
1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Authorise GitHub, pick `mattroshay/briroshay-portfolio`
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: paste your `.env` values (`PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`, `PUBLIC_SANITY_API_VERSION`)
4. Deploy → wait ~1 min → you'll get a `briroshay-portfolio.pages.dev` URL

### 6. Point briroshay.com at it

In Namecheap → Domain List → briroshay.com → Manage → Nameservers → "Custom DNS" → paste the two Cloudflare nameservers (Cloudflare shows them when you add the domain in Cloudflare dashboard → Add a site).

Then in Cloudflare Pages project settings → Custom domains → add `briroshay.com` and `www.briroshay.com`.

### 7. Rebuild on Sanity publish

So mom's publishes go live without you doing anything:

1. Cloudflare Pages → your project → Settings → Builds & deployments → Deploy hooks → Create deploy hook → copy the URL
2. Sanity dashboard → API → Webhooks → Create webhook → paste the Cloudflare URL → dataset: `production` → trigger on Create/Update/Delete

After this: mom publishes in Studio → Sanity fires the webhook → Cloudflare rebuilds → live in ~1 minute.

## Day-to-day commands

```bash
npm run dev              # site dev server
npm run build            # production build → dist/
npm run preview          # preview the production build
npm run check            # Astro + TypeScript checks
npm run studio:dev       # Sanity Studio locally
npm run studio:deploy    # publish Studio to *.sanity.studio
```

## Where things live (so future-you remembers)

| What | Where |
|---|---|
| Page routes | `src/pages/` (en) and `src/pages/fr/` (fr) |
| UI strings | `src/i18n/en.json`, `src/i18n/fr.json` |
| Content schema | `studio/schemas/artwork.ts` |
| Sanity client | `src/lib/sanity.ts` |
| GROQ queries | `src/lib/queries.ts` |
| Design tokens | `src/styles/global.css` (Tailwind v4 `@theme` block) |

## Next milestones (from PLAN.md)

- [ ] Phase 1: import the Facebook ZIP once mom has downloaded it (script to be added: `scripts/import-from-fb.ts`)
- [ ] Phase 2: sitemap + JSON-LD Person schema + OG images per piece
- [ ] Phase 3: Stripe/Mollie checkout

See `PLAN.md` (in the workspace folder) for the full plan and reasoning.
