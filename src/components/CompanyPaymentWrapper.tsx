import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getBrandingByCompany } from '@/lib/brandingSystem';
import { getServiceBranding } from '@/lib/serviceLogos';
import { Shield, Lock, CheckCircle2, CreditCard } from 'lucide-react';

interface CompanyPaymentWrapperProps {
  companyKey: string;
  children: React.ReactNode;
  title: string;
  showSecurityBadge?: boolean;
  showCompanyLogo?: boolean;
  icon?: React.ReactNode;
}

export const CompanyPaymentWrapper: React.FC<CompanyPaymentWrapperProps> = ({ 
  companyKey,
  children, 
  title,
  showSecurityBadge = true,
  showCompanyLogo = true,
  icon = <CreditCard className="w-6 h-6 text-white" />
}) => {
  const branding = getBrandingByCompany(companyKey);
  const serviceBranding = getServiceBranding(companyKey);
  
  // Use branding from brandingSystem if available, otherwise use serviceBranding
  const colors = branding?.colors || serviceBranding?.colors || { 
    primary: '#DC291E', 
    secondary: '#8B1A12'
  };
  
  const gradients = branding?.gradients || {
    primary: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
  };

  const companyName = branding?.nameAr || serviceBranding?.nameAr || companyKey;
  const logo = serviceBranding?.logo;
  const ogImage = serviceBranding?.ogImage;
  
  return (
    <div 
      className="min-h-screen py-4 sm:py-12" 
      dir="rtl"
      style={{
        background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`
      }}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-md mx-auto">
          
          {/* Company Logo */}
          {showCompanyLogo && logo && (
            <div className="text-center mb-4 sm:mb-6">
              <div className="bg-white inline-block px-4 py-3 rounded-xl shadow-lg">
                <img 
                  src={logo} 
                  alt={companyName}
                  className="h-10 sm:h-12 w-auto"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            </div>
          )}
          
          {/* Security Badge */}
          {showSecurityBadge && (
            <div className="text-center mb-3 sm:mb-6">
              <Badge 
                className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 text-white"
                style={{
                  background: gradients.primary
                }}
              >
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                <span>معاملة آمنة ومشفّرة</span>
              </Badge>
            </div>
          )}
          
          <Card 
            className="p-4 sm:p-8 shadow-elevated border-t-4" 
            style={{ 
              borderTopColor: colors.primary,
              boxShadow: branding?.shadows.lg || '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center"
                style={{
                  background: gradients.primary
                }}
              >
                {icon}
              </div>
              <h1 className="text-lg sm:text-2xl font-bold flex-1">{title}</h1>
            </div>

            {children}
            
            {/* Security Info */}
            <div 
              className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg"
              style={{ 
                backgroundColor: `${colors.primary}10`,
                borderLeft: `4px solid ${colors.primary}`
              }}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                <div className="text-xs sm:text-sm text-gray-700">
                  <p className="font-semibold mb-1">حماية متقدمة</p>
                  <p className="text-[10px] sm:text-xs">
                    جميع معلوماتك محمية بتشفير SSL 256-bit ومطابقة لمعايير PCI DSS
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-4 sm:mt-6 flex justify-center gap-3 sm:gap-4 flex-wrap">
            {[
              { icon: Shield, text: 'دفع آمن' },
              { icon: Lock, text: 'مشفر' },
              { icon: CheckCircle2, text: 'موثوق' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-1.5 sm:gap-2 text-gray-600 bg-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm"
              >
                <item.icon className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: colors.primary }} />
                <span className="text-[10px] sm:text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPaymentWrapper;
