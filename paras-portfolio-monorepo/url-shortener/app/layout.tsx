
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = { title: "URL Shortener", description: "Simple short links with QR" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className="dark"><body className="p-6">{children}</body></html>;
}
