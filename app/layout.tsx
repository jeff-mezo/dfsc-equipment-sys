import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/navbar'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DFSC-ERS",
  description: "DFSC Equipment Reservation System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
