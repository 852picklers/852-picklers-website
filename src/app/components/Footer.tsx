"use client";

import { useLanguage } from "../context/LanguageContext"; // 引入語言大腦

type Props = {
  data: any;
};

export default function Footer({ data }: Props) {
  const { lang } = useLanguage();

  // 免責聲明文案字典
  const disclaimer = {
    ZH: {
      title: "免責聲明 // DISCLAIMER",
      content: "本網站所載之場地資訊（包括但不限於收費、設施及預約方式）僅供參考。所有資訊均以場地最終公佈為準，852 Picklers 並不保證資料之絕對準確性或及時性。如因資料錯誤或變更而引致任何損失，本品牌恕不負責。如網站資料有錯或有待更新，請隨時透過 Instagram DM @852.picklers 聯絡我們。"
    },
    EN: {
      title: "DISCLAIMER",
      content: "The court information provided on this website (including but not limited to pricing, facilities, and booking methods) is for reference only. All details are subject to change by the respective venues, and 852 Picklers does not guarantee the absolute accuracy or timeliness of such information. We shall not be held liable for any loss arising from errors or changes in the data provided. If you find any errors or have updates, please feel free to DM us on Instagram @852.picklers."
    }
  }[lang];

  return (
    <footer id="contact" className="w-full bg-black border-t border-white/10 py-20 px-6 md:px-12 pb-32">
      <div className="max-w-[1800px] mx-auto flex flex-col items-start gap-10">
        
        {/* ================= 1. 大標題 ================= */}
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white uppercase tracking-tight leading-none">
            {data.title}
        </h2>

        {/* ================= 2. 聯絡資訊列表 ================= */}
        <div className="flex flex-col items-start gap-6">
            
            {/* Row 1: Email */}
            <a 
                href={`mailto:${data.email}`} 
                className="flex items-center gap-4 group"
            >
                <div className="text-gray-400 group-hover:text-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                </div>
                <span className="text-lg md:text-xl font-mono text-gray-300 group-hover:text-white transition-colors">
                    {data.email}
                </span>
            </a>

            {/* Row 2: Instagram */}
            <a 
                href={data.social[0].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
            >
                <div className="text-gray-400 group-hover:text-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                </div>
                <span className="text-lg md:text-xl font-mono text-gray-300 group-hover:text-white transition-colors">
                    {data.social[0].id}
                </span>
            </a>
        </div>

        {/* ================= 3. 免責聲明區塊 (新加入) ================= */}
        <div className="mt-10 max-w-3xl">
          <h4 className="text-gray-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
            {disclaimer.title}
          </h4>
          <p className="text-[10px] md:text-xs text-gray-700 font-body leading-relaxed">
            {disclaimer.content}
          </p>
        </div>

      </div>

      {/* 版權置底 */}
      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-white/10 text-[10px] text-gray-600 font-mono tracking-widest uppercase text-left">
         {data.copyright}
      </div>
    </footer>
  );
}