# Cloud Native Valencia Website

Production-ready static website for Cloud Native Valencia community, featuring YouTube integration, CFP submission forms, and modern responsive design.

## 🚀 Quick Start

### Prerequisites
- Git
- Netlify account (free tier works)
- (Optional) YouTube Data API v3 key

### Deploy to Netlify

#### Option 1: Netlify UI (Recommended)
1. Push this repo to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository
5. Build settings:
   - **Build command:** Leave empty
   - **Publish directory:** `.` (root)
6. Click "Deploy site"

#### Option 2: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### Local Development
```bash
# Serve locally with any static server
npx serve .

# Or use Python
python -m http.server 8000

# Or use PHP
php -S localhost:8000
```

## 📁 Project Structure

```
cloudnativevalencia.com/
├── index.html           # Main homepage
├── success.html         # CFP form success page
├── 404.html            # Custom 404 error page
├── styles.css          # Complete stylesheet with CSS variables
├── main.js             # Interactive features (scroll, modal, YT API)
├── netlify.toml        # Netlify build & redirect configuration
├── _redirects          # Backup redirect rules
├── _headers            # Security headers (in netlify.toml)
├── assets/
│   ├── logo.svg        # ⚠️ REPLACE with your logo
│   ├── logo-dark.svg   # Optional dark mode logo
│   ├── og-image.jpg    # ⚠️ ADD for social preview (1200x630px)
│   └── favicon.ico     # ⚠️ REPLACE with your favicon
└── README.md           # This file
```

## ✏️ Content Editing Guide

### Replace Artwork & Logos

1. **Main Logo** (`assets/logo.svg`)
   - Use the provided "Official Logo transparent background.svg"
   - Copy to `assets/logo.svg`
   - Recommended dimensions: 180x60px viewport
   
