"use client";

import Link from "next/link";
import Image from "next/image";
import { Court } from "../../data/courts";
import StickyBanner from "../../components/StickyBanner";
import { useLanguage } from "../../context/LanguageContext";

export default function CourtDetailClient({ court }: { court: Court }) {
  const { lang } = useLanguage();

  const cName = lang === "EN" && court.en?.name ? court.en.name : court.name;
  const cAddress = lang === "EN" && court.en?.address ? court.en.address : court.address;
  const cMtr = lang === "EN" && court.en?.mtr ? court.en.mtr : court.mtr;
  const cExit = lang === "EN" && court.en?.exit ? court.en.exit : court.exit;
  const cOpenHours = lang === "EN" && court.en?.openHours ? court.en.openHours : court.openHours;
  const cPriceInfo = lang === "EN" && court.en?.priceInfo ? court.en.priceInfo : court.priceInfo;
  const cMembership = lang === "EN" && court.en?.membership ? court.en.membership : court.membership;
  const cBookingMethod = lang === "EN" && court.en?.bookingMethod ? court.en.bookingMethod : court.bookingMethod;
  const cFacilities = lang === "EN" && court.en?.facilities?.length > 0 ? court.en.facilities : court.facilities;

  // SEO & Phone 邏輯：判斷 contactlink 是否為電話
  const rawData = court as any;
  const contactRaw = rawData['contactlink'] || rawData['Contactlink'] || rawData['ContactLink'] || "";
  const contactValue = String(contactRaw).trim();
  const isPhoneNumber = contactValue && /^\d+$/.test(contactValue.replace(/\s/g, ''));
  const finalContactHref = isPhoneNumber ? `tel:${contactValue.replace(/\s/g, '')}` : contactValue;

  const ui = {
    ZH: {
      back: "BACK TO DIRECTORY", address: "地址", transport: "交通", mins: "分鐘", exit: "出口", walk: "步行",
      openHours: "開放時間", fee: "收費詳情", membership: "付費會員制度", booking: "預訂方式", facilities: "場地設施",
      ready: "球場資訊與預訂指南", ownCourt: "擁有球場？",
      submitDesc: "免費將您的場地刊登在 852 Picklers，連繫本地球友。",
      submit: "+ 加入你的球場 / Add your court", bookNow: "預約場地", map: "GOOGLE MAP", contact: "聯絡球場 / CONTACT",
      igText: "想知邊個場最好打？", igAction: "FOLLOW @852.PICKLERS 睇場地真實評測！",
      disclaimerTitle: "免責聲明 // DISCLAIMER",
      disclaimerContent: "本網站所載之場地資訊（包括但不限於收費、設施及預約方式）僅供參考。所有資訊均以場地最終公佈為準，852 Picklers 並不保證資料之絕對準確性或及時性。如因資料錯誤或變更而引致任何損失，本品牌恕不負責。如網站資料有錯或有待更新，請隨時透過 Instagram DM @852.picklers 聯絡我們。"
    },
    EN: {
      back: "BACK TO DIRECTORY", address: "Address", transport: "Transport", mins: "mins", exit: "Exit", walk: "Walk",
      openHours: "Opening Hours", fee: "Fee", membership: "Paid Membership", booking: "Booking Method", facilities: "Facilities",
      ready: "Courts Details & Booking Guide", ownCourt: "OWN A COURT?",
      submitDesc: "List your venue for free to reach the local community.",
      submit: "+ 加入你的球場 / Add your court", bookNow: "BOOK NOW", map: "GOOGLE MAP", contact: "CONTACT VENUE",
      igText: "Looking for the best court?", igAction: "FOLLOW @852.PICKLERS FOR REVIEWS!",
      disclaimerTitle: "DISCLAIMER", 
      disclaimerContent: "The court information provided on this website (including but not limited to pricing, facilities, and booking methods) is for reference only. All details are subject to change by respective venues, and 852 Picklers does not guarantee the absolute accuracy or timeliness of such information. If you find any errors or have updates, please DM us on Instagram @852.picklers."
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden relative pb-32">
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center">
         <Link href="/courts" className="text-gray-400 hover:text-neon-red transition-colors text-xs md:text-sm font-bold uppercase tracking-widest">{ui.back}</Link>
      </nav>

      <div className="relative w-full h-[40vh] md:h-[50vh] mt-14 border-b border-neon-red/30 bg-black">
        <Image src={court.coverImage || "/home-court.png"} alt={cName} fill priority className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
           <div className="flex items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest">
             <span className="px-3 py-1 bg-neon-red text-white rounded-sm shadow-[0_0_15px_rgba(255,0,60,0.5)]">{court.region}</span>
             <span className="px-3 py-1 border border-neon-red text-neon-red rounded-sm bg-neon-red/10">{court.district}</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter drop-shadow-2xl">{cName}</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-12 md:pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
         <div className="lg:col-span-2 flex flex-col gap-12">
            {/* 設施區 */}
            {cFacilities && (
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-sm">
                 <h3 className="text-neon-red font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                   {ui.facilities}
                 </h3>
                 <div className="flex flex-wrap gap-3">
                    {cFacilities.map((fac: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 bg-[#0a0a0a] border border-white/10 text-gray-300 font-mono text-xs rounded-sm">{fac}</span>
                    ))}
                 </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-y-12 gap-x-8 border-t border-white/5 pt-12">
               <InfoBlock title={ui.address} value={cAddress} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>} />
               <InfoBlock 
                 title={ui.transport} 
                 value={cMtr ? `${cMtr} ${cExit ? cExit + ' ' + ui.exit : ''} (${ui.walk} ${court.walkMins || 0} ${ui.mins})` : ''} 
                 icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="3" width="12" height="14" rx="2"/><path d="M4 11h12"/><path d="M8 17v4"/><path d="M12 17v4"/></svg>} 
               />
               <InfoBlock title={ui.openHours} value={cOpenHours} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>} />
               <InfoBlock title={ui.booking} value={cBookingMethod} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} />
               <InfoBlock title={ui.fee} value={cPriceInfo} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
               <InfoBlock title={ui.membership} value={cMembership} icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} />
            </div>
         </div>

         <div className="flex flex-col gap-10">
            <div className="lg:sticky lg:top-24 flex flex-col gap-8">
               <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-sm flex flex-col gap-8 shadow-2xl">
                  <h3 className="text-white/40 font-heading font-bold text-[15px] uppercase tracking-[0.5em] border-b border-white/10 pb-4">{ui.ready}</h3>
                  <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        {court.bookingLink && (
                          <a href={court.bookingLink} target="_blank" className="flex flex-col items-center justify-center gap-3 p-5 border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all text-center">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                             <span className="text-[12px] font-bold uppercase tracking-widest text-gray-400">{ui.bookNow}</span>
                          </a>
                        )}
                        {court.googleMapLink && (
                          <a href={court.googleMapLink} target="_blank" className="flex flex-col items-center justify-center gap-3 p-5 border border-white/10 bg-white/[0.02] hover:bg-white/5 transition-all text-center">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                             <span className="text-[12px] font-bold uppercase tracking-widest text-gray-400">{ui.map}</span>
                          </a>
                        )}
                      </div>
                      
                      {/* 聯絡球場按鈕 (相容電話與網址) */}
{court.contactlink && (
  <a 
    href={/^\d+$/.test(court.contactlink.replace(/\s/g, '')) 
      ? `tel:${court.contactlink.replace(/\s/g, '')}` 
      : court.contactlink} 
    target={/^\d+$/.test(court.contactlink.replace(/\s/g, '')) ? "_self" : "_blank"}
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 p-4 border border-[#ccff00]/30 bg-[#ccff00]/[0.02] hover:bg-[#ccff00]/0.05 hover:border-[#ccff00]/50 transition-all group rounded-sm"
  >
     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-[#ccff00]">
       <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
     </svg>
     <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#ccff00]">
       {lang === 'EN' ? 'CONTACT VENUE' : '聯絡球場'}
     </span>
  </a>
)}
                  </div>
                  
                  <div className="bg-[#ccff00]/[0.02] p-6 border-l-2 border-[#ccff00] flex flex-col gap-3">
                    <p className="text-gray-400 text-xs leading-relaxed">{ui.igText}</p>
                    <a href="https://www.instagram.com/852.picklers/" target="_blank" className="text-[#ccff00] font-bold text-[12px] uppercase tracking-wider">{ui.igAction}</a>
                  </div>
               </div>

               {/* ★ 擁有球場 (移除按鈕霓虹發光) */}
               <div className="flex flex-col gap-6 border-l-2 border-neon-red pl-6 py-2">
                  <div className="flex flex-col gap-2">
                    <p className="text-white font-bold text-3xl tracking-tighter uppercase leading-none">{ui.ownCourt}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{ui.submitDesc}</p>
                  </div>
                  <a href="https://forms.gle/W4i4GJtYnucUC9Qi6" target="_blank" className="w-full py-4 border border-neon-red text-neon-red hover:bg-neon-red hover:text-white transition-all text-xs font-bold uppercase tracking-widest text-center">
                    + 加入你的球場
                  </a>
               </div>

               {/* ★ Disclaimer (字體放大至 text-xs) */}
               <div className="mt-8 opacity-60 px-1">
                  <h4 className="text-gray-400 font-bold text-[12px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    {ui.disclaimerTitle}
                  </h4>
                  <p className="text-xs leading-relaxed text-gray-400 font-body">
                    {ui.disclaimerContent}
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
        <h4 className="text-white/30 font-bold uppercase tracking-widest text-[12px] flex items-center gap-2 mb-1">{icon}{title}</h4>
        <div className="text-white/90 font-body text-base md:text-lg leading-relaxed pl-8">
           {value.split('//').map((line, i) => <span key={i} className="block mb-1.5 last:mb-0">{line.trim()}</span>)}
        </div>
    </div>
  );
}