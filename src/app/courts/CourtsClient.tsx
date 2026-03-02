"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Court, DISTRICTS, RegionKey } from "../data/courts";
import StickyBanner from "../components/StickyBanner"; 
import { useLanguage } from "../context/LanguageContext";
import Footer from "../components/Footer"; 

const DISTRICT_I18N: Record<string, string> = {
  "中西區": "Central and Western", "灣仔區": "Wan Chai", "東區": "Eastern", "南區": "Southern",
  "油尖旺區": "Yau Tsim Mong", "深水埗區": "Sham Shui Po", "九龍城區": "Kowloon City", "黃大仙區": "Wong Tai Sin", "觀塘區": "Kwun Tong",
  "葵青區": "Kwai Tsing", "荃灣區": "Tsuen Wan", "屯門區": "Tuen Mun", "元朗區": "Yuen Long", "北區": "North", "大埔區": "Tai Po", "沙田區": "Sha Tin", "西貢區": "Sai Kung", "離島區": "Islands"
};

export default function CourtsClient({ initialCourts, footerContent }: { initialCourts: Court[], footerContent: any }) {
  const [activeRegion, setActiveRegion] = useState<RegionKey | "ALL">("ALL");
  const [activeDistrict, setActiveDistrict] = useState<string | "ALL">("ALL");
  const { lang } = useLanguage(); 

  // ★ 核心優化：鎖定篩選邏輯，防止重複計算導致手機發熱
  const filteredCourts = useMemo(() => {
    return initialCourts.filter(court => {
      const matchRegion = activeRegion === "ALL" || court.region === activeRegion;
      const matchDistrict = activeDistrict === "ALL" || court.district === activeDistrict;
      return matchRegion && matchDistrict;
    });
  }, [initialCourts, activeRegion, activeDistrict]);

  const footerData = footerContent[lang.toLowerCase() === 'en' ? 'en' : 'cn']?.footer || {};

  const handleRegionChange = (region: RegionKey | "ALL") => {
    setActiveRegion(region);
    setActiveDistrict("ALL");
  };

  const ui = {
    ZH: {
      title: "香港匹克球場地整合", subtitle: "全港匹克球場資訊與預訂指南",
      all: "全部 ALL", regionHK: "香港島 HK", regionKLN: "九龍 KLN", regionNT: "新界 NT", allDistricts: "全區",
      emptyTitle: "該區暫無場地。\n搵唔到場？不如先添置私家裝備。", viewDetail: "查看詳情",
      ownCourt: "想宣傳你的球場？", submitBtn: "提交球場資料",
      features: [
        { t: "T700 原生碳纖維", d: "提供歷久不衰的極致旋轉。" },
        { t: "HYBRID EVA 邊框", d: "強化邊緣防守穩定性。" },
        { t: "高密度 EPP 核心", d: "過濾震動並提供爆發力。" }
      ]
    },
    EN: {
      title: "HK PICKLEBALL COURTS", subtitle: "HK Pickleball Courts & Booking Guide",
      all: "ALL COURTS", regionHK: "HK ISLAND", regionKLN: "KOWLOON", regionNT: "NEW TERRITORIES", allDistricts: "ALL DISTRICTS",
      emptyTitle: "NO COURTS HERE YET,\nGET YOUR PREMIUM GEAR READY FIRST.", viewDetail: "VIEW DETAILS",
      ownCourt: "Own a court?", submitBtn: "SUBMIT YOUR COURT",
      features: [
        { t: "T700 RAW CARBON", d: "Long-lasting extreme spin." },
        { t: "HYBRID EVA EDGE", d: "Sweet spot & edge stability." },
        { t: "HIGH-DENSITY EPP CORE", d: "Filters vibrations for power." }
      ]
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-20 flex flex-col gap-8">
        <header className="flex flex-col items-start border-b border-white/10 pb-6">
           <span className="text-neon-red font-bold tracking-widest uppercase text-xs flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-neon-red"></span>DIRECTORY
           </span>
           <h1 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter">{ui.title}</h1>
           <p className="text-gray-400 font-body text-xs md:text-sm tracking-[0.2em] uppercase mt-3">{ui.subtitle}</p>
        </header>

        {/* 篩選器 */}
        <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {["ALL", "HK", "KLN", "NT"].map((r) => (
                  <button 
                    key={r}
                    onClick={() => handleRegionChange(r as any)} 
                    className={`px-4 py-2 rounded-sm border text-[11px] font-bold uppercase tracking-widest transition-colors ${activeRegion === r ? "bg-neon-red text-white border-neon-red" : "border-white/20 text-gray-500"}`}
                  >
                    {r === "ALL" ? ui.all : (ui as any)[`region${r}`]}
                  </button>
                ))}
              </div>
            </div>

            {activeRegion !== "ALL" && (
              <div className="flex flex-wrap gap-2 pt-2">
                <button onClick={() => setActiveDistrict("ALL")} className={`px-3 py-1.5 rounded-sm border text-[10px] font-bold uppercase transition-colors ${activeDistrict === "ALL" ? "bg-white/20 border-white/30" : "border-transparent text-gray-500"}`}>
                  {ui.allDistricts}
                </button>
                {DISTRICTS[activeRegion].map((d) => (
                  <button key={d} onClick={() => setActiveDistrict(d)} className={`px-3 py-1.5 rounded-sm border text-[10px] font-bold uppercase transition-colors ${activeDistrict === d ? "bg-white/20 border-white/30" : "border-transparent text-gray-500 bg-white/5"}`}>
                    {lang === "EN" ? DISTRICT_I18N[d] || d : d}
                  </button>
                ))}
              </div>
            )}
        </div>

        {/* 列表渲染 */}
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
  {filteredCourts.map((court) => {
    const cName = lang === "EN" && court.en.name ? court.en.name : court.name;
    const cAddress = lang === "EN" && court.en.address ? court.en.address : court.address;

    return (
      <Link href={`/courts/${court.id}`} key={court.id} className="group">
        <div className="flex flex-col bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden transition-all duration-300 hover:border-neon-red h-full">
          {/* 圖片比例調整為 1:1 或 4:3 節省高度 */}
          <div className="relative w-full aspect-square md:aspect-[4/3] bg-black">
             <Image 
              src={court.coverImage || "/home-court.png"} 
              alt={cName} 
              fill 
              quality={60}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
             />
          </div>
          {/* 縮減手機版的 Padding (p-3) 與字體 */}
          <div className="p-3 md:p-6 flex flex-col flex-grow gap-2 md:gap-4">
              <div className="flex items-center gap-1">
                 <span className="text-[8px] md:text-[10px] bg-neon-red/10 text-neon-red px-1.5 py-0.5 rounded-sm border border-neon-red/30 uppercase tracking-widest font-bold">
                   {court.region}
                 </span>
              </div>
              <h3 className="text-[13px] md:text-2xl font-heading font-bold text-white group-hover:text-neon-red transition-colors line-clamp-1 md:line-clamp-none">
                {cName}
              </h3>
              <p className="text-gray-400 text-[10px] md:text-sm line-clamp-1 opacity-60">
                {cAddress}
              </p>
          </div>
        </div>
      </Link>
    );
  })}
</section>
      </main>

      <Footer data={footerData} />
      <StickyBanner />
    </div>
  );
}