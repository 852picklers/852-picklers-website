// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getCourtsData } from './data/courts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.852picklers.com";

  // 1. 抓取所有場地資料
  const courts = await getCourtsData();

  // 2. 生成場地詳細頁的連結
  const courtUrls = courts.map((court) => ({
    url: `${baseUrl}/courts/${court.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. 合併靜態頁面 (首頁, 列表頁, 關於我們)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/courts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...courtUrls,
  ];
}