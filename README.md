# Wazen Website

Next.js 15 website for Wazen, built with Sanity CMS, Tailwind CSS 4, and next-intl for internationalization.

## Stack

- **Framework:** Next.js 15.3.6 (App Router, standalone output)
- **CMS:** Sanity v3
- **Styling:** Tailwind CSS 4
- **i18n:** next-intl
- **Forms/Validation:** react-hook-form + zod
- **Animation:** motion (framer-motion)
- **AI:** ai + @ai-sdk/google
- **Email:** resend + react-email
- **Runtime:** Node.js, Docker

## Requirements

- Node.js (compatible with Next.js 15)
- npm
- Docker (optional, for container builds)

## Getting Started

### 1. Dev server

```bash
cp .env.example .env
npm install
npm run dev
```

### 2. Production build (standalone)

```bash
npm run build
cp -r .next/static .next/standalone/.next
cp -r public .next/standalone
node .next/standalone/server.js
```

### 3. Local Docker production build

```bash
docker build -t wazen/site:local .
docker run --rm -p 3000:3000 --env-file .env --name wazen-site wazen/site:local
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Lint with `next lint` |
| `npm run type-check` | TypeScript check (watch mode) |
| `npm run analyze` | Bundle analysis (browser + server) |
| `npm run analyze:server` | Server bundle analysis |
| `npm run analyze:browser` | Browser bundle analysis |
| `npm run sanity dev` | Start Sanity Studio locally |
| `npm run sanity deploy` | Deploy Sanity Studio |
| `npm run typegen` | Extract Sanity schema and generate types |

## Utilities

Convert JSON arrays to NDJSON with `jq`:

```bash
jq -c '.[]' input.json > output.ndjson
```
