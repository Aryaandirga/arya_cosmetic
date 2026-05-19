# Hydralune — Frontend Portfolio Project

> Live demo: **[https://arya-cosmetic.pages.dev](https://arya-cosmetic.pages.dev)**

Landing page produk skincare premium yang dibangun sebagai portfolio project untuk mendemonstrasikan kemampuan frontend development — mulai dari UI/UX implementation, animasi, performa, hingga keamanan web.

---

## Tentang Project

Hydralune adalah landing page fiktif untuk brand skincare premium. Project ini dibuat dari nol tanpa template, dengan fokus pada:

- Animasi yang halus dan terasa premium menggunakan GSAP & Framer Motion
- Smooth scrolling experience dengan Lenis
- Desain yang fully responsive — desktop, tablet, dan mobile
- Implementasi keamanan web (CSP, HSTS, security headers)
- Performa optimal dengan static export dan Next.js Image Optimization

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + inline styles |
| Animation | GSAP 3 + ScrollTrigger, Framer Motion |
| Smooth Scroll | Lenis |
| Font | Plus Jakarta Sans via `next/font` |
| Deployment | Cloudflare Pages (Static Export) |

---

## Fitur Utama

**Animasi & Interaksi**
- Page loader dengan animasi clip-path
- Hero section dengan parallax scroll, float animation, dan entrance animation
- Horizontal scroll collection dengan GSAP pin
- Parallax gallery dengan multi-layer depth
- Timeline perjalanan brand dengan animated progress line
- Scroll-triggered entrance animation di setiap section

**UI/UX**
- Navbar dengan hide-on-scroll, blur backdrop, dan fullscreen mobile menu
- Shop modal dengan product grid dan link ke Shopee, Tokopedia, TikTok Shop
- Contact form dengan validasi, sanitasi input, dan rate limiting
- Responsive di semua breakpoint (320px – 1440px+)

**Keamanan**
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- Permissions-Policy, X-XSS-Protection
- Input sanitization pada contact form
- Security headers via `_headers` file (aktif di Cloudflare Pages)

---

## Struktur Project

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, font
│   ├── page.tsx            # Entry point
│   └── globals.css         # Global styles, CSS variables
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navbar dengan mobile menu
│   │   └── PageLoader.tsx  # Intro loader animation
│   ├── sections/
│   │   ├── Hero.tsx        # Hero dengan 3-col grid + parallax
│   │   ├── About.tsx       # Brand story dengan image stack
│   │   ├── Features.tsx    # 6 feature cards
│   │   ├── Timeline.tsx    # Brand journey timeline
│   │   ├── ParallaxGallery.tsx  # Multi-layer parallax
│   │   ├── HorizontalScroll.tsx # GSAP horizontal scroll
│   │   ├── Contact.tsx     # Contact form + info
│   │   └── CTA.tsx         # CTA section + footer
│   └── ui/
│       ├── ShopModal.tsx   # Product shop modal
│       └── button.tsx      # Base button component
├── hooks/
│   ├── useLenis.ts         # Lenis smooth scroll init
│   └── useScrollTo.ts      # Scroll to section helper
└── lib/
    ├── gsap.ts             # GSAP + ScrollTrigger setup
    ├── lenis.ts            # Lenis singleton
    └── utils.ts            # Utility functions
```

---

## Menjalankan Secara Lokal

**Prerequisites:** Node.js 20+

```bash
# Clone repository
git clone https://github.com/Aryaandirga/arya_cosmetic.git
cd arya_cosmetic

# Install dependencies
npm install

# Buat file environment
cp .env.local.example .env.local
# Isi nilai di .env.local sesuai kebutuhan

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

```bash
# Build untuk production
npm run build

# Preview hasil build
npx serve out
```

---

## Environment Variables

| Variable | Keterangan |
|---|---|
| `NEXT_PUBLIC_WA_NUMBER` | Nomor WhatsApp untuk contact form |
| `NEXT_PUBLIC_WA_EMAIL` | Email yang ditampilkan di halaman contact |
| `NEXT_PUBLIC_INSTAGRAM` | Username Instagram brand |

Semua variabel menggunakan prefix `NEXT_PUBLIC_` karena memang ditampilkan secara publik di halaman website.

---

## Deployment

Project ini di-deploy ke **Cloudflare Pages** dengan konfigurasi:

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `20` |

Security headers diterapkan via `public/_headers` yang otomatis aktif di Cloudflare Pages.

---

## Author

**Arya Andirga**
- GitHub: [@Aryaandirga](https://github.com/Aryaandirga)
- Live: [arya-cosmetic.pages.dev](https://arya-cosmetic.pages.dev)
