"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function StickyBanner() {
  const { lang } = useLanguage();

  const ui = {
    ZH: {
      mobileTag: "香港人的私家拍 🇭🇰",
      desktopTag: "屬於香港人的頂級配置 🇭🇰",
      desktopMain: "搵到場打，仲未有私家拍？",
      sub: "首批優惠價 HKD 888",
      cta: "立即入手 >",
      btn: "立即入手"
    },
    EN: {
      mobileTag: "PADDLE FOR HK-ERS 🇭🇰",
      desktopTag: "TOP SPECS FOR HONG KONGERS 🇭🇰",
      desktopMain: "Got a court but no paddle?",
      sub: "Limited offer HKD 888",
      cta: "BUY NOW >",
      btn: "BUY NOW"
    }
  }[lang];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[70] pointer-events-none">
       <motion.div 
          initial={{ y: 100 }} 
          animate={{ y: 0 }} 
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="w-full bg-[#0a0a0a] md:bg-black/80 md:backdrop-blur-xl border-t-2 border-[#ccff00]/30 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] pointer-events-auto"
       >
          <Link href="/shop" className="relative max-w-[1400px] mx-auto flex items-center h-32 md:h-24 px-4 md:px-8 cursor-pointer group">
             
             {/* 球拍破框效果 */}
             <div className="absolute -top-12 bottom-0 left-2 md:left-6 w-36 md:w-48 z-20 pointer-events-none drop-shadow-[0_15px_25px_rgba(204,255,0,0.4)]">
                <Image 
                  src="/home-gear.png" 
                  alt="852 Picklers Paddle" 
                  fill 
                  priority 
                  quality={95}
                  sizes="(max-width: 768px) 144px, 192px"
                  className="object-contain object-bottom" 
                />
             </div>

             {/* ★ 文字區域：顯著加大手機版字體 ★ */}
             <div className="w-full flex md:flex-row flex-col items-end md:items-center justify-between ml-[135px] md:ml-[200px] py-3 md:py-0">
                
                <div className="flex flex-col items-end md:items-start justify-center pr-1 text-right md:text-left">
                   {/* 手機版 Tag 加大到 text-[14px] (之前是 11px) */}
                   <span className="text-white font-black tracking-widest uppercase text-[14px] md:text-xs mb-1.5">
                      <span className="md:hidden">{ui.mobileTag}</span>
                      <span className="hidden md:inline">{ui.desktopTag}</span>
                   </span>
                   
                   <h4 className="hidden md:block text-white font-heading font-bold text-xl lg:text-2xl uppercase leading-tight tracking-tighter mb-1">
                      {ui.desktopMain}
                   </h4>

                   <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 items-end">
                      {/* 手機版 Sub 加大到 text-[13px] (之前是 10px) */}
                      <p className="text-white/70 font-bold text-[13px] md:text-sm font-mono">
                         {ui.sub}
                      </p>
                      {/* 手機版 CTA 加大到 text-[16px] 增加點擊慾望 */}
                      <span className="md:hidden text-[#ccff00] text-[16px] font-black uppercase tracking-widest underline underline-offset-8 decoration-2 mt-1">
                        {ui.cta}
                      </span>
                   </div>
                </div>
                
                {/* 電腦版按鈕 */}
                <div className="hidden md:block shrink-0">
                   <div className="bg-[#ccff00] transform -skew-x-[12deg] shadow-[0_0_20px_rgba(204,255,0,0.4)] group-hover:scale-105 transition-all duration-200 px-10 py-3.5">
                      <div className="transform skew-x-[12deg] text-black text-base font-black uppercase tracking-widest flex items-center gap-2">
                         {ui.btn}
                      </div>
                   </div>
                </div>
             </div>
          </Link>
       </motion.div>
    </div>
  );
}