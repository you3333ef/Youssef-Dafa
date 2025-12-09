import React from 'react';
import { Hash } from 'lucide-react';

interface CompanyTopBarProps {
  companyKey: string;
  companyName: string;
  primaryColor: string;
  secondaryColor?: string;
  trackingNumber?: string;
  logo?: string;
}

const logoUrls: Record<string, string> = {
  aramex: '/logos/aramex-logo.png',
  dhl: '/logos/dhl-logo.png',
  dhlkw: '/logos/dhl-logo.png',
  dhlqa: '/logos/dhl-logo.png',
  dhlom: '/logos/dhl-logo.png',
  dhlbh: '/logos/dhl-logo.png',
  fedex: '/logos/fedex-logo.png',
  ups: '/logos/ups-logo.png',
  smsa: '/logos/smsa-logo.png',
  naqel: '/logos/naqel-logo.png',
  zajil: '/logos/zajil-logo.svg',
  saudipost: '/logos/saudipost-logo.svg',
  empost: 'https://7xgroup.ae/Content/images/EPG-logo.svg',
  kwpost: '/logos/kwpost-logo.svg',
  qpost: 'https://www.qpost.qa/sites/default/files/qpost-logo-ar.svg',
  omanpost: '/logos/omanpost-logo.png',
  bahpost: '/logos/bahpost-logo.png',
  genacom: 'https://www.genacom.app/images/logo.png',
  jinaken: 'https://www.genacom.app/images/logo.png',
  albaraka: 'https://www.albaraka.com/media/1242/albaraka-logo.png',
  alfuttaim: '/logos/alfuttaim-logo.svg',
  alshaya: '/logos/alshaya-logo.svg',
  bahri: '/logos/bahri-logo.png',
  national: '/logos/bahri-logo.png',
  shipco: '/logos/shipco-logo.svg',
  hellmann: '/logos/hellmann-logo.png',
  dsv: '/logos/dsv-logo.png',
  agility: '/logos/agility-logo.png',
  jinakum: '/og-jinakum.jpg'
};

const CompanyTopBar: React.FC<CompanyTopBarProps> = ({
  companyKey,
  companyName,
  primaryColor,
  secondaryColor,
  trackingNumber,
  logo
}) => {
  const logoUrl = logo || logoUrls[companyKey.toLowerCase()] || '';
  const bgColor = secondaryColor || primaryColor;

  return (
    <div 
      className="w-full px-4 py-3 sm:px-6 sm:py-4"
      style={{ 
        background: `linear-gradient(135deg, ${primaryColor}, ${bgColor})`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          {logoUrl && (
            <div className="bg-white rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 shadow-md flex items-center">
              <img 
                src={logoUrl}
                alt={companyName}
                className="h-8 sm:h-10 w-auto max-w-[120px] sm:max-w-[180px] object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.fallback-text');
                  if (fallback) {
                    (fallback as HTMLElement).style.display = 'block';
                  }
                }}
              />
              <span 
                className="fallback-text font-bold text-sm sm:text-lg hidden"
                style={{ color: primaryColor }}
              >
                {companyName}
              </span>
            </div>
          )}
        </div>

        {trackingNumber && (
          <div className="flex items-center gap-2 text-white">
            <Hash className="w-4 h-4 sm:w-5 sm:h-5 opacity-90" />
            <span className="text-xs sm:text-sm font-medium opacity-90">
              {trackingNumber}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyTopBar;
