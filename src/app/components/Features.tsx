"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  data: any;
  lang: 'en' | 'cn';
};

export default function Features({ data, lang }: Props) {
  return (
    <section className="relative w-full max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-32 bg-[#111111]">
      
      {/* 移除原本的頂部置中 Header */}

      {/* Grid: items-stretch 確保左右兩欄高度一致 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
        
        {/* ================= LEFT: 標題 + 圖片框 (總高度 = 右側卡片) ================= */}
        <div className="flex flex-col order-1 h-full">
            
            {/* 1. Header (移至此處，靠左對齊，風格統一) */}
            <div className="flex flex-col items-start text-left mb-8">
                <span className="text-accent font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-accent"></span>
                    // TECH DECODE
                </span>
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight leading-none">
                    {data.title}
                </h2>
            </div>

            {/* 2. Image Frame (使用 flex-1 自動填滿剩餘高度) */}
            <div className="relative w-full flex-1 min-h-[300px] rounded-sm overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-2xl">
                 <Image 
                   src={lang === 'cn' ? "/anatomy-cn.png" : "/anatomy-en.png"}
                   alt={data.anatomyAlt}
                   fill
                   className="object-contain p-6 md:p-10"
                 />
                 
                 {/* 角落裝飾 (Corner Accents) */}
                 <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent/30"></div>
                 <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent/30"></div>
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent/30"></div>
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent/30"></div>
            </div>
        </div>


        {/* ================= RIGHT: 戰術卡片 (決定整體高度) ================= */}
        <div className="flex flex-col gap-6 order-2 h-full justify-between">
          {data.items.map((item: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // flex-1 讓三張卡片平均分配高度，確保填滿右側
              className="group relative flex-1 p-8 md:p-10 bg-[#151515] border border-white/10 hover:border-accent/50 transition-all duration-300 overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute -top-4 right-4 text-[6rem] md:text-[8rem] font-heading font-bold text-white/[0.03] select-none pointer-events-none group-hover:text-accent/[0.05] transition-colors leading-none">
                0{index + 1}
              </div>
              
              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-8 h-1 bg-accent mb-2"></div>
                
                {/* 分類標題 */}
                <span className="text-accent font-mono text-xs md:text-sm font-bold tracking-widest uppercase">
                    {item.category}
                </span>

                {/* 主標題 */}
                <h3 className="text-xl md:text-2xl font-heading font-bold text-white uppercase tracking-wide">
                    {item.title}
                </h3>
                
                <p className="text-sm md:text-base font-body text-gray-400 leading-relaxed max-w-lg border-l border-white/10 pl-4 mt-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}