import React from "react";
import Link from "next/link";
import { Metadata } from "next"; 
import { getCourtsData } from "../../data/courts";
import CourtDetailClient from "./CourtDetailClient";

// ★ 1. 動態生成 SEO Metadata
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
      title: "場地未找到 Court Not Found | 852 Picklers",
    };
  }

  return {
    title: `${court.name} | 預約指引、收費及交通資訊 | 852 Picklers`,
    description: `想在 ${court.name} 打 Pickleball？852 Picklers 為你整合最齊全的 ${court.district} 匹克球場地資訊，包括網上預約連結、設施詳情及交通指南。`,
    openGraph: {
      title: `${court.name} - 852 Picklers`,
      description: `位於 ${court.district} 的專業匹克球場地。`,
      images: [court.coverImage || "/home-court.png"],
      url: `https://www.852picklers.com/courts/${resolvedParams.id}`,
      type: "website",
    },
    alternates: {
      canonical: `https://www.852picklers.com/courts/${resolvedParams.id}`,
    },
  };
}

// ★ 2. 頁面主要組件 (Server Component)
export default async function CourtDetailPage({ params }: { params: Promise<{ id: string }> }) {
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

  // ★ 使用安全性類型轉換，並同步讀取 Contactlink 作為 SEO 電話訊號
  const cData = court as any; 
  const seoPhone = cData.contactlink || cData.ContactLink || cData.contactLink || "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": court.name,
    "image": court.coverImage || "https://www.852picklers.com/home-court.png",
    "description": `位於 ${court.district} 的優質匹克球場地，提供專業設施與預約服務。`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": court.address,
      "addressLocality": court.district,
      "addressRegion": court.region,
      "addressCountry": "HK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cData.latitude || "22.3193",
      "longitude": cData.longitude || "114.1694"
    },
    "url": `https://www.852picklers.com/courts/${resolvedParams.id}`,
    "telephone": seoPhone, // ★ 同步電話數據至 Google 爬蟲
    "publicAccess": "true"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CourtDetailClient court={court} />
    </>
  );
}