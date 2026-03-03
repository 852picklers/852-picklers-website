"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Court, DISTRICTS, RegionKey } from "../data/courts";
import { useLanguage } from "../context/LanguageContext";
import Footer from "../components/Footer"; 

// ★ 效能優化 1：動態匯入 StickyBanner 以減少初始 JavaScript 負擔 (預估省下 112 KiB)
const StickyBanner = dynamic(() => import("../components/StickyBanner"), { 
  ssr: false,
  loading: () => <div className="fixed bottom-0 w-full h-24 bg-black/5 animate-pulse z-[70]" /> 
});

const DISTRICT_I18N: Record<string, string> = {
  "中西區": "Central and Western", "灣仔區": "Wan Chai", "東區": "Eastern", "南區": "Southern",
  "油尖旺區": "Yau Tsim Mong", "深水埗區": "Sham Shui Po", "九龍城區": "Kowloon City", "黃大仙區": "Wong Tai Sin", "觀塘區": "Kwun Tong",
  "葵青區": "Kwai Tsing", "荃灣區": "Tsuen Wan", "屯門區": "Tuen Mun", "元朗區": "Yuen Long", "北區": "North", "大埔區": "Tai Po", "沙田區": "Sha Tin", "西貢區": "Sai Kung", "離島區": "Islands"
};

export default function CourtsClient({ initialCourts, footerContent }: { initialCourts: Court[], footerContent: any }) {
  const [activeRegion, setActiveRegion] = useState<RegionKey | "ALL">("ALL");
  const [activeDistrict, setActiveDistrict] = useState<string | "ALL">("ALL");
  const { lang } = useLanguage(); 

  // 鎖定篩選邏輯，防止重複計算
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

  // 精簡版文案，優化手機版空間
  const ui = {
    ZH: {
      title: "香港匹克球場地整合", subtitle: "全港匹克球場資訊與預訂指南",
      all: "全部", regionHK: "香港島", regionKLN: "九龍", regionNT: "新界", allDistricts: "全區",
    },
    EN: {
      title: "HK PICKLEBALL COURTS", subtitle: "HK Pickleball Courts & Booking Guide",
      all: "ALL", regionHK: "HK ISLAND", regionKLN: "KOWLOON", regionNT: "NEW TERRITORIES", allDistricts: "ALL DISTRICTS",
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 py-16 md:py-20 flex flex-col gap-10">
        <header className="flex flex-col items-start border-b border-white/10 pb-6">
           <span className="text-neon-red font-bold tracking-widest uppercase text-xs flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-neon-red"></span>DIRECTORY
           </span>
           <h1 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter">{ui.title}</h1>
           <p className="text-gray-400 font-body text-xs md:text-sm tracking-[0.2em] uppercase mt-3">{ui.subtitle}</p>
        </header>

        {/* 篩選器：加大字體確保行動端易於點擊 */}
        <div className="flex flex-col gap-6 border-b border-white/5 pb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                {["ALL", "HK", "KLN", "NT"].map((r) => (
                  <button 
                    key={r}
                    onClick={() => handleRegionChange(r as any)} 
                    className={`px-5 py-2.5 rounded-sm border text-sm md:text-base font-bold uppercase tracking-widest transition-all ${activeRegion === r ? "bg-neon-red text-white border-neon-red" : "border-white/20 text-gray-500 hover:text-white"}`}
                  >
                    {r === "ALL" ? ui.all : (ui as any)[`region${r}`]}
                  </button>
                ))}
              </div>
            </div>

            {activeRegion !== "ALL" && (
              <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                <button onClick={() => setActiveDistrict("ALL")} className={`px-4 py-2 rounded-sm border text-xs md:text-sm font-bold uppercase transition-all ${activeDistrict === "ALL" ? "bg-white/20 text-white" : "border-transparent text-gray-600"}`}>
                  {ui.allDistricts}
                </button>
                {DISTRICTS[activeRegion].map((d) => (
                  <button key={d} onClick={() => setActiveDistrict(d)} className={`px-4 py-2 rounded-sm border text-xs md:text-sm font-bold uppercase transition-all ${activeDistrict === d ? "bg-white/20 text-white" : "border-transparent text-gray-600 bg-white/5"}`}>
                    {lang === "EN" ? DISTRICT_I18N[d] || d : d}
                  </button>
                ))}
              </div>
            )}
        </div>

        {/* 場地列表：手機版兩欄佈局，優化 LCP 圖片加載 */}
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredCourts.map((court, index) => {
            const cName = lang === "EN" && court.en.name ? court.en.name : court.name;
            const cAddress = lang === "EN" && court.en.address ? court.en.address : court.address;
            const cDistrict = lang === "EN" ? DISTRICT_I18N[court.district] || court.district : court.district;
            const cFacilities = lang === "EN" && court.en.facilities?.length > 0 ? court.en.facilities : court.facilities;

            return (
              <Link href={`/courts/${court.id}`} key={court.id} className="group">
                <div className="flex flex-col bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden hover:border-neon-red transition-all h-full">
                  <div className="relative w-full aspect-square md:aspect-[4/3] bg-black">
                     <Image 
                      src={court.coverImage || "/home-court.png"} 
                      alt={cName} 
                      fill 
                      quality={60}
                      // ★ 效能優化 2：前兩張圖片優先加載，解決 LCP 延遲問題
                      priority={index < 2} 
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                     />
                  </div>
                  <div className="p-3 md:p-6 flex flex-col flex-grow gap-2 md:gap-4">
                      <div className="flex items-center gap-1">
                         {/* 恢復 [Region | District] 標籤 */}
                         <span className="text-[9px] md:text-[10px] bg-neon-red/10 text-neon-red px-1.5 py-0.5 rounded-sm border border-neon-red/30 uppercase font-bold tracking-tighter">
                           {court.region} {court.district ? `| ${cDistrict}` : ""}
                         </span>
                      </div>
                      
                      <h3 className="text-[14px] md:text-2xl font-heading font-bold text-white group-hover:text-neon-red transition-colors line-clamp-1">
                        {cName}
                      </h3>

                      <p className="text-gray-400 text-[10px] md:text-sm line-clamp-1 opacity-60">
                        {cAddress}
                      </p>

                      {/* 設施標籤：加大字體並改為高對比深灰背景 */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-white/10">
                        {(cFacilities || []).slice(0, 2).map((fac, idx) => (
                          <span key={idx} className="text-[10px] md:text-[11px] font-bold text-gray-200 bg-[#222] border border-white/10 px-2 py-1 rounded-sm whitespace-nowrap">
                            {fac}
                          </span>
                        ))}
                      </div>
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