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
          className="w-full bg-[#0a0a0a] md:bg-black/80 md:backdrop-blur-xl border-t-2 border-[#ccff00]/30 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] pointer-events-auto"
       >
          {/* 設定手機版高度為 h-32 以容納三行佈局，電腦版維持 h-24 */}
          <div className="relative max-w-[1400px] mx-auto flex items-center h-32 md:h-24 px-4 md:px-8">
             
             {/* ★ 球拍破框效果：底部對齊 Banner (bottom-0)，頭部向上突出 (-top-12) */}
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

             {/* 內容區塊：手機版向右偏移 ml-[120px] 避開球拍，改為垂直排列 (flex-col) */}
             <div className="w-full flex md:flex-row flex-col items-start md:items-center justify-between ml-[125px] md:ml-[200px] py-2 md:py-0">
                
                {/* 文字區塊：手機版顯示 Tag + Sub */}
                <div className="flex flex-col justify-center pr-2">
                   <span className="text-[#ccff00] font-bold tracking-widest uppercase text-[9px] md:text-xs mb-0.5 md:mb-1 opacity-90">
                      <span className="md:hidden">{ui.mobileTag}</span>
                      <span className="hidden md:inline">{ui.desktopTag}</span>
                   </span>
                   
                   <h4 className="hidden md:block text-white font-heading font-bold text-xl lg:text-2xl uppercase leading-tight tracking-tighter mb-1">
                      {ui.desktopMain}
                   </h4>

                   <p className="text-white font-bold text-[12px] md:text-sm md:text-white/60 font-mono">
                      {ui.sub}
                   </p>
                </div>
                
                {/* 按鈕區塊：手機版變成第三行，且寬度縮小 (w-fit) */}
                <div className="shrink-0 mt-3 md:mt-0">
                   <Link href="/shop" className="group block">
                      <div className="bg-[#ccff00] transform -skew-x-[12deg] shadow-[0_0_20px_rgba(204,255,0,0.4)] active:scale-95 transition-all duration-200 px-4 md:px-10 py-2 md:py-3.5">
                         <div className="transform skew-x-[12deg] text-black text-[10px] md:text-base font-black uppercase tracking-widest flex items-center gap-1">
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