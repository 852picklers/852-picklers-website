import React from "react";
import Link from "next/link";
import { getCourtsData } from "../../data/courts";
import CourtDetailClient from "./CourtDetailClient"; // ★ 引入啱啱寫好嘅 Client 組件

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
        <h1 className="text-3xl font-heading text-neon-red mb-4 uppercase">Court Not Found</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">找不到該場地資料，請確認網址是否正確。</p>
        <Link href="/courts" className="px-6 py-2 border border-white/20 hover:border-neon-red hover:text-neon-red transition-all duration-300 font-bold tracking-widest text-sm uppercase">
          返回場地列表
        </Link>
      </div>
    );
  }

  // 將資料交俾 Client 組件，等佢自動切換中英文
  return <CourtDetailClient court={court} />;
}