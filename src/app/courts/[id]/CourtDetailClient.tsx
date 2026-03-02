"use client";

import Link from "next/link";
import Image from "next/image";
import { Court } from "../../data/courts";
import StickyBanner from "../../components/StickyBanner";
import { useLanguage } from "../../context/LanguageContext";

export default function CourtDetailClient({ court }: { court: Court }) {
  const { lang } = useLanguage();

  const cName = lang === "EN" && court.en.name ? court.en.name : court.name;
  const cAddress = lang === "EN" && court.en.address ? court.en.address : court.address;
  const cMtr = lang === "EN" && court.en.mtr ? court.en.mtr : court.mtr;
  const cExit = lang === "EN" && court.en.exit ? court.en.exit : court.exit;
  const cOpenHours = lang === "EN" && court.en.openHours ? court.en.openHours : court.openHours;
  const cPriceInfo = lang === "EN" && court.en.priceInfo ? court.en.priceInfo : court.priceInfo;
  const cMembership = lang === "EN" && court.en.membership ? court.en.membership : court.membership;
  const cBookingMethod = lang === "EN" && court.en.bookingMethod ? court.en.bookingMethod : court.bookingMethod;
  const cFacilities = lang === "EN" && court.en.facilities?.length > 0 ? court.en.facilities : court.facilities;

  const ui = {
    ZH: {
      back: "BACK TO DIRECTORY",
      address: "地址",
      transport: "交通",
      walkMins: "步行",
      mins: "分鐘",
      exit: "出口",
      openHours: "開放時間",
      fee: "收費詳情",
      membership: "會員制度",
      booking: "預訂方式",
      facilities: "場地設施",
      ready: "球場資訊與預訂指南",
      bookNow: "預約場地",
      igText: "想知邊個場最好打？",
      igAction: "Follow @852.picklers 睇場地真實評測！",
      map: "Google Map導航",
      noMap: "暫無地圖連結",
      disclaimerTitle: "免責聲明 // DISCLAIMER",
      disclaimerContent: "本網站所載之場地資訊（包括但不限於收費、設施及預約方式）僅供參考。所有資訊均以場地最終公佈為準，852 Picklers 並不保證資料之絕對準確性或及時性。如因資料錯誤或變更而引致任何損失，本品牌恕不負責。如網站資料有錯或有待更新，請隨時透過 Instagram DM @852.picklers 聯絡我們。"
    },
    EN: {
      back: "BACK TO DIRECTORY",
      address: "Address",
      transport: "Transport",
      walkMins: "Walk",
      mins: "mins",
      exit: "Exit",
      openHours: "Opening Hours",
      fee: "Fee",
      membership: "Membership",
      booking: "Booking Method",
      facilities: "Facilities",
      ready: "Courts Details & Booking Guide",
      bookNow: "Book a Court", 
      igText: "Looking for the best court?",
      igAction: "Follow @852.picklers for reviews!",
      map: "Google Map",
      noMap: "No Map Link",
      disclaimerTitle: "DISCLAIMER",
      disclaimerContent: "The court information provided on this website (including but not limited to pricing, facilities, and booking methods) is for reference only. All details are subject to change by the respective venues, and 852 Picklers does not guarantee the absolute accuracy or timeliness of such information. We shall not be held liable for any loss arising from errors or changes in the data provided. If you find any errors or have updates, please feel free to DM us on Instagram @852.picklers."
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative pb-32 md:pb-40">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center">
         <Link href="/courts" className="text-gray-400 hover:text-neon-red transition-colors flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            {ui.back}
         </Link>
      </nav>

      <div className="relative w-full h-[40vh] md:h-[50vh] mt-14 border-b border-neon-red/30 bg-black">
        <Image src={court.coverImage || "/home-court.png"} alt={cName} fill className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-[1400px] mx-auto">
           <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-neon-red text-white text-xs font-bold uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(255,0,60,0.5)]">{court.region}</span>
             <span className="px-3 py-1 border border-neon-red text-neon-red text-xs font-bold uppercase tracking-widest rounded-sm bg-black/50">{court.district}</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-tighter drop-shadow-2xl">{cName}</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
         <div className="lg:col-span-2 flex flex-col gap-12">
            
            {(cFacilities || []).length > 0 && (
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
                 <h3 className="text-neon-red font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                   <span className="w-4 h-[2px] bg-neon-red"></span>{ui.facilities}
                 </h3>
                 <div className="flex flex-wrap gap-3">
                    {(cFacilities || []).map((fac, idx) => (
                      <span key={idx} className="px-4 py-2 bg-[#0a0a0a] border border-white/10 hover:border-neon-red/50 transition-colors text-gray-300 font-mono text-sm rounded-sm">
                         {fac}
                      </span>
                    ))}
                 </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
               <InfoBlock title={ui.address} value={cAddress} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>} />
               <InfoBlock title={ui.transport} value={cMtr ? `${cMtr} ${cExit ? cExit + ' ' + ui.exit : ''} (${ui.walkMins} ${court.walkMins || 0} ${ui.mins})` : ''} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>} />
               <InfoBlock title={ui.openHours} value={cOpenHours} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>} />
               <InfoBlock title={ui.booking} value={cBookingMethod} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>} />
               <InfoBlock title={ui.fee} value={cPriceInfo} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>} />
               <InfoBlock title={ui.membership} value={cMembership} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>} />
            </div>
         </div>

         {/* 右側 Action Panel */}
         <div className="flex flex-col gap-6">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm flex flex-col gap-8 lg:sticky lg:top-24 shadow-2xl">
               <h3 className="text-white/40 font-heading font-bold text-xs uppercase tracking-[0.3em] border-b border-white/10 pb-4">
                 {ui.ready}
               </h3>
               
               <div className="grid grid-cols-2 gap-4">
                  {court.bookingLink ? (
                    <a href={court.bookingLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-3 p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 transition-all duration-300 group">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                       <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">{ui.bookNow}</span>
                    </a>
                  ) : null}

                  {court.googleMapLink ? (
                    <a href={court.googleMapLink} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-3 p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 transition-all duration-300 group">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-white"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                       <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white">{ui.map}</span>
                    </a>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 p-4 border border-white/5 opacity-30 cursor-not-allowed">
                       <span className="text-[10px] uppercase font-bold text-gray-600">{ui.noMap}</span>
                    </div>
                  )}
               </div>

               {/* Instagram 評測提示 */}
               <div className="bg-white/[0.03] p-6 border-l-2 border-[#ccff00]/50 flex flex-col gap-3">
                  <p className="text-gray-400 text-xs leading-relaxed font-body">
                     {ui.igText}
                  </p>
                  <a 
                    href="https://www.instagram.com/852.picklers/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#ccff00] hover:text-white transition-colors text-[11px] font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                     {ui.igAction}
                  </a>
               </div>

               {/* ★ 免責聲明區塊：放置在 IG 提示下方 ★ */}
               <div className="bg-white/[0.02] p-6 border-l-2 border-white/10">
                <h4 className="text-gray-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  {ui.disclaimerTitle}
                </h4>
                <p className="text-[10px] md:text-[11px] text-gray-600 font-body leading-relaxed">
                  {ui.disclaimerContent.split('@852.picklers').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <a href="https://www.instagram.com/852.picklers/" target="_blank" className="text-gray-400 hover:text-accent underline transition-colors">@852.picklers</a>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>
         </div>
      </div>
      <StickyBanner />
    </div>
  );
}

function InfoBlock({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
   if (!value) return null; 
  return (
     <div className="flex flex-col gap-3">
        <h4 className="text-white/30 font-bold uppercase tracking-[0.15em] text-[12px] flex items-center gap-2.5 mb-1">
          {icon}
          {title}
        </h4>
        <div className="text-white/90 font-body text-base md:text-lg leading-relaxed pl-8">
           {value.split('//').map((line, i) => <span key={i} className="block mb-1.5 last:mb-0">{line.trim()}</span>)}
        </div>
    </div>
  );
}