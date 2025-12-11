import React, { useRef, useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { shippingCompanyBranding } from '@/lib/brandingSystem';
import { getEntityHeaderImages, detectEntityFromURL } from '@/lib/dynamicIdentity';
import Autoplay from 'embla-carousel-autoplay';

import heroAramex from '@/assets/hero-aramex.jpg';
import heroAramex2 from '@/assets/hero-aramex-2.jpg';
import heroAramex3 from '@/assets/hero-aramex-3.jpg';
import heroAramex4 from '@/assets/hero-aramex-4.jpg';
import heroAramex5 from '@/assets/hero-aramex-5.jpg';
import heroAramex6 from '@/assets/hero-aramex-6.jpg';
import heroAramex7 from '@/assets/hero-aramex-7.jpg';
import heroDhl from '@/assets/hero-dhl.jpg';
import heroDhl1 from '@/assets/hero-dhl-1.jpg';
import heroDhl2 from '@/assets/hero-dhl-2.jpg';
import heroDhl3 from '@/assets/hero-dhl-3.jpg';
import heroFedex from '@/assets/hero-fedex.jpg';
import heroFedex1 from '@/assets/hero-fedex-1.jpg';
import heroFedex2 from '@/assets/hero-fedex-2.jpg';
import heroFedex3 from '@/assets/hero-fedex-3.jpg';
import heroUps from '@/assets/hero-ups.jpg';
import heroUps1 from '@/assets/hero-ups-1.jpg';
import heroUps2 from '@/assets/hero-ups-2.jpg';
import heroUps3 from '@/assets/hero-ups-3.jpg';
import heroSmsa from '@/assets/hero-smsa.jpg';
import heroSmsa1 from '@/assets/hero-smsa-1.jpg';
import heroSmsa2 from '@/assets/hero-smsa-2.jpg';
import heroSmsa3 from '@/assets/hero-smsa-3.jpg';
import heroNaqel from '@/assets/hero-naqel.jpg';
import heroNaqel1 from '@/assets/hero-naqel-1.jpg';
import heroNaqel2 from '@/assets/hero-naqel-2.jpg';
import heroNaqel3 from '@/assets/hero-naqel-3.jpg';
import heroZajil from '@/assets/hero-zajil.jpg';
import heroZajil1 from '@/assets/hero-zajil-1.jpg';
import heroZajil2 from '@/assets/hero-zajil-2.jpg';
import heroZajil3 from '@/assets/hero-zajil-3.jpg';
import heroSaudipost from '@/assets/hero-saudipost.jpg';
import heroSaudipost1 from '@/assets/hero-saudipost-1.jpg';
import heroEmpost from '@/assets/hero-empost.jpg';
import heroEmpost2 from '@/assets/hero-empost-2.jpg';
import heroQpost from '@/assets/hero-qpost.jpg';
import heroKwpost from '@/assets/hero-kwpost.jpg';
import heroOmanpost from '@/assets/hero-omanpost.jpg';
import heroBahpost from '@/assets/hero-bahpost.jpg';
import heroAlbaraka from '@/assets/hero-albaraka.jpg';
import heroAlfuttaim from '@/assets/hero-alfuttaim.jpg';
import heroAlshaya from '@/assets/hero-alshaya.jpg';
import heroShipco from '@/assets/hero-shipco.jpg';
import heroBahri from '@/assets/hero-bahri.jpg';
import heroHellmann from '@/assets/hero-hellmann.jpg';
import heroDsv from '@/assets/hero-dsv.jpg';
import heroGenacom from '@/assets/hero-genacom.jpg';
import heroJinaken from '@/assets/hero-jinaken.jpg';
import heroJinakum from '@/assets/hero-jinakum.jpg';

interface BrandedCarouselProps {
  serviceKey: string;
  className?: string;
}

const getCompanyImages = (serviceKey: string): string[] => {
  const key = serviceKey.toLowerCase();
  
  const allImages: Record<string, string[]> = {
    aramex: [heroAramex5, heroAramex6, heroAramex7, heroAramex, heroAramex2, heroAramex3, heroAramex4],
    dhl: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlkw: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlqa: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlom: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    dhlbh: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    fedex: [heroFedex, heroFedex1, heroFedex2, heroFedex3],
    ups: [heroUps, heroUps1, heroUps2, heroUps3],
    smsa: [heroSmsa, heroSmsa1, heroSmsa2, heroSmsa3],
    naqel: [heroNaqel, heroNaqel1, heroNaqel2, heroNaqel3],
    zajil: [heroZajil, heroZajil1, heroZajil2, heroZajil3],
    saudipost: [heroSaudipost, heroSaudipost1],
    empost: [heroEmpost, heroEmpost2],
    qpost: [heroQpost],
    kwpost: [heroKwpost],
    omanpost: [heroOmanpost],
    bahpost: [heroBahpost],
    albaraka: [heroAlbaraka],
    alfuttaim: [heroAlfuttaim],
    alshaya: [heroAlshaya],
    shipco: [heroShipco],
    bahri: [heroBahri],
    national: [heroBahri],
    hellmann: [heroHellmann],
    dsv: [heroDsv],
    genacom: [heroGenacom],
    agility: [heroGenacom],
    jinaken: [heroJinaken],
    jinakum: [heroJinakum],
    chalets: [
      '/assets/dynamic-identity/chalets_image1.svg',
      '/assets/dynamic-identity/chalets_image2.svg',
      '/assets/dynamic-identity/chalets_image3.svg'
    ],
    government_payment: [
      '/assets/dynamic-identity/gov_image1.svg',
      '/assets/dynamic-identity/gov_image2.svg',
      '/assets/dynamic-identity/gov_image3.svg'
    ],
    local_payment: [
      '/assets/dynamic-identity/local_image1.svg',
      '/assets/dynamic-identity/local_image2.svg',
      '/assets/dynamic-identity/local_image3.svg'
    ],
    invoices: [
      '/assets/dynamic-identity/invoice_image1.svg',
      '/assets/dynamic-identity/invoice_image2.svg',
      '/assets/dynamic-identity/invoice_image3.svg'
    ],
    contracts: [
      '/assets/dynamic-identity/contract_image1.svg',
      '/assets/dynamic-identity/contract_image2.svg',
      '/assets/dynamic-identity/contract_image3.svg'
    ],
    health_links: [
      '/assets/dynamic-identity/health_image1.svg',
      '/assets/dynamic-identity/health_image2.svg',
      '/assets/dynamic-identity/health_image3.svg'
    ],
    bank_pages: [
      '/assets/dynamic-identity/bank_image1.svg',
      '/assets/dynamic-identity/bank_image2.svg',
      '/assets/dynamic-identity/bank_image3.svg'
    ],
  };

  return allImages[key] || [];
};

const BrandedCarousel: React.FC<BrandedCarouselProps> = ({ serviceKey, className = '' }) => {
  const branding = shippingCompanyBranding[serviceKey.toLowerCase()];
  
  const detectedEntity = detectEntityFromURL();
  const entityImages = detectedEntity ? getEntityHeaderImages(detectedEntity) : [];
  
  let images: string[] = [];
  
  if (entityImages.length > 0) {
    images = entityImages;
  } else if (serviceKey) {
    const localImages = getCompanyImages(serviceKey);
    if (localImages.length > 0) {
      images = localImages;
    } else {
      const entityImagesFromKey = getEntityHeaderImages(serviceKey);
      if (entityImagesFromKey.length > 0) {
        images = entityImagesFromKey;
      }
    }
  }
  
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  useEffect(() => {
    console.log('🖼️ BrandedCarousel - serviceKey:', serviceKey);
    console.log('🖼️ BrandedCarousel - detectedEntity:', detectedEntity);
    console.log('🖼️ BrandedCarousel - images count:', images.length);
    console.log('🖼️ BrandedCarousel - images:', images);
    
    if (images.length === 0) return;
    
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      
      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        setImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, [images]);
  
  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  if (images.length === 0) {
    return null;
  }
  
  if (!imagesLoaded) {
    return (
      <div className={`w-full ${className}`}>
        <div 
          className="w-full max-w-6xl mx-auto aspect-[21/9] rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}20, ${branding.colors.secondary}20)`,
            borderRadius: branding.borderRadius.lg,
          }}
        >
          <div className="animate-pulse text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/30" />
            <p className="text-sm" style={{ color: branding.colors.primary }}>جاري التحميل...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        plugins={[autoplayRef.current]}
        className="w-full max-w-6xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={`${serviceKey}-${index}`} className="pl-2 md:pl-4 basis-full">
              <div className="relative overflow-hidden rounded-xl group">
                <div 
                  className="aspect-[21/9] w-full overflow-hidden relative"
                  style={{
                    borderRadius: branding.borderRadius.lg,
                    boxShadow: branding.shadows.lg,
                  }}
                >
                  <img
                    src={image}
                    alt={`${branding.nameAr}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious 
              className="hidden md:flex left-4"
              style={{
                backgroundColor: branding.colors.primary,
                borderColor: branding.colors.primary,
                color: branding.colors.textOnPrimary,
              }}
            />
            <CarouselNext 
              className="hidden md:flex right-4"
              style={{
                backgroundColor: branding.colors.primary,
                borderColor: branding.colors.primary,
                color: branding.colors.textOnPrimary,
              }}
            />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default BrandedCarousel;
