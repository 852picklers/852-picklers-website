import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google"; // Changed to Oswald
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading", // Renamed for semantic clarity
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "852 Picklers | Premium Sports",
  description: "Hong Kong Premium Pickleball",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <body className={`${oswald.variable} ${inter.variable} bg-background text-foreground antialiased selection:bg-accent selection:text-black`}>
        {/* Dark noise texture for matte finish */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] bg-noise"></div>
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}