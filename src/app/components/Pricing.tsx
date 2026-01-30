"use client";

import { motion } from "framer-motion";

type Props = {
  data: any;
};

export default function Pricing({ data }: Props) {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28 bg-[#0a0a0a]">
      
      {/* Title */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4">
          // {data.series}
        </span>
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight mb-6">
          {data.title}
        </h2>
        <p className="text-gray-400 font-mono text-sm md:text-base max-w-xl">
          {data.desc}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
        {data.cards.map((card: any, index: number) => (
          <div 
            key={index}
            className={`relative p-8 md:p-10 border ${card.highlight ? 'border-accent bg-accent/5' : 'border-white/10 bg-white/5'} flex flex-col items-center text-center group transition-colors hover:border-accent/50`}
          >
            {/* Tag */}
            {card.discountNote && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-black text-xs font-bold px-3 py-1 uppercase tracking-widest">
                {card.discountNote}
              </div>
            )}

            <h3 className="text-2xl font-heading font-bold text-white uppercase mb-2">
              {card.name}
            </h3>
            
            <div className="flex items-baseline gap-3 mb-6">
                <span className="text-sm text-gray-500 line-through decoration-white/30 decoration-1">
                    {card.originalPrice}
                </span>
                <span className="text-4xl md:text-5xl font-heading font-bold text-accent">
                    {card.price}
                </span>
            </div>

            <ul className="flex flex-col gap-3 mb-10 w-full">
               <li className="text-sm font-mono text-white/80 uppercase tracking-wide border-b border-white/10 pb-2">
                 {card.freeShipping}
               </li>
               {card.features.map((feat: string, i: number) => (
                 <li key={i} className="text-sm font-mono text-gray-400">
                   {feat}
                 </li>
               ))}
            </ul>

            {/* ★★★ 修改重點：按鈕改成 <a> 標籤，讀取 card.link ★★★ */}
            <a
              href={card.link} // 讀取 Google Form 連結
              target="_blank"  // 在新分頁開啟
              rel="noopener noreferrer"
              className="w-full py-4 bg-white text-black font-heading font-bold text-lg uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center"
            >
              {card.cta}
            </a>

          </div>
        ))}
      </div>

    </section>
  );
}