"use client";

import Image from "next/image";
import { content } from "../data/content";
import Intro from "../components/Intro";
import Features from "../components/Features";
import Spec from "../components/Spec";
import Pricing from "../components/Pricing";
import FloatingCTA from "../components/FloatingCTA";
import HeroScroll from "../components/HeroScroll";
import Footer from "../components/Footer";
import DesignShowcase from "../components/DesignShowcase"; 
import { useLanguage } from "../context/LanguageContext"; // ★ 引入全局語言大腦

export default function ShopPage() {
  // ★ 讀取 Navbar 傳過來的語言狀態，並轉換成 content.ts 認得的 key
  const { lang } = useLanguage(); 
  const contentLang = lang === "EN" ? "en" : "cn";
  const t = content[contentLang];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-background selection:bg-accent selection:text-black relative">
      
      {/* Floating CTA */}
      <FloatingCTA 
        text={t.pricing.cards[0].cta} 
        link={t.pricing.cards[0].link} 
      />

      {/* 1. Hero */}
      <HeroScroll t={t} />

      {/* ★★★ 2. Design Showcase (新增區塊) ★★★ */}
      <section id="design" className="w-full">
        <DesignShowcase data={t.design} />
      </section>

      {/* 3. Features */}
      <section id="features" className="w-full">
        <Features data={t.features} lang={contentLang} />
      </section>

      {/* 4. Spec */}
      <section id="specs" className="w-full">
        <Spec data={t.spec} />
      </section>

      {/* 5. Pricing */}
      <div id="pricing" className="w-full flex justify-center">
        <Pricing data={t.pricing} />
      </div>

      {/* 7. Footer */}
      <Footer data={t.footer} />

    </div>
  );
}