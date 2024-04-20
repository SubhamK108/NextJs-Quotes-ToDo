import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F3F5" },
    { media: "(prefers-color-scheme: dark)", color: "#181818" }
  ]
};

export const metadata: Metadata = {
  title: "Quotes & ToDo",
  description: "A simple ToDo app that also shows random quotes from eminent personalities.",
  icons: {
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180"
    },
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" }
    ]
  },
  // manifest: "/manifest.json",
  twitter: {
    card: "summary",
    site: "https://quotes-todo.subhamk.com",
    title: "Quotes & ToDo",
    description: "A simple ToDo app that also shows random quotes from eminent personalities.",
    images: [{ url: "https://quotes-todo.subhamk.com/android-chrome-192x192.png" }],
    creator: "@SubhamK108"
  },
  openGraph: {
    type: "website",
    title: "Quotes & ToDo",
    description: "A simple ToDo app that also shows random quotes from eminent personalities.",
    siteName: "Quotes & ToDo",
    url: "https://quotes-todo.subhamk.com",
    images: [{ url: "https://quotes-todo.subhamk.com/android-chrome-192x192.png" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="max-w-[100vw] overflow-x-hidden" lang="en">
      <body className="max-w-[100vw] overflow-x-hidden bg-[#F2F3F5] dark:bg-[#181818] text-[#404756] dark:text-[#ffffffa6]">
        {children}
      </body>
    </html>
  );
}
