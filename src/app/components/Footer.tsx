"use client";

type Props = {
  data: any;
};

export default function Footer({ data }: Props) {
  return (
    <footer id="contact" className="w-full bg-black border-t border-white/10 py-20 px-6 md:px-12">
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
                {/* Icon */}
                <div className="text-gray-400 group-hover:text-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"/>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                </div>
                {/* Text */}
                <span className="text-lg md:text-xl font-mono text-gray-300 group-hover:text-white transition-colors">
                    {data.email}
                </span>
            </a>

            {/* Row 2: Instagram (Icon + ID) */}
            <a 
                href={data.social[0].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
            >
                {/* Icon (與上方 Email Icon 大小一致) */}
                <div className="text-gray-400 group-hover:text-accent transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                </div>
                {/* Text (顯示 ID) */}
                <span className="text-lg md:text-xl font-mono text-gray-300 group-hover:text-white transition-colors">
                    {data.social[0].id}
                </span>
            </a>

        </div>

      </div>

      {/* 版權置底 */}
      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-white/10 text-[10px] text-gray-600 font-mono tracking-widest uppercase text-left">
         {data.copyright}
      </div>
    </footer>
  );
}