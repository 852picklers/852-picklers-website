import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navigation";
import { LanguageProvider } from "./context/LanguageContext";
import { GoogleAnalytics } from '@next/third-parties/google'; // 安裝後即可使用

const inter = Inter({ subsets: ["latin"] });

// ★ 更新 SEO Metadata
export const metadata: Metadata = {
  title: "852 Picklers | 香港匹克球場地整合及專業裝備",
  description: "852 Picklers 提供全港最齊全的匹克球場地資訊及預訂指引。同步推出對標國際旗艦配置的 Model 001 碳纖維球拍，專為香港球友打造的講究用料與主場風格。",
  keywords: "香港匹克球, Pickleball Hong Kong, 匹克球拍推薦, 852 Picklers, T700 Carbon Paddle, 匹克球場地預約, HK Pickleball Court",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-HK">
      <body className={inter.className}>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
      {/* ★ 記得將 G-XXXXXXXXXX 換成您 GA4 的真正 ID */}
      <GoogleAnalytics gaId="G-29Y1HRESBK" />
    </html>
  );
}