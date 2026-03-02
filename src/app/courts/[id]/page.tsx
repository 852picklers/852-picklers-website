import React from "react";
import Link from "next/link";
import { Metadata } from "next"; // ★ 引入 Metadata 類型
import { getCourtsData } from "../../data/courts";
import CourtDetailClient from "./CourtDetailClient";

// ★ 1. 動態生成 SEO Metadata (搜尋引擎優化核心)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const targetId = decodeURIComponent(resolvedParams.id).trim().toUpperCase();
  
  const courts = await getCourtsData();
  const court = courts.find((c) => String(c.id).trim().toUpperCase() === targetId);

  if (!court) {
    return {
      title: "Court Not Found | 852 Picklers",
    };
  }

  // 搜尋引擎會根據這裡的內容來決定顯示什麼
  return {
    title: `${court.name} | 香港匹克球場地預訂指南 | 852 Picklers`,
    description: `查看位於${court.district}的${court.name}資訊。包含${court.facilities.join("、")}等設施、收費詳情及官方預約方式。`,
    openGraph: {
      title: `${court.name} - 852 Picklers`,
      description: `位於${court.district}的專業匹克球場地。`,
      images: [court.coverImage || "/home-court.png"],
      url: `https://www.852picklers.com/courts/${resolvedParams.id}`,
      type: "website",
    },
    // 防止重複網址影響排名
    alternates: {
      canonical: `https://www.852picklers.com/courts/${resolvedParams.id}`,
    },
  };
}

// ★ 2. 頁面主要組件
export default async function CourtDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const targetId = decodeURIComponent(resolvedParams.id).trim().toUpperCase();

  const courts = await getCourtsData();
  const court = courts.find((c) => String(c.id).trim().toUpperCase() === targetId);

  if (!court) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative pb-32">
        <h1 className="text-3xl font-heading text-neon-red mb-4 uppercase tracking-tighter">Court Not Found</h1>
        <p className="text-gray-400 mb-8 font-body text-sm">找不到該場地資料，請確認網址是否正確。</p>
        <Link href="/courts" className="px-6 py-2 border border-white/20 hover:border-neon-red hover:text-neon-red transition-all duration-300 font-bold tracking-widest text-sm uppercase">
          返回場地列表 BACK TO DIRECTORY
        </Link>
      </div>
    );
  }

  // 將資料交俾 Client 組件，等佢自動切換中英文
  return <CourtDetailClient court={court} />;
}