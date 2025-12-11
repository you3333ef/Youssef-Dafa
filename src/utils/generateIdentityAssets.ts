export const generatePlaceholderSVG = (
  width: number,
  height: number,
  bgColor: string,
  textColor: string,
  text: string
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <text 
        x="50%" 
        y="50%" 
        dominant-baseline="middle" 
        text-anchor="middle" 
        font-family="Arial, sans-serif" 
        font-size="24" 
        fill="${textColor}"
        font-weight="bold"
      >
        ${text}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const entityPlaceholders = {
  chalets: {
    logo: generatePlaceholderSVG(200, 80, '#FF6F00', '#FFFFFF', 'شاليهات'),
    images: [
      generatePlaceholderSVG(1200, 400, '#FF6F00', '#FFFFFF', 'شاليهات 1'),
      generatePlaceholderSVG(1200, 400, '#FFA000', '#FFFFFF', 'شاليهات 2'),
      generatePlaceholderSVG(1200, 400, '#FF8F00', '#FFFFFF', 'شاليهات 3'),
    ],
    backgrounds: [
      generatePlaceholderSVG(1920, 1080, '#FFF3E0', '#FF6F00', 'خلفية شاليهات'),
    ],
  },
  government_payment: {
    logo: generatePlaceholderSVG(200, 80, '#004080', '#FFFFFF', 'دفع حكومي'),
    images: [
      generatePlaceholderSVG(1200, 400, '#004080', '#FFFFFF', 'دفع حكومي 1'),
      generatePlaceholderSVG(1200, 400, '#0073E6', '#FFFFFF', 'دفع حكومي 2'),
    ],
    backgrounds: [
      generatePlaceholderSVG(1920, 1080, '#E6F0FF', '#004080', 'خلفية دفع حكومي'),
    ],
  },
  local_payment: {
    logo: generatePlaceholderSVG(200, 80, '#008000', '#FFFFFF', 'دفع محلي'),
    images: [
      generatePlaceholderSVG(1200, 400, '#008000', '#FFFFFF', 'دفع محلي 1'),
      generatePlaceholderSVG(1200, 400, '#00C000', '#FFFFFF', 'دفع محلي 2'),
    ],
    backgrounds: [
      generatePlaceholderSVG(1920, 1080, '#E6FFE6', '#008000', 'خلفية دفع محلي'),
    ],
  },
  invoices: {
    logo: generatePlaceholderSVG(200, 80, '#800000', '#FFFFFF', 'فواتير'),
    images: [
      generatePlaceholderSVG(1200, 400, '#800000', '#FFFFFF', 'فواتير 1'),
      generatePlaceholderSVG(1200, 400, '#B22222', '#FFFFFF', 'فواتير 2'),
    ],
    backgrounds: [
      generatePlaceholderSVG(1920, 1080, '#FFE6E6', '#800000', 'خلفية فواتير'),
    ],
  },
  contracts: {
    logo: generatePlaceholderSVG(200, 80, '#000080', '#FFFFFF', 'عقود'),
    images: [
      generatePlaceholderSVG(1200, 400, '#000080', '#FFFFFF', 'عقود 1'),
      generatePlaceholderSVG(1200, 400, '#0000CD', '#FFFFFF', 'عقود 2'),
    ],
    backgrounds: [
      generatePlaceholderSVG(1920, 1080, '#E6E6FF', '#000080', 'خلفية عقود'),
    ],
  },
  health_links: {
    logo: generatePlaceholderSVG(200, 80, '#008080', '#FFFFFF', 'صحة'),
    images: [
      generatePlaceholderSVG(1200, 400, '#008080', '#FFFFFF', 'صحة 1'),
      generatePlaceholderSVG(1200, 400, '#20B2AA', '#FFFFFF', 'صحة 2'),
    ],
    backgrounds: [
      generatePlaceholderSVG(1920, 1080, '#E0FFFF', '#008080', 'خلفية صحة'),
    ],
  },
  bank_pages: {
    logo: generatePlaceholderSVG(200, 80, '#0000FF', '#FFFFFF', 'بنوك'),
    images: [
      generatePlaceholderSVG(1200, 400, '#0000FF', '#FFFFFF', 'بنوك 1'),
      generatePlaceholderSVG(1200, 400, '#1E90FF', '#FFFFFF', 'بنوك 2'),
    ],
    backgrounds: [
      generatePlaceholderSVG(1920, 1080, '#E6F0FF', '#0000FF', 'خلفية بنوك'),
    ],
  },
};

export const getEntityPlaceholder = (entityType: string, type: 'logo' | 'image' | 'background', index = 0): string => {
  const placeholders = entityPlaceholders[entityType as keyof typeof entityPlaceholders];
  if (!placeholders) return '';

  if (type === 'logo') return placeholders.logo;
  if (type === 'image') return placeholders.images[index] || placeholders.images[0];
  if (type === 'background') return placeholders.backgrounds[index] || placeholders.backgrounds[0];

  return '';
};
