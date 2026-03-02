// src/app/data/courts.ts

// ★ 更新了 18區 清單，加上了「區」字
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

export async function getCourtsData() {
  try {
    // 獲取基礎 URL（優先使用環境變數）
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                    (process.env.NODE_ENV === 'development' 
                      ? 'http://localhost:3000' 
                      : 'https://852picklers.com');

    const response = await fetch(`${baseUrl}/api/courts`, { 
      next: { revalidate: 60 } 
    });

    if (!response.ok) throw new Error("Failed to fetch from internal API");
    
    const { zh, en } = await response.json();

    // 建立英文資料對照表
    const enDataMap: Record<string, any> = {};
    // 防呆：確保 en 是數組
    if (Array.isArray(en)) {
      en.forEach((row: any) => {
        const rowId = row.id ? String(row.id).trim() : "";
        if (rowId) enDataMap[rowId] = row;
      });
    }

    // 防呆：確保 zh 是數組
    if (!Array.isArray(zh)) return [];

    const courts: Court[] = zh.map((rowZh: any) => {
      const id = rowZh.id ? String(rowZh.id).trim() : "";
      const rowEn = enDataMap[id] || {}; 

      // 終極防呆：兼容大細階與路徑處理
      const rawImage = rowZh.coverImage || rowZh.coverimage || "";
      let imagePath = rawImage ? String(rawImage).trim() : "";
      if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        imagePath = '/' + imagePath;
      }

      const parseFacilities = (facStr: any) => {
         if (!facStr) return [];
         return String(facStr).split(",").map(f => f.trim()).filter(Boolean);
      };

      const rawBookingLink = rowZh.bookingLink || rowZh.bookinglink || "";

      return {
        id: id,
        region: (rowZh.region as RegionKey) || "NT",
        district: rowZh.district || "",
        googleMapLink: rowZh.googleMapLink || rowZh.googlemaplink || "",
        bookingLink: rawBookingLink ? String(rawBookingLink).trim() : "",
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
          mtr: rowEn.mtr || rowEn.transport_mtr || rowZh.mtr || rowZh.transport_mtr || "",
          exit: rowEn.exit || rowEn.transport_exit || rowZh.exit || rowZh.transport_exit || "",
          openHours: rowEn.openHours || rowEn.openhours || rowZh.openHours || rowZh.openhours || "",
          bookingMethod: rowEn.bookingMethod || rowEn.bookingmethod || rowZh.bookingMethod || rowZh.bookingmethod || "",
          facilities: rowEn.facilities ? parseFacilities(rowEn.facilities) : parseFacilities(rowZh.facilities),
          priceInfo: rowEn.priceInfo || rowEn.priceinfo || rowZh.priceInfo || rowZh.priceinfo || "",
          membership: rowEn.membership || rowZh.membership || "",
        }
      };
    });

    return courts;
  } catch (error) {
    console.error("Data protection active error:", error);
    return []; 
  }
}