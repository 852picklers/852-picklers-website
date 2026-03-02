// src/app/data/courts.ts

// 確保導出 DISTRICTS，解決先前的 Build Error
export const DISTRICTS = {
  HK: ["中西區", "灣仔區", "東區", "南區"],
  KLN: ["油尖旺區", "深水埗區", "九龍城區", "黃大仙區", "觀塘區"],
  NT: ["葵青區", "荃灣區", "屯門區", "元朗區", "北區", "大埔區", "沙田區", "西貢區", "離島區"]
};

export type RegionKey = keyof typeof DISTRICTS;

export interface Court {
  id: string; 
  region: RegionKey;
  district: string;
  googleMapLink: string;
  bookingLink: string; 
  coverImage: string;
  walkMins: number;
  name: string;
  address: string;
  mtr: string;
  exit: string;
  openHours: string;
  bookingMethod: string;
  facilities: string[];
  priceInfo: string;
  membership: string; 
  en: {
    name: string;
    address: string;
    mtr: string;
    exit: string;
    openHours: string;
    bookingMethod: string;
    facilities: string[];
    priceInfo: string;
    membership: string; 
  }
}

export async function getCourtsData(): Promise<Court[]> {
  try {
    // 使用絕對路徑確保伺服器抓得到 API
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://852picklers.com';
    
    // 設定快取 60 秒更新一次，減少對 Google Sheets 的頻繁請求
    const response = await fetch(`${baseUrl}/api/courts`, { 
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error("API Fetch Failed");
    const { zh, en } = await response.json();

    const enDataMap: Record<string, any> = {};
    if (Array.isArray(en)) {
      en.forEach((row: any) => {
        const rowId = row.id ? String(row.id).trim() : "";
        if (rowId) enDataMap[rowId] = row;
      });
    }

    if (!Array.isArray(zh)) return [];

    return zh.map((rowZh: any) => {
      const id = rowZh.id ? String(rowZh.id).trim() : "";
      const rowEn = enDataMap[id] || {}; 

      // 圖片路徑修正：解決 400 錯誤的核心位置
      let imagePath = String(rowZh.coverImage || rowZh.coverimage || "").trim();
      if (imagePath && !imagePath.startsWith('http')) {
        imagePath = imagePath.startsWith('/') ? imagePath : '/' + imagePath;
      }

      const parseFacilities = (facStr: any) => {
         if (!facStr) return [];
         return String(facStr).split(",").map(f => f.trim()).filter(Boolean);
      };

      return {
        id,
        region: (rowZh.region as RegionKey) || "NT",
        district: rowZh.district || "",
        googleMapLink: rowZh.googleMapLink || rowZh.googlemaplink || "",
        bookingLink: (rowZh.bookingLink || rowZh.bookinglink || "").trim(),
        coverImage: imagePath || "/home-court.png",
        walkMins: parseInt(rowZh.walkMins || rowZh.walkmins) || 0,
        name: rowZh.name || "",
        address: rowZh.address || "",
        mtr: rowZh.mtr || rowZh.transport_mtr || "",
        exit: rowZh.exit || rowZh.transport_exit || "",
        openHours: rowZh.openHours || rowZh.openhours || "",
        bookingMethod: rowZh.bookingMethod || rowZh.bookingmethod || "",
        facilities: parseFacilities(rowZh.facilities),
        priceInfo: rowZh.priceInfo || rowZh.priceinfo || "",
        membership: rowZh.membership || "",
        en: {
          name: rowEn.name || rowZh.name || "",
          address: rowEn.address || rowZh.address || "",
          mtr: rowEn.mtr || rowZh.mtr || "",
          exit: rowEn.exit || rowZh.exit || "",
          openHours: rowEn.openHours || rowZh.openHours || "",
          bookingMethod: rowEn.bookingMethod || rowZh.bookingMethod || "",
          facilities: rowEn.facilities ? parseFacilities(rowEn.facilities) : parseFacilities(rowZh.facilities),
          priceInfo: rowEn.priceInfo || rowZh.priceInfo || "",
          membership: rowEn.membership || rowZh.membership || "",
        }
      };
    });
  } catch (error) {
    console.error("Data error:", error);
    return []; 
  }
}