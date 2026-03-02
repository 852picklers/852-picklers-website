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
      address: "地址", transport: "交通", walkMins: "步行", mins: "分鐘", exit: "出口",
      openHours: "開放時間", fee: "收費詳情", membership: "會員制度", booking: "預訂方式",
      facilities: "場地設施", ready: "球場資訊與預訂指南", bookNow: "預約場地",
      igText: "想知邊個場最好打？", igAction: "Follow @852.picklers 睇場地真實評測！",
      map: "Google Map導航", noMap: "暫無地圖連結",
      disclaimerTitle: "免責聲明 // DISCLAIMER",
      disclaimerContent: "本網站所載之場地資訊僅供參考。所有資訊均以場地最終公佈為準。如網站資料有錯，請透過 Instagram DM @852.picklers 聯絡我們。"
    },
    EN: {
      back: "BACK TO DIRECTORY",
      address: "Address", transport: "Transport", walkMins: "Walk", mins: "mins", exit: "Exit",
      openHours: "Opening Hours", fee: "Fee", membership: "Membership", booking: "Booking Method",
      facilities: "Facilities", ready: "Courts Details & Booking Guide", bookNow: "Book a Court",
      igText: "Looking for the best court?", igAction: "Follow @852.picklers for reviews!",
      map: "Google Map", noMap: "No Map Link",
      disclaimerTitle: "DISCLAIMER",
      disclaimerContent: "The court information provided is for reference only. Details are subject to change by venues. DM us on Instagram @852.picklers for updates."
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
        <Image 
          src={court.coverImage || "/home-court.png"} 
          alt={cName} 
          fill 
          priority // 核心優化：首屏大圖優先加載
          quality={75} // 降低品質減輕內存壓力
          sizes="100vw"
          className="object-cover opacity-50" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-[1400px] mx-auto">
           <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-neon-red text-white text-xs font-bold uppercase tracking-widest rounded-sm">{court.region}</span>
             <span className="px-3 py-1 border border-neon-red text-neon-red text-xs font-bold uppercase tracking-widest rounded-sm bg-black/50">{court.district}</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-tighter">{cName}</h1>
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
                      <span key={idx} className="px-4 py-2 bg-[#0a0a0a] border border-white/10 text-gray-300 font-mono text-sm rounded-sm">
                         {fac}
                      </span>
                    ))}
                 </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
               <InfoBlock title={ui.address} value={cAddress} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>} />
               <InfoBlock title={ui.transport} value={cMtr ? `${cMtr} ${cExit || ''} (${ui.walkMins} ${court.walkMins || 0} ${ui.mins})` : ''} icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>} />
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm flex flex-col gap-8 lg:sticky lg:top-24">
               <h3 className="text-white/40 font-heading font-bold text-xs uppercase tracking-[0.3em] border-b border-white/10 pb-4">{ui.ready}</h3>
               
               <div className="grid grid-cols-2 gap-4">
                  {court.bookingLink && (
                    <a href={court.bookingLink} target="_blank" className="flex flex-col items-center justify-center gap-3 p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05]">
                       <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">{ui.bookNow}</span>
                    </a>
                  )}
               </div>

               <div className="bg-white/[0.03] p-6 border-l-2 border-[#ccff00]/50 flex flex-col gap-3">
                  <p className="text-gray-400 text-xs leading-relaxed font-body">{ui.igText}</p>
                  <a href="https://www.instagram.com/852.picklers/" target="_blank" className="text-[#ccff00] font-bold uppercase tracking-wider text-[11px]">{ui.igAction}</a>
               </div>

               <div className="bg-white/[0.02] p-6 border-l-2 border-white/10">
                <h4 className="text-gray-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">{ui.disclaimerTitle}</h4>
                <p className="text-[10px] md:text-[11px] text-gray-600 font-body leading-relaxed">{ui.disclaimerContent}</p>
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
        <h4 className="text-white/30 font-bold uppercase tracking-[0.15em] text-[12px] flex items-center gap-2.5 mb-1">{icon}{title}</h4>
        <div className="text-white/90 font-body text-base md:text-lg leading-relaxed pl-8">
           {value.split('//').map((line, i) => <span key={i} className="block mb-1.5 last:mb-0">{line.trim()}</span>)}
        </div>
    </div>
  );
}