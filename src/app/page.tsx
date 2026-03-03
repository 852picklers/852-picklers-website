"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  const ui = {
    ZH: {
      club: "852 Picklers 致力推動香港匹克球文化",
      cards: {
        courts: { title: "香港匹克球場地整合", subtitle: "球場資訊與預訂指南" },
        shop: { title: "852 PICKLERS 裝備商店", subtitle: "匹克球裝備" }
      },
      whoWeAre: "WHO WE ARE",
      slogan: "Born in 852.\nBuilt for the Court.",
      desc: "852 Picklers 是一個屬於香港人的匹克球品牌。我們致力於推廣這項新興運動，並為香港匹克球注入主場風格。",
      readStory: "品牌故事 →",
      contact: "聯絡我們"
    },
    EN: {
      club: "HK Pickleball Culture & Community",
      cards: {
        courts: { title: "HK PICKLERS COURTS", subtitle: "Courts Details & Booking Guide" },
        shop: { title: "852 PICKLERS SHOP", subtitle: "PICKLEBALL GEAR" }
      },
      whoWeAre: "WHO WE ARE",
      slogan: "Born in 852.\nBuilt for the Court.",
      desc: "852 Picklers is a pickleball brand dedicated to Hong Kongers. We aim to promote this fast-growing sport and to inject \"852 Soul\" into every game.",
      readStory: "Read Story →",
      contact: "CONTACT US"
    }
  }[lang];

  const CARDS = [
    {
      id: "courts",
      anchor: "courts-card",
      title: ui.cards.courts.title,
      subtitle: ui.cards.courts.subtitle,
      link: "/courts",
      image: "/home-court.png",
      titleColor: "text-neon-red",
      hoverText: "group-hover:text-neon-red",
      hoverLine: "group-hover:bg-neon-red",
      hoverBorder: "group-hover:border-neon-red",
      hoverShadow: "group-hover:shadow-[0_0_50px_rgba(255,0,60,0.4)]",
      hoverBg: "group-hover:bg-neon-red/5",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M21 9H3"/><path d="M21 15H3"/><path d="M12 3v18"/></svg>
      )
    },
    {
      id: "shop",
      anchor: "gear-card",
      title: ui.cards.shop.title,
      subtitle: ui.cards.shop.subtitle,
      link: "/shop",
      image: "/home-gear.png",
      titleColor: "text-neon-green",
      hoverText: "group-hover:text-neon-green",
      hoverLine: "group-hover:bg-neon-green",
      hoverBorder: "group-hover:border-neon-green",
      hoverShadow: "group-hover:shadow-[0_0_50px_rgba(204,255,0,0.4)]",
      hoverBg: "group-hover:bg-neon-green/5",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
      
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent/5 blur-[120px] rounded-full"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-neon-blue/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-12 flex flex-col gap-16 md:gap-24">
        
        <header className="flex flex-col items-center justify-center pt-20 md:pt-28 pb-4">
           <div className="flex items-center justify-center gap-4 md:gap-6">
               <div className="relative w-16 h-16 md:w-20 md:h-20 drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                  {/* ★ 優化：Logo 必須優先加載，解決 PageSpeed 提到的 82.9 KiB 延遲 */}
                  <Image src="/logo.png" alt="Logo" fill priority className="object-contain" />
               </div>
               <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tighter text-center drop-shadow-2xl">
                  852 Picklers
               </h1>
           </div>
           <p className="text-accent font-mono text-xs md:text-sm tracking-[0.4em] uppercase mt-4 font-bold text-center">
              {ui.club}
           </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full pb-10">
          {CARDS.map((item, index) => (
            <Link href={item.link} key={item.id} id={item.anchor} className="group block w-full">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative aspect-square w-full border border-white/10 bg-[#0a0a0a] flex flex-col items-center justify-center text-center p-6 transition-all duration-500 rounded-sm overflow-hidden ${item.hoverBorder} ${item.hoverShadow} ${item.hoverBg} hover:-translate-y-2`}
              >
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  {/* ★ 優化：首頁前兩張大圖必須優先加載，解決 LCP 4.6秒 問題 */}
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    priority={index < 2} // 前兩張設為高優先級
                    loading={index < 2 ? "eager" : "lazy"} 
                    className="object-cover opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" 
                  />
                </div>
                
                {/* 文字與 Icon 內容 */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="text-white transition-all duration-500 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                      {item.icon}
                    </div>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tighter drop-shadow-lg transition-colors ${item.titleColor}`}>
                      {item.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-[2px] bg-white/20 transition-all duration-500 group-hover:w-12 ${item.hoverLine}`}></span>
                      <p className={`text-gray-400 font-body text-xs tracking-[0.2em] uppercase font-bold transition-colors ${item.hoverText}`}>
                          {item.subtitle}
                      </p>
                      <span className={`w-8 h-[2px] bg-white/20 transition-all duration-500 group-hover:w-12 ${item.hoverLine}`}></span>
                    </div>
                </div>

                <div className={`absolute top-2 left-2 w-3 h-3 border-t border-l border-white/30 transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 ${item.hoverBorder}`}></div>
                <div className={`absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/30 transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:w-6 group-hover:h-6 ${item.hoverBorder}`}></div>
              </motion.div>
            </Link>
          ))}
        </section>

        {/* 品牌故事區塊 */}
        <section id="footer-section" className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16 pb-12 w-full">
          <div className="flex flex-col gap-6">
              <span className="text-accent font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                {ui.whoWeAre}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase leading-tight whitespace-pre-line">
                {ui.slogan}
              </h3>
              <div className="text-gray-400 font-body text-sm leading-relaxed space-y-4 max-w-lg">
                 <p>{ui.desc}</p>
              </div>
              <div className="mt-2">
                 <Link href="/about" className="text-white border-b border-accent pb-1 hover:text-accent transition-colors text-xs uppercase tracking-widest inline-block">
                    {ui.readStory}
                 </Link>
              </div>
          </div>

          <div className="flex flex-col gap-6">
              <span className="text-neon-blue font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                {ui.contact}
              </span>
              <div className="space-y-6">
                 <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-1 text-xs opacity-50">Email</h4>
                    <a href="mailto:enquiry@852picklers.com" className="text-gray-300 hover:text-white transition-colors text-sm font-mono">
                      enquiry@852picklers.com
                    </a>
                 </div>
                 <div>
                    <h4 className="text-white font-bold uppercase tracking-wider mb-1 text-xs opacity-50">Social Media</h4>
                    <a href="https://instagram.com/852.picklers" target="_blank" className="text-gray-300 hover:text-white transition-colors text-sm font-mono flex items-center gap-2">
                      @852.picklers
                    </a>
                 </div>
              </div>
              <div className="mt-auto">
                 <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">
                   © 2026 852 Picklers.
                 </p>
              </div>
          </div>
        </section>

      </div>
    </div>
  );
}