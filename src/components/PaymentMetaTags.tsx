import { Helmet } from "react-helmet-async";
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
  const companyMeta = getCompanyMeta(actualServiceKey);

  const ogTitle = title || companyMeta.titleAr;
  const ogDescription = description || (amount ? `${companyMeta.descriptionAr} - ${amount}` : companyMeta.descriptionAr);

  const productionDomain = typeof window !== 'undefined' ? window.location.origin : 'https://gentle-hamster-ed634c.netlify.app';
  const ogImage = `${productionDomain}${companyMeta.image}`;

  return (
    <Helmet>
      <title>{ogTitle}</title>
      <meta name="description" content={ogDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogTitle} />

      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="Gulf Payment Gateway" />
      <meta property="og:locale" content="ar_AR" />
    </Helmet>
  );
};

export default PaymentMetaTags;
