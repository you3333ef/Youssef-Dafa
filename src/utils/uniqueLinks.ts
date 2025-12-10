import { v4 as uuidv4 } from 'uuid';

export interface UniqueLink {
  id: string;
  shortId: string;
  fullUrl: string;
  type: 'shipping' | 'payment' | 'chalet' | 'invoice' | 'health' | 'logistics' | 'contract';
  serviceKey: string;
  serviceName: string;
  countryCode: string;
  createdAt: string;
  expiresAt?: string;
  metadata: Record<string, any>;
}

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';

function generateShortId(length: number = 12): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return result;
}

function base62Encode(num: number): string {
  if (num === 0) return ALPHABET[0];
  
  let result = '';
  while (num > 0) {
    result = ALPHABET[num % ALPHABET.length] + result;
    num = Math.floor(num / ALPHABET.length);
  }
  return result;
}

export function generateUniqueId(): string {
  return uuidv4();
}

export function generateReadableId(prefix: string = ''): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  const encoded = base62Encode(timestamp) + base62Encode(random);
  return prefix ? `${prefix}_${encoded}` : encoded;
}

export function generateShippingLink(params: {
  serviceKey: string;
  serviceName: string;
  countryCode: string;
  trackingNumber?: string;
  amount?: number;
  metadata?: Record<string, any>;
}): UniqueLink {
  const id = generateUniqueId();
  const shortId = generateReadableId('shp');
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
  
  return {
    id,
    shortId,
    fullUrl: `${baseUrl}/${params.countryCode}/shipping/${shortId}`,
    type: 'shipping',
    serviceKey: params.serviceKey,
    serviceName: params.serviceName,
    countryCode: params.countryCode,
    createdAt: new Date().toISOString(),
    metadata: {
      trackingNumber: params.trackingNumber,
      amount: params.amount,
      ...params.metadata,
    },
  };
}

export function generatePaymentLink(params: {
  serviceKey: string;
  serviceName: string;
  countryCode: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}): UniqueLink {
  const id = generateUniqueId();
  const shortId = generateReadableId('pay');
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
  
  return {
    id,
    shortId,
    fullUrl: `${baseUrl}/${params.countryCode}/payment/${shortId}`,
    type: 'payment',
    serviceKey: params.serviceKey,
    serviceName: params.serviceName,
    countryCode: params.countryCode,
    createdAt: new Date().toISOString(),
    metadata: {
      amount: params.amount,
      currency: params.currency,
      ...params.metadata,
    },
  };
}

export function generateChaletLink(params: {
  chaletName: string;
  countryCode: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}): UniqueLink {
  const id = generateUniqueId();
  const shortId = generateReadableId('chl');
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
  
  return {
    id,
    shortId,
    fullUrl: `${baseUrl}/${params.countryCode}/chalet/${shortId}`,
    type: 'chalet',
    serviceKey: 'chalet',
    serviceName: params.chaletName,
    countryCode: params.countryCode,
    createdAt: new Date().toISOString(),
    metadata: {
      amount: params.amount,
      currency: params.currency,
      ...params.metadata,
    },
  };
}

export function generateInvoiceLink(params: {
  invoiceNumber: string;
  countryCode: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}): UniqueLink {
  const id = generateUniqueId();
  const shortId = generateReadableId('inv');
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com';
  
  return {
    id,
    shortId,
    fullUrl: `${baseUrl}/${params.countryCode}/invoice/${shortId}`,
    type: 'invoice',
    serviceKey: 'invoice',
    serviceName: `Invoice ${params.invoiceNumber}`,
    countryCode: params.countryCode,
    createdAt: new Date().toISOString(),
    metadata: {
      invoiceNumber: params.invoiceNumber,
      amount: params.amount,
      currency: params.currency,
      ...params.metadata,
    },
  };
}

export function parseShortId(shortId: string): {
  prefix: string;
  timestamp: number;
  isValid: boolean;
} {
  const parts = shortId.split('_');
  if (parts.length !== 2) {
    return { prefix: '', timestamp: 0, isValid: false };
  }
  
  const [prefix, encoded] = parts;
  
  const prefixes = ['shp', 'pay', 'chl', 'inv'];
  if (!prefixes.includes(prefix)) {
    return { prefix, timestamp: 0, isValid: false };
  }
  
  return {
    prefix,
    timestamp: Date.now(),
    isValid: true,
  };
}

export function generateQRCodeData(link: UniqueLink): string {
  return link.fullUrl;
}

export function generateShareableUrl(link: UniqueLink, platform?: 'whatsapp' | 'telegram' | 'email'): string {
  const url = encodeURIComponent(link.fullUrl);
  const text = encodeURIComponent(`تفضل برابط ${link.serviceName}`);
  
  switch (platform) {
    case 'whatsapp':
      return `https://wa.me/?text=${text}%20${url}`;
    case 'telegram':
      return `https://t.me/share/url?url=${url}&text=${text}`;
    case 'email':
      return `mailto:?subject=${text}&body=${url}`;
    default:
      return link.fullUrl;
  }
}

export function validateLinkExpiry(link: UniqueLink): boolean {
  if (!link.expiresAt) return true;
  
  const expiryDate = new Date(link.expiresAt);
  const now = new Date();
  
  return now < expiryDate;
}

export function formatLinkForDisplay(link: UniqueLink): string {
  return link.shortId;
}

export function getLinkAnalytics(linkId: string): Promise<{
  views: number;
  clicks: number;
  uniqueVisitors: number;
  lastAccessed?: string;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        views: Math.floor(Math.random() * 100),
        clicks: Math.floor(Math.random() * 50),
        uniqueVisitors: Math.floor(Math.random() * 30),
        lastAccessed: new Date().toISOString(),
      });
    }, 500);
  });
}
