import type { Metadata } from "next";

import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "South Yorkshire Black Tech Expo 2026",
    template: "%s | SY Black Tech Expo",
  },

  description:
    "Join the South Yorkshire Black Tech Expo 2026 — a powerful gathering of innovators, founders, and leaders driving impact in technology, business, and community.",

  keywords: [
    "Tech Expo UK",
    "South Yorkshire Tech",
    "Black Tech Expo",
    "Startup Event UK",
    "Cyber Security Training",
    "Innovation Conference",
    "Community Impact",
    "AI Event UK",
  ],

  authors: [{ name: "South Yorkshire Black Tech Expo Team" }],
  creator: "South Yorkshire Black Tech Expo",
  publisher: "South Yorkshire Black Tech Expo",

  metadataBase: new URL("https://gmblacktechexpo.co.uk"),

  openGraph: {
    title: "South Yorkshire Black Tech Expo 2026",
    description:
      "A community-driven tech event bringing together innovators, founders, and leaders. Join us April 10, 2026.",
    url: "https://gmblacktechexpo.co.uk",
    siteName: "South Yorkshire Black Tech Expo",
    images: [
      {
        url: "/logo/sylogo.png",
        width: 1200,
        height: 630,
        alt: "South Yorkshire Black Tech Expo",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "South Yorkshire Black Tech Expo 2026",
    description:
      "Join innovators, founders & leaders shaping the future of tech and community.",
    images: ["/logo/sylogo.png"],
  },

  icons: {
    icon: "/logo/sylogo.png",
    shortcut: "/logo/sylogo.png",
    apple: "/logo/sylogo.png",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Providers>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#0D1B3E",
                color: "#fff",
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
