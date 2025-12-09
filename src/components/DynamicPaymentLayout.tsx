import React from 'react';
import { Card } from "@/components/ui/card";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import { DynamicBranding } from "@/components/DynamicBranding";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { CreditCard, ArrowLeft } from "lucide-react";
import heroAramex from "@/assets/hero-aramex.jpg";
import heroDhl from "@/assets/hero-dhl.jpg";
import heroFedex from "@/assets/hero-fedex.jpg";
import heroSmsa from "@/assets/hero-smsa.jpg";
import heroUps from "@/assets/hero-ups.jpg";
import heroEmpost from "@/assets/hero-empost.jpg";
import heroZajil from "@/assets/hero-zajil.jpg";
import heroNaqel from "@/assets/hero-naqel.jpg";
import heroSaudipost from "@/assets/hero-saudipost.jpg";
import heroKwpost from "@/assets/hero-kwpost.jpg";
import heroQpost from "@/assets/hero-qpost.jpg";
import heroOmanpost from "@/assets/hero-omanpost.jpg";
import heroBahpost from "@/assets/hero-bahpost.jpg";
import heroGenacom from "@/assets/hero-genacom.jpg";
import heroAlbaraka from "@/assets/hero-albaraka.jpg";
import heroAlfuttaim from "@/assets/hero-alfuttaim.jpg";
import heroAlshaya from "@/assets/hero-alshaya.jpg";
import heroBahri from "@/assets/hero-bahri.jpg";
import heroShipco from "@/assets/hero-shipco.jpg";
import heroHellmann from "@/assets/hero-hellmann.jpg";
import heroDsv from "@/assets/hero-dsv.jpg";
import heroBg from "@/assets/hero-bg.jpg";

interface DynamicPaymentLayoutProps {
  children: React.ReactNode;
  serviceName: string;
  serviceKey?: string;
  amount: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  showHero?: boolean;
}

const DynamicPaymentLayout: React.FC<DynamicPaymentLayoutProps> = ({
  children,
  serviceName,
  serviceKey,
  amount,
  title,
  description,
  icon = <CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />,
  showHero = true
}) => {
  const actualServiceKey = serviceKey || serviceName;
  const branding = getServiceBranding(actualServiceKey);
  const enhancedBranding = getBrandingByCompany(actualServiceKey);
  
  const heroImages: Record<string, string> = {
    'aramex': heroAramex,
    'dhl': heroDhl,
    'dhlkw': heroDhl,
    'dhlqa': heroDhl,
    'dhlom': heroDhl,
    'dhlbh': heroDhl,
    'fedex': heroFedex,
    'smsa': heroSmsa,
    'ups': heroUps,
    'empost': heroEmpost,
    'zajil': heroZajil,
    'naqel': heroNaqel,
    'saudipost': heroSaudipost,
    'kwpost': heroKwpost,
    'qpost': heroQpost,
    'omanpost': heroOmanpost,
    'bahpost': heroBahpost,
    'genacom': heroGenacom,
    'jinaken': heroGenacom,
    'albaraka': heroAlbaraka,
    'alfuttaim': heroAlfuttaim,
    'alshaya': heroAlshaya,
    'bahri': heroBahri,
    'national': heroBahri,
    'shipco': heroShipco,
    'hellmann': heroHellmann,
    'dsv': heroDsv,
    'agility': heroDsv,
    'jinakum': heroJinakum,
  };
  
  const heroImage = heroImages[actualServiceKey.toLowerCase()] || heroBg;

  return (
    <>
      <DynamicBranding companyKey={actualServiceKey}>
        <PaymentMetaTags 
        serviceName={serviceName}
        serviceKey={actualServiceKey}
        amount={amount}
        title={title}
        description={description}
      />
      <div 
        className="min-h-screen bg-background" 
        dir="rtl"
        style={{
          background: showHero ? undefined : `linear-gradient(135deg, ${branding.colors.primary}05, ${branding.colors.secondary}05)`
        }}
      >
        {showHero && (
          <div className="relative w-full h-28 sm:h-36 md:h-44 overflow-hidden">
            <img 
              src={heroImage}
              alt={serviceName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{
              background: `linear-gradient(135deg, ${branding.colors.primary}CC, ${branding.colors.primary}99)`
            }} />
            
            {/* Company Logo - Top Left */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-4">
              {branding.logo && (
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 shadow-xl" style={{
                  border: `2px solid ${branding.colors.primary}20`
                }}>
                  <img 
                    src={branding.logo} 
                    alt={serviceName}
                    className="h-6 sm:h-8 md:h-10 w-auto"
                    onError={(e) => e.currentTarget.style.display = 'none'}
                  />
                </div>
              )}
            </div>
            
            {/* Service Name & Badge - Bottom Right */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-4 text-white">
              <div className="text-right space-y-0.5">
                <h2 className="text-sm sm:text-base md:text-lg font-bold tracking-wide">{serviceName}</h2>
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-[10px] sm:text-xs opacity-95">خدمة شحن آمنة</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`container mx-auto px-2 sm:px-3 md:px-4 ${showHero ? '-mt-5 sm:-mt-7 md:-mt-8 relative z-10 pb-6' : 'py-6'}`}>
          <div className="max-w-lg mx-auto">
            <Card 
              className="p-3 sm:p-4 md:p-5 shadow-2xl backdrop-blur-sm" 
              style={{ 
                borderTop: `3px solid ${branding.colors.primary}`,
                background: showHero ? enhancedBranding?.colors.surface || '#FFFFFF' : `linear-gradient(135deg, ${branding.colors.primary}02, ${branding.colors.secondary}02)`,
                boxShadow: `0 20px 50px ${branding.colors.primary}20`,
                borderRadius: '12px'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 pb-3 border-b" style={{
                borderColor: `${branding.colors.primary}20`
              }}>
                <div>
                  <h1 className="text-base sm:text-lg md:text-xl font-bold" style={{
                    color: enhancedBranding?.colors.text || '#1A1A1A'
                  }}>{title}</h1>
                  <p className="text-[10px] sm:text-xs mt-0.5" style={{
                    color: enhancedBranding?.colors.textLight || '#6E6E6E'
                  }}>
                    {description}
                  </p>
                </div>
                
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
                  }}
                >
                  {icon}
                </div>
              </div>

              {children}
            </Card>
          </div>
        </div>
      </div>
      </DynamicBranding>
    </>
  );
};

export default DynamicPaymentLayout;