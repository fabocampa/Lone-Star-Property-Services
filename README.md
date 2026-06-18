# Lone Star Property Services — Landing Page

A fast, conversion-focused, fully responsive landing page for **Lone Star Property Services**.
Built with plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies (just Google Fonts).

> **Quality Work. Fair Pricing. No Excuses.**

---

## 🚀 Quick start

Just open `index.html` in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000
# then visit http://localhost:8000
```

Deploy by dropping the whole folder onto any static host — **Netlify, Vercel, GitHub Pages, Cloudflare Pages**, etc.

---

## 📁 Structure

```
index.html        # All page content / sections
css/styles.css    # Brand styling (navy / Texas red / white)
js/main.js        # Mobile menu, scroll reveal, before/after slider, quote form
assets/           # Put your logo + project photos here
```

---

## ✅ Before you go live — customize these

The page works out of the box, but swap in your real content for the best results:

### 1. Logo  ← **important**
Save your logo as **`assets/logo.png`** (transparent background recommended).
Until you do, the header shows a clean text version of your name automatically.

### 2. Photos
The hero, "Our Work" gallery, and before/after slider currently use stock photos.
**Replace them with your real project photos** for maximum trust and conversions:
- Hero background → in `index.html`, the `.hero__bg` image (a great wide shot of a remodeled home).
- Gallery → the six `.gallery__item` images.
- Before/After → the two images inside `#ba`.

> Tip: if any image fails to load, it gracefully falls back to an on-brand placeholder, so the layout never breaks.

### 3. Customer reviews
The three reviews in the **Reviews** section are realistic samples. Replace them with
real testimonials (name + city) — ideally pulled from Google reviews.

### 4. Quote form delivery
By default the **Get My Free Quote** form opens the visitor's email app addressed to a placeholder.
Update it in **`js/main.js`**:
```js
var BUSINESS_EMAIL = 'info@lonestarpropertyservices.com'; // ← your email
```
For a more seamless experience (no email app popup), connect the form to a free service like
**[Formspree](https://formspree.io)** or **[Web3Forms](https://web3forms.com)** — see comments in `js/main.js`.

### 5. Phone number
Currently **281-795-9042** throughout (click-to-call + click-to-text). Search & replace if it changes.

---

## 🎨 Brand colors (from the logo)

| Token | Hex | Use |
|-------|-----|-----|
| Navy | `#16243F` | Headers, primary text, dark sections |
| Texas Red | `#C8202E` | CTAs, accents |
| Gold | `#F4B40A` | Stars, highlights |
| Cream | `#F7F9FC` | Light section backgrounds |

All colors are CSS variables at the top of `css/styles.css` — change once, update everywhere.

---

## ♿ Built-in best practices

- Mobile-first responsive (tested 375 / 768 / 1024 / 1440px)
- Sticky mobile **Call / Text / Quote** bar for one-tap contact
- Click-to-call & click-to-text links
- Accessible: skip link, focus states, ARIA labels, semantic markup, 4.5:1+ contrast
- `prefers-reduced-motion` respected
- SEO: meta description, Open Graph tags, and LocalBusiness structured data
- No layout shift, lazy-loaded images, graceful image fallbacks
