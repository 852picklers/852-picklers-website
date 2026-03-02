"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function StickyBanner() {
  const { lang } = useLanguage();

  const ui = {
    ZH: {
      tag: "屬於香港人的頂級配置 🇭🇰",
      main: "搵到場打，仲未有私家拍？首批限量早鳥 HKD 888",
      btn: "立即入手"
    },
    EN: {
      tag: "TOP SPECS FOR HONG KONGERS 🇭🇰",
      main: "Got a court but no paddle? Early Bird HKD 888",
      btn: "BUY NOW"
    }
  }[lang];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[70] pointer-events-none">
       <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="w-full bg-black/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
          <div className="relative max-w-[1400px] mx-auto flex items-center h-20 md:h-24 px-4 md:px-8">
             {/* Paddle 圖片保持顯示 */}
             <div className="absolute left-0 md:left-6 bottom-0 w-28 md:w-40 h-28 md:h-40 z-10 pointer-events-none">
                <Image src="/home-gear.png" alt="Pro Specs" fill className="object-contain object-bottom" />
             </div>

             <div className="w-full flex items-center justify-between ml-[100px] md:ml-[160px] lg:ml-[200px]">
                <div className="flex flex-col justify-center overflow-hidden pr-2">
                   {/* ★ 頂部細字改為綠色 */}
                   <span className="text-[#ccff00] font-bold tracking-widest uppercase text-[9px] md:text-xs mb-0.5 md:mb-1">
                      {ui.tag}
                   </span>
                   {/* ★ 主要大字改為白色 */}
                   <h4 className="text-white font-heading font-bold text-[10px] sm:text-[13px] md:text-lg uppercase tracking-tight leading-snug">
                      {ui.main}
                   </h4>
                </div>
                
                <div className="shrink-0">
                   <Link href="/shop" className="group block">
                      {/* ★ 按鈕改為螢光黃 (ccff00)，文案改為「立即入手」 */}
                      <div className="bg-[#ccff00] transform -skew-x-[15deg] shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:scale-105 transition-all duration-300 px-4 md:px-8 py-2 md:py-2.5">
                         <div className="transform skew-x-[15deg] text-black text-[11px] md:text-sm font-bold uppercase tracking-widest flex items-center gap-1 md:gap-2 whitespace-nowrap">
                            {ui.btn}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                         </div>
                      </div>
                   </Link>
                </div>
             </div>
          </div>
       </motion.div>
    </div>
  );
}