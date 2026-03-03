import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navigation";
import { LanguageProvider } from "./context/LanguageContext";
import { GoogleAnalytics } from '@next/third-parties/google';

// ★ 優化點 1：加入 display: "swap"，防止字體加載時畫面空白 (Render-blocking)
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", 
});

export const metadata: Metadata = {
  title: "852 Picklers | 香港匹克球場地整合及專業裝備",
  description: "852 Picklers 提供全港最齊全的匹克球場地資訊及預訂指引。專為香港球友打造的講究用料與主場風格。",
  keywords: "香港匹克球, Pickleball Hong Kong, 匹克球拍推薦, 852 Picklers, 匹克球場地預約",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      {/* ★ 優化點 2：在 body 加上 antialiased 提升渲染穩定性 */}
      <body className={`${inter.className} antialiased`}>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
        
        {/* ★ 優化點 3：GA4 腳本建議放在 body 底部以減少對首屏渲染的影響 */}
        <GoogleAnalytics gaId="G-29Y1HRESBK" />
      </body>
    </html>
  );
}