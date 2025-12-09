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
          <div className="relative w-full h-48 sm:h-64 overflow-hidden">
            <img 
              src={heroImage}
              alt={serviceName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            
            {/* Logo Overlay - Enhanced with better styling */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
              {branding.logo && (
                <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-gray-200">
                  <img 
                    src={branding.logo} 
                    alt={serviceName}
                    className="h-12 sm:h-16 w-auto max-w-[120px] sm:max-w-[160px] object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'h-12 sm:h-16 w-32 sm:w-40 flex items-center justify-center text-gray-700 font-bold text-sm';
                        fallback.textContent = serviceName;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              )}
            </div>
            
            {/* Title Overlay - Enhanced with backdrop blur */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white">
              <div className="text-right bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
                <h2 className="text-lg sm:text-2xl font-bold mb-1 drop-shadow-lg">{serviceName}</h2>
                <p className="text-xs sm:text-sm opacity-90 drop-shadow-md">خدمة دفع موثوقة</p>
              </div>
            </div>
          </div>
        )}

        <div className={`container mx-auto px-3 sm:px-4 ${showHero ? '-mt-8 sm:-mt-12 relative z-10' : 'py-8'}`}>
          <div className="max-w-2xl mx-auto">
            <Card 
              className="p-4 sm:p-8 shadow-2xl border-t-4" 
              style={{ 
                borderTopColor: branding.colors.primary,
                background: showHero ? undefined : `linear-gradient(135deg, ${branding.colors.primary}02, ${branding.colors.secondary}02)`,
                boxShadow: enhancedBranding?.shadows.lg || '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                borderRadius: enhancedBranding?.borderRadius.lg || '12px'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-3xl font-bold">{title}</h1>
                
                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
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