"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext"; // ★ 引入 Global State

const NAV_DATA = {
  ZH: [
    { label: "首頁", target: "/" },
    { label: "全港場地", target: "/courts" },
    { label: "裝備商店", target: "/shop" },
    { label: "品牌故事", target: "/about" },
    { label: "聯絡我們", target: "/about#contact" },
  ],
  EN: [
    { label: "HOME", target: "/" },
    { label: "HK COURTS", target: "/courts" },
    { label: "852 PICKLERS SHOP", target: "/shop" },
    { label: "BRAND STORY", target: "/about" },
    { label: "CONTACT US", target: "/about#contact" },
  ]
};

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // ★ 使用 Global State，唔再用 local useState
  const { lang, toggleLang } = useLanguage(); 
  
  const pathname = usePathname();

  const isActive = (target: string) => {
    if (target === "/" && pathname !== "/") return false;
    if (target !== "/" && pathname.startsWith(target)) return true;
    return pathname === target;
  };

  const currentLinks = NAV_DATA[lang];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[60] px-4 md:px-6 py-4 flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        
       {/* 左側：漢堡選單 + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            // ★ 修正：加入 text-white，確保預設狀態下清晰可見
            className="p-2 bg-transparent border border-white/20 text-white rounded-sm hover:border-accent hover:text-accent transition-all duration-300 group"
          >
             {isSidebarOpen ? 
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> : 
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-pulse"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
             }
          </button>

          <Link href="/" className="relative w-12 h-12 md:w-16 md:h-16 hover:scale-105 transition-transform duration-300">
             <Image src="/logo.png" alt="852 Picklers" fill className="object-contain object-left" />
          </Link>
        </div>

        <nav className="hidden xl:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {currentLinks.map((item, index) => (
                <Link
                    key={index}
                    href={item.target}
                    className={`whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-colors ${
                      isActive(item.target) ? "text-accent drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]" : "text-gray-400 hover:text-white"
                    }`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>

        <button 
          onClick={toggleLang}
          className="font-body text-[10px] md:text-xs font-bold uppercase tracking-widest border border-white/20 text-white px-4 md:px-6 py-2 hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 rounded-sm"
        >
          {lang === 'EN' ? '中文' : 'EN'}
        </button>
      </header>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/80 z-[50] backdrop-blur-sm" />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-accent/30 z-[55] flex flex-col p-8 pt-24 shadow-[0_0_50px_rgba(255,0,60,0.1)]">
              <div className="mb-8 pb-8 border-b border-white/10"><h2 className="text-accent font-heading font-bold text-2xl">MENU</h2></div>
              <nav className="flex flex-col gap-6">
                {currentLinks.map((link) => (
                  <Link key={link.label} href={link.target} onClick={() => setIsSidebarOpen(false)} className={`text-left text-xl font-heading font-bold hover:text-accent hover:pl-2 transition-all duration-300 uppercase tracking-wider ${isActive(link.target) ? "text-accent" : "text-white"}`}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}