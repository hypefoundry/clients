# Hype Foundry — Marketing Funnel Website

A complete, production-ready static website for Hype Foundry, a design subscription business. Built with clean HTML, CSS, and vanilla JavaScript — no frameworks, no build tools.

## 🚀 Features

- **6 Complete Pages**: Homepage, Pricing, How It Works, Work/Portfolio, About, Contact
- **Modern Design**: Inspired by Wise, Afterpay, and Bolt — clean, vibrant, professional
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Interactive Components**: Pricing toggle, FAQ accordion, portfolio filtering, mobile menu
- **SEO Optimized**: Meta tags, Open Graph tags, semantic HTML
- **Accessible**: Proper heading hierarchy, ARIA labels, focus states
- **Fast Loading**: No frameworks, minimal file size, optimized performance

## 📁 File Structure

```
/
├── index.html              # Homepage
├── pricing.html            # Pricing page
├── how-it-works.html       # How It Works page
├── work.html               # Portfolio/Work page
├── about.html              # About page
├── contact.html            # Contact page with Cal.com embed
├── css/
│   └── styles.css          # All styles (variables, components, responsive)
├── js/
│   └── main.js             # All JavaScript (menu, pricing toggle, FAQ, filters)
├── assets/
│   ├── images/             # Placeholder for images
│   └── fonts/              # Placeholder for custom fonts
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Background**: White (#FFFFFF) and Light Grey (#F9FAFB)
- **Text**: Near Black (#111827), Grey (#6B7280), Light Grey (#9CA3AF)
- **Accent Gradient**: Green to Teal (#10B981 → #06B6D4)
- **Borders**: Light Grey (#E5E7EB, #F3F4F6)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Heading Font**: Cabinet Grotesk (fallback to Inter)
- **Font Sizes**: 12px to 60px (responsive)

### Spacing
- Uses consistent spacing scale from 8px to 128px
- Mobile-first responsive breakpoints: 640px, 768px, 1024px, 1280px

## 🛠️ Customization Guide

### 1. Update Colors

Edit the CSS variables in `/css/styles.css` (lines 10-50):

```css
:root {
  --color-bg-primary: #FFFFFF;
  --color-accent-primary: #10B981;
  --gradient-primary: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);
  /* ... etc */
}
```

### 2. Update Pricing

**Monthly and Quarterly Prices:**
- Edit pricing display in `/index.html` and `/pricing.html`
- Update the pricing object in `/js/main.js` (lines 57-68)

**Stripe Payment Links:**
1. Create your Stripe Payment Links at https://dashboard.stripe.com/payment-links
2. Replace placeholder URLs in:
   - `/js/main.js` (lines 49-52)
   - `/index.html` (search for "MONTHLY_PLACEHOLDER" and "QUARTERLY_PLACEHOLDER")
   - `/pricing.html` (same placeholders)

### 3. Update Cal.com Booking Link

In `/contact.html` (line 87), replace the iframe src:

```html
<iframe
  src="https://cal.com/YOUR_USERNAME/YOUR_EVENT"
  width="100%"
  height="800"
  frameborder="0"
></iframe>
```

Alternative: Use the Cal.com embed script (see commented code in contact.html)

### 4. Add Your Logo

Replace the text logo "Hype Foundry" with an image:

```html
<!-- Current: -->
<a href="/index.html" class="nav__logo">Hype Foundry</a>

<!-- Replace with: -->
<a href="/index.html" class="nav__logo">
  <img src="/assets/images/logo.svg" alt="Hype Foundry" height="32">
</a>
```

### 5. Add Portfolio Images

Replace placeholder gradients in `/work.html` with real images:

```html
<!-- Current: -->
<div style="width: 100%; height: 100%; background: linear-gradient(...);">

