"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "../data/content"; 
import { useLanguage } from "../context/LanguageContext"; // ★ 引入全局語言大腦

export default function AboutPage() {
  // ★ 讀取全局語言狀態
  const { lang } = useLanguage(); 
  const contentLang = lang === "EN" ? "en" : "cn";
  const t = content[contentLang];

  // 聯絡我們區塊的簡單雙語字典
  const contactUi = {
    ZH: {
      tag: "LET'S PLAY TOGETHER",
      title: "Get In Touch.",
      emailTitle: "Email Enquiry",
      igTitle: "Instagram",
      collabTitle: "Collaboration",
      collabDesc: "我們隨時歡迎各類型合作！無論是教練教學配合、場地推廣、品牌聯名，或是企業活動體驗，請隨時透過 Email 或 Instagram DM 與我們聯繫。"
    },
    EN: {
      tag: "LET'S PLAY TOGETHER",
      title: "Get In Touch.",
      emailTitle: "Email Enquiry",
      igTitle: "Instagram",
      collabTitle: "Collaboration",
      collabDesc: "We welcome all types of collaboration! Whether it's coaching partnerships, venue promotions, brand co-ops, or corporate events, feel free to reach out via Email or Instagram DM."
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden pt-24 pb-20 relative selection:bg-accent selection:text-black">
      
      {/* ================= 1. BRAND STORY ================= */}
      <section className="relative w-full max-w-[1800px] mx-auto px-6 md:px-12 py-12 md:py-24 overflow-hidden">
        
        <div className="absolute right-0 top-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* LEFT: 視覺主圖 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full aspect-square max-w-[600px] mx-auto lg:mr-auto"
          >
              <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/5 shadow-2xl group">
                  <Image 
                     src="/logo-square.png"
                     alt="852 Picklers Brand"
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-4 md:-right-8 text-right">
                  <span className="block text-4xl md:text-6xl font-heading font-bold text-white/5 uppercase select-none">
                      EST. 2026
                  </span>
              </div>
          </motion.div>

          {/* RIGHT: 品牌宣言 (動態讀取 content.ts) */}
          <div className="flex flex-col items-start text-left w-full">
              
              <span className="text-accent font-bold tracking-widest uppercase mb-6 text-sm flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-accent"></span>
                  {t.intro.label} 
              </span>

              <h2 className="w-full text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white uppercase tracking-tight mb-10 leading-tight whitespace-pre-wrap">
                {t.intro.title} 
              </h2>

              <div className="flex flex-col gap-6 text-base md:text-lg text-gray-400 leading-relaxed max-w-xl">
                  <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                      {t.intro.text1}
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                      {t.intro.text2}
                  </motion.p>
              </div>

              {/* 金句 */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 pt-8 border-t border-white/10 w-full max-w-xl">
                  <span className="font-heading font-bold text-3xl md:text-4xl text-white uppercase italic tracking-tighter drop-shadow-[0_0_15px_rgba(206,255,0,0.8)]">
                      {t.intro.quote}
                  </span>
              </motion.div>

          </div>
        </div>
      </section>

      {/* ================= 2. CONTACT US ================= */}
      <section id="contact" className="relative w-full max-w-[1800px] mx-auto px-6 md:px-12 py-12 md:py-24 mt-12 border-t border-white/10">
        
        <div className="relative mb-16 md:mb-24 flex flex-col items-center text-center">
           <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[8vw] font-heading font-extrabold text-white/[0.02] uppercase select-none z-0 whitespace-nowrap">
             Contact Us
           </h2>
           
           <div className="relative z-10 flex flex-col items-center">
              <span className="text-neon-blue font-bold tracking-widest uppercase text-xs md:text-sm flex items-center gap-3 mb-4 md:mb-6">
                <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
                {contactUi.tag}
                <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
              </span>
              
              <h3 className="text-5xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-blue to-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                {contactUi.title}
              </h3>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto relative z-10">
           
           <motion.div whileHover={{ y: -5 }} className="p-8 md:p-10 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-neon-blue hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 group text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-neon-blue/10 flex items-center justify-center mb-6 text-neon-blue group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-2 text-sm">{contactUi.emailTitle}</h4>
              <a href="mailto:enquiry@852picklers.com" className="text-gray-400 text-sm font-mono hover:text-neon-blue transition-colors mt-auto pt-4 break-all">enquiry@852picklers.com</a>
           </motion.div>
           
           <motion.div whileHover={{ y: -5 }} className="p-8 md:p-10 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-neon-blue hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 group text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-neon-blue/10 flex items-center justify-center mb-6 text-neon-blue group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <h4 className="text-white font-bold uppercase tracking-wider mb-2 text-sm">{contactUi.igTitle}</h4>
              <a href="https://instagram.com/852.picklers" target="_blank" className="text-gray-400 text-sm font-mono hover:text-neon-blue transition-colors mt-auto pt-4">@852.picklers</a>
           </motion.div>
           
           <motion.div whileHover={{ y: -5 }} className="md:col-span-2 p-8 md:p-12 bg-[#0a0a0a] border border-white/10 rounded-sm hover:border-neon-blue hover:shadow-[0_0_30px_rgba(0,240,255,0.2)] transition-all duration-300 group flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8 mt-2">
              <div className="w-16 h-16 shrink-0 rounded-full bg-neon-blue/10 flex items-center justify-center text-neon-blue group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-lg">{contactUi.collabTitle}</h4>
                  <p className="text-gray-400 text-sm md:text-base font-body leading-relaxed max-w-3xl">
                    {contactUi.collabDesc}
                  </p>
              </div>
           </motion.div>

        </div>
      </section>

    </div>
  );
}