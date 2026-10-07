import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

declare const process: { cwd: () => string; env: Record<string, string | undefined> };
declare const console: { warn: (...args: unknown[]) => void };

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const defaultSiteUrl = "https://example.com";
  // Fall back to Netlify's built-in URL (the site's main address) when VITE_SITE_URL is not set
  const rawSiteUrl = env.VITE_SITE_URL || process.env.VITE_SITE_URL || process.env.URL;
  const isCIOrNetlify = Boolean(process.env.NETLIFY || process.env.CI);

  const isMissingOrExample =
    !rawSiteUrl ||
    !rawSiteUrl.trim() ||
    rawSiteUrl.trim() === "https://example.com" ||
    rawSiteUrl.trim() === "http://example.com";

  if (isMissingOrExample) {
    if (isCIOrNetlify) {
      throw new Error(
        "[vite] BUILD ERROR: VITE_SITE_URL is missing or set to example.com in CI/production build. Please configure VITE_SITE_URL in your Netlify dashboard under Site configuration > Environment variables with your production domain (e.g. https://your-portfolio.netlify.app)."
      );
    } else {
      console.warn(
        "\x1b[33m%s\x1b[0m",
        "[vite] WARNING: VITE_SITE_URL is unset or using fallback 'https://example.com'. Using fallback for local build. To set your production domain, update .env or set VITE_SITE_URL."
      );
    }
  }

  const siteUrl = (!rawSiteUrl || !rawSiteUrl.trim()) ? defaultSiteUrl : rawSiteUrl.trim().replace(/\/+$/, "");
  process.env.VITE_SITE_URL = siteUrl;

  return {
    plugins: [
      react(),
      {
        name: "html-transform-site-url",
        transformIndexHtml(html) {
          return html.replace(/%VITE_SITE_URL%/g, siteUrl);
        },
      },
    ],
    base: "/",
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "three-vendor": ["three"],
            "gsap-vendor": ["gsap"],
          },
        },
      },
    },
  };
});