<!-- Replace with: -->
<img src="/assets/images/project-name.jpg" alt="Project Name" class="work-item__image">
```

### 6. Update Contact Information

Search and replace these placeholders across all files:
- `hello@hypefoundry.com` → Your email
- `Adelaide, Australia` → Your location
- Social media links (Twitter, LinkedIn, Instagram)

### 7. Add Favicon

Place your favicon files in `/assets/images/`:
- `favicon.svg` (recommended)
- `favicon.ico` (fallback)
- `apple-touch-icon.png` (180x180px for iOS)

### 8. Update SEO Meta Tags

In each HTML file, update:
- `<title>` tags
- `<meta name="description">` content
- `<meta property="og:title">` and `og:description`
- `<meta property="og:image">` with actual image URL (1200x630px recommended)

### 9. Customize Copy

All copy is written in first-person, founder-to-founder tone. Edit directly in the HTML files:
- **Homepage**: index.html
- **Pricing**: pricing.html
- **How It Works**: how-it-works.html
- **About**: about.html (personalize your story here)

## 🔧 Technical Notes

### JavaScript Interactions

All interactions are handled in `/js/main.js`:

1. **Mobile Navigation**: Hamburger menu toggle
2. **Pricing Toggle**: Monthly/quarterly price switching
3. **FAQ Accordion**: Expand/collapse FAQ items
4. **Portfolio Filtering**: Filter work by category
5. **Smooth Scroll**: For anchor links
6. **Active Nav Link**: Highlights current page
7. **Scroll Animations**: Fade-in on scroll for elements with `data-animate`

### CSS Architecture

- **Variables**: All colors, spacing, fonts defined as CSS variables
- **Mobile-First**: Base styles for mobile, enhanced for larger screens
- **No Frameworks**: Pure CSS, no Tailwind/Bootstrap
- **Modular**: Sections clearly commented and separated

### Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

This is a static site. Upload all files to any host:

### Option 1: Netlify (Recommended)
1. Drag and drop the entire folder to https://app.netlify.com/drop
2. Done! Your site is live.

### Option 2: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow prompts

### Option 3: GitHub Pages
1. Create a GitHub repo
2. Push all files to the repo
3. Enable GitHub Pages in repo settings
4. Your site will be live at `username.github.io/repo-name`

### Option 4: Traditional Hosting (cPanel, FTP)
1. Connect via FTP to your hosting account
2. Upload all files to `public_html` or `www` directory
3. Ensure `index.html` is in the root

## 📝 Customization Checklist

Before going live, make sure you've updated:

- [ ] Stripe Payment Links (monthly and quarterly)
- [ ] Cal.com booking link
- [ ] Email address (`hello@hypefoundry.com`)
- [ ] Social media links (Twitter, LinkedIn, Instagram)
- [ ] Logo (replace text with image)
- [ ] Favicon files
- [ ] Portfolio images (replace gradient placeholders)
- [ ] About page story (personalize your background)
- [ ] SEO meta tags and Open Graph images
- [ ] Google Analytics or tracking code (if needed)

## 🎯 Performance Tips

1. **Optimize Images**: Compress all images before uploading (use TinyPNG or ImageOptim)
2. **Use WebP**: Convert images to WebP format for better compression
3. **Lazy Loading**: Add `loading="lazy"` to images below the fold
4. **Minify CSS/JS**: Use online tools to minify before deploying (optional)
5. **Enable Caching**: Configure server headers for static assets

## 🔒 Security Notes

1. Never commit real Stripe API keys (only use Payment Links)
2. Use HTTPS for all production deployments
3. Keep placeholder URLs commented in code for easy identification
4. Validate all form inputs (if you add any server-side forms)

## 📧 Support

If you have questions about the code:
1. Check the inline comments in HTML, CSS, and JS files
2. Review this README
3. All customization points are clearly marked with comments

## 📄 License

This website was custom-built for Hype Foundry. All rights reserved.

---

**Built with:**
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)
- Cal.com (for booking)
- Stripe (for payments)

**No frameworks. No build tools. Just clean, fast, production-ready code.**
