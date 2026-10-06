# Portfolio Quality Assurance (QA) & Production Hardening Report

**Candidate:** Syed Muhammad Shayan Ali  
**Target Platform:** Netlify / Modern Browsers  
**Tech Stack:** React 18, TypeScript, Vite, Three.js, GSAP ScrollTrigger/ScrollSmoother, React Three Fiber, Rapier  
**Audit Date:** October 6, 2026  

---

## Executive Summary

A comprehensive pre-launch audit and hardening pass was conducted across code health, runtime behavior, multi-viewport layout, accessibility, SEO, security headers, and content originality. All protected copy rules were strictly enforced, visual styling and animation flows were preserved, and the production build compiles cleanly with zero TypeScript errors and zero bundle leaks.

---

## Stage-by-Stage QA Matrix

| Stage | Item / Test | Status | Action Taken / Result |
| :--- | :--- | :--- | :--- |
| **Stage 1: Build & Health** | `tsc --noEmit` & TypeScript compilation | **PASS** | 0 errors. Strict typing intact. |
| | ESLint Audit | **PASS** | 0 errors across all production components. |
| | Production Bundle (`npm run build`) | **PASS** | Builds cleanly (`dist/` generated with manualChunks vendor splitting). |
| | Dependency Vulnerability Audit (`npm audit`) | **PASS** | 12 of 14 vulnerabilities fixed via non-breaking update. 2 remaining are dev-only (`vite`/`esbuild` dev server DoS; breaking upgrade required for `vite@8`, safe for static production deploy). |
| | Dead Code & Debugger Scan | **PASS** | 0 `debugger`, 0 `console.log` in production code. |
| | Template & Placeholder Artifacts | **PASS** | 0 occurrences of `preview1`, `TODO`, `FIXME`, `lorem`, `placeholder`, or template author names in `dist/`. |
| | Secret & Token Exposure | **PASS** | No `.env` commits in git history. `MODEL_PASSWORD` is absent from all `dist/` JS bundles. Client key in `character.ts` documented as static asset obfuscation. |
| **Stage 2: Runtime & Browsers** | Viewport 1920x1080 (Desktop Large) | **PASS** | 0 horizontal overflow, 0 console errors, 0 failed network requests. |
| | Viewport 1536x864 (Laptop Standard) | **PASS** | 0 horizontal overflow, 0 console errors, 0 failed network requests. |
| | Viewport 1366x768 (Laptop Small) | **PASS** | 0 horizontal overflow, 0 console errors, 0 failed network requests. |
| | Viewport 1024x768 (Tablet Landscape) | **PASS** | 0 horizontal overflow, 0 console errors, 0 failed network requests. |
| | Viewport 768x1024 (Tablet Portrait) | **PASS** | 0 horizontal overflow, 0 console errors, 0 failed network requests. |
| | Viewport 390x844 (Mobile iPhone) | **PASS** | 0 horizontal overflow, 0 console errors, 0 failed network requests. |
| | Loading Screen & Intro Sequence | **PASS** | Counter advances to 100% $\rightarrow$ "Welcome" $\rightarrow$ unmounts cleanly with pointer-events disabled. |
| | Work Carousel Functionality | **PASS** | Navigation arrows, dot pagination, and touch swipe transition smoothly between the 3 published projects (`NexRate`, `EthicalLink`, `Electricity Consumption AI`). |
| | TechStack 3D Physics | **PASS** | Viewport-gated instantiation with adaptive sphere count for smooth scrolling. |
| | Download CV Buttons | **PASS** | Navbar (>1024px), Mobile Hero (<=1024px), and Contact section all target `/Shayan_Ali_CV.pdf` with `download="Shayan_Ali_CV.pdf"`. |
| | Performance Throttling (Fast 4G + 4x CPU) | **PASS** | Interactive/Welcome rendered in **3.11s**. |
| | WebGL & Error Boundary Fallback | **PASS** | Created `ErrorBoundary.tsx`. Added WebGL support detection and model catch handlers in `Scene.tsx` so UI never hangs on loading screen. |
| | `prefers-reduced-motion` | **PASS** | Bypasses long intro animations; renders in **2.41s - 3.08s**. |
| | SPA Deep Path & Refresh | **PASS** | Direct requests (e.g. `/about`) return HTTP 200 via `netlify.toml` rewrite rule. |
| **Stage 3: A11y & SEO** | Semantic Structure & Heading Order | **PASS** | Exactly one `h1` in hero (`Landing.tsx`), logical `h2`–`h4` hierarchy. |
| | Screen Reader Headings | **PASS** | Removed empty `<h5></h5>` in `Career.tsx`. |
| | Accessible Names & Focus | **PASS** | Added `aria-label` to icon-only buttons, social links, and carousel controls. |
| | Canonical & Social Metadata | **PASS** | Configured `%VITE_SITE_URL%` replacement for canonical URL, `og:url`, `og:image`, `twitter:url`, `twitter:image`. |
| | Robots & Sitemap | **PASS** | Added `public/robots.txt` and `public/sitemap.xml`. |
| **Stage 4: Security & Netlify** | Netlify Security Headers | **PASS** | Configured `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and CSP supporting Three.js workers/WASM. |
| | Caching Policies | **PASS** | `immutable` 1-year cache on `/assets/*`, `no-cache/must-revalidate` on `/index.html`, 1-day stale-while-revalidate on static models/images. |
| | Outbound Link Security | **PASS** | All external links use `rel="noopener noreferrer"`. |
| **Stage 5: Content Audit** | Dash Normalization | **PASS** | Removed all em dashes ("—") and en dashes ("–") in user-visible text, replacing with commas, periods, or colons. Updated `Career.tsx` to "2022-2026". |
| | Copy Modernization | **PASS** | Rephrased generic buzzwords in `About.tsx` and `WhatIDo.tsx` into concise first-person developer copy while preserving protected sections. |
| | Plagiarism Export | **PASS** | Generated `CONTENT_FOR_PLAGIARISM_CHECK.txt` containing all final visible copy. |

---

## Launch Checklist

### Completed by Assistant
- [x] Strict TypeScript validation (`tsc -b`, `tsc --noEmit`).
- [x] ESLint validation (0 errors).
- [x] Automated multi-viewport layout validation across 6 screen sizes (390px to 1920px).
- [x] Memory leak & listener cleanup across Three.js Scene, GSAP ScrollSmoother, SocialIcons, and Cursor.
- [x] Error Boundary & WebGL failure resilience.
- [x] CI build enforcement (fails build if `VITE_SITE_URL` is omitted or set to `example.com`).
- [x] Security headers and asset cache rules in `netlify.toml`.
- [x] Created `robots.txt` and `sitemap.xml`.
- [x] Cleaned em-dashes and normalized sentence dashes across all visible copy and meta tags.

### Actions Required by User Before Live Launch
- [ ] **1. Provide Open Graph Image:**
  - Place your branded preview card at `public/og-image.png` (dimensions: `1200 x 630` px).
- [ ] **2. Verify CV PDF Content:**
  - Confirm your up-to-date resume is placed at `public/Shayan_Ali_CV.pdf`.
- [ ] **3. Set Netlify Production Environment Variable:**
  - In Netlify: **Site configuration > Environment variables** $\rightarrow$ add `VITE_SITE_URL = https://your-domain.netlify.app`.
- [ ] **4. Update Domain in Search Index Files:**
  - In `public/robots.txt`: Replace `https://your-portfolio.netlify.app/sitemap.xml` with your live domain.
  - In `public/sitemap.xml`: Replace `https://your-portfolio.netlify.app/` with your live domain.
- [ ] **5. Run External Plagiarism / Grammar Check (Optional):**
  - Run `CONTENT_FOR_PLAGIARISM_CHECK.txt` through your preferred checker if required by external portfolio reviews.

---

## Ranked Risk Register

| Risk | Severity | Mitigation / Status |
| :--- | :--- | :--- |
| **1. Missing `VITE_SITE_URL` on Netlify** | **Medium** | **Mitigated:** The build script in `vite.config.ts` fails the build on CI with an explicit actionable error message if this variable is omitted. |
| **2. Social Preview Image Placeholder** | **Low** | **Documented:** The meta tags point to `/og-image.png`. The file path is reserved and ready for the user's graphic. |
| **3. Client-side Model Key Obfuscation** | **Informational** | **Documented:** The decryption password in `character.ts` runs on the client to decrypt `character.enc`. This is static asset obfuscation, not a server secret. |

---

## Asset & License Attribution Reference

| Asset | File / Path | License Status | Notes |
| :--- | :--- | :--- | :--- |
| **3D Character Model** | `public/models/character.enc` | **Verify** | Encrypted GLTF model with custom texture mapping. Static client decryption. |
| **HDR Environment Map** | `public/models/char_enviorment.hdr` | **CC0 / Public Domain** | Standard studio lighting environment map. |
| **Draco WASM Decoder** | `public/draco/` | **Apache 2.0** | Google Draco 3D geometry decompression library. |
| **Typography (Geist)** | Google Fonts | **SIL Open Font License (OFL)** | Geist sans-serif font family. |
| **Iconography** | `react-icons` (`fa6`, `lu`, `md`) | **MIT / Apache 2.0** | FontAwesome 6, Lucide Icons, Material Design Icons. |

---

## Modified & Created Files Summary

### Files Created:
1. `.env.example`: Environment template with usage documentation.
2. `public/robots.txt`: Search engine crawling rules.
3. `public/sitemap.xml`: Canonical sitemap.
4. `src/components/ErrorBoundary.tsx`: React ErrorBoundary component for 3D/UI fault isolation.
5. `CONTENT_FOR_PLAGIARISM_CHECK.txt`: Full text dump of final visible copy for originality scanning.
6. `QA_REPORT.md`: Comprehensive QA verification and deployment readiness report.

### Files Modified:
1. `.gitignore`: Added explicit exclusion rules for `.env`, `.env.local`, `.env.*.local`.
2. `index.html`: Removed em-dashes, added canonical link, integrated `%VITE_SITE_URL%` for Open Graph and Twitter tags, added font preconnects.
3. `netlify.toml`: Added HTTP security headers (CSP, X-Frame-Options, Permissions-Policy) and immutable asset caching.
4. `package.json`: Updated project name, author, and description metadata.
5. `README.md`: Documented environment variables, Netlify configuration, and local setup.
6. `scripts/encrypt.cjs`: Removed all default password fallbacks; enforces `MODEL_PASSWORD` requirement.
7. `src/App.tsx`: Added `ErrorBoundary` wrapping around Suspense boundaries.
8. `src/components/About.tsx`: Polished introductory copy.
9. `src/components/Career.tsx`: Replaced date format with "2022-2026" and removed empty `<h5></h5>` tag.
10. `src/components/Contact.tsx`: Added `rel="noopener noreferrer"`.
11. `src/components/Cursor.tsx`: Replaced per-frame GSAP tween creation with high-performance `gsap.quickSetter`.
12. `src/components/Loading.tsx`: Decoupled state transition timers to eliminate race conditions, added `loading-out` class to disable pointer events immediately upon intro click.
13. `src/components/Navbar.tsx`: Added `aria-label="Home"` on logo link.
14. `src/components/SocialIcons.tsx`: Added accessible `aria-label` attributes and `rel="noopener noreferrer"`.
15. `src/components/TechStack.tsx`: Added intersection observer gating, capped DPR, and reduced physics sphere count on low-concurrency devices.
16. `src/components/WhatIDo.tsx`: Rephrased generic taglines into first-person engineering descriptions.
17. `src/components/WorkImage.tsx`: Added `loading="lazy"`, `decoding="async"`, `rel="noopener noreferrer"`, and descriptive `aria-label`.
18. `src/components/Character/Scene.tsx`: Added WebGL support detection, DPR capping, visibility/intersection rendering pause, and deep memory disposal.
19. `src/components/Character/utils/character.ts`: Synchronous shader compilation, worker limit configuration, and model error handling.
20. `src/components/Character/utils/decrypt.ts`: Preloaded character asset fetch and AES key caching.
21. `src/components/styles/Loading.css`: Added `.loading-out { pointer-events: none; }`.
22. `src/components/utils/splitText.ts`: Added `document.fonts.ready` check to prevent SplitText font race warnings.
23. `vite.config.ts`: Configured manual chunks, HTML environment variable replacement, fallback warning, and CI build failure enforcement.

### Files Intentionally Not Modified:
- `src/components/Career.tsx` claims and narrative copy (per protected copy rules).
- 3D character decryption key in `character.ts` (kept in client code as static asset obfuscation).
- `public/models/character.enc` & `char_enviorment.hdr` (binary assets).
