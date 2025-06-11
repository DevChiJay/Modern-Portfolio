import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import ClientComponents from "@/components/ClientComponents";
import dynamic from "next/dynamic";

// Only import analytics in production
const GoogleAnalytics = dynamic(() => 
  process.env.NODE_ENV === "production" 
    ? import("@/components/GoogleAnalytics").then(mod => mod.GoogleAnalytics)
    : Promise.resolve(() => null)
);


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevChi Software Engineer | Portfolio",
  description: "DevChi's Portfolio - A modern and minimal portfolio built with Next.js showcasing web development skills and projects.",
  keywords: ["portfolio", "web developer", "frontend", "backend", "node.js", "next.js", "react", "javascript"],
  authors: [{ name: "DevChi" }],
  creator: "DevChi",
  publisher: "DevChi",
  metadataBase: new URL("https://devchi.me"),
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevChi's Portfolio",
    description: "DevChi's Portfolio - A modern and minimal portfolio built with Next.js showcasing web development skills and projects.",// Use the same image as for Open Graph
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {process.env.NODE_ENV === "production" && <GoogleAnalytics />}
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
