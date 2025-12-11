import React, { useEffect, useRef, useMemo } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { shippingCompanyBranding } from '@/lib/brandingSystem';
import Autoplay from 'embla-carousel-autoplay';

interface BrandedCarouselProps {
  serviceKey: string;
  className?: string;
}

const BrandedCarousel: React.FC<BrandedCarouselProps> = ({ serviceKey, className = '' }) => {
  const branding = shippingCompanyBranding[serviceKey.toLowerCase()];
  const autoplayRef = useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );

  const images = useMemo(() => {
    try {
      const imagePath = new URL(`../assets/hero-${serviceKey.toLowerCase()}.jpg`, import.meta.url).href;
      return [imagePath];
    } catch {
      return [];
    }
  }, [serviceKey]);

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
                    loading="eager"
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
      </Carousel>
    </div>
  );
};

export default BrandedCarousel;
