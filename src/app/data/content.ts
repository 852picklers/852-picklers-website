export const content = {
  en: {
    nav: { 
      switch: "中文",
      menu: [
        { label: "DESIGN", target: "design" },   // 新增
        { label: "TECH DECODE", target: "features" },
        { label: "TECH SPECS", target: "specs" },
        { label: "STORY", target: "story" },
        { label: "CONTACT", target: "contact" },
      ]
    },
    hero: {
      label: "852 PICKLERS ．FIRST SERVE",
      title: "HOME COURT STYLE\nPRO SPECS",
      promo: "Save $500 Exclusively for First 30 Units",
      cta: "PRE-ORDER",
      batch: "First Serve Pre-order",
      bigText: "852 / HK"
    },
    // ★★★ 新增：Design 區塊內容 ★★★
    design: {
      title: "DESIGN",
      frontLabel: "FRONT VIEW",
      backLabel: "BACK VIEW",
      hint: "TAP TO ENLARGE"
    },
    features: {
      title: "TECH DECODE",
      anatomyAlt: "Model 001 Anatomy",
      items: [
        { 
          id: "01",
          category: "SURFACE TECH",
          title: "T700 RAW CARBON: SPIN THAT LASTS", 
          desc: "Sandblasted surfaces wear out in months. We use T700 Cloth Texture for physical grit that lasts for years. Every topspin drive remains under your command." 
        },
        { 
          id: "02",
          category: "STRUCTURE TECH",
          title: "HYBRID EVA CORE: ZERO DEAD SPOTS", 
          desc: "Features a highly flexible, ultra-rebound EVA Perimeter Ring that encases a high-density EPP Core, creating a perfect synergy of materials. The EVA ring massively expands the sweet spot and reinforces edge stability, while the EPP core delivers an ultra-lightweight feel with explosive pop. Every shot is the ultimate expression of precision control and raw power." 
        },
        { 
          id: "03",
          category: "CONTROL & FEEL",
          title: "16MM X 142MM: THE GOLDEN RATIO", 
          desc: "The 16mm core delivers a solid, plush feel, filtering out harsh vibrations for superior touch and control. Paired with a cushioned anti-slip grip on a 142mm elongated handle, it offers perfect spacing and stability for two-handed backhands."
        }
      ]
    },
    spec: {
      fig: "Model 001 — Tech Detail",
      title: "SPECIFICATIONS",
      desc: "",
      cta: "ADD TO CART", 
      items: [
        { label: "THICKNESS", value: "16 MM" },
        { label: "DIMENSIONS", value: "418 x 189 MM", hasVisual: true },
        { label: "HANDLE LENGTH", value: "142 MM" },
        { label: "WEIGHT", value: "230 G" },
      ]
    },
    pricing: {
      title: "PRE-ORDER NOW",
      series: "PROJECT 852 ．FIRST SERVE",
      cards: [
        {
          name: "「HOME KONG」",
          price: "HKD 888",
          originalPrice: "HKD 1,388",
          discountNote: "Exclusive Offer",
          freeShipping: "Free Shipping in HK",
          features: [],
          cta: "Pre-Order",
          highlight: true,
          // ★★★ 更新連結 (EN) ★★★
          link: "https://docs.google.com/forms/d/e/1FAIpQLSevkt0wN4TN6lE1zUGEutYFeEqbUNsem87Q89OuzDziom57Zw/viewform" 
        }
      ]
    },
    intro: {
      label: "Brand Story",
      title: "\"It's not just a game of skill; it's a statement of style.\"",
      text1: "Born in 2025, 852 Picklers started with a simple belief: Hong Kongers deserve a paddle that represents our city. We’re here to inject 852 Soul into every game.",
      text2: "We stand by 'Quality Materials, No Compromise.' From T700 raw carbon to hybrid core tech, every detail meets the standards of high-end international paddles.",
      quote: "Home Court. Strong Serve."
    },
    footer: {
      title: "CONTACT US",
      email: "enquiry@852picklers.com",
      social: [
        { 
          name: "Instagram", 
          id: "@852.Picklers",
          url: "https://www.instagram.com/852.picklers/" 
        }
      ],
      copyright: "© 2025 852 PICKLERS. ALL RIGHTS RESERVED."
    }
  },
  
  // ================= 中文版 =================
  cn: {
    nav: { 
      switch: "EN",
      menu: [
        { label: "設計", target: "design" }, // 新增
        { label: "技術解密", target: "features" },
        { label: "規格參數", target: "specs" },
        { label: "品牌故事", target: "story" },
        { label: "聯絡我們", target: "contact" },
      ]
    },
    hero: {
      label: "852 PICKLERS ．FIRST SERVE",
      title: "主場風格\n頂級配置",
      promo: "限定優惠・立減 $500",
      cta: "立即預訂",
      batch: "First Serve 開放預售",
      bigText: "852 / HK"
    },
    // ★★★ 新增：Design 區塊內容 ★★★
    design: {
      title: "設計",
      frontLabel: "正面設計",
      backLabel: "背面設計",
      hint: "點擊圖片放大"
    },
    features: {
      title: "技術解密",
      anatomyAlt: "Model 001 解剖圖",
      items: [
        { 
          id: "01",
          category: "表面科技 (SURFACE TECH)",
          title: "T700 原生碳纖：旋轉的壽命", 
          desc: "坊間噴砂打幾個月就磨平？我們採用 T700 原生紋理 (Cloth Texture)，物理性摩擦力，耐用度是以「年」計算。每一板 Topspin 都在你掌握之中，歷久常新。" 
        },
        { 
          id: "02",
          category: "結構科技 (STRUCTURE TECH)",
          title: "HYBRID EVA 核心：零死角防守",
          desc: "採用高度柔軟及具有超強彈性的 EVA 環狀邊框緊鎖高密度 EPP 核心，完美結合兩者優勢。EVA 邊框大幅擴大甜點並強化邊緣穩定性，而 EPP 核心則提供極致輕量手感與驚人回彈爆發力。每一次擊球，都是精準控制與強勁力量的完美演繹。" 
        },
        { 
          id: "03",
          category: "操控手感 (CONTROL & FEEL)",
          title: "16MM X 142MM：黃金比例", 
          desc: "16mm 厚度帶來極致穩定的扎實手感 (Plush Feel)，有效過濾多餘震動，讓控球更精準。配搭防滑減震握把 (Cushioned Grip) 與 142mm 加長手柄，無論單手定雙手反拍，空間感同發力都剛剛好。" 
        }
      ]
    },
    spec: {
      fig: "Model 001 — 技術細節",
      title: "規格參數",
      desc: "",
      cta: "立即入手", 
      items: [
        { label: "球拍厚度", value: "16 MM" },
        { label: "拍面尺寸", value: "418 x 189 MM", hasVisual: true },
        { label: "手柄長度", value: "142 MM" },
        { label: "平均重量", value: "230 G" },
      ]
    },
    pricing: {
      title: "開放預售",
      series: "PROJECT 852 ．FIRST SERVE",
      cards: [
        {
          name: "「HOME KONG」",
          price: "HKD 888",
          originalPrice: "HKD 1,388",
          discountNote: "首 30 支限定優惠",
          freeShipping: "Free Shipping in HK",
          features: [],
          cta: "立即入手",
          highlight: true,
          // ★★★ 更新連結 (CN) ★★★
          link: "https://docs.google.com/forms/d/e/1FAIpQLSevkt0wN4TN6lE1zUGEutYFeEqbUNsem87Q89OuzDziom57Zw/viewform"
        }
      ]
    },
    intro: {
      label: "品牌故事",
      title: "球場上不只技術對決，更是風格的展現。",
      text1: "852 Picklers 誕生於 2025 年，源於一個簡單的信念：香港人值得擁有一塊代表這座城市的球拍。我們決心為這項運動注入專屬的「852 靈魂」。",
      text2: "我們堅持「真材實料，絕不妥協」。從 T700 原生碳纖到混合核心科技，每一個細節都對標國際大牌的高端配置。拿起它，握住主場的自信。",
      quote: "香港主場，強勢出擊。"
    },
    footer: {
      title: "聯絡我們",
      email: "enquiry@852picklers.com",
      social: [
        { 
          name: "Instagram", 
          id: "@852.Picklers",
          url: "https://www.instagram.com/852.picklers/" 
        }
      ],
      copyright: "© 2025 852 PICKLERS. 版權所有"
    }
  }
};