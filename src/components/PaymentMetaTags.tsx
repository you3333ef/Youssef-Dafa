import { Helmet } from 'react-helmet-async';
import { getServiceBranding } from '@/lib/serviceLogos';
import { getEntityPaymentShareImage, getEntityIdentity, detectEntityFromURL, getBankOGImage } from '@/lib/dynamicIdentity';

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
  
  const detectedEntity = detectEntityFromURL();
  const entityIdentity = detectedEntity ? getEntityIdentity(detectedEntity) : null;
  const entityShareImage = detectedEntity ? getEntityPaymentShareImage(detectedEntity) : null;
  const entityDescription = entityIdentity?.payment_share_description;
  
  let ogImagePath = entityShareImage || branding.ogImage;
  
  if (serviceKey.startsWith('bank_')) {
    const bankId = serviceKey.replace('bank_', '');
    ogImagePath = getBankOGImage(bankId);
  }
  
  const pageTitle = title || `دفع ${serviceName}${amount ? ` - ${amount}` : ''}`;
  const pageDescription = customDescription || entityDescription || branding.description || `خدمة دفع آمنة ومضمونة لـ ${serviceName}`;
  const ogImage = ogImagePath ? `${window.location.origin}${ogImagePath}` : undefined;
  
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
      
      <meta name="theme-color" content={entityIdentity?.colors.primary || branding.colors.primary} />
      
      {ogImagePath && <link rel="preload" as="image" href={ogImagePath} />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  );
};

export default PaymentMetaTags;