2. **Favicon** (`assets/favicon.ico`)
   - Generate from logo using tools like:
     - [RealFaviconGenerator](https://realfavicongenerator.net/)
     - [Favicon.io](https://favicon.io/)
   - Place in `assets/favicon.ico`

3. **Social Preview Image** (`assets/og-image.jpg`)
   - Create 1200x630px image for social media previews
   - Include logo and tagline
   - Update `<meta property="og:image">` in `index.html`

### Update YouTube Channel

**In `index.html`** (multiple locations):
```html
<!-- Line 73: Featured video embed -->
<iframe src="https://www.youtube.com/embed?listType=user_uploads&list=@cloudnativevalencia">

<!-- Line 141: Subscribe button -->
<a href="https://youtube.com/@cloudnativevalencia?sub_confirmation=1">

<!-- All video links -->
https://youtube.com/@cloudnativevalencia
```

**In `main.js`** (line 8):
```javascript
const CONFIG = {
  youtube: {
    channelId: '@cloudnativevalencia',  // Change to @yourchannelname
    apiKey: '',  // Optional: Add API key for dynamic video loading
  }
}
```

### Update CFP Details

**In `index.html`** (CFP section, around line 198):
```html
<!-- Update deadlines -->
<li>Deadline: <strong>March 31, 2026</strong></li>
<li>Event Date: <strong>May 15-16, 2026</strong></li>
<li>Formats: <strong>30min talks, 60min workshops, 5min lightning</strong></li>
```

**Change form submission email:**
- Netlify Forms automatically captures submissions
- View submissions in Netlify dashboard: Site settings → Forms
- To send emails to your address, add form notifications in Netlify

### Customize Colors

**In `styles.css`** (line 2-17):
```css
:root {
  --color-primary: #326CE5;        /* Change to your brand color */
  --color-secondary: #00D4AA;      /* Accent color */
  --color-cfp: #FF6B35;           /* CFP button standout color */
}
```

### Edit Text Content

All text is in `index.html`. Key sections:
- **Hero** (lines 68-95): Main headline and tagline
- **About** (lines 190-230): Community description
- **CFP** (lines 150-188): Talk submission details
- **Footer** (lines 292-341): Links and copyright

## 🔧 Advanced Configuration

### Enable YouTube Data API (Optional)

For dynamic video loading from your channel:

1. Get API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create project → Enable YouTube Data API v3
   - Create credentials (API key)
   - Restrict key to YouTube Data API v3

2. Add to Netlify:
   - Site settings → Environment variables
   - Add: `YT_API_KEY` = your-api-key

3. Update `main.js` (line 10):
   ```javascript
   apiKey: process.env.YT_API_KEY || '',
   ```

### Add Google Analytics

**In `index.html`** (before `</head>`):
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Custom Domain Setup

1. In Netlify: Site settings → Domain management
2. Add custom domain: `cloudnativevalencia.com`
3. Configure DNS:
   - **A record**: `@` → Netlify load balancer IP
   - **CNAME**: `www` → `your-site.netlify.app`
4. Enable HTTPS (automatic with Netlify)

### Form Notifications

Netlify Forms can send email notifications:

1. Site settings → Forms → Form notifications
2. Add notification:
   - **Email notification**: Your email address
   - **Event**: New form submission
   - **Form**: cfp

## 🎨 Design Tokens Reference

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | #326CE5 | Kubernetes blue, primary actions |
| `--color-secondary` | #00D4AA | Accent teal, highlights |
| `--color-cfp` | #FF6B35 | CFP button (high contrast) |

### Typography Scale
```css
--text-xs:   clamp(0.75rem, ..., 0.875rem)
--text-sm:   clamp(0.875rem, ..., 1rem)
--text-base: clamp(1rem, ..., 1.125rem)
--text-lg:   clamp(1.125rem, ..., 1.25rem)
--text-xl:   clamp(1.25rem, ..., 1.5rem)
--text-2xl:  clamp(1.5rem, ..., 2rem)
--text-3xl:  clamp(1.875rem, ..., 2.5rem)
--text-4xl:  clamp(2.25rem, ..., 3.5rem)
```

### Spacing Scale
```css
--space-xs:  0.5rem   (8px)
--space-sm:  0.75rem  (12px)
--space-md:  1rem     (16px)
--space-lg:  1.5rem   (24px)
--space-xl:  2rem     (32px)
--space-2xl: 3rem     (48px)
--space-3xl: 4rem     (64px)
--space-4xl: 6rem     (96px)
```

## 📋 Accessibility Checklist

- ✅ Semantic HTML5 elements
- ✅ ARIA labels on interactive elements
- ✅ Focus visible styles (`:focus-visible`)
- ✅ Skip to content link
- ✅ Keyboard navigation support
- ✅ Color contrast ratios meet WCAG AA
- ✅ Alt text on all images
- ✅ Proper heading hierarchy
- ✅ Form labels and error states
- ✅ Modal focus trap

## 🚦 Performance Checklist

- ✅ Minimal CSS/JS (no frameworks)
- ✅ Lazy loading images
- ✅ Preconnect to YouTube
- ✅ CSS variables for fast paints
- ✅ Optimized scroll animations
- ✅ Netlify CDN delivery
- ✅ Brotli compression (Netlify)
- ✅ Cache headers configured

### Lighthouse Targets
- Performance: > 95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔒 Security Features

Configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content Security Policy (CSP)
- HTTPS enforcement
- Referrer-Policy
- Honeypot spam protection on forms

## 🐛 Troubleshooting

### Videos not loading
- Check YouTube channel handle is correct
- Verify iframe embed allows the channel
- Check browser console for CSP errors

### Form submissions not working
- Ensure `data-netlify="true"` attribute exists
- Check Netlify Forms dashboard for submissions
- Verify success.html exists and is accessible

### Sticky CFP button not appearing
- Check scroll threshold in `main.js` (line 26)
- Verify CSS for `.sticky-cfp.visible` class
- Check browser console for JS errors

### Scroll animations not working
- Verify IntersectionObserver API support (all modern browsers)
- Check `.reveal-up` classes exist on elements
- Inspect console for initialization errors

## 📊 Testing Checklist

Before deploying:
- [ ] Test on mobile (Chrome DevTools)
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Submit test CFP form
- [ ] Verify all links work
- [ ] Check YouTube embeds load
- [ ] Test keyboard navigation
- [ ] Run Lighthouse audit
- [ ] Check accessibility (axe DevTools)
- [ ] Test different browsers (Chrome, Firefox, Safari)

## 📦 Optional Enhancements

### Add Sitemap
Create `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cloudnativevalencia.com/</loc>
    <lastmod>2026-02-02</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Add robots.txt
Create `robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://cloudnativevalencia.com/sitemap.xml
```

### Speaker Page
Create `speakers.html` with full speaker bios and past talks.

### Blog/News Section
Add `/blog/` directory with individual post pages.

## 📝 License

MIT License - See [LICENSE](LICENSE) file

## 🤝 Contributing

This is a community website. To contribute:
1. Fork repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📞 Support

For issues or questions:
- **Email:** hello@cloudnativevalencia.com
- **GitHub:** Open an issue
- **Community:** Join our Slack/Discord

---

Built with ❤️ by the Cloud Native Valencia community
