"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  data: any;
};

export default function Pricing({ data }: Props) {
  return (
    <section className="relative w-full max-w-[1800px] mx-auto px-6 md:px-12 py-24 md:py-32 bg-[#0f0f0f] border-t border-white/10">
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-center">
        
        {/* ================= 左側：文案區 ================= */}
        <div className="flex flex-col gap-8 order-1 text-left items-start w-full">
          <div>
            <span className="text-accent font-body font-bold uppercase tracking-widest text-sm mb-4 block">
               // {data.series}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[0.9] tracking-tightest uppercase mb-6">
              {data.title}
            </h2>
            <div className="h-2 w-24 bg-accent"></div>
          </div>
          
          <p className="font-body text-gray-400 text-lg md:text-xl w-full leading-relaxed whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap">
            {data.desc}
          </p>
        </div>


        {/* ================= 右側：橫向擴大的產品卡片 ================= */}
        <div className="order-2 w-full max-w-2xl mx-auto lg:mx-0 lg:ml-auto">
          {data.cards.map((card: any, index: number) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`
                group relative flex flex-col justify-between bg-[#151515]
                border border-white/10 hover:border-accent transition-all duration-500
                hover:shadow-[0_0_50px_rgba(206,255,0,0.1)] overflow-hidden p-8 md:p-12
              `}
            >
              <div className="flex-grow flex flex-col items-center w-full">
                
                {/* Title */}
                <h3 className="font-heading font-bold uppercase tracking-wide text-white mb-10 text-3xl">
                  <span className="text-accent">「</span>
                  HOME KONG
                  <span className="text-accent">」</span>
                </h3>
                
                {/* ★★★ 修改：雙圖並排，標籤移至下方 ★★★ */}
                <div className="w-full grid grid-cols-2 gap-6 mb-12">
                    
                    {/* 左圖：正面 */}
                    <div className="flex flex-col items-center group/view1">
                        {/* 圖片容器：設定高度 */}
                        <div className="relative w-full h-56 md:h-64 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] transform group-hover/view1:scale-105 transition-transform duration-500">
                            <Image 
                                src="/paddle-full.png"
                                alt="Front View"
                                fill
                                className="object-contain"
                            />
                        </div>
                        {/* Front Label: 移到 div 外部，使用 mt-4 */}
                        <div className="mt-6">
                           <span className="text-[10px] text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-sm bg-white/5">Front</span>
                        </div>
                    </div>

                    {/* 右圖：背面 */}
                    <div className="flex flex-col items-center group/view2">
                        <div className="relative w-full h-56 md:h-64 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] transform group-hover/view2:scale-105 transition-transform duration-500">
                            <Image 
                                src="/paddle-back.png" 
                                alt="Back View"
                                fill
                                className="object-contain"
                            />
                        </div>
                        {/* Back Label: 移到 div 外部，使用 mt-4 */}
                        <div className="mt-6">
                           <span className="text-[10px] text-gray-500 uppercase tracking-widest border border-white/10 px-3 py-1 rounded-sm bg-white/5">Back</span>
                        </div>
                    </div>

                </div>


                {/* Price Cluster */}
                <div className="mb-8 flex flex-col items-center gap-1">
                  {card.originalPrice && (
                    <span className="font-heading text-lg text-gray-500 line-through decoration-red-500/60 decoration-2">
                        {card.originalPrice}
                    </span>
                  )}
                  
                  <div className="flex flex-col md:flex-row items-center gap-3">
                     <span className="font-heading text-6xl text-white group-hover:text-accent transition-colors duration-300">
                        {card.price}
                     </span>
                     {card.discountNote && (
                       <span className="bg-accent text-black text-xs font-bold uppercase px-3 py-1 animate-pulse rounded-sm">
                         {card.discountNote}
                       </span>
                     )}
                  </div>
                </div>

              </div>

              {/* CTA Button */}
              <div className="mt-auto w-full">
                <button className={`
                  w-full h-14 flex items-center justify-center
                  font-heading font-bold text-lg uppercase tracking-widest
                  border-2 transition-all duration-300 cursor-pointer mb-4
                  bg-transparent text-white border-white/20 hover:border-accent hover:text-accent hover:scale-[1.02]
                `}>
                  {card.cta}
                </button>

                {/* Free Shipping */}
                {card.freeShipping && (
                   <div className="text-center">
                      <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
                        ✓ {card.freeShipping}
                      </span>
                   </div>
                )}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}