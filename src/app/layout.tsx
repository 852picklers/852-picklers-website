import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navigation";
import { LanguageProvider } from "./context/LanguageContext";
import { GoogleAnalytics } from '@next/third-parties/google';

// ★ 優化：加入 display: "swap"，防止字體下載時頁面空白
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", 
});

export const metadata: Metadata = {
  title: "852 Picklers | 香港匹克球場地整合及專業裝備",
  description: "852 Picklers 提供全港最齊全的匹克球場地資訊及預訂指引。專為香港球友打造的講究用料與主場風格。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
        {/* ★ GA4 放在 body 底部以降低渲染阻塞 */}
        <GoogleAnalytics gaId="G-29Y1HRESBK" />
      </body>
    </html>
  );
}