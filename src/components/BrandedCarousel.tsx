import React, { useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { shippingCompanyBranding } from '@/lib/brandingSystem';
import Autoplay from 'embla-carousel-autoplay';

import heroAramex from '@/assets/hero-aramex.jpg';
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
import heroZajil from '@/assets/hero-zajil.jpg';
import heroZajil1 from '@/assets/hero-zajil-1.jpg';
import heroZajil2 from '@/assets/hero-zajil-2.jpg';
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
    aramex: [heroAramex],
    dhl: [heroDhl, heroDhl1, heroDhl2, heroDhl3],
    fedex: [heroFedex, heroFedex1, heroFedex2, heroFedex3],
    ups: [heroUps, heroUps1, heroUps2, heroUps3],
    smsa: [heroSmsa, heroSmsa1, heroSmsa2, heroSmsa3],
    naqel: [heroNaqel, heroNaqel1, heroNaqel2],
    zajil: [heroZajil, heroZajil1, heroZajil2],
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
    hellmann: [heroHellmann],
    dsv: [heroDsv],
    genacom: [heroGenacom],
    jinaken: [heroJinaken],
    jinakum: [heroJinakum],
  };

  return allImages[key] || [];
};

const BrandedCarousel: React.FC<BrandedCarouselProps> = ({ serviceKey, className = '' }) => {
  const branding = shippingCompanyBranding[serviceKey.toLowerCase()];
  const images = getCompanyImages(serviceKey);
  
  const autoplayRef = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  if (!branding || images.length === 0) {
    return null;
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
                    alt={`${branding.nameAr} - ${branding.description.substring(0, 50)}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    loading={index === 0 ? "eager" : "lazy"}
                    style={{
                      filter: 'brightness(0.95)',
                    }}
                  />
                  <div 
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${branding.colors.primary}15, ${branding.colors.secondary}15)`,
                    }}
                  />
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white"
                    style={{
                      fontFamily: branding.fonts.arabic,
                    }}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div 
                        className="w-1 h-12 md:h-16 rounded-full"
                        style={{
                          background: branding.gradients.primary,
                        }}
                      />
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-1">{branding.nameAr}</h3>
                        <p className="text-base md:text-lg opacity-90 font-medium">{branding.nameEn}</p>
                      </div>
                    </div>
                    <p className="text-sm md:text-base opacity-85 leading-relaxed max-w-3xl">
                      {branding.description}
                    </p>
                  </div>
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
