import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PageLoader } from "@/components/layout/PageLoader";
import { Navbar } from "@/components/layout/Navbar";

// Font di-host sendiri oleh Next.js — tidak ada request ke fonts.googleapis.com
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hydralune — Pure Hydration",
  description:
    "Formula hidrasi premium untuk mendukung performa tubuh dan pikiran sepanjang hari.",
  keywords: [
    "hydralune",
    "skincare",
    "hydration",
    "serum",
    "moisturizer",
    "Indonesia",
  ],
  authors: [{ name: "Hydralune" }],
  creator: "Hydralune",

  // Open Graph — untuk preview saat share di sosmed
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://hydralune.com",
    siteName: "Hydralune",
    title: "Hydralune — Pure Hydration",
    description:
      "Formula hidrasi premium untuk mendukung performa tubuh dan pikiran sepanjang hari.",
    images: [
      {
        url: "/images/og-image.jpg", // ← buat gambar 1200x630px
        width: 1200,
        height: 630,
        alt: "Hydralune Products",
      },
    ],
  },

  // Twitter card
  twitter: {
    card: "summary_large_image",
    title: "Hydralune — Pure Hydration",
    description: "Formula hidrasi premium untuk mendukung performa tubuh.",
    images: ["/images/og-image.jpg"],
  },

  // Favicon
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={plusJakartaSans.variable}>
      <body>
        <PageLoader />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
