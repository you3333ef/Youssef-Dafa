const fs = require('fs');
const path = require('path');

const companies = {
  aramex: { name: 'Aramex', nameAr: 'أرامكس', primary: '#DC291E', secondary: '#FFFFFF' },
  dhl: { name: 'DHL', nameAr: 'دي إتش إل', primary: '#FFCC00', secondary: '#D40511' },
  fedex: { name: 'FedEx', nameAr: 'فيديكس', primary: '#4D148C', secondary: '#FF6600' },
  ups: { name: 'UPS', nameAr: 'يو بي إس', primary: '#351C15', secondary: '#FFB500' },
  smsa: { name: 'SMSA Express', nameAr: 'سمسا إكسبرس', primary: '#662D91', secondary: '#FF6600' },
  naqel: { name: 'NAQEL Express', nameAr: 'ناقل إكسبرس', primary: '#E61838', secondary: '#002E60' },
  zajil: { name: 'Zajil Express', nameAr: 'زاجل إكسبرس', primary: '#1C4587', secondary: '#FF9900' },
  saudipost: { name: 'Saudi Post', nameAr: 'البريد السعودي', primary: '#006C35', secondary: '#FFB81C' },
  empost: { name: 'Emirates Post', nameAr: 'البريد الإماراتي', primary: '#C8102E', secondary: '#003087' },
  qpost: { name: 'Qatar Post', nameAr: 'البريد القطري', primary: '#8E1838', secondary: '#F9D416' },
  kwpost: { name: 'Kuwait Post', nameAr: 'البريد الكويتي', primary: '#007A33', secondary: '#CE1126' },
  omanpost: { name: 'Oman Post', nameAr: 'البريد العُماني', primary: '#ED1C24', secondary: '#009639' },
  bahpost: { name: 'Bahrain Post', nameAr: 'البريد البحريني', primary: '#EF3F32', secondary: '#007CC2' },
  albaraka: { name: 'Al Baraka Group', nameAr: 'مجموعة البركة', primary: '#E32119', secondary: '#F58220' },
  alfuttaim: { name: 'Al-Futtaim Group', nameAr: 'مجموعة الفطيم', primary: '#004C99', secondary: '#0066CC' },
  alshaya: { name: 'Alshaya Group', nameAr: 'مجموعة الشايع', primary: '#1A1A1A', secondary: '#666666' },
  shipco: { name: 'ShipCo Transport', nameAr: 'شركة الشحن العالمية', primary: '#003087', secondary: '#0066CC' },
  hellmann: { name: 'Hellmann Worldwide', nameAr: 'هايلمان العالمية', primary: '#E32119', secondary: '#004C99' },
  dsv: { name: 'DSV', nameAr: 'دي إس في', primary: '#192862', secondary: '#2D5AA0' },
  agility: { name: 'Agility Logistics', nameAr: 'مجموعة الجاهلية', primary: '#E30613', secondary: '#002E60' },
  bahri: { name: 'Bahri', nameAr: 'البحري', primary: '#003087', secondary: '#D4AF37' },
  national: { name: 'National Shipping', nameAr: 'الشركة الوطنية للشحن', primary: '#003087', secondary: '#D4AF37' },
  genacom: { name: 'Genacom', nameAr: 'جيناكم للتوصيل', primary: '#009639', secondary: '#006C28' },
};

function generateSVG(company, companyData) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient_${company}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${companyData.primary};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${companyData.secondary};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#gradient_${company})"/>
  
  <!-- Pattern Overlay -->
  <g opacity="0.1">
    <circle cx="100" cy="100" r="150" fill="white"/>
    <circle cx="1100" cy="530" r="200" fill="white"/>
    <circle cx="950" cy="150" r="100" fill="white"/>
  </g>
  
  <!-- Content Card -->
  <rect x="80" y="80" width="1040" height="470" rx="20" fill="white" fill-opacity="0.98" filter="url(#shadow)"/>
  
  <!-- Company Logo Area -->
  <rect x="120" y="120" width="200" height="200" rx="15" fill="${companyData.primary}" fill-opacity="0.1"/>
  <text x="220" y="240" font-family="Arial, sans-serif" font-size="80" font-weight="bold" 
        text-anchor="middle" fill="${companyData.primary}">
    ${companyData.name.substring(0, 2).toUpperCase()}
  </text>
  
  <!-- Company Name - English -->
  <text x="380" y="200" font-family="Arial, sans-serif" font-size="64" font-weight="bold" 
        fill="${companyData.primary}">
    ${companyData.name}
  </text>
  
  <!-- Company Name - Arabic -->
  <text x="380" y="270" font-family="Arial, sans-serif" font-size="42" 
        fill="${companyData.secondary}" direction="rtl">
    ${companyData.nameAr}
  </text>
  
  <!-- Service Description -->
  <text x="120" y="380" font-family="Arial, sans-serif" font-size="32" fill="#333333">
    خدمات شحن وتوصيل احترافية
  </text>
  <text x="120" y="425" font-family="Arial, sans-serif" font-size="32" fill="#333333">
    Professional Shipping &amp; Logistics Services
  </text>
  
  <!-- Bottom Badge -->
  <rect x="120" y="470" width="280" height="50" rx="25" fill="${companyData.primary}"/>
  <text x="260" y="503" font-family="Arial, sans-serif" font-size="24" font-weight="600" 
        text-anchor="middle" fill="white">
    نظام دفع آمن ومحمي
  </text>
  
  <!-- Trust Icons -->
  <g transform="translate(900, 470)">
    <rect width="180" height="50" rx="25" fill="#10B981" fill-opacity="0.1" stroke="#10B981" stroke-width="2"/>
    <text x="90" y="33" font-family="Arial, sans-serif" font-size="20" font-weight="600" 
          text-anchor="middle" fill="#10B981">
      ✓ آمن ومعتمد
    </text>
  </g>
</svg>`;
}

function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'og-images');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  Object.entries(companies).forEach(([key, data]) => {
    const svg = generateSVG(key, data);
    const filename = `og-${key}.svg`;
    const filepath = path.join(outputDir, filename);
    
    fs.writeFileSync(filepath, svg, 'utf8');
    console.log(`✓ Generated: ${filename}`);
  });

  console.log(`\n✅ Successfully generated ${Object.keys(companies).length} OG images!`);
  console.log(`📁 Location: ${outputDir}`);
}

main();
