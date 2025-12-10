const COMPANY_PREFIXES: Record<string, string> = {
  aramex: 'ARX',
  dhl: 'DHL',
  fedex: 'FDX',
  ups: 'UPS',
  smsa: 'SMS',
  naqel: 'NQL',
  zajil: 'ZJL',
  saudipost: 'SPL',
  empost: 'EMP',
  qpost: 'QPT',
  kwpost: 'KWT',
  omanpost: 'OMP',
  bahpost: 'BHP',
  albaraka: 'ABG',
  alfuttaim: 'AFG',
  alshaya: 'ASG',
  shipco: 'SHP',
  hellmann: 'HWL',
  dsv: 'DSV',
  agility: 'AGL',
  bahri: 'BHR',
  national: 'NSC',
  genacom: 'GNC',
  jinaken: 'GNC',
  jinakum: 'GNC',
  dhlkw: 'DHL',
  dhlqa: 'DHL',
  dhlom: 'DHL',
  dhlbh: 'DHL',
};

function generateCheckDigit(base: string): string {
  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    const char = base[i];
    const value = isNaN(parseInt(char)) ? char.charCodeAt(0) : parseInt(char);
    sum += value * (i + 1);
  }
  return (sum % 10).toString();
}

export function generateTrackingNumber(companyKey: string): string {
  const prefix = COMPANY_PREFIXES[companyKey.toLowerCase()] || 'TRK';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const base = `${timestamp}${random}`;
  const checkDigit = generateCheckDigit(base);
  
  return `${prefix}${base}${checkDigit}`;
}

export function generateAwbNumber(companyKey: string): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const day = new Date().getDate().toString().padStart(2, '0');
  const sequence = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  
  return `${year}${month}${day}${sequence}`;
}

export function generateReferenceNumber(prefix: string = 'REF'): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function formatTrackingNumber(trackingNumber: string, format: 'spaced' | 'dashed' | 'plain' = 'plain'): string {
  if (format === 'spaced') {
    return trackingNumber.match(/.{1,4}/g)?.join(' ') || trackingNumber;
  } else if (format === 'dashed') {
    return trackingNumber.match(/.{1,4}/g)?.join('-') || trackingNumber;
  }
  return trackingNumber;
}

export function validateTrackingNumber(trackingNumber: string, companyKey?: string): boolean {
  if (!trackingNumber || trackingNumber.length < 8) {
    return false;
  }
  
  if (companyKey) {
    const prefix = COMPANY_PREFIXES[companyKey.toLowerCase()];
    if (prefix && !trackingNumber.startsWith(prefix)) {
      return false;
    }
  }
  
  return true;
}

export function getTrackingNumberExample(companyKey: string): string {
  return generateTrackingNumber(companyKey);
}

export function parseTrackingNumber(trackingNumber: string): {
  prefix: string;
  timestamp: string;
  random: string;
  checkDigit: string;
  company?: string;
} | null {
  const match = trackingNumber.match(/^([A-Z]{3})(\d{8})(\d{4})(\d)$/);
  
  if (!match) {
    return null;
  }
  
  const [, prefix, timestamp, random, checkDigit] = match;
  const company = Object.entries(COMPANY_PREFIXES).find(([, p]) => p === prefix)?.[0];
  
  return {
    prefix,
    timestamp,
    random,
    checkDigit,
    company,
  };
}
