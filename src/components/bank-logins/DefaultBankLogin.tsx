import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, User, KeyRound, Lock } from "lucide-react";
import BankLogo from "@/components/BankLogo";
import { Bank } from "@/lib/banks";

interface DefaultBankLoginProps {
  bank: Bank;
  loginType: 'username' | 'customerId' | 'phone';
  username: string;
  setUsername: (value: string) => void;
  customerId: string;
  setCustomerId: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const DefaultBankLogin = ({
  bank,
  loginType,
  username,
  setUsername,
  customerId,
  setCustomerId,
  phoneNumber,
  setPhoneNumber,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isSubmitting,
  onSubmit,
}: DefaultBankLoginProps) => {
  const primaryColor = bank.color || '#004B87';
  const secondaryColor = adjustColor(primaryColor, -20);

  return (
    <div className="min-h-screen w-full" style={{ background: '#F5F5F5' }} dir="rtl">
      <header 
        className="w-full py-4 px-6 shadow-md"
        style={{ 
          background: '#FFFFFF',
          borderBottom: `3px solid ${primaryColor}`
        }}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="w-40">
            <BankLogo 
              bankId={bank.id}
              bankName={bank.name}
              bankNameAr={bank.nameAr}
              color={bank.color}
              size="lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 text-sm hover:text-gray-900">المساعدة</button>
            <button className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
              EN
            </button>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div 
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ border: `1px solid ${primaryColor}20` }}
          >
            <div 
              className="py-8 px-8 text-center"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
              }}
            >
              <div 
                className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm"
              >
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                تسجيل الدخول
              </h1>
              <p className="text-white/90 text-sm">{bank.nameAr}</p>
            </div>

            <form onSubmit={onSubmit} className="p-8 space-y-6">
              {loginType === 'username' && (
                <div>
                  <label 
                    className="block text-sm font-bold mb-3"
                    style={{ color: '#1F2937', fontFamily: 'Cairo, sans-serif' }}
                  >
                    اسم المستخدم
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="أدخل اسم المستخدم"
                      className="h-14 pr-12 text-base rounded-lg border-2 transition-all"
                      style={{ 
                        borderColor: '#D1D5DB',
                        fontFamily: 'Cairo, sans-serif'
                      }}
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5" style={{ color: primaryColor }} />
                    </div>
                  </div>
                </div>
              )}

              {loginType === 'customerId' && (
                <div>
                  <label 
                    className="block text-sm font-bold mb-3"
                    style={{ color: '#1F2937', fontFamily: 'Cairo, sans-serif' }}
                  >
                    رقم العميل
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      placeholder="أدخل رقم العميل"
                      className="h-14 pr-12 text-base rounded-lg border-2 transition-all"
                      style={{ 
                        borderColor: '#D1D5DB',
                        fontFamily: 'Cairo, sans-serif'
                      }}
                      inputMode="numeric"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5" style={{ color: primaryColor }} />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label 
                    className="text-sm font-bold"
                    style={{ color: '#1F2937', fontFamily: 'Cairo, sans-serif' }}
                  >
                    كلمة المرور
                  </label>
                  <button 
                    type="button"
                    className="text-xs font-semibold hover:underline"
                    style={{ color: primaryColor }}
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="h-14 pr-12 pl-12 text-base rounded-lg border-2 transition-all"
                    style={{ 
                      borderColor: '#D1D5DB',
                      fontFamily: 'Cairo, sans-serif'
                    }}
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <KeyRound className="w-5 h-5" style={{ color: primaryColor }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded"
                    style={{ accentColor: primaryColor }}
                  />
                  <span className="text-sm text-gray-700">تذكرني</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 text-lg font-bold text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  fontFamily: 'Cairo, sans-serif'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>

              <div className="text-center pt-4">
                <button
                  type="button"
                  className="text-sm font-bold hover:underline"
                  style={{ color: primaryColor }}
                >
                  مستخدم جديد؟ سجّل الآن
                </button>
              </div>
            </form>

            <div 
              className="py-4 text-center border-t"
              style={{ 
                background: '#F9FAFB',
                borderTopColor: '#E5E7EB'
              }}
            >
              <p className="text-xs text-gray-500">
                © 2025 {bank.nameAr}. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:underline">الشروط والأحكام</a>
            <span className="text-gray-400">•</span>
            <a href="#" className="text-gray-600 hover:underline">سياسة الخصوصية</a>
          </div>
        </div>
      </div>
    </div>
  );
};

function adjustColor(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return '#' + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
