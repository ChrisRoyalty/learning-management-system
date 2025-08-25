// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/** ⬇️ Set this to your real domain */
const SITE_URL = "https://your-domain.com";
const SITE_NAME = "RAD5 Academy LMS";
const OG_IMAGE = "/og.png"; // put 1200x630 at public/og.png

// ✅ themeColor belongs here (not inside page metadata)
export const viewport: Viewport = {
  themeColor: "#0a5bd6",
  // Or use per-scheme:
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#0a5bd6" },
  //   { media: "(prefers-color-scheme: dark)",  color: "#0a5bd6" },
  // ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description:
    "Modern Learning Management System for courses, assignments, and progress tracking.",
  keywords: ["RAD5 Academy", "LMS", "online courses", "assignments", "students", "instructors"],
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },

  // Favicons — if you keep /public/rad5-logo.png as favicon
  icons: {
    icon: [{ url: "/rad5-logo.png", type: "image/png", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }], // optional
  },
  manifest: "/manifest.webmanifest",

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "RAD5 Academy’s Learning Management System for students and instructors.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "RAD5 Academy’s LMS.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Organization JSON-LD */}
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "RAD5 Academy",
              url: SITE_URL,
              logo: "/rad5-logo.png",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
