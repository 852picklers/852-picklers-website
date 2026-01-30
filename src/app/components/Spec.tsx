"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  data: any;
};

export default function Spec({ data }: Props) {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28 bg-[#0f0f0f]">
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        
        {/* ================= LEFT COLUMN: 標題 + 參數列表 ================= */}
        <div className="flex flex-col justify-between h-full">
            
            {/* 1. Header */}
            <div className="flex flex-col items-start text-left mb-10">
                <span className="text-accent font-body font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-accent"></span>
                    // TECH SPECS
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white uppercase tracking-tight leading-[0.9]">
                    {data.title}
                </h2>
                <p className="mt-6 text-gray-500 font-mono text-sm uppercase tracking-wider">
                    {data.desc}
                </p>
            </div>

            {/* 2. 參數列表 */}
            <div className="grid grid-cols-1 gap-6 w-full mt-auto">
                {data.items.map((item: any, index: number) => (
                <div 
                    key={index}
                    className="group flex items-center justify-between border-b border-dashed border-white/10 pb-4 hover:border-accent/50 transition-colors"
                >
                    <span className="text-sm font-bold text-white/70 font-heading uppercase tracking-widest group-hover:text-white transition-colors">
                        {item.label}
                    </span>
                    
                    <span className="text-2xl font-heading font-bold text-white uppercase tracking-tighter group-hover:text-accent transition-colors">
                        {item.value}
                    </span>
                </div>
                ))}
            </div>
        </div>


        {/* ================= RIGHT COLUMN: 圖片 + 邊框 (Frame) ================= */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative w-full h-full min-h-[500px] flex items-center"
        >
          {/* Frame Container */}
          <div className="relative w-full h-full border border-white/10 bg-white/[0.02] flex items-center justify-center p-0 overflow-hidden">
              
              {/* 角落裝飾 */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-white/20 z-10"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-white/20 z-10"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-white/20 z-10"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-white/20 z-10"></div>

              {/* 圖片容器 */}
              <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src="/wireframe.png"
                    alt={data.fig}
                    fill
                    // ★★★ 修改處：響應式設定 ★★★
                    // 手機版 (Default): object-contain (直立完整顯示), 無旋轉, 無放大
                    // 電腦版 (md): -rotate-90 (橫放), scale-[1.35] (填滿空白)
                    className="object-contain md:-rotate-90 md:scale-[1.35] transition-transform duration-500"
                  />
              </div>

              {/* 裝飾文字 */}
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/20 z-10">
                  REF: WIRE-001
              </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}