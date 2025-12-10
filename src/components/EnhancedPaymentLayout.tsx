import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, CheckCircle } from "lucide-react";
import { getServiceBranding } from "@/lib/serviceLogos";

interface EnhancedPaymentLayoutProps {
  children: React.ReactNode;
  serviceName: string;
  serviceKey: string;
  amount?: string;
  title: string;
  subtitle?: string;
  showSecurityBadge?: boolean;
  showLogo?: boolean;
  countryFlag?: string;
}

const EnhancedPaymentLayout: React.FC<EnhancedPaymentLayoutProps> = ({
  children,
  serviceName,
  serviceKey,
  amount,
  title,
  subtitle,
  showSecurityBadge = true,
  showLogo = true,
  countryFlag
}) => {
  const branding = getServiceBranding(serviceKey);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div 
        className="w-full h-20 flex items-center justify-between px-6 shadow-sm"
        style={{ 
          background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})` 
        }}
      >
        <div className="flex items-center gap-4">
          {showLogo && branding.logo && (
            <div className="bg-white p-2 rounded-lg shadow-md">
              <img
                src={branding.logo}
                alt={serviceName}
                className="h-10 w-auto"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
          )}
          <div className="text-white">
            <h1 className="text-xl font-bold">{serviceName}</h1>
            {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
          </div>
        </div>

        {amount && (
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <p className="text-white text-sm">المبلغ الإجمالي</p>
            <p className="text-white text-xl font-bold">{amount}</p>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {showSecurityBadge && (
          <div className="mb-6 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">SSL مشفر</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">دفع آمن</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">معتمد وموثوق</span>
            </div>
          </div>
        )}

        <Card className="p-8 shadow-lg">
          <div className="mb-6 pb-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            {countryFlag && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{countryFlag}</span>
                <span className="text-sm text-gray-600">الدفع في {countryFlag}</span>
              </div>
            )}
          </div>

          {children}
        </Card>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>🔒 معلوماتك محمية ومشفرة</span>
            <span>•</span>
            <span>✓ دفع آمن 100%</span>
            <span>•</span>
            <span>🛡️ نظام معتمد</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPaymentLayout;
