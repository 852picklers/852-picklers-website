"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  data: any;
};

export default function DesignShowcase({ data }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    // 修改 1：大幅減少 Padding (py-10 md:py-16)，讓高度更緊湊
    <section className="w-full bg-[#050505] py-10 md:py-16 px-6 border-b border-white/5">
      {/* 寬度改為 1800px 以對齊 Tech Decode / Footer */}
      <div className="max-w-[1800px] mx-auto">
        
        {/* ================= LAYOUT: 左文右圖 (Desktop Grid) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-20 items-start">

          {/* === LEFT: Header (靠左對齊) === */}
          <div className="flex flex-col items-start text-left lg:sticky lg:top-32">
             <span className="text-accent font-body font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-accent"></span>
                // GALLERY
             </span>
             
             <h2 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight mb-4 leading-none">
                {data.title}
             </h2>
             
             {/* 移除了描述文字，只保留操作提示 */}
             <p className="text-gray-500 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                {data.hint}
             </p>
          </div>

          {/* === RIGHT: Images Grid (圖片區) === */}
          {/* 使用 grid-cols-2 讓圖片並排，節省垂直高度 */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 w-full">
              
              {/* Front View */}
              <div 
                className="group relative cursor-zoom-in flex flex-col items-center gap-3"
                onClick={() => setSelectedImage("/paddle-full.png")}
              >
                  {/* 限制最大高度 max-h-[350px]，防止佔用太多空間 */}
                  <div className="relative w-full aspect-[3/4] max-h-[350px] bg-white/5 border border-white/5 transition-colors group-hover:border-accent/30 rounded-sm overflow-hidden">
                      <Image 
                          src="/paddle-full.png" 
                          alt="Front View" 
                          fill 
                          className="object-contain p-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Zoom Icon */}
                      <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                      </div>
                  </div>
                  <div className="text-gray-500 text-[10px] font-heading font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      {data.frontLabel}
                  </div>
              </div>

              {/* Back View */}
              <div 
                className="group relative cursor-zoom-in flex flex-col items-center gap-3"
                onClick={() => setSelectedImage("/paddle-back.png")}
              >
                  <div className="relative w-full aspect-[3/4] max-h-[350px] bg-white/5 border border-white/5 transition-colors group-hover:border-accent/30 rounded-sm overflow-hidden">
                      <Image 
                          src="/paddle-back.png" 
                          alt="Back View" 
                          fill 
                          className="object-contain p-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                      </div>
                  </div>
                  <div className="text-gray-500 text-[10px] font-heading font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                      {data.backLabel}
                  </div>
              </div>

          </div>

        </div>
      </div>

      {/* Lightbox Modal (功能保持不變) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
             <button className="absolute top-6 right-6 text-white/50 hover:text-accent transition-colors z-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>

             <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full max-w-2xl max-h-[85vh]"
             >
                <Image 
                    src={selectedImage} 
                    alt="Zoomed View" 
                    fill 
                    className="object-contain"
                />
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}