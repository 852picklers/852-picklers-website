"use client";

type Props = {
  text: string;
  link: string; // 保留這個新增的屬性，用來接收 Google Form 連結
};

export default function FloatingCTA({ text, link }: Props) {
  return (
    // 位置改回：bottom-6 right-6 (右下角)
    // 動畫改回：CSS animate-in (原本的效果)
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-backwards">
      <a 
        href={link}          // 讀取 Google Form 連結
        target="_blank"      // 在新分頁開啟
        rel="noopener noreferrer"
        className="block"
      >
        {/* 形狀改回：skew-x-[-12deg] (傾斜) */}
        {/* 陰影改回：shadow-[0_0_20px_rgba(206,255,0,0.4)] (霓虹綠) */}
        <button className="group relative h-14 md:h-16 bg-accent text-black px-8 md:px-12 font-heading font-bold text-base md:text-xl uppercase tracking-wider hover:bg-white transition-all duration-300 cursor-pointer skew-x-[-12deg] shadow-[0_0_20px_rgba(206,255,0,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:-translate-y-1 active:translate-y-0">
          
          {/* 文字反向傾斜修正 */}
          <span className="block skew-x-[12deg] flex items-center gap-3">
            {text}
            {/* 箭頭 Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </button>
      </a>
    </div>
  );
}