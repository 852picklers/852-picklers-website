"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Court, DISTRICTS, RegionKey } from "../data/courts";
import StickyBanner from "../components/StickyBanner"; 
import { useLanguage } from "../context/LanguageContext";
import Footer from "../components/Footer"; 

const DISTRICT_I18N: Record<string, string> = {
  "中西區": "Central and Western",
  "灣仔區": "Wan Chai",
  "東區": "Eastern",
  "南區": "Southern",
  "油尖旺區": "Yau Tsim Mong",
  "深水埗區": "Sham Shui Po",
  "九龍城區": "Kowloon City",
  "黃大仙區": "Wong Tai Sin",
  "觀塘區": "Kwun Tong",
  "葵青區": "Kwai Tsing",
  "荃灣區": "Tsuen Wan",
  "屯門區": "Tuen Mun",
  "元朗區": "Yuen Long",
  "北區": "North",
  "大埔區": "Tai Po",
  "沙田區": "Sha Tin",
  "西貢區": "Sai Kung",
  "離島區": "Islands"
};

export default function CourtsClient({ initialCourts, footerContent }: { initialCourts: Court[], footerContent: any }) {
  const [activeRegion, setActiveRegion] = useState<RegionKey | "ALL">("ALL");
  const [activeDistrict, setActiveDistrict] = useState<string | "ALL">("ALL");
  
  // ★ 1. 必須先讀取 lang 狀態
  const { lang } = useLanguage(); 

  // ★ 2. 根據 lang 計算 footerData
  const footerData = footerContent[lang.toLowerCase() === 'en' ? 'en' : 'cn'].footer;

  const handleRegionChange = (region: RegionKey | "ALL") => {
    setActiveRegion(region);
    setActiveDistrict("ALL");
  };

  const filteredCourts = initialCourts.filter(court => {
    const matchRegion = activeRegion === "ALL" || court.region === activeRegion;
    const matchDistrict = activeDistrict === "ALL" || court.district === activeDistrict;
    return matchRegion && matchDistrict;
  });

  const ui = {
    ZH: {
      title: "香港匹克球場地整合",
      subtitle: "全港匹克球場資訊與預訂指南",
      all: "全部 ALL",
      regionHK: "香港島 HK",
      regionKLN: "九龍 KLN",
      regionNT: "新界 NT",
      allDistricts: "全區",
      emptyTitle: "該區暫無場地。\n搵唔到場？不如先添置私家裝備。",
      viewDetail: "查看詳情",
      ownCourt: "想宣傳你的球場？",
      submitBtn: "提交球場資料",
      features: [
        { t: "T700 原生碳纖維", d: "物理性摩擦力，提供歷久不衰的極致旋轉。" },
        { t: "HYBRID EVA 邊框", d: "大幅擴大擊球甜點，強化邊緣防守穩定性。" },
        { t: "高密度 EPP 核心", d: "完美過濾震動，帶來輕量化與驚人回彈爆發力。" }
      ]
    },
    EN: {
      title: "HK PICKLEBALL COURTS",
      subtitle: "Hong Kong Pickleball Courts & Booking Guide",
      all: "ALL COURTS",
      regionHK: "HK ISLAND",
      regionKLN: "KOWLOON",
      regionNT: "NEW TERRITORIES",
      allDistricts: "ALL DISTRICTS",
      emptyTitle: "NO COURTS HERE YET,\nGET YOUR PREMIUM GEAR READY FIRST.",
      viewDetail: "VIEW DETAILS",
      ownCourt: "Own a court?",
      submitBtn: "SUBMIT YOUR COURT",
      features: [
        { t: "T700 RAW CARBON", d: "Physical friction for long-lasting, extreme spin." },
        { t: "HYBRID EVA EDGE", d: "Massively expands sweet spot & edge stability." },
        { t: "HIGH-DENSITY EPP CORE", d: "Perfectly filters vibrations for explosive power." }
      ]
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-neon-red/5 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-20 flex flex-col gap-8 md:gap-10">
        <header className="flex flex-col items-start border-b border-white/10 pb-6 md:pb-8">
           <span className="text-neon-red font-bold tracking-widest uppercase text-xs md:text-sm flex items-center gap-2 mb-3 md:mb-4">
              <span className="w-6 md:w-8 h-[2px] bg-neon-red"></span>DIRECTORY
           </span>
           <h1 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter drop-shadow-2xl">{ui.title}</h1>
           <p className="text-gray-400 font-body text-xs md:text-sm tracking-[0.2em] uppercase mt-3 md:mt-4">{ui.subtitle}</p>
        </header>

        {/* 篩選器區域 */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3 md:gap-4">
                <button onClick={() => handleRegionChange("ALL")} className={`px-4 md:px-6 py-2 rounded-sm border text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeRegion === "ALL" ? "bg-neon-red text-white border-neon-red" : "border-white/20 text-gray-500 hover:text-white hover:border-white/50"}`}>{ui.all}</button>
                <button onClick={() => handleRegionChange("HK")} className={`px-4 md:px-6 py-2 rounded-sm border text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeRegion === "HK" ? "bg-neon-red text-white border-neon-red" : "border-white/20 text-gray-500 hover:text-white hover:border-white/50"}`}>{ui.regionHK}</button>
                <button onClick={() => handleRegionChange("KLN")} className={`px-4 md:px-6 py-2 rounded-sm border text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeRegion === "KLN" ? "bg-neon-red text-white border-neon-red" : "border-white/20 text-gray-500 hover:text-white hover:border-white/50"}`}>{ui.regionKLN}</button>
                <button onClick={() => handleRegionChange("NT")} className={`px-4 md:px-6 py-2 rounded-sm border text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeRegion === "NT" ? "bg-neon-red text-white border-neon-red" : "border-white/20 text-gray-500 hover:text-white hover:border-white/50"}`}>{ui.regionNT}</button>
              </div>

              <a href="https://forms.gle/dXVJUoA3jEA33NYGA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                <span className="text-[10px] md:text-xs text-gray-600 group-hover:text-gray-400 transition-colors uppercase tracking-widest font-medium">
                  {ui.ownCourt}
                </span>
                <span className="px-3 py-1.5 border border-white/10 text-[10px] md:text-xs text-gray-500 group-hover:text-white group-hover:border-white/30 transition-all duration-300 uppercase tracking-widest rounded-sm bg-white/[0.02]">
                  {ui.submitBtn}
                </span>
              </a>
            </div>

            <AnimatePresence>
              {activeRegion !== "ALL" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 md:gap-3 pt-2 overflow-hidden"
                >
                  <button onClick={() => setActiveDistrict("ALL")} className={`px-3 py-1.5 rounded-sm border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeDistrict === "ALL" ? "bg-white/20 text-white border-white/30" : "border-transparent text-gray-500 hover:text-white"}`}>
                    {ui.allDistricts}
                  </button>
                  {DISTRICTS[activeRegion].map((districtName) => (
                    <button key={districtName} onClick={() => setActiveDistrict(districtName)} className={`px-3 py-1.5 rounded-sm border text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeDistrict === districtName ? "bg-white/20 text-white border-white/30" : "border-transparent text-gray-500 hover:text-white bg-white/5 hover:bg-white/10"}`}>
                      {lang === "EN" ? DISTRICT_I18N[districtName] || districtName : districtName}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
        </div>

        {/* 場地列表展示 */}
        {filteredCourts.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full mt-2 md:mt-4">
             <div className="relative w-full bg-[#080808] border border-white/10 rounded-sm overflow-hidden flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 relative min-h-[300px] md:min-h-[450px] bg-[#050505] overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                   <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent z-10 md:hidden"></div>
                   <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-1000 flex items-center justify-center pt-8">
                      <Image src="/home-gear.png" alt="PRO GEAR" fill className="object-contain object-bottom filter drop-shadow-[0_0_20px_rgba(204,255,0,0.15)]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                   </div>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center relative z-20 bg-black/90 md:bg-transparent -mt-20 md:mt-0">
                   <span className="text-[#ccff00] font-bold tracking-widest uppercase text-xs flex items-center gap-2 mb-4">PROJECT 852 ． FIRST SERVE</span>
                   <h2 className="text-3xl md:text-5xl font-heading font-bold text-white uppercase tracking-tighter mb-8 leading-tight whitespace-pre-line">{ui.emptyTitle}</h2>
                   <div className="flex flex-col gap-4 text-gray-400 text-sm md:text-base font-body mb-10">
                      {ui.features.map((f, i) => (
                        <p key={i} className="flex items-start gap-3"><span className="text-[#ccff00] mt-1">■</span><span><strong className="text-white">{f.t}</strong>：{f.d}</span></p>
                      ))}
                   </div>
                   <div>
                      <Link href="/shop" className="group inline-block">
                         <div className="bg-[#ccff00] transform -skew-x-[15deg] shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_rgba(204,255,0,0.7)] transition-all duration-300 px-8 py-3">
                            <div className="transform skew-x-[15deg] text-black text-sm md:text-base font-bold uppercase tracking-widest flex items-center gap-2">
                               {lang === 'EN' ? 'LEARN MORE' : '了解更多'}
                               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                         </div>
                      </Link>
                   </div>
                </div>
             </div>
          </motion.div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredCourts.map((court) => {
              const cName = lang === "EN" && court.en.name ? court.en.name : court.name;
              const cAddress = lang === "EN" && court.en.address ? court.en.address : court.address;
              const cFacilities = lang === "EN" && court.en.facilities?.length > 0 ? court.en.facilities : court.facilities;

              return (
                <Link href={`/courts/${court.id}`} key={court.id} className="group">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden transition-all duration-500 group-hover:border-neon-red group-hover:shadow-[0_0_30px_rgba(255,0,60,0.2)] group-hover:-translate-y-1 h-full">
                    <div className="relative w-full aspect-[4/3] bg-black overflow-hidden border-b border-white/10">
                       <Image src={court.coverImage || "/home-court.png"} alt={cName} fill className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-10">
                           <span className="px-4 py-2 border border-neon-red text-neon-red text-xs font-bold uppercase tracking-widest">{ui.viewDetail}</span>
                       </div>
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-grow gap-4 relative">
                        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-neon-red transition-colors duration-500"></div>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] bg-neon-red/10 text-neon-red px-2 py-1 rounded-sm border border-neon-red/30 uppercase tracking-widest font-bold">
                             {court.region} {court.district ? `| ${lang === "EN" ? DISTRICT_I18N[court.district] || court.district : court.district}` : ""}
                           </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-neon-red transition-colors">{cName}</h3>
                        <p className="text-gray-400 text-xs md:text-sm flex items-start gap-2">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-neon-red/50"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                           <span className="line-clamp-2">{cAddress}</span>
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                           {(cFacilities || []).slice(0, 3).map((facility, idx) => (
                             <span key={idx} className="text-[9px] md:text-[10px] font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded-sm">{facility}</span>
                           ))}
                           {(cFacilities || []).length > 3 && (
                             <span className="text-[9px] md:text-[10px] font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded-sm">+{(cFacilities || []).length - 3}</span>
                           )}
                        </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </section>
        )}
      </main>

      {/* ★ 3. Footer 擺放喺 main 之後 */}
      <Footer data={footerData} />
      
      <StickyBanner />
    </div>
  );
}