/**
 * Payment Link Generation Utility
 * Unified function to generate dynamic payment URLs with company and country parameters
 */

/**
 * Generate a unified payment link with all parameters
 * @param invoiceId - The payment/invoice ID
 * @param company - Company key (e.g., 'dhl', 'aramex', 'sadad', 'knet')
 * @param country - Country code (e.g., 'SA', 'AE')
 * @param amount - Payment amount (optional)
 * @param currency - Currency code (optional)
 * @param paymentMethod - Payment method: 'card' or 'bank_login' (optional)
 * @returns Full payment URL with query parameters
 */
export function generatePaymentLink({
  invoiceId,
  company,
  country,
  amount,
  currency,
  paymentMethod,
}: {
  invoiceId: string;
  company: string;
  country: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
}): string {
  // Use current domain for production
  const productionDomain = typeof window !== 'undefined'
    ? window.location.origin
    : (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://sensational-fenglisu-ebbbfb.netlify.app');

  // Check if this is a government payment service
  const governmentServices = ['sadad', 'knet', 'benefit', 'omannet', 'jaywan', 'qatar-payment'];
  
  // Get currency and title based on country
  const countryData = getCountryData(country);
  const finalCurrency = currency || countryData.currency;

  if (governmentServices.includes(company.toLowerCase())) {
    // Use unified short URL for government services
    // The PaymentRecipient page will auto-redirect to the proper government page
    return `${productionDomain}/p/${invoiceId}`;
  }

  // Build short URL with path parameters for better sharing
  // Format: /p/{id}/{company}/{currency}/{amount}
  if (amount && finalCurrency) {
    // Add payment method as query parameter to preserve it across devices
    const methodParam = paymentMethod ? `&method=${paymentMethod}` : '';
    return `${productionDomain}/p/${invoiceId}/${encodeURIComponent(company)}/${encodeURIComponent(finalCurrency)}/${amount}?pm=${paymentMethod || 'card'}`;
  }

  // Fallback to query parameters
  const title = encodeURIComponent(countryData.defaultTitle);
  const methodParam = paymentMethod ? `&method=${paymentMethod}` : '';
  return `${productionDomain}/pay/${invoiceId}/recipient?company=${encodeURIComponent(company)}&currency=${encodeURIComponent(finalCurrency)}&title=${title}${methodParam}`;
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
