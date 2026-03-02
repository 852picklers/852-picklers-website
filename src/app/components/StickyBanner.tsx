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
      main: "搵到場打，仲未有私家拍？",
      sub: "首批限量早鳥 HKD 888",
      btn: "立即入手"
    },
    EN: {
      tag: "TOP SPECS FOR HONG KONGERS 🇭🇰",
      main: "Got a court but no paddle?",
      sub: "Early Bird HKD 888",
      btn: "BUY NOW"
    }
  }[lang];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[70] pointer-events-none">
       <motion.div 
          initial={{ y: 100 }} 
          animate={{ y: 0 }} 
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          // 行動版加高 (h-28)，移除 blur 以加速 Safari 載入，改用深色實色
          className="w-full bg-[#0a0a0a] border-t-2 border-[#ccff00]/30 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] pointer-events-auto"
       >
          <div className="relative max-w-[1400px] mx-auto flex items-center h-28 md:h-24 px-4 md:px-8">
             
             {/* ★ 球拍圖片：行動版放大並向上突破邊框，增加視覺張力 */}
             <div className="absolute -top-8 left-2 md:left-6 w-32 md:w-44 h-40 md:h-48 z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(204,255,0,0.4)]">
                <Image 
                  src="/home-gear.png" 
                  alt="Pro Specs Paddle" 
                  fill 
                  priority 
                  quality={80}
                  sizes="(max-width: 768px) 128px, 176px"
                  className="object-contain object-bottom" 
                />
             </div>

             {/* 文字內容區塊：左邊留空給球拍，增加文字間距 */}
             <div className="w-full flex items-center justify-between ml-[115px] md:ml-[180px]">
                <div className="flex flex-col justify-center overflow-hidden">
                   <span className="text-[#ccff00] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-1">
                      {ui.tag}
                   </span>
                   <h4 className="text-white font-heading font-bold text-[13px] md:text-lg uppercase leading-tight">
                      {ui.main}
                   </h4>
                   <p className="text-white/60 text-[11px] md:text-sm font-mono mt-0.5">
                      {ui.sub}
                   </p>
                </div>
                
                <div className="shrink-0 ml-2">
                   <Link href="/shop" className="group block">
                      {/* 按鈕加大，增加發光效果 */}
                      <div className="bg-[#ccff00] transform -skew-x-[12deg] shadow-[0_0_20px_rgba(204,255,0,0.5)] active:scale-90 transition-all duration-200 px-5 md:px-10 py-3 md:py-3.5">
                         <div className="transform skew-x-[12deg] text-black text-xs md:text-base font-black uppercase tracking-tighter flex items-center gap-1">
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