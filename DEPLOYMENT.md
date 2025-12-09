# GitHub Pages Deployment Guide

## Quick Setup

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/UltimateMenu/ultimatemenu.github.io.git
git branch -M main
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to https://github.com/UltimateMenu/ultimatemenu.github.io/settings/pages
2. Under **Source**, select **GitHub Actions**
3. Save

### 3. That's it!
- GitHub Actions will automatically build and deploy your site
- Visit https://ultimatemenu.github.io after deployment completes (usually 2-3 minutes)

## What Happens Automatically

1. **On every push to `main`**:
   - GitHub Actions runs the build workflow
   - Installs dependencies with `npm ci --legacy-peer-deps`
   - Builds the Next.js static site with `npm run build`
   - Adds `.nojekyll` file to prevent Jekyll processing
   - Deploys to GitHub Pages

2. **The workflow**:
   - Located at `.github/workflows/deploy.yml`
   - Uses Node.js 20
   - Caches npm dependencies for faster builds
   - Uploads build artifacts
   - Deploys to GitHub Pages environment

## Troubleshooting

### Build fails?
- Check the Actions tab: https://github.com/UltimateMenu/ultimatemenu.github.io/actions
- Look for error messages in the build logs
- Ensure all dependencies are installed locally first

### Site not updating?
- Wait 2-3 minutes for deployment to complete
- Clear your browser cache
- Check if the workflow completed successfully

### 404 errors?
- Ensure GitHub Pages source is set to **GitHub Actions**
- Check that `.nojekyll` file exists in the `out` directory
- Verify the repository name is `ultimatemenu.github.io`

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build locally
npm run build

# The 'out' directory contains your static site
# You can upload this to any static hosting provider
```

## Environment Variables

No environment variables are required for basic deployment. The site works out of the box!

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the `openGraph.url` in `app/layout.tsx`
