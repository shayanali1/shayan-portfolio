# Portfolio Quality Assurance (QA) Report

## Required Assets & Deployment Action Items

### 1. Open Graph Social Preview Image (Required)
- **Target Path:** `public/og-image.png`
- **Resolution:** `1200 x 630` px
- **Format:** PNG / JPEG
- **Action Required:** Place your customized branded Open Graph preview graphic at `public/og-image.png`. The HTML `<meta property="og:image">` and `<meta name="twitter:image">` tags are already configured to resolve to `%VITE_SITE_URL%/og-image.png`.

---

### 2. Environment Variables Setup

#### Local Development
- Copy `.env.example` to `.env`:
  ```bash
  cp .env.example .env
  ```
- Set `VITE_SITE_URL` to your intended local/preview URL or live domain.
- Set `MODEL_PASSWORD` in `.env` (kept local & gitignored) to run 3D asset encryption scripts via `node scripts/encrypt.cjs`.

#### Production / Netlify Deployment
- In the Netlify dashboard under **Site configuration > Environment variables**, add:
  - `VITE_SITE_URL`: Set to your production URL (e.g. `https://your-portfolio.netlify.app`).
  
> [!IMPORTANT]
> The Vite build will strictly fail on CI or Netlify if `VITE_SITE_URL` is omitted or left as `example.com`, ensuring no invalid canonical or social preview URLs are deployed to production.

---

### 3. Build & Security Audits

| Check | Status | Details |
| :--- | :--- | :--- |
| **Git History Audit** | Passed | No `.env` files exist in git commit history. |
| **`.gitignore` Rules** | Passed | `.env`, `.env.local`, and `.env.*.local` are strictly ignored; `.env.example` is committed. |
| **Sensitive Data Exposure** | Passed | Grep audit confirmed `MODEL_PASSWORD` is never bundled into `dist/`. |
| **Client Decryption** | Safe | Client model decryption key in `character.ts` is static asset obfuscation only. |
| **TypeScript & Build** | Passed | Full typechecking (`tsc -b`) and Vite production bundling pass without errors. |
