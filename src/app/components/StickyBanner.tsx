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
      cta: "立即入手 >"
    },
    EN: {
      mobileTag: "Paddle for Hong Kongers 🇭🇰",
      desktopTag: "TOP SPECS FOR HONG KONGERS 🇭🇰",
      desktopMain: "Got a court but no paddle?",
      sub: "Limited offer HKD 888",
      cta: "BUY NOW >"
    }
  }[lang];

  return (
    <Link href="/shop" className="fixed bottom-0 left-0 w-full z-[70] block group">
      <motion.div 
        initial={{ y: 100 }} 
        animate={{ y: 0 }} 
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="w-full bg-[#0a0a0a] md:bg-black/80 md:backdrop-blur-xl border-t-2 border-[#ccff00]/30 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] cursor-pointer"
      >
        <div className="relative max-w-[1400px] mx-auto flex items-center h-24 md:h-24 px-4 md:px-8">
          {/* 球拍破框效果：底部與 Banner 對齊 */}
          <div className="absolute -top-10 bottom-0 left-2 md:left-6 w-32 md:w-48 z-20 pointer-events-none drop-shadow-[0_15px_25px_rgba(204,255,0,0.4)]">
            <Image 
              src="/home-gear.png" 
              alt="852 Picklers Paddle" 
              fill 
              priority 
              quality={95}
              sizes="(max-width: 768px) 128px, 192px"
              className="object-contain object-bottom" 
            />
          </div>

          {/* 文字內容區塊 */}
          <div className="w-full flex items-center justify-between ml-[115px] md:ml-[200px]">
            <div className="flex flex-col justify-center">
              <span className="text-[#ccff00] font-bold tracking-widest uppercase text-[9px] md:text-xs mb-0.5 opacity-90">
                <span className="md:hidden">{ui.mobileTag}</span>
                <span className="hidden md:inline">{ui.desktopTag}</span>
              </span>
              
              <h4 className="hidden md:block text-white font-heading font-bold text-xl lg:text-2xl uppercase leading-tight tracking-tighter mb-1">
                {ui.desktopMain}
              </h4>

              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                <p className="text-white font-bold text-[12px] md:text-sm font-mono">
                  {ui.sub}
                </p>
                {/* 替代按鈕的 CTA 文字，帶底線與箭頭 */}
                <span className="text-[#ccff00] text-[11px] md:text-sm font-black uppercase tracking-widest underline underline-offset-4 decoration-2">
                  {ui.cta}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}