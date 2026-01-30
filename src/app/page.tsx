"use client";

import { useState } from "react";
import Image from "next/image";
import { content } from "./data/content";
import Intro from "./components/Intro";
import Features from "./components/Features";
import Spec from "./components/Spec";
import Pricing from "./components/Pricing";
import FloatingCTA from "./components/FloatingCTA";
import HeroScroll from "./components/HeroScroll";

export default function Home() {
  const [lang, setLang] = useState<'en' | 'cn'>('cn');
  const t = content[lang];
  const toggleLang = () => setLang(prev => prev === 'en' ? 'cn' : 'en');

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background selection:bg-accent selection:text-black relative">
      
      {/* NAV 修復：加入背景色與模糊效果，讓 Logo 不再突兀 */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        
        {/* 左側：Logo (尺寸微調，讓它在 Bar 裡面看起來舒適) */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 cursor-pointer hover:scale-105 transition-transform duration-300">
           <Image 
             src="/logo.png" 
             alt="852 Picklers Logo" 
             fill 
             className="object-contain object-left" // 靠左對齊
           />
        </div>

        {/* 右側：語言切換 */}
        <button 
          onClick={toggleLang}
          className="font-body text-xs font-bold uppercase tracking-widest border border-white/20 text-white px-6 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 rounded-sm"
        >
          {t.nav.switch}
        </button>
      </nav>

      {/* Floating CTA */}
      <FloatingCTA text={t.pricing.cards[0].cta} />

      {/* Hero Scroll Section */}
      <HeroScroll t={t} />

      {/* Features - 傳入 lang 參數 */}
      <Features data={t.features} lang={lang} />

      {/* Spec */}
      <Spec data={t.spec} />

      {/* Pricing */}
      <div id="pricing" className="w-full flex justify-center">
        <Pricing data={t.pricing} />
      </div>

      {/* Intro */}
      <Intro data={t.intro} />

    </div>
  );
}