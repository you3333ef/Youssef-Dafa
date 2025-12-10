import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  serviceName?: string;
  serviceDescription?: string;
  companyKey?: string;
  currency?: string;
}

const SEOHead = ({
  title,
  description,
  image,
  url,
  type = "website",
  serviceName,
  serviceDescription,
  companyKey,
  currency
}: SEOHeadProps) => {
  // Use production domain to ensure links work when shared
  const productionDomain = import.meta.env.VITE_PRODUCTION_DOMAIN || window.location.origin;
  const siteUrl = productionDomain;
  const fullUrl = url || window.location.href;
  
  // Ensure image path is absolute and correct
  const getAbsoluteImageUrl = (imgPath?: string): string => {
    const defaultImage = '/og-aramex.jpg';
    const imagePath = imgPath || defaultImage;
    
    // If already absolute URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // Ensure path starts with /
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${productionDomain}${normalizedPath}`;
  };
  
  const ogImage = getAbsoluteImageUrl(image);

  // Build final title and description with dynamic company info
  let finalTitle = title;
  if (serviceName) {
    finalTitle = `${serviceName} - ${title}`;
  } else if (companyKey) {
    // Add company name if not already included
    if (!title.toLowerCase().includes(companyKey.toLowerCase())) {
      finalTitle = `${companyKey} - ${title}`;
    }
  }

  // Limit title length for better social media display
  if (finalTitle.length > 60) {
    finalTitle = finalTitle.substring(0, 57) + '...';
  }

  const finalDescription = serviceDescription || description;

  // Append currency info to description if available, limit length
  let finalDescriptionWithCurrency = currency
    ? `${finalDescription} [العملة: ${currency}]`
    : finalDescription;
  
  // Limit description length for better social media display
  if (finalDescriptionWithCurrency.length > 155) {
    finalDescriptionWithCurrency = finalDescriptionWithCurrency.substring(0, 152) + '...';
  }
  
  // Update document title and meta tags for better SEO
  React.useEffect(() => {
    document.title = finalTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', finalDescriptionWithCurrency);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', finalTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', finalDescriptionWithCurrency);
    }
    
    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) {
      ogImageTag.setAttribute('content', ogImage);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullUrl);
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', finalTitle);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', finalDescriptionWithCurrency);
    }
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', ogImage);
    }
    
    const twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]');
    if (twitterImageAlt) {
      twitterImageAlt.setAttribute('content', finalTitle);
    }
    
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    }
  }, [finalTitle, finalDescriptionWithCurrency, ogImage, fullUrl]);
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescriptionWithCurrency} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescriptionWithCurrency} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content="نظام الدفع الآمن" />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescriptionWithCurrency} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={finalTitle} />

      {/* LinkedIn */}
      <meta property="linkedin:owner" content="" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Arabic" />
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEOHead;
