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
      btn: "立即入手"
    },
    EN: {
      mobileTag: "Paddle for Hong Kongers 🇭🇰",
      desktopTag: "TOP SPECS FOR HONG KONGERS 🇭🇰",
      desktopMain: "Got a court but no paddle?",
      sub: "Limited offer HKD 888",
      btn: "BUY NOW"
    }
  }[lang];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[70] pointer-events-none">
       <motion.div 
          initial={{ y: 100 }} 
          animate={{ y: 0 }} 
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          // 手機版實色背景 (bg-[#0a0a0a]) 確保 Safari 順滑，電腦版保留 blur 質感
          className="w-full bg-[#0a0a0a] md:bg-black/80 md:backdrop-blur-xl border-t-2 border-[#ccff00]/30 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] pointer-events-auto"
       >
          <div className="relative max-w-[1400px] mx-auto flex items-center h-24 md:h-24 px-4 md:px-8">
             
             {/* ★ 球拍突破邊框：負值 -top 讓圖片浮出 Banner 上方 */}
             <div className="absolute -top-10 md:-top-12 left-2 md:left-6 w-36 md:w-44 h-40 md:h-52 z-20 pointer-events-none drop-shadow-[0_15px_25px_rgba(204,255,0,0.4)]">
                <Image 
                  src="/home-gear.png" 
                  alt="852 Picklers Paddle" 
                  fill 
                  priority 
                  quality={90}
                  sizes="(max-width: 768px) 144px, 176px"
                  className="object-contain object-bottom" 
                />
             </div>

             {/* 文字區域：手機版隱藏 Main，只留 Tag + Sub */}
             <div className="w-full flex items-center justify-between ml-[115px] md:ml-[180px]">
                <div className="flex flex-col justify-center pr-2">
                   {/* Tag 顯示：手機版短、電腦版長 */}
                   <span className="text-[#ccff00] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-0.5 md:mb-1 opacity-90">
                      <span className="md:hidden">{ui.mobileTag}</span>
                      <span className="hidden md:inline">{ui.desktopTag}</span>
                   </span>
                   
                   {/* Main 標題：手機版直接隱藏，電腦版才顯示 */}
                   <h4 className="hidden md:block text-white font-heading font-bold text-xl lg:text-2xl uppercase leading-tight tracking-tighter mb-1">
                      {ui.desktopMain}
                   </h4>

                   {/* Sub 資訊：兩端都顯示，但在手機版會更顯眼 */}
                   <p className="text-white font-bold text-[12px] md:text-sm md:text-white/60 font-mono">
                      {ui.sub}
                   </p>
                </div>
                
                <div className="shrink-0">
                   <Link href="/shop" className="group block">
                      <div className="bg-[#ccff00] transform -skew-x-[12deg] shadow-[0_0_20px_rgba(204,255,0,0.4)] active:scale-95 transition-all duration-200 px-4 md:px-10 py-3 md:py-3.5">
                         <div className="transform skew-x-[12deg] text-black text-[12px] md:text-base font-black uppercase tracking-widest flex items-center gap-1">
                            {ui.btn}
                            <span className="hidden md:inline group-hover:translate-x-1 transition-transform">→</span>
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