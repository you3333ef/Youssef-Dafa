/**
 * Payment Link Generation Utility
 * Unified function to generate dynamic payment URLs with company and country parameters
 */

/**
 * Generate a unified payment link with all parameters
 * @param invoiceId - The payment/invoice ID
 * @param company - Company key (e.g., 'dhl', 'aramex')
 * @param country - Country code (e.g., 'SA', 'AE')
 * @param serviceType - Service type (e.g., 'shipping', 'payment', 'chalet', 'government', 'health', 'logistics')
 * @returns Full payment URL with query parameters
 */
export function generatePaymentLink({
  invoiceId,
  company,
  country,
  serviceType = 'payment',
}: {
  invoiceId: string;
  company: string;
  country: string;
  serviceType?: string;
}): string {
  // Use current domain for production
  const productionDomain = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://gentle-hamster-ed634c.netlify.app';

  // Get currency and title based on country
  const countryData = getCountryData(country);
  const title = encodeURIComponent(countryData.defaultTitle);

  // Generate different URLs based on service type
  switch (serviceType) {
    case 'shipping':
      // Shipping uses the /r/ microsite pattern
      return `${productionDomain}/r/${country}/shipping/${invoiceId}?company=${encodeURIComponent(company)}`;
    
    case 'payment':
      // Payment uses dedicated /payment/ path
      return `${productionDomain}/payment/${invoiceId}?company=${encodeURIComponent(company)}&currency=${encodeURIComponent(countryData.currency)}`;
    
    case 'chalet':
      // Chalet uses dedicated /booking/ path
      return `${productionDomain}/booking/${invoiceId}?service=${encodeURIComponent(company)}&country=${country}`;
    
    case 'government':
      // Government uses dedicated /gov/ path
      return `${productionDomain}/gov/${invoiceId}?service=${encodeURIComponent(company)}&country=${country}`;
    
    case 'health':
      // Health uses dedicated /health/ path
      return `${productionDomain}/health-service/${invoiceId}?service=${encodeURIComponent(company)}&country=${country}`;
    
    case 'logistics':
      // Logistics uses dedicated /logistics-service/ path
      return `${productionDomain}/logistics-service/${invoiceId}?service=${encodeURIComponent(company)}&country=${country}`;
    
    default:
      // Default fallback
      return `${productionDomain}/pay/${invoiceId}?company=${encodeURIComponent(company)}&currency=${encodeURIComponent(countryData.currency)}`;
  }
}

/**
 * Get country data with fallback
 */
function getCountryData(countryCode: string) {
  const countryDataMap: Record<string, { currency: string; defaultTitle: string }> = {
    SA: {
      currency: "SAR",
      defaultTitle: "Payment in Saudi Arabia"
    },
    AE: {
      currency: "AED",
      defaultTitle: "Payment in UAE"
    },
    KW: {
      currency: "KWD",
      defaultTitle: "Payment in Kuwait"
    },
    QA: {
      currency: "QAR",
      defaultTitle: "Payment in Qatar"
    },
    OM: {
      currency: "OMR",
      defaultTitle: "Payment in Oman"
    },
    BH: {
      currency: "BHD",
      defaultTitle: "Payment in Bahrain"
    }
  };

  const code = countryCode?.toUpperCase() || 'SA';
  return countryDataMap[code] || countryDataMap.SA;
}
