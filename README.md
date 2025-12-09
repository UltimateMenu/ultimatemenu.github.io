# UltimateMenu Showcase Website

A modern, dynamic showcase website for **UltimateMenu** - the most advanced YimMenu Lua script for GTA V.

## 🌐 Live Deployments

- **GitHub Pages**: [https://ultimatemenu.github.io](https://ultimatemenu.github.io)
- **Vercel**: [https://ultimatemenu.vercel.app](https://ultimatemenu.vercel.app)

## 🛠️ Built With

### Core Technologies
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components & Libraries
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel/slider with autoplay
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown renderer with GitHub flavored markdown support

### Analytics & Tracking
- **[@rundevelrun/free-visitor-counter](https://www.npmjs.com/package/@rundevelrun/free-visitor-counter)** - Free visitor counter for React
  - Tracks page views automatically
  - No API key required
  - Shows sample data on localhost, real data when deployed
  - Integrates with [free-visit-counter-api-dashboard](https://visitor.6developer.com/)

### Additional Tools
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support
- **[class-variance-authority](https://cva.style/)** - Component variant management
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility

## 📁 Project Structure

```
showcase-page-design/
├── app/                      # Next.js App Router pages
│   ├── changelog/           # Changelog page (fetches from GitHub)
│   ├── installation/        # Installation guide page
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   ├── changelog-list.tsx   # GitHub releases display
│   ├── footer.tsx           # Site footer
│   ├── header.tsx           # Navigation header
│   ├── hero.tsx             # Hero section
│   ├── features.tsx         # Features showcase
│   ├── stats.tsx            # GitHub stats & visitor counter
│   ├── screenshots.tsx      # Image gallery
│   ├── screenshot-carousel.tsx  # Auto-rotating carousel
│   ├── video-showcase.tsx   # YouTube video embed
│   ├── markdown-renderer.tsx    # Markdown content renderer
│   └── visitor-counter.tsx  # Visitor tracking component
├── lib/                     # Utility functions
└── public/                  # Static assets
```

## ✨ Features

### 🎨 Modern UI/UX
- Responsive design for all screen sizes
- Dark mode support with smooth transitions
- Glassmorphism effects on navigation
- Animated text sweeps and gradient effects
- Smooth scroll animations with Framer Motion

### 📊 Real-Time Statistics
- **GitHub Stars**: Live count from GitHub API
- **GitHub Forks**: Live count from GitHub API
- **Page Views**: Real visitor tracking via [visitor.6developer.com](https://visitor.6developer.com/)

### 🖼️ Interactive Gallery
- Auto-rotating carousel (3-second intervals)
- Lightbox image preview with navigation
- Hover effects and smooth transitions

### 📝 Dynamic Content
- **Changelog**: Fetches latest releases from GitHub API
- **Installation Guide**: Markdown-based with image support
- **GitHub-flavored Markdown**: Proper rendering with syntax highlighting

### 🔗 External Integrations
- GitHub API for repository stats and releases
- YouTube video embedding
- Discord server integration
- Social media links

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ultimatemenu/showcase-page-design.git

# Navigate to project directory
cd showcase-page-design

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📦 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Instructions:

1. **Push to GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/UltimateMenu/ultimatemenu.github.io.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to **Pages** section
   - Under **Source**, select **GitHub Actions**

3. **Automatic Deployment**
   - The site will automatically build and deploy on every push to `main` branch
   - GitHub Actions workflow is located in `.github/workflows/deploy.yml`
   - Build artifacts are uploaded to the `gh-pages` branch
   - Site will be available at: `https://ultimatemenu.github.io`

#### Manual Build for GitHub Pages:

```bash
# Build the static site
npm run build

# The output will be in the 'out' directory
# Upload the contents of 'out' to your hosting provider
```

### Vercel

1. Import your GitHub repository to Vercel
2. Vercel will auto-detect Next.js and deploy
3. No additional configuration needed
4. Site will be available at: `https://ultimatemenu.vercel.app`

## 🎨 Customization

### OG Meta Tags & Embeds
The site includes comprehensive Open Graph and Twitter Card meta tags:
- **Embed Color**: `#00FF00` (green theme)
- **Embed Image**: `1.png` from screenshots
- **Theme Color**: Matches the primary green color
- **Discord/Twitter**: Rich embeds with image preview

### Theme Toggle
- Animated theme switcher with smooth transitions
- Icons rotate and scale when switching themes
- Automatically detects system theme preference
- Persists user's theme choice

## 🔧 Configuration

### Visitor Counter
The visitor counter uses the free [visitor.6developer.com](https://visitor.6developer.com/) API:
- No API key required
- Automatically tracks visits per domain
- Returns total visit count

### GitHub API
Update repository references in:
- `components/stats.tsx` - For stars/forks count
- `app/changelog/page.tsx` - For release notes

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

- **Discord**: [Join our community](https://l7neg.uk.to/discord)
- **Forum**: [L7NEG Forums](https://forums.l7neg.uk.to/)
- **GitHub Issues**: [Report bugs](https://github.com/ultimatemenu/ultimatemenu/issues)

## 🙏 Acknowledgments

- Built with ❤️ by L7NEG using [Google antigravity 🤯](https://antigravity.google/)
- Powered by YimMenu Lua API
- Design inspired by modern web aesthetics from [v0.dev](https://v0.dev/)

---

**© 2025 UltimateMenu** | Built with Next.js, React, and TypeScript
