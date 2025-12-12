/**
 * Generate a short, clean payment link
 */
export function generateShortPaymentLink({
  company,
  currency,
  amount,
  title,
}: {
  company: string;
  currency?: string;
  amount?: number | string;
  title?: string;
}): string {
  const domain = typeof window !== 'undefined' 
    ? window.location.origin 
    : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://your-site.netlify.app');
  
  // Generate short ID (8 characters)
  const shortId = generateShortId();
  
  // Build query params
  const params = new URLSearchParams();
  params.set('c', company); // Short param name
  if (currency) params.set('cur', currency);
  if (amount) params.set('a', amount.toString());
  if (title) params.set('t', title);
  
  // Create clean short URL
  return `${domain}/p/${shortId}?${params.toString()}`;
}

/**
 * Generate a random short ID (8 characters)
 */
function generateShortId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate clean payment link (improved version)
 */
export function generateCleanPaymentLink({
  linkId,
  company,
  currency,
  amount,
  title,
}: {
  linkId: string;
  company: string;
  currency?: string;
  amount?: number | string;
  title?: string;
}): string {
  const domain = typeof window !== 'undefined' 
    ? window.location.origin 
    : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://your-site.netlify.app');
  
  // Use short link ID (first 8 chars of UUID)
  const shortId = linkId.split('-')[0];
  
  // Build query params with short names
  const params = new URLSearchParams();
  params.set('c', company);
  if (currency) params.set('cur', currency);
  if (amount) params.set('a', amount.toString());
  
  // Create clean URL: /p/ABC123?c=aramex&cur=SAR&a=500
  return `${domain}/p/${shortId}?${params.toString()}`;
}
