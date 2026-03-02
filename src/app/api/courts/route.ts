import { NextResponse } from 'next/server'; 
import Papa from 'papaparse';

// Google Sheet 連結鎖在後端
const CSV_URL_ZH = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXFkvxsXO8Lc0UxdnZnTjd_uJ1qMm-NwqodOr18osiWRg-2GRl0pvccyBydCyIUdQYvBOj0Rw7TgQm/pub?gid=0&single=true&output=csv";
const CSV_URL_EN = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQXFkvxsXO8Lc0UxdnZnTjd_uJ1qMm-NwqodOr18osiWRg-2GRl0pvccyBydCyIUdQYvBOj0Rw7TgQm/pub?gid=12935471&single=true&output=csv";

export async function GET() {
  try {
    const [resZh, resEn] = await Promise.all([
      fetch(CSV_URL_ZH, { next: { revalidate: 60 } }),
      fetch(CSV_URL_EN, { next: { revalidate: 60 } })
    ]);

    if (!resZh.ok || !resEn.ok) throw new Error("Failed to fetch from Google Sheets");

    const csvZhText = await resZh.text();
    const csvEnText = await resEn.text();
    
    const parsedZh = Papa.parse(csvZhText, { header: true, skipEmptyLines: true }).data;
    const parsedEn = Papa.parse(csvEnText, { header: true, skipEmptyLines: true }).data;

    return NextResponse.json({ zh: parsedZh, en: parsedEn });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}