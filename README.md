# Shayan Portfolio

Modern 3D personal portfolio built with React, TypeScript, Three.js, and GSAP.

## Features

- One-page portfolio experience with smooth section transitions.
- Interactive 3D character scene powered by Three.js with mouse tracking and bone animations.
- Interactive 3D tech stack physics simulation powered by React Three Fiber and Rapier.
- GSAP-based motion and scroll interactions (`ScrollTrigger`, `ScrollSmoother`, `SplitText`).
- Custom cursor and magnetic social links.
- Responsive layout for desktop and mobile.

## Tech Stack

- React 18
- TypeScript
- Vite
- GSAP (`gsap`, `@gsap/react`, `ScrollTrigger`, `ScrollSmoother`, `SplitText`)
- Three.js (`three`, `@react-three/fiber`, `@react-three/drei`)
- Physics and postprocessing (`@react-three/rapier`, `@react-three/postprocessing`)

## Project Structure

```text
.
├── public/
│   ├── draco/          # Draco decoder files
│   ├── images/         # Project screenshots and tech badges
│   └── models/         # Encrypted 3D character model and HDR environment
├── scripts/
│   └── encrypt.cjs     # 3D model encryption utility
├── src/
│   ├── components/     # React UI and 3D scene components
│   ├── context/        # Loading context provider
│   ├── data/           # 3D bone mapping data
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── netlify.toml        # Netlify build and redirect configuration
├── package.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install and Run

```bash
# 1. Clone repository and install dependencies
npm install

# 2. (Optional) Set up local environment variables
cp .env.example .env

# 3. Start local development server
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Environment Variables

Copy `.env.example` to `.env` for local configuration:

| Variable | Scope | Description | Default / Example |
| :--- | :--- | :--- | :--- |
| `VITE_SITE_URL` | Public (Client & HTML) | Production URL used for `<link rel="canonical">`, Open Graph (`og:url`, `og:image`), and Twitter Card metadata. | `https://example.com` |
| `MODEL_PASSWORD` | Node.js Only (Build/Script) | Password used by `scripts/encrypt.cjs` to encrypt 3D `.glb` assets to `.enc`. Never bundled into client builds. | `MyCharacter12` |

> [!NOTE]
> - **Netlify Deployment:** In your Netlify dashboard, navigate to **Site configuration > Environment variables** and add `VITE_SITE_URL` set to your live site domain (e.g. `https://your-portfolio.netlify.app`). If omitted, Vite uses `https://example.com` as a safe fallback and outputs a build warning.
> - **Client-side Decryption:** The character model decryption key in `src/components/Character/utils/character.ts` runs directly in the user's browser as static asset obfuscation.
> - **No Secrets in .env:** Public contact emails, social URLs, and CV file paths are intentionally maintained directly in typed project files (`src/data/` and components), not in `.env`.

## Scripts

- `npm run dev`: start development server.
- `npm run build`: type-check with `tsc` and create production build with Vite.
- `npm run preview`: preview production build locally.
- `npm run lint`: run ESLint.

## Deployment (Netlify)

This project is configured for deployment on **Netlify** via `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA redirects:** configured to route all requests (`/*`) to `/index.html` with a 200 status code.

Connect the repository to Netlify, and builds will trigger automatically on pushes to `main`.

## Customization

- Update personal content in `src/components/About.tsx`, `src/components/Career.tsx`, `src/components/WhatIDo.tsx`, and `src/components/Work.tsx`.
- Update contact and social links in `src/components/Contact.tsx` and `src/components/SocialIcons.tsx`.
- Edit visuals and styling in `src/components/styles/` and `src/index.css`.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
