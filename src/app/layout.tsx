import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontDisplay, fontSans } from "./fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/data/site";
import { Geist } from "next/font/google";


const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Web, Software & AI/ML Engineering Studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Web, Software & AI/ML Engineering Studio`,
    description: site.description,
    images: [{ url: "/assets/og-image.svg", width: 1200, height: 630, alt: site.name }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Web, Software & AI/ML Engineering Studio`,
    description: site.description,
    images: ["/assets/og-image.svg"],
  },
  icons: {
    icon: "/assets/logo.svg",
    shortcut: "/assets/logo.svg",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0e1116",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={"font-manrope"} >
      <body className="grain font-manrope">
        <JsonLd />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <BackToTop />
        <CustomCursor />
      </body>
    </html>
  );
}
