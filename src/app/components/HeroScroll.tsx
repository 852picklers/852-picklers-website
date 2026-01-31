"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  t: any;
};

export default function HeroScroll({ t }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- 動畫參數 ---
  const opacityHomeKong = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleHomeKong = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  const opacitySplitView = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const scaleSplitView = useTransform(scrollYProgress, [0.4, 0.7], [1.1, 1]);
  const pointerEventsStage2 = useTransform(scrollYProgress, (v) => v > 0.4 ? "auto" : "none");

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-[#0f0f0f]">
      
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* ================= 畫面 A: HOME KONG 特寫 (保持不變) ================= */}
        <motion.div 
          style={{ opacity: opacityHomeKong, scale: scaleHomeKong }}
          className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center bg-[#0f0f0f]"
        >
            <div className={`relative w-full ${isMobile ? 'h-[50vh]' : 'h-[75vh] lg:h-[85vh]'} flex items-center justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent`}>
                <Image 
                    src="/paddle-close.png" 
                    alt="Close Up Detail"
                    fill
                    className="object-contain" 
                    priority
                />
            </div>
            <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end pb-[8vh] z-20">
                <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-gradient-to-t from-black via-black/80 to-transparent -z-10"></div>
                <span className="font-heading text-accent/80 uppercase tracking-[0.5em] text-xs md:text-sm mb-4 font-bold animate-pulse">
                   // MODEL 001
                </span>
                <div className="relative text-center mx-4">
                  <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] lg:text-[16vw] font-heading font-extrabold uppercase text-accent/20 tracking-tighter leading-none blur-3xl select-none">
                    HOME KONG
                  </h2>
                  <h2 className="relative z-10 text-[15vw] lg:text-[16vw] font-heading font-extrabold uppercase text-white tracking-tighter leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                    HOME KONG
                  </h2>
                </div>
            </div>
        </motion.div>


        {/* ================= 畫面 B: 左右分屏 ================= */}
        <motion.div 
          style={{ opacity: opacitySplitView, scale: scaleSplitView, pointerEvents: pointerEventsStage2 }}
          className="absolute inset-0 z-20 w-full h-full"
        >
            {/* 右側：雙拍疊放區 */}
            <div className="absolute right-0 bottom-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[60%] h-[50vh] lg:h-[80%] flex items-end lg:items-center justify-center lg:justify-end pointer-events-none">
                <div className="relative w-full h-full flex items-end justify-center">
                    
                    {/* ★★★ 1. Back Paddle (背面) ★★★ */}
                    <div className="absolute inset-0 flex items-end lg:items-center justify-center lg:justify-end">
                        {/* 修正重點：
                           - 手機版 (default): -translate-x-14 (向左移 14)
                           - 電腦版 (lg): -translate-x-56 (保持不變)
                        */}
                        <div className="relative w-full h-full transform -translate-x-14 lg:-translate-x-56 scale-95 origin-bottom brightness-[0.8]">
                            <Image 
                                src="/paddle-back.png" 
                                alt="Back View"
                                fill
                                className="object-contain object-bottom lg:object-center p-0 lg:p-12" 
                            />
                        </div>
                    </div>

                    {/* ★★★ 2. Front Paddle (正面) ★★★ */}
                    <div className="absolute inset-0 flex items-end lg:items-center justify-center lg:justify-end z-10">
                         {/* 修正重點：
                            - 手機版 (default): translate-x-14 (向右移 14，與背面平衡)
                            - 電腦版 (lg): translate-x-16 (保持不變)
                         */}
                         <div className="relative w-full h-full transform translate-x-14 lg:translate-x-16 brightness-[0.9] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                            <Image 
                                src="/paddle-full.png" 
                                alt="Full View"
                                fill
                                className="object-contain object-bottom lg:object-center p-0 lg:p-12" 
                                priority
                            />
                         </div>
                    </div>

                    {/* 漸層遮罩 */}
                    <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent pointer-events-none z-20"></div>
                    <div className="block lg:hidden absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent pointer-events-none z-20"></div>
                </div>
            </div>

            {/* 左側：文字區 */}
            <div className="absolute left-0 top-0 w-full lg:w-[50%] h-auto lg:h-full flex flex-col justify-start lg:justify-center px-6 md:px-16 pt-28 lg:pt-0 z-30 pointer-events-none lg:pointer-events-auto">
                <div className="w-full flex flex-col items-start text-left pointer-events-auto">
                    <div className="flex items-center gap-3 mb-4 lg:mb-6">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                        <span className="text-xs md:text-sm font-body font-bold uppercase tracking-[0.2em] text-accent">
                            {t.hero.label}
                        </span>
                    </div>
                    
                    <h2 className="text-[12vw] lg:text-[5vw] font-heading font-bold leading-[1.1] text-white uppercase tracking-tight drop-shadow-2xl mb-4 lg:mb-6 whitespace-pre-line text-left">
                        {t.hero.title}
                    </h2>

                    {t.hero.subtitle && (
                        <p className="text-sm md:text-xl font-body text-gray-400 max-w-md leading-relaxed mb-4 border-l-2 border-accent pl-6 text-left whitespace-pre-line lg:drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                            {t.hero.subtitle}
                        </p>
                    )}

                    {t.hero.promo && (
                      <div className="mb-8 pl-6">
                        <span className="inline-block bg-accent/10 border border-accent/50 text-accent px-4 py-2 font-heading font-bold uppercase tracking-wider text-sm md:text-base animate-pulse">
                          {t.hero.promo}
                        </span>
                      </div>
                    )}

                    <div className="hidden md:block pl-6">
                        <a href="#pricing">
                            <button className="h-12 bg-transparent text-white border border-white/30 px-8 font-heading font-bold text-base uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 cursor-pointer skew-x-[-10deg]">
                                <span className="block skew-x-[10deg]">{t.hero.cta}</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}