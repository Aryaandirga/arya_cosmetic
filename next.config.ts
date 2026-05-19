import type { NextConfig } from "next";

const ContentSecurityPolicy = [
  "default-src 'self'",
  // Next.js memerlukan 'unsafe-inline' untuk inline scripts & styles
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  // Fonts di-serve dari domain sendiri via next/font (tidak perlu fonts.googleapis.com lagi)
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  // Gambar lokal + data URI untuk Next.js Image Optimization
  "img-src 'self' data: blob:",
  // Fetch/XHR hanya ke domain sendiri + WhatsApp untuk form contact
  "connect-src 'self' https://wa.me",
  // Tidak ada iframe yang diizinkan
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Tambah domain kalau pakai gambar eksternal
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
          // Strict Transport Security — paksa HTTPS selama 2 tahun
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;


//contoh ada tambahan third party 
// const ContentSecurityPolicy = [
//  "default-src 'self'",
//  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://static.hotjar.com https://client.crisp.chat",
//  "style-src 'self' 'unsafe-inline' https://client.crisp.chat",
//  "font-src 'self' https://client.crisp.chat",
//  "img-src 'self' data: blob: https://www.google-analytics.com https://static.hotjar.com",
//  "connect-src 'self' https://wa.me https://analytics.google.com https://vars.hotjar.com https://client.crisp.chat wss://client.crisp.chat",
//  "frame-src 'none'",
//  "frame-ancestors 'none'",
//  "object-src 'none'",
//  "base-uri 'self'",
//  "form-action 'self'",
//  "upgrade-insecure-requests",
//].join("; ");