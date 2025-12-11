import { Helmet } from "react-helmet-async";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getCompanyMeta } from "@/utils/companyMeta";

interface PaymentMetaTagsProps {
  serviceName: string;
  serviceKey?: string;
  amount?: string;
  title?: string;
  description?: string;
}

const PaymentMetaTags = ({ serviceName, serviceKey, amount, title, description }: PaymentMetaTagsProps) => {
  const actualServiceKey = serviceKey || serviceName?.toLowerCase() || 'aramex';
  const branding = getServiceBranding(actualServiceKey);
  const companyMeta = getCompanyMeta(actualServiceKey);

  const ogTitle = title || companyMeta.title || `الدفع - ${serviceName}`;
  const ogDescription = description || companyMeta.description || `صفحة دفع آمنة ومحمية لخدمة ${serviceName}${amount ? ` - ${amount}` : ''}`;

  const productionDomain = typeof window !== 'undefined' ? window.location.origin : 'https://gentle-hamster-ed634c.netlify.app';

  const ogImage = companyMeta.image || `${productionDomain}/og-aramex.jpg`;

  return (
    <Helmet>
      <title>{ogTitle}</title>
      <meta name="description" content={ogDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogTitle} />

      {/* WhatsApp specific */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      
      {/* Additional meta tags for better sharing */}
      <meta property="og:site_name" content="منصة الدفع الآمن" />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
};

export default PaymentMetaTags;
