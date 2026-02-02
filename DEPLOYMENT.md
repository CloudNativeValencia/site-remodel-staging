# Cloud Native Valencia - Deployment Guide

Complete step-by-step guide to deploy your website to Netlify.

## Prerequisites Checklist

Before you begin, ensure you have:
- [ ] Git installed
- [ ] GitHub/GitLab account
- [ ] Netlify account (sign up at https://netlify.com)
- [ ] Your logo files ready
- [ ] YouTube channel created
- [ ] Custom domain (optional, can add later)

## Step 1: Prepare Your Repository

### 1.1 Create GitHub Repository

```bash
# Initialize git in your project directory
cd cloudnativevalencia
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Cloud Native Valencia website"

# Create repository on GitHub (via web interface), then:
git remote add origin https://github.com/yourusername/cloudnativevalencia.git
git branch -M main
git push -u origin main
```

### 1.2 Verify Repository Structure

Ensure these files are in your repository:
```
├── index.html
├── styles.css
├── main.js
├── netlify.toml
├── _redirects
├── success.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── assets/
│   └── logo.svg
└── README.md
```

## Step 2: Customize Before Deploying

### 2.1 Replace Logo
```bash
# Copy your logo to assets directory
cp /path/to/your/logo.svg assets/logo.svg
```

### 2.2 Update YouTube Channel

**Edit `index.html`** - Find and replace all instances:
```
@cloudnativevalencia → @yourchannelname
```

Use find/replace in your editor:
- Find: `@cloudnativevalencia`
- Replace: `@yourchannelname`

**Edit `main.js`** - Update line 8:
```javascript
channelId: '@yourchannelname',
```

### 2.3 Update Site Metadata

**Edit `index.html`** - Update meta tags:
```html
<title>Your Community Name | Kubernetes & Cloud Native</title>
<meta name="description" content="Your description here...">
<meta property="og:url" content="https://yourdomain.com/">
<!-- Update all og: and twitter: meta tags -->
```

### 2.4 Customize CFP Details

**Edit `index.html`** - Update CFP section (around line 198):
```html
<li>Deadline: <strong>Your Deadline</strong></li>
<li>Event Date: <strong>Your Event Date</strong></li>
```

### 2.5 Update Footer

**Edit `index.html`** - Update footer links:
```html
<a href="mailto:your-email@example.com">Contact</a>
```

### 2.6 Commit Changes
```bash
git add .
git commit -m "Customize site content and branding"
git push
```

## Step 3: Deploy to Netlify

### Option A: Netlify UI (Recommended for beginners)

1. **Go to Netlify Dashboard**
   - Visit https://app.netlify.com
   - Sign in with GitHub

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify if prompted
   - Select your repository: `cloudnativevalencia`

3. **Configure Build Settings**
   ```
   Branch to deploy: main
   Build command: [leave empty]
   Publish directory: .
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait 30-60 seconds for deployment
   - You'll get a URL like: `random-name-123456.netlify.app`

### Option B: Netlify CLI (Recommended for developers)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```
   - Opens browser for authentication

3. **Initialize Site**
   ```bash
   cd cloudnativevalencia
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Select your team
   - Enter site name (optional)
   - Build command: [leave empty]
   - Directory to deploy: `.`

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Step 4: Verify Deployment

### 4.1 Test Your Site

Visit your Netlify URL and verify:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] YouTube video embed displays
- [ ] CFP modal opens
- [ ] All internal links work
- [ ] Mobile responsive

### 4.2 Test Form Submission

1. Click "Submit CFP" button
2. Fill out form with test data
3. Submit form
4. Verify redirect to success.html
5. Check Netlify dashboard → Forms for submission

### 4.3 Check Redirects

Test URL shortcuts:
- `yourdomain.com/youtube` → Should redirect to YouTube
- `yourdomain.com/subscribe` → Should redirect to YouTube subscribe

## Step 5: Configure Custom Domain (Optional)

### 5.1 Add Domain in Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `cloudnativevalencia.com`
4. Click "Verify"

### 5.2 Configure DNS

**Option A: Use Netlify DNS (Recommended)**
1. Netlify will provide nameservers
2. Go to your domain registrar
3. Update nameservers to Netlify's
4. Wait for propagation (up to 48 hours)

**Option B: External DNS**
Configure these records at your DNS provider:

**For root domain (cloudnativevalencia.com):**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's load balancer IP - check current IP)
TTL: 3600
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: your-site.netlify.app
TTL: 3600
```

### 5.3 Enable HTTPS

1. In Netlify: Site settings → Domain management → HTTPS
2. Click "Verify DNS configuration"
3. Click "Provision certificate"
4. Wait for SSL certificate (usually 1-2 minutes)
5. Enable "Force HTTPS"

## Step 6: Configure Environment Variables

### 6.1 YouTube API Key (Optional)

1. Get API key from [Google Cloud Console](https://console.cloud.google.com/)
2. In Netlify: Site settings → Environment variables
3. Add variable:
   - Key: `YT_API_KEY`
   - Value: your-api-key-here
   - Scopes: All scopes

4. Redeploy site to apply changes

### 6.2 Google Analytics (Optional)

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `index.html` before `</head>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

## Step 7: Set Up Form Notifications

### 7.1 Email Notifications

1. In Netlify: Site settings → Forms → Form notifications
2. Click "Add notification"
3. Select "Email notification"
4. Configure:
   - **Email to notify:** your-email@example.com
   - **Event to listen for:** New form submission
   - **Form:** cfp
5. Save

### 7.2 Slack Notifications (Optional)

1. Create Slack webhook URL
2. In Netlify: Add notification → Outgoing webhook
3. Configure:
   - **Event:** New form submission
   - **URL:** your-slack-webhook-url
   - **Form:** cfp

## Step 8: Performance Optimization

### 8.1 Enable Asset Optimization

Netlify automatically optimizes assets, but verify:
1. Site settings → Build & deploy → Post processing
2. Enable:
   - [x] Bundle CSS
   - [x] Minify CSS
   - [x] Minify JS
   - [x] Compress images
   - [x] Pretty URLs

### 8.2 Generate Favicon

1. Use [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo
3. Download package
4. Extract to `assets/` directory
5. Update `<link rel="icon">` in index.html

### 8.3 Create Social Preview Image

1. Design 1200x630px image
2. Include logo and tagline
3. Save as `assets/og-image.jpg`
4. Update `index.html`:
   ```html
   <meta property="og:image" content="https://yourdomain.com/assets/og-image.jpg">
   ```

## Step 9: SEO & Analytics Setup

### 9.1 Submit Sitemap to Google

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://yourdomain.com`
3. Verify ownership (DNS or file upload)
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 9.2 Submit to Bing

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site
3. Verify
4. Submit sitemap

### 9.3 Run Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://yourdomain.com --view
```

Target scores:
- Performance: > 95
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Step 10: Continuous Deployment

### 10.1 Configure Auto-Deploy

Netlify automatically deploys on git push. To verify:
1. Make a small change to index.html
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push
   ```
3. Watch deployment in Netlify dashboard

### 10.2 Deploy Previews

- Every pull request creates a deploy preview
- View at: `deploy-preview-{pr-number}--your-site.netlify.app`
- Perfect for testing before merging

### 10.3 Branch Deploys

Configure branch-specific deploys:
1. Site settings → Build & deploy → Continuous deployment
2. Add branch: `staging`
3. Staging URL: `staging--your-site.netlify.app`

## Troubleshooting

### Issue: Site not deploying

**Check:**
1. Build logs in Netlify dashboard
2. Verify all files committed to git
3. Check netlify.toml syntax
4. Ensure publish directory is correct

**Solution:**
```bash
# Clear Netlify cache and redeploy
netlify deploy --prod --clear-cache
```

### Issue: Form not working

**Check:**
1. Form has `data-netlify="true"` attribute
2. Form name matches notification settings
3. Honeypot field present

**Test:**
```bash
# Submit test form
curl -X POST \
  https://yourdomain.com/ \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'form-name=cfp&name=Test&email=test@example.com'
```

### Issue: 404 errors

**Check:**
1. _redirects file present
2. netlify.toml redirects configured
3. File paths case-sensitive

**Solution:**
Add to `_redirects`:
```
/missing-page  /  301
```

### Issue: Slow load times

**Check:**
1. Image sizes (optimize with [TinyPNG](https://tinypng.com/))
2. Remove unused CSS/JS
3. Enable Netlify asset optimization

**Solution:**
```bash
# Audit performance
lighthouse https://yourdomain.com --only-categories=performance
```

## Post-Deployment Checklist

- [ ] Custom domain configured and HTTPS enabled
- [ ] Form submissions working and notifications set up
- [ ] YouTube videos loading correctly
- [ ] All links tested (internal and external)
- [ ] Mobile responsive design verified
- [ ] Lighthouse audit passed (all scores > 90)
- [ ] Sitemap submitted to search engines
- [ ] Analytics tracking
- [ ] Social preview image displays correctly
- [ ] Favicon appears in browser tabs
- [ ] 404 page customized and working
- [ ] Redirects tested (/youtube, /subscribe, etc.)
- [ ] Contact email working
- [ ] Logo and branding correct

## Maintenance

### Regular Updates
```bash
# Update content
git add .
git commit -m "Update: description of changes"
git push
```

### Monitor
- Check Netlify analytics monthly
- Review form submissions weekly
- Update YouTube videos regularly
- Renew domain annually (if not auto-renew)

### Backup
- GitHub repository is your backup
- Netlify keeps deployment history
- Export form submissions periodically

## Support Resources

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Community:** https://answers.netlify.com
- **YouTube API Docs:** https://developers.google.com/youtube/v3
- **Lighthouse:** https://developer.chrome.com/docs/lighthouse

## Next Steps

After successful deployment:
1. Share site URL with community
2. Promote on social media
3. Submit CFP announcement
4. Gather feedback from users
5. Iterate and improve

---

**Questions?** Open an issue on GitHub or contact hello@cloudnativevalencia.com
