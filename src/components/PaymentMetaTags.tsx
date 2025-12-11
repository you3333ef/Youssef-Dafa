import { Helmet } from 'react-helmet-async';
import { getServiceBranding } from '@/lib/serviceLogos';

interface PaymentMetaTagsProps {
  serviceKey: string;
  serviceName: string;
  amount?: string;
  title?: string;
  customDescription?: string;
}

export const PaymentMetaTags: React.FC<PaymentMetaTagsProps> = ({
  serviceKey,
  serviceName,
  amount,
  title,
  customDescription,
}) => {
  const branding = getServiceBranding(serviceKey);
  
  const pageTitle = title || `دفع ${serviceName}${amount ? ` - ${amount}` : ''}`;
  const pageDescription = customDescription || branding.description || `خدمة دفع آمنة لـ ${serviceName}`;
  
  const ogImage = branding.ogImage ? `${window.location.origin}${branding.ogImage}` : undefined;
  
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={window.location.href} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta property="og:image:secure_url" content={ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={serviceName} />
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      <meta name="theme-color" content={branding.colors.primary} />
      
      <link rel="preload" as="image" href={branding.ogImage} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default PaymentMetaTags;
