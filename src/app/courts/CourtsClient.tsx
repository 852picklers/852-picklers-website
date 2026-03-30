"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Court, DISTRICTS, RegionKey } from "../data/courts";
import { useLanguage } from "../context/LanguageContext";
import Footer from "../components/Footer"; 

const StickyBanner = dynamic(() => import("../components/StickyBanner"), { ssr: false });

const DISTRICT_I18N: Record<string, string> = {
  "中西區": "Central and Western", "灣仔區": "Wan Chai", "東區": "Eastern", "南區": "Southern",
  "油尖旺區": "Yau Tsim Mong", "深水埗區": "Sham Shui Po", "九龍城區": "Kowloon City", "黃大仙區": "Wong Tai Sin", "觀塘區": "Kwun Tong",
  "葵青區": "Kwai Tsing", "荃灣區": "Tsuen Wan", "屯門區": "Tuen Mun", "元朗區": "Yuen Long", "北區": "North", "大埔區": "Tai Po", "沙田區": "Sha Tin", "西貢區": "Sai Kung", "離島區": "Islands"
};

export default function CourtsClient({ initialCourts, footerContent }: { initialCourts: Court[], footerContent: any }) {
  const [activeRegion, setActiveRegion] = useState<RegionKey | "ALL">("ALL");
  const [activeDistrict, setActiveDistrict] = useState<string | "ALL">("ALL");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC"); 
  const { lang } = useLanguage(); 

  const handleRegionChange = (region: RegionKey | "ALL") => {
    setActiveRegion(region);
    setActiveDistrict("ALL");
  };

  const filteredCourts = useMemo(() => {
    return initialCourts
      .filter(court => {
        const matchRegion = activeRegion === "ALL" || court.region === activeRegion;
        const matchDistrict = activeDistrict === "ALL" || court.district === activeDistrict;
        return matchRegion && matchDistrict;
      })
      .sort((a, b) => {
        const nameA = lang === "EN" ? (a.en.name || a.name) : a.name;
        const nameB = lang === "EN" ? (b.en.name || b.name) : b.name;
        return sortOrder === "ASC" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
  }, [initialCourts, activeRegion, activeDistrict, lang, sortOrder]);

  const footerData = footerContent[lang.toLowerCase() === 'en' ? 'en' : 'cn']?.footer || {};

  const ui = {
    ZH: {
      title: "香港匹克球場地整合",
      subtitle: "全港匹克球場資訊與預訂指南",
      all: "全部",
      regionHK: "香港島", regionKLN: "九龍", regionNT: "新界",
      allDistricts: "全區",
      ownCourt: "擁有球場？",
      submitDesc: "免費將您的場地刊登在 852 Picklers，連繫本地球友。", 
      submit: "+ 加入你的球場",
      sortAZ: "名稱 A-Z",
      sortZA: "名稱 Z-A"
    },
    EN: {
      title: "HK PICKLEBALL COURTS",
      subtitle: "HK Pickleball Courts & Booking Guide",
      all: "ALL",
      regionHK: "HK ISLAND", regionKLN: "KOWLOON", regionNT: "NEW TERRITORIES",
      allDistricts: "ALL DISTRICTS",
      ownCourt: "OWN A COURT?",
      submitDesc: "List your venue for free to reach the local community.",
      submit: "+ Add your court",
      sortAZ: "NAME A-Z",
      sortZA: "NAME Z-A"
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative">
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 pt-28 pb-16 flex flex-col gap-12">
        
        {/* ★ Browser View Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 border-b border-white/10 pb-12">
          
          <header className="flex flex-col gap-5">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter leading-tight">
              {ui.title}
            </h1>
            {/* 加大副標題字體 */}
            <p className="text-gray-400 font-body text-sm md:text-base tracking-[0.2em] uppercase">
              {ui.subtitle}
            </p>
          </header>

          {/* ★ Submission Session: 壓縮間距並加大按鈕字體 */}
          <div className="flex flex-col items-start lg:items-end gap-4 p-8 bg-white/[0.03] border border-white/10 rounded-sm lg:max-w-md w-full">
            <div className="flex flex-col gap-1.5 lg:text-right">
              <p className="text-neon-red font-bold text-xl md:text-2xl tracking-widest uppercase">{ui.ownCourt}</p>
              <p className="text-gray-400 text-[11px] md:text-sm leading-relaxed">{ui.submitDesc}</p>
            </div>
            <a 
              href="https://forms.gle/W4i4GJtYnucUC9Qi6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full lg:w-auto px-8 py-4 border border-white/20 text-white hover:border-neon-red hover:text-neon-red transition-all text-sm font-bold tracking-widest rounded-sm uppercase text-center"
            >
              {ui.submit}
            </a>
          </div>
        </div>

        {/* 篩選與排序佈局 */}
        <div className="flex flex-col gap-6 border-b border-white/5 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-3">
                {["ALL", "HK", "KLN", "NT"].map((r) => (
                  <button 
                    key={r}
                    onClick={() => handleRegionChange(r as any)} 
                    className={`px-5 py-2.5 rounded-sm border text-sm md:text-base font-bold uppercase tracking-widest transition-all ${activeRegion === r ? "bg-neon-red text-white border-neon-red shadow-[0_0_15px_rgba(255,0,60,0.3)]" : "border-white/10 text-gray-500 hover:text-white"}`}
                  >
                    {r === "ALL" ? ui.all : (ui as any)[`region${r}`]}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all text-[10px] font-bold tracking-[0.2em] rounded-sm uppercase"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neon-red">
                  <path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>
                </svg>
                {sortOrder === "ASC" ? ui.sortAZ : ui.sortZA}
              </button>
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

        {/* 列表內容 */}
        <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredCourts.map((court, index) => {
            const cName = lang === "EN" && court.en.name ? court.en.name : court.name;
            const cAddress = lang === "EN" && court.en.address ? court.en.address : court.address;
            const cDistrict = lang === "EN" ? DISTRICT_I18N[court.district] || court.district : court.district;

            return (
              <Link href={`/courts/${court.id}`} key={court.id} className="group">
                <div className="flex flex-col bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden hover:border-neon-red transition-all h-full">
                  <div className="relative w-full aspect-square md:aspect-[4/3] bg-black">
                     <Image 
                      src={court.coverImage || "/home-court.png"} 
                      alt={cName} 
                      fill 
                      quality={60}
                      priority={index < 2} 
                      className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" 
                     />
                  </div>
                  <div className="p-3 md:p-6 flex flex-col flex-grow gap-2 md:gap-4">
                      <div className="flex items-center gap-1">
                         <span className="text-[9px] md:text-[10px] bg-neon-red/10 text-neon-red px-1.5 py-0.5 rounded-sm border border-neon-red/30 uppercase font-bold tracking-tighter">
                           {court.region} {court.district ? `| ${cDistrict}` : ""}
                         </span>
                      </div>
                      <h3 className="text-[14px] md:text-2xl font-heading font-bold text-white group-hover:text-neon-red transition-colors line-clamp-1">{cName}</h3>
                      <div className="flex items-start gap-1 opacity-60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-gray-400">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <p className="text-gray-400 text-[10px] md:text-sm line-clamp-1">{cAddress}</p>
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