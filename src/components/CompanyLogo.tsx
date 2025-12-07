import React from 'react';
import { getBrandingById } from '@/lib/officialLogos';

interface CompanyLogoProps {
  companyId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { height: '24px', fontSize: '12px' },
  md: { height: '40px', fontSize: '14px' },
  lg: { height: '60px', fontSize: '16px' },
  xl: { height: '80px', fontSize: '20px' },
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  companyId,
  size = 'md',
  showName = false,
  className = '',
}) => {
  const branding = getBrandingById(companyId);

  if (!branding) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{
          height: sizeMap[size].height,
          padding: '8px',
        }}
      >
        <span style={{ fontSize: sizeMap[size].fontSize }}>Logo</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{
        height: sizeMap[size].height,
      }}
    >
      {branding.logoUrl ? (
        <img
          src={branding.logoUrl}
          alt={branding.name}
          style={{
            height: sizeMap[size].height,
            objectFit: 'contain',
          }}
        />
      ) : (
        <div
          className="flex items-center justify-center px-4 rounded"
          style={{
            height: sizeMap[size].height,
            backgroundColor: branding.brandGuidelines?.backgroundColor || '#FFFFFF',
            color: branding.brandGuidelines?.textColor || branding.officialColor,
            fontSize: sizeMap[size].fontSize,
            fontWeight: 'bold',
          }}
        >
          {branding.name}
        </div>
      )}
      {showName && (
        <span
          className="font-semibold"
          style={{
            color: branding.officialColor,
            fontSize: sizeMap[size].fontSize,
          }}
        >
          {branding.nameAr}
        </span>
      )}
    </div>
  );
};

interface BankLogoCardProps {
  bankId: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export const BankLogoCard: React.FC<BankLogoCardProps> = ({
  bankId,
  onClick,
  selected = false,
  className = '',
}) => {
  const branding = getBrandingById(bankId);
  
  const defaultColor = '#00AF9A';
  const color = branding?.officialColor || defaultColor;
  const bgColor = branding?.brandGuidelines?.backgroundColor || '#FFFFFF';
  const nameAr = branding?.nameAr || bankId;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-6 transition-all duration-200 hover:shadow-lg ${className}`}
      style={{
        backgroundColor: bgColor,
        border: `2px solid ${selected ? color : '#E5E7EB'}`,
        boxShadow: selected ? `0 4px 12px ${color}40` : '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {branding && branding.logoUrl ? (
          <CompanyLogo companyId={bankId} size="lg" />
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {nameAr.charAt(0)}
          </div>
        )}
        <div
          className="text-center font-semibold"
          style={{
            color: color,
          }}
        >
          {nameAr}
        </div>
      </div>
    </div>
  );
};

interface ShippingLogoCardProps {
  shippingId: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export const ShippingLogoCard: React.FC<ShippingLogoCardProps> = ({
  shippingId,
  onClick,
  selected = false,
  className = '',
}) => {
  const branding = getBrandingById(shippingId);
  
  const defaultColor = '#00AF9A';
  const color = branding?.officialColor || defaultColor;
  const bgColor = branding?.brandGuidelines?.backgroundColor || '#FFFFFF';
  const nameAr = branding?.nameAr || shippingId;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg ${className}`}
      style={{
        backgroundColor: bgColor,
        border: `2px solid ${selected ? color : '#E5E7EB'}`,
        boxShadow: selected ? `0 4px 12px ${color}40` : '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div className="flex flex-col items-center justify-center gap-3">
        {branding && branding.logoUrl ? (
          <CompanyLogo companyId={shippingId} size="lg" />
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {nameAr.charAt(0)}
          </div>
        )}
        <div
          className="text-center text-sm font-medium"
          style={{
            color: color,
          }}
        >
          {nameAr}
        </div>
      </div>
    </div>
  );
};

interface PaymentLogoProps {
  paymentId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PaymentLogo: React.FC<PaymentLogoProps> = ({
  paymentId,
  size = 'md',
  className = '',
}) => {
  const branding = getBrandingById(paymentId);

  if (!branding) return null;

  return (
    <div
      className={`inline-flex items-center justify-center rounded px-3 py-2 ${className}`}
      style={{
        backgroundColor: branding.brandGuidelines?.backgroundColor || '#FFFFFF',
        border: `1px solid ${branding.officialColor}`,
      }}
    >
      <CompanyLogo companyId={paymentId} size={size} />
    </div>
  );
};
