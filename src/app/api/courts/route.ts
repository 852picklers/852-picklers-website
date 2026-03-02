import { NextResponse } from 'next/server'; 
import Papa from 'papaparse';

// ★ Google Sheet 連結鎖在後端，外界無法直接從瀏覽器看到
const CSV_URL_ZH = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXFkvxsXO8Lc0UxdnZnTjd_uJ1qMm-NwqodOr18osiWRg-2GRl0pvccyBydCyIUdQYvBOj0Rw7TgQm/pub?gid=0&single=true&output=csv";
const CSV_URL_EN = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXFkvxsXO8Lc0UxdnZnTjd_uJ1qMm-NwqodOr18osiWRg-2GRl0pvccyBydCyIUdQYvBOj0Rw7TgQm/pub?gid=12935471&single=true&output=csv";

// ★ Next.js API Route 必須使用大寫 GET 函數
export async function GET() {
  try {
    // 1. 從 Google Sheets 抓取原始數據
    const [resZh, resEn] = await Promise.all([
      fetch(CSV_URL_ZH, { next: { revalidate: 60 } }),
      fetch(CSV_URL_EN, { next: { revalidate: 60 } })
    ]);

    if (!resZh.ok || !resEn.ok) {
      throw new Error("Failed to fetch from Google Sheets");
    }

    // 2. 轉化成文字格式
    const csvZhText = await resZh.text();
    const csvEnText = await resEn.text();
    
    // 3. 使用 PapaParse 解析 CSV
    const parsedZh = Papa.parse(csvZhText, { header: true, skipEmptyLines: true }).data;
    const parsedEn = Papa.parse(csvEnText, { header: true, skipEmptyLines: true }).data;

    // 4. 只回傳 JSON 數據給前端，成功隱藏來源連結
    return NextResponse.json({ zh: parsedZh, en: parsedEn });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}