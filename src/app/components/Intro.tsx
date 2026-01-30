"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  data: any;
};

export default function Intro({ data }: Props) {
  return (
    <section className="relative w-full max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-40 bg-[#0f0f0f] overflow-hidden">
      
      {/* 背景裝飾 */}
      <div className="absolute right-0 top-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* ================= LEFT: 視覺主圖 (已還原) ================= */}
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
                    EST. 2025
                </span>
            </div>
        </motion.div>


        {/* ================= RIGHT: 品牌宣言 ================= */}
        <div className="flex flex-col items-start text-left w-full">
            
            <span className="text-accent font-bold tracking-widest uppercase mb-6 text-sm flex items-center gap-3">
                <span className="w-8 h-[2px] bg-accent"></span>
                {data.label}
            </span>

            {/* ★★★ 標題調整：加入 whitespace-pre-wrap 支援 \n 換行 ★★★ */}
            <h2 className="w-full text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white uppercase tracking-tight mb-10 leading-tight whitespace-pre-wrap">
              {data.title}
            </h2>

            <div className="flex flex-col gap-6 text-base md:text-lg text-gray-400 leading-relaxed max-w-xl">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {data.text1}
                </motion.p>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    {data.text2}
                </motion.p>
            </div>

            {/* 金句 */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-12 pt-8 border-t border-white/10 w-full max-w-xl"
            >
                <span className="font-heading font-bold text-3xl md:text-4xl text-white uppercase italic tracking-tighter drop-shadow-[0_0_15px_rgba(206,255,0,0.8)]">
                    {data.quote}
                </span>
            </motion.div>

        </div>

      </div>
    </section>
  );
}