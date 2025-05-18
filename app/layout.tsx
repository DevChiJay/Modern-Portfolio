import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import ClientComponents from "@/components/ClientComponents";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevChi's Portfolio",
  description: "Modern & Minimal Portfolio built with Next.js | Professional web developer showcasing projects and skills",
  keywords: ["portfolio", "web developer", "frontend", "next.js", "react", "javascript"],
  authors: [{ name: "DevChi" }],
  creator: "DevChi",
  publisher: "DevChi",
  applicationName: "DevChi Portfolio",
  metadataBase: new URL("https://devchi.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devchi.me",
    title: "DevChi's Portfolio",
    description: "Modern & Minimal Portfolio built with Next.js | Professional web developer showcasing projects and skills",
    siteName: "DevChi Portfolio",
    images: [
      {
        url: "/og-image.png", // Add an Open Graph image (create this image in public folder)
        width: 1200,
        height: 630,
        alt: "DevChi Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevChi's Portfolio",
    description: "Modern & Minimal Portfolio built with Next.js | Professional web developer showcasing projects and skills",
    images: ["/og-image.png"], // Use the same image as for Open Graph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ClientComponents />
        </ThemeProvider>
      </body>
    </html>
  );
}
