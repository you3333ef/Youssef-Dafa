import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  getEntityIdentity, 
  getEntityPaymentShareImage,
  detectEntityFromURL 
} from '@/lib/dynamicIdentity';
import { useParams } from 'react-router-dom';
import { useLink } from '@/hooks/useSupabase';

interface DynamicMetaTagsProps {
  entityKey?: string;
  title?: string;
  description?: string;
}

export const DynamicMetaTags: React.FC<DynamicMetaTagsProps> = ({
  entityKey,
  title,
  description,
}) => {
  const { id } = useParams();
  const { data: linkData } = useLink(id);

  const detectedEntity = entityKey || 
                         detectEntityFromURL() || 
                         linkData?.payload?.entity_type || 
                         linkData?.payload?.type;

  const identity = detectedEntity ? getEntityIdentity(detectedEntity) : null;
  const shareImage = detectedEntity ? getEntityPaymentShareImage(detectedEntity) : null;
  
  const finalTitle = title || `الدفع الإلكتروني - ${identity ? 'خدمات متميزة' : 'منصة آمنة'}`;
  const finalDescription = description || identity?.payment_share_description || 'منصة الدفع الإلكتروني الآمنة';

  const fullShareImage = shareImage ? `${window.location.origin}${shareImage}` : undefined;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      {fullShareImage && (
        <>
          <meta property="og:image" content={fullShareImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={finalTitle} />
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {fullShareImage && (
        <meta name="twitter:image" content={fullShareImage} />
      )}
      
      {/* WhatsApp */}
      {fullShareImage && (
        <meta property="og:image:secure_url" content={fullShareImage} />
      )}
    </Helmet>
  );
};

export default DynamicMetaTags;
