// Netlify Function for Microsite Meta Tags
// Removed Supabase dependency - using localStorage instead
// This function returns default meta tags for social media sharing

exports.handler = async (event, context) => {
  const { queryStringParameters } = event;
  const linkId = queryStringParameters?.id || '';

  // Default meta tags
  const defaultMeta = {
    title: 'منصة الشحن الذكية - حلول شحن متطورة',
    description: 'منصة شحن ذكية وموثوقة - خدمات شحن سريعة وآمنة مع دعم جميع شركات الشحن الكبرى',
    image: '/og-aramex.jpg'
  };

  // Return HTML with meta tags
  const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${defaultMeta.title}</title>
  <meta name="title" content="${defaultMeta.title}">
  <meta name="description" content="${defaultMeta.description}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${defaultMeta.title}">
  <meta property="og:description" content="${defaultMeta.description}">
  <meta property="og:image" content="${defaultMeta.image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/jpeg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:title" content="${defaultMeta.title}">
  <meta property="twitter:description" content="${defaultMeta.description}">
  <meta property="twitter:image" content="${defaultMeta.image}">
  
  <meta http-equiv="refresh" content="0;url=/">
</head>
<body>
  <p>جاري التحميل...</p>
</body>
</html>
  `;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    },
    body: html
  };
};
