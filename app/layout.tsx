import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Edwin's Blog",
  description: "Created by Edwin Matema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='dark:bg-slate-800'
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
