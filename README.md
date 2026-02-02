# Cloud Native Valencia Website

Static website for the Cloud Native Valencia community, featuring YouTube integration, speaker profiles, sponsor showcase, and links to community resources.

## Website Sections

### Hero
- Main headline and community tagline
- Call-to-action buttons: "Submit Your Talk" (Sessionize) and "Sponsor" (GitHub Sponsors)
- Animated decorative graphics

### Videos
- Featured YouTube video embed
- Subscribe button linking to YouTube channel
- "View All Videos" button

### Call for Proposals (CFP)
- Information about submitting talks
- Deadlines and event details
- Talk formats: 30min talks, 60min workshops, 5min lightning talks
- Links to Sessionize for submissions

### About the Community
- Three pillars: Community-Driven, Hands-On Learning, Production Focus
- Connect with us links:
  - [LinkedIn](https://www.linkedin.com/company/cloud-native-valencia)
  - [CNCF Chapter](https://community.cncf.io/cloud-native-valencia/)
  - [Meetup](https://www.meetup.com/cloud-native-valencia/)

### Speakers
Featured speakers with profile photos, titles, bios, and social links:
- Chad Crowell - Founder, KubeSkills
- Diana Todea - Cloud Native Expert
- Mario Vazquez - Cloud Native Expert

### Organizers
The team behind Cloud Native Valencia:
- Jade Lassery
- Luiz Bernardo Levenhagen

### Sponsors
Current sponsors supporting the community:
- VictoriaMetrics
- Red Hat
- Flywire

"Become a Sponsor" button linking to GitHub Sponsors.

### Footer
- Community links
- Resource links (KubeSkills, Kubernetes Docs, CNCF)
- Social media icons (YouTube, LinkedIn, CNCF Chapter, Meetup)

### Floating "Support Us" Button
- Appears on scroll
- Links to GitHub Sponsors page

## Quick Start

### Prerequisites
- Git
- Netlify account (free tier works)

### Deploy to Netlify

#### Option 1: Netlify UI (Recommended)
1. Push this repo to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" -> "Import an existing project"
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

## Project Structure

```
cloudnativevalencia.com/
├── index.html           # Main homepage
├── 404.html             # Custom 404 error page
├── styles.css           # Complete stylesheet with CSS variables
├── main.js              # Interactive features (scroll, YT API)
├── netlify.toml         # Netlify build & redirect configuration
├── _redirects           # Backup redirect rules
├── assets/
│   ├── logo.svg         # Cloud Native Valencia logo
│   ├── mario-vazquez.jpeg
│   ├── jade-lassery.jpeg
│   ├── bernardo.jpeg
│   └── favicon.ico
└── README.md            # This file
```

## Key Links

| Resource | URL |
|----------|-----|
| Submit a Talk | https://sessionize.com/cloud-native-valencia |
| Become a Sponsor | https://github.com/CloudNativeValencia/sponsor |
| YouTube Channel | https://youtube.com/@cloudnativevalencia |
| LinkedIn | https://www.linkedin.com/company/cloud-native-valencia |
| CNCF Chapter | https://community.cncf.io/cloud-native-valencia/ |
| Meetup | https://www.meetup.com/cloud-native-valencia/ |

## Customization

### Update YouTube Channel

In `index.html`, update the YouTube URLs:
```html
https://youtube.com/@cloudnativevalencia
```

In `main.js`:
```javascript
const CONFIG = {
  youtube: {
    channelId: '@cloudnativevalencia',
    apiKey: '',  // Optional: Add API key for dynamic video loading
  }
}
```

### Add/Edit Speakers

In `index.html`, find the speakers section and add new speaker cards:
```html
<div class="speaker-card reveal-up">
  <div class="speaker-avatar">
    <img src="/assets/speaker-photo.jpeg" alt="Speaker Name" loading="lazy">
  </div>
  <h3>Speaker Name</h3>
  <p class="speaker-title">Title, Company</p>
  <p class="speaker-bio">Short bio here</p>
  <div class="speaker-socials">
    <a href="https://linkedin.com/in/speaker" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <!-- LinkedIn SVG icon -->
    </a>
  </div>
</div>
```

### Add/Edit Sponsors

In `index.html`, find the sponsors section and add new sponsor cards:
```html
<a href="https://sponsor-website.com" target="_blank" rel="noopener noreferrer" class="sponsor-card reveal-up">
  <img src="https://sponsor-logo-url" alt="Sponsor Name" loading="lazy">
  <span>Sponsor Name</span>
</a>
```

### Customize Colors

In `styles.css`:
```css
:root {
  --color-primary: #326CE5;        /* Kubernetes blue */
  --color-secondary: #00D4AA;      /* Accent teal */
  --color-cfp: #FF6B35;            /* CTA button color */
}
```

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Focus visible styles
- Skip to content link
- Keyboard navigation support
- Color contrast meets WCAG AA
- Alt text on all images
- Proper heading hierarchy

## Performance

- Minimal CSS/JS (no frameworks)
- Lazy loading images
- Preconnect to YouTube
- Scroll animation optimization
- Netlify CDN delivery

## License

MIT License

## Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Submit pull request

## Support

- **GitHub:** Open an issue
- **LinkedIn:** [Cloud Native Valencia](https://www.linkedin.com/company/cloud-native-valencia)
- **Meetup:** [Cloud Native Valencia](https://www.meetup.com/cloud-native-valencia/)

---

Built with love by the Cloud Native Valencia community
