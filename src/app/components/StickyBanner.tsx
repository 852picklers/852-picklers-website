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
          <Link href="/shop" className="relative max-w-[1400px] mx-auto flex items-center h-28 md:h-24 px-4 md:px-8 cursor-pointer group">
             
             {/* 球拍破框：底部切齊 Banner 邊緣 */}
             <div className="absolute -top-12 bottom-0 left-2 md:left-6 w-36 md:w-48 z-20 pointer-events-none drop-shadow-[0_15px_25px_rgba(204,255,0,0.4)]">
                <Image 
                  src="/home-gear.png" 
                  alt="852 Picklers" 
                  fill 
                  priority 
                  quality={95}
                  sizes="(max-width: 768px) 144px, 192px"
                  className="object-contain object-bottom" 
                />
             </div>

             {/* ★ 內容區塊：手機版 Tag 成為絕對主角 ★ */}
             <div className="w-full flex md:flex-row flex-col items-end md:items-center justify-between ml-[120px] md:ml-[200px]">
                
                <div className="flex flex-col items-end md:items-start justify-center text-right md:text-left">
                   {/* Tag: 提升到 20px，使用 font-black 並壓縮字距 tracking-tighter */}
                   <span className="text-white font-black tracking-tighter uppercase text-[20px] md:text-xs leading-none mb-1">
                      <span className="md:hidden">{ui.mobileTag}</span>
                      <span className="hidden md:inline">{ui.desktopTag}</span>
                   </span>
                   
                   <h4 className="hidden md:block text-white font-heading font-bold text-xl lg:text-2xl uppercase tracking-tighter mb-1">
                      {ui.desktopMain}
                   </h4>

                   {/* Sub & CTA: 緊湊排列，維持高對比度 */}
                   <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-4 items-end">
                      <p className="text-white/70 font-bold text-[13px] md:text-sm font-mono leading-none">
                         {ui.sub}
                      </p>
                      <span className="md:hidden text-[#ccff00] text-[17px] font-black uppercase tracking-widest underline underline-offset-4 decoration-2 mt-1.5">
                        {ui.cta}
                      </span>
                   </div>
                </div>
                
                {/* 電腦版按鈕 */}
                <div className="hidden md:block shrink-0">
                   <div className="bg-[#ccff00] transform -skew-x-[12deg] shadow-[0_0_20px_rgba(204,255,0,0.4)] px-10 py-3.5">
                      <div className="transform skew-x-[12deg] text-black text-base font-black uppercase tracking-widest">
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