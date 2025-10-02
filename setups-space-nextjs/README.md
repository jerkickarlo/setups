# Setups.Space — Next.js Converter (Dark Minimal)

A brutal, black & white currency + crypto converter with live data, motion, and charts.

## Quick Start

```bash
npm i   # or pnpm i / yarn
npm run dev # http://localhost:3000
```

## Deploy to Cloudflare Pages

1. Push the whole folder to a new GitHub repo.
2. In Cloudflare Pages: **Create project** → Connect to GitHub.
3. **Framework preset**: Next.js
4. **Build command**: `npm run build`
5. **Build output directory**: `.next`
6. **Node version**: 20 (default)
7. Start deploy.

> Uses client-side data fetching only → works on Pages without extra Functions.

AdSense script is added in `app/layout.tsx`.

APIs:
- Crypto: CoinGecko `/simple/price` & `/market_chart`
- Fiat: exchangerate.host `/latest`

## Contact
info@setups.space
