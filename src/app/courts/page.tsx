// src/app/courts/page.tsx
import CourtsClient from "./CourtsClient";
import { getCourtsData } from "../data/courts";
import { content } from "../data/content"; // 引入文案數據

export default async function CourtsPage() {
  const courts = await getCourtsData();
  
  // 這裡我們將 content 傳入 Client Component
  return <CourtsClient initialCourts={courts} footerContent={content} />;
}