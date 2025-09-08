
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "World-class dark-themed portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <header className="border-b border-neutral-800">
          <nav className="container flex h-16 items-center justify-between">
            <Link href="/" className="font-semibold tracking-wide">My Portfolio</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/projects">Projects</Link>
              <Link href="#contact">Contact</Link>
            </div>
          </nav>
        </header>
        <main className="container py-12">{children}</main>
        <footer className="border-t border-neutral-800">
          <div className="container py-8 text-sm text-neutral-400">
            © {new Date().getFullYear()} • Built with Next.js • Dark by default
          </div>
        </footer>
      </body>
    </html>
  );
}
