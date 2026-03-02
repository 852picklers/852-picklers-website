import { MetadataRoute } from 'next';
import { getCourtsData } from './data/courts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.852picklers.com";
  const courts = await getCourtsData();

  // 確保 URL 中的特殊字元被正確轉義
  const courtUrls = courts.map((court) => ({
    url: `${baseUrl}/courts/${encodeURIComponent(court.id)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/courts`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...courtUrls,
  ];
}