# 🚀 Complete Deployment Guide

This guide covers deployment for **GitHub Pages**, **Cloudflare Pages**, **Vercel**, and **Netlify**.

## 📄 Project Configuration Check
Before deploying, verify these files exist in your root directory:

1.  **`package.json`**: Should contain `"build": "next build"`.
2.  **`next.config.mjs`**: Should have `output: 'export'`.
3.  **`.npmrc`**: Should contain `legacy-peer-deps=true`.
4.  **`wrangler.toml`** (for Cloudflare): Should verify build command and output directory.

---

## 🌩️ Cloudflare Pages (Recommended)
Cloudflare Pages offers unlimited bandwidth and global CDN, making it ideal for this static site.

### Method 1: Dashboard (Easiest)
1.  Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3.  Select the **UltimateMenu** repository.
4.  **Build Settings**:
    *   **Framework preset**: `Next.js (Static HTML Export)` or manually configure:
    *   **Build command**: `npm run build`
        *   *(Note: Do NOT use `npx build` or `npm install && ...`)*
    *   **Build output directory**: `out`
5.  **Environment Variables**:
    *   Usually not needed due to `.npmrc`, but if issues arise, add `NPM_FLAGS` = `--legacy-peer-deps`.
6.  Click **Save and Deploy**.

### Method 2: Wrangler CLI
If you prefer the command line:
1.  Install Wrangler: `npm install -g wrangler`
2.  Login: `wrangler login`
3.  Deploy:
    ```bash
    npm run build
    wrangler pages deploy out --project-name=ultimatemenu
    ```

---

## ▲ Vercel
Vercel is the creators of Next.js and provides excellent support.

1.  Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New** > **Project**.
2.  Import the **UltimateMenu** repository.
3.  **Configure Project**:
    *   **Framework Preset**: Vercel should auto-detect **Next.js**.
    *   **Root Directory**: `./`
    *   **Build Command**: Default (`next build` or `npm run build`) is fine.
    *   **Output Directory**: Vercel handles Next.js Output API automatically.
4.  Click **Deploy**.

*Note: Since we use `output: 'export'`, Vercel will deploy it as a static site.*

---

## 💠 Netlify
Netlify is another great option for static site hosting.

1.  Log in to [Netlify](https://app.netlify.com/).
2.  Click **Add new site** > **Import an existing project**.
3.  Connect to **GitHub** and select your repository.
4.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `out`
5.  Click **Deploy site**.

---

## 🐙 GitHub Pages
Since you are likely hosting this repo on GitHub, this is a native option.

1.  Ensure your `next.config.mjs` has `output: 'export'`.
2.  Go to Repository **Settings** > **Pages**.
3.  **Build and deployment**: Select **GitHub Actions**.
4.  GitHub will auto-detect Next.js and suggest a workflow.
    *   Alternatively, use the existing `.github/workflows/nextjs.yml` if configured.
    *   If manually building:
        1.  Run `npm run build`.
        2.  Commit the `out` folder (typically unrelated for source repos) or use a deploy action to push the `out` folder to the `gh-pages` branch.

---

## 🐛 Troubleshooting

### Common Errors

*   **`npm error code ERESOLVE`**:
    *   **Fix**: Ensure `.npmrc` exists in the root with `legacy-peer-deps=true`.

*   **`sh: build: command not found`**:
    *   **Fix**: Check your Cloudflare/Netlify build command. It should be `npm run build`, NOT just `build` or `npx build`.

*   **Images not loading**:
    *   **Fix**: Ensure `unoptimized: true` is in `next.config.mjs` images config for static exports.

*   **404 on Refresh**:
    *   **Fix**: For some single-page app (SPA) setups on standard hosting, you might need a `_redirects` file mapped to `index.html`. However, static exports usually generate `index.html` for each route.

### Verification
After deployment, check:
*   [ ] The site loads without errors.
*   [ ] Navigation works (no 404s).
*   [ ] Images (especially OG images) are loading.
*   [ ] Visitor counter is incrementing.
