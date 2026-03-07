import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";

// app/layout.js
export const metadata = {
  title: "Edwin's Blog",
  description: 'modern, performance-focused developer blog ',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
}
// export const metadata: Metadata = {
//   title: "Edwin's Blog",
//   description: "Created by Edwin Matema",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className='dark:bg-slate-800 overflow-x-hidden w-full relative'
      >
        <Navbar />
        <main className="px-4 md:px-6 mx-auto">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

// public/site.webmanifest
// {"name":"","short_name":"","icons":[{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"theme_color":"#ffffff","background_color":"#ffffff","display":"standalone"}
