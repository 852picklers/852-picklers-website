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
import Footer from "./components/Footer";

export default function Home() {
  const [lang, setLang] = useState<'en' | 'cn'>('cn');
  const t = content[lang];
  const toggleLang = () => setLang(prev => prev === 'en' ? 'cn' : 'en');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background selection:bg-accent selection:text-black relative">
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div 
          className="relative w-20 h-20 md:w-24 md:h-24 cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
           <Image 
             src="/logo.png" 
             alt="852 Picklers Logo" 
             fill 
             className="object-contain object-left" 
           />
        </div>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {t.nav.menu && t.nav.menu.map((item: any, index: number) => (
                <button
                    key={index}
                    onClick={() => scrollToSection(item.target)}
                    className="text-xs lg:text-sm font-bold text-gray-400 hover:text-accent uppercase tracking-widest transition-colors"
                >
                    {item.label}
                </button>
            ))}
        </div>

        <button 
          onClick={toggleLang}
          className="font-body text-xs font-bold uppercase tracking-widest border border-white/20 text-white px-6 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 rounded-sm"
        >
          {t.nav.switch}
        </button>
      </nav>

      {/* Floating CTA */}
      <FloatingCTA text={t.pricing.cards[0].cta} />

      {/* 1. Hero */}
      <HeroScroll t={t} />

      {/* 2. Features (技術解密) - 在 Spec 之前 */}
      <section id="features" className="w-full">
        <Features data={t.features} lang={lang} />
      </section>

      {/* 3. Spec (規格參數) */}
      <section id="specs" className="w-full">
        <Spec data={t.spec} />
      </section>

      {/* 4. Pricing */}
      <div id="pricing" className="w-full flex justify-center">
        <Pricing data={t.pricing} />
      </div>

      {/* 5. Intro (Brand Story) */}
      <section id="story" className="w-full">
        <Intro data={t.intro} />
      </section>

      {/* 6. Footer */}
      <Footer data={t.footer} />

    </div>
  );
}
