/**
 * Generate a random tracking number for shipments
 * Format: ABC-1234567890-XYZ
 */
export const generateTrackingNumber = (companyPrefix?: string): string => {
  const prefix = companyPrefix || 'SHP';
  const timestamp = Date.now().toString().slice(-10);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Generate a realistic tracking number based on shipping company
 */
export const generateCompanyTrackingNumber = (serviceKey: string): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 999999999).toString().padStart(9, '0');
  
  const formats: Record<string, () => string> = {
    aramex: () => `ARX${year}${month}${day}${random.slice(0, 6)}`,
    dhl: () => `${random.slice(0, 10)}`,
    fedex: () => `${random.slice(0, 12)}`,
    ups: () => `1Z${random.slice(0, 16)}`,
    smsa: () => `SMSA${year}${random.slice(0, 8)}`,
    naqel: () => `NQL${year}${month}${random.slice(0, 7)}`,
    zajil: () => `ZJ${year}${random.slice(0, 10)}`,
    saudipost: () => `SP${random.slice(0, 13)}`,
    empost: () => `EM${random.slice(0, 13)}`,
    qpost: () => `QP${random.slice(0, 13)}`,
    omanpost: () => `OM${random.slice(0, 13)}`,
    bahpost: () => `BH${random.slice(0, 13)}`,
    kwpost: () => `KW${random.slice(0, 13)}`,
    default: () => `TRK${year}${month}${day}${random.slice(0, 6)}`,
  };
  
  const generator = formats[serviceKey.toLowerCase()] || formats.default;
  return generator();
};

/**
 * Validate tracking number format
 */
export const isValidTrackingNumber = (trackingNumber: string): boolean => {
  if (!trackingNumber) return false;
  
  // Basic validation: should be at least 8 characters
  if (trackingNumber.length < 8) return false;
  
  // Should contain alphanumeric characters
  const alphanumericRegex = /^[A-Z0-9-]+$/i;
  return alphanumericRegex.test(trackingNumber);
};
