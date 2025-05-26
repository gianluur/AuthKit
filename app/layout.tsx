import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap"
});


export const metadata: Metadata = {
  title: "AuthKit",
  description: "Made by www.github.com/gianluur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} dark antialiased`}>
        {children}
      </body>
    </html>
  );
}
