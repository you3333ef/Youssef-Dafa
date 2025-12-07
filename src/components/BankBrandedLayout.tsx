import React from 'react';
import { Card } from "@/components/ui/card";
import { getBankById, Bank } from "@/lib/banks";
import { Helmet } from "react-helmet-async";
import { Building2, ShieldCheck } from "lucide-react";

interface BankBrandedLayoutProps {
  children: React.ReactNode;
  bankId: string;
  amount: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  countryFlag?: string;
}

const BankBrandedLayout: React.FC<BankBrandedLayoutProps> = ({
  children,
  bankId,
  amount,
  title,
  description,
  icon = <Building2 className="w-7 h-7 sm:w-10 sm:h-10 text-white" />,
  countryFlag
}) => {
  const bank = getBankById(bankId);
  
  // Default bank branding if bank not found
  const defaultBank: Bank = {
    id: 'default',
    name: 'Bank',
    nameAr: 'البنك',
    color: '#004B87'
  };
  
  const selectedBank = bank || defaultBank;
  
  // Generate bank color scheme
  const primaryColor = selectedBank.color || '#004B87';
  const secondaryColor = adjustColorBrightness(primaryColor, 20);
  
  return (
    <>
      <Helmet>
        <title>{title} - {selectedBank.nameAr}</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <div 
        className="min-h-screen bg-background" 
        dir="rtl"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}05, ${secondaryColor}05)`
        }}
      >
        {/* Bank Header with Logo */}
        <div 
          className="relative w-full h-48 sm:h-64 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
          }}
        >
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Bank Logo Overlay */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <div 
              className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl"
              style={{
                border: `2px solid ${primaryColor}30`
              }}
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
                <Building2 
                  className="w-10 h-10 sm:w-12 sm:h-12"
                  style={{ color: primaryColor }}
                />
              </div>
            </div>
          </div>
          
          {/* Bank Name and Info Overlay */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white">
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                {countryFlag && <span className="text-2xl">{countryFlag}</span>}
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-3xl font-bold mb-1 drop-shadow-lg">
                {selectedBank.nameAr}
              </h2>
              <p className="text-xs sm:text-sm opacity-90 drop-shadow-md">
                {selectedBank.name}
              </p>
              <p className="text-sm sm:text-base opacity-95 mt-1 font-semibold drop-shadow-md">
                {amount}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 -mt-8 sm:-mt-12 relative z-10">
          <div className="max-w-2xl mx-auto">
            <Card 
              className="p-4 sm:p-8 shadow-2xl border-t-4" 
              style={{ 
                borderTopColor: primaryColor,
                background: `linear-gradient(to bottom, ${primaryColor}02, white)`
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-3xl font-bold" style={{ color: primaryColor }}>
                  {title}
                </h1>
                
                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
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
    </>
  );
};

// Helper function to adjust color brightness
function adjustColorBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1).toUpperCase();
}

export default BankBrandedLayout;
