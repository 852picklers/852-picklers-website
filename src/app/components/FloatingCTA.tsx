"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type Props = {
  text: string;
  link: string; // ★ 新增 link 屬性
};

export default function FloatingCTA({ text, link }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 滾動超過 300px 才顯示
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
        >
          {/* ★★★ 修改重點：改成 <a> 標籤並使用傳入的 link ★★★ */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto bg-accent text-black font-heading font-bold text-sm md:text-base px-8 py-3 uppercase tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            {text}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}