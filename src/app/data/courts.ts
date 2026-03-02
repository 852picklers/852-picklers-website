export async function getCourtsData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://852picklers.com';
    const response = await fetch(`${baseUrl}/api/courts`, { next: { revalidate: 60 } });

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

      // 核心優化：更嚴謹的路徑處理，移除多餘空格與斜槓
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
        region: (rowZh.region as any) || "NT",
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
    console.error("Data protection error:", error);
    return []; 
  }
}