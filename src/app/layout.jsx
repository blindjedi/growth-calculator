import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navigation from "./ui/Navigation"; // Adjust the import path as necessary

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InvestingHub",
  description: "Your go-to resource for investment tools and knowledge",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="container mx-auto p-4">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}