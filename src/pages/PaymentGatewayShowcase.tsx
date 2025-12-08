import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getAllGovernmentPaymentSystems } from '@/lib/governmentPaymentSystems';
import { getCurrencyByCountry, formatCurrency } from '@/lib/countryCurrencies';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  CheckCircle2, 
  CreditCard,
  Building2,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

const PaymentGatewayShowcase = () => {
  const navigate = useNavigate();
  const paymentSystems = getAllGovernmentPaymentSystems();

  const handleTestGateway = (countryCode: string) => {
    window.open(`/create/${countryCode}/payment`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              بوابات الدفع الحكومية في دول الخليج
            </h1>
            <p className="text-lg sm:text-xl opacity-90 leading-relaxed">
              نظام دفع موحد ومتكامل يدعم جميع بوابات الدفع الحكومية في دول مجلس التعاون الخليجي
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                <Shield className="w-4 h-4 ml-2" />
                معتمد حكومياً
              </Badge>
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                <CheckCircle2 className="w-4 h-4 ml-2" />
                آمن ومشفر
              </Badge>
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                <Building2 className="w-4 h-4 ml-2" />
                {paymentSystems.length} بوابة دفع
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {paymentSystems.map((system) => {
            const currency = getCurrencyByCountry(system.countryCode);
            const sampleAmount = formatCurrency(500, system.countryCode);

            return (
              <Card 
                key={system.countryCode}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div 
                  className="h-32 relative"
                  style={{ background: system.gradients.header }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-900">
                      {currency.code}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <div className="flex items-center gap-3">
                      {system.logo && (
                        <div className="bg-white p-2 rounded-lg shadow-lg">
                          <img 
                            src={system.logo} 
                            alt={system.nameAr} 
                            className="h-10 w-auto object-contain" 
                          />
                        </div>
                      )}
                      <div className="text-white">
                        <h3 className="font-bold text-xl">{system.nameAr}</h3>
                        <p className="text-xs opacity-90">{system.nameEn}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed min-h-[48px]">
                    {system.description}
                  </p>

                  <Separator className="my-4" />

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">العملة:</span>
                      <span className="font-semibold">{currency.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">رمز العملة:</span>
                      <span className="font-semibold">{currency.symbol}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">مثال:</span>
                      <span className="font-bold" style={{ color: system.colors.primary }}>
                        {sampleAmount}
                      </span>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-lg mb-4"
                    style={{ 
                      backgroundColor: `${system.colors.primary}08`,
                      borderRight: `3px solid ${system.colors.primary}`
                    }}
                  >
                    <p className="text-xs font-semibold mb-2" style={{ color: system.colors.primary }}>
                      طرق الدفع المدعومة:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {system.paymentMethods.map((method, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline"
                          className="text-[10px] py-0.5 px-2"
                          style={{ 
                            borderColor: `${system.colors.primary}40`,
                            color: system.colors.primary
                          }}
                        >
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleTestGateway(system.countryCode)}
                      className="flex-1 text-white font-semibold shadow-md"
                      style={{ backgroundColor: system.colors.primary }}
                    >
                      <span>تجربة البوابة</span>
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Button>
                  </div>

                  {system.website && (
                    <a 
                      href={system.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center mt-3 text-xs hover:underline"
                      style={{ color: system.colors.primary }}
                    >
                      زيارة الموقع الرسمي ←
                    </a>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-4xl mx-auto mt-12 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-3 text-gray-900">
              نظام دفع موحد ومتكامل
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              جميع بوابات الدفع معتمدة من البنوك المركزية في دول الخليج وتوفر أعلى معايير الأمان والحماية
              لجميع المعاملات المالية. النظام يدعم الدفع بالبطاقة وتسجيل الدخول البنكي المباشر.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-semibold text-gray-900">SSL 256-bit</p>
                <p className="text-xs text-gray-600">تشفير متقدم</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-semibold text-gray-900">PCI-DSS</p>
                <p className="text-xs text-gray-600">معتمد عالمياً</p>
              </div>
              <div className="text-center">
                <Building2 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-semibold text-gray-900">حكومي</p>
                <p className="text-xs text-gray-600">معتمد رسمياً</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/services')}
            variant="outline"
            size="lg"
            className="shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            <span>العودة للخدمات</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentGatewayShowcase;
