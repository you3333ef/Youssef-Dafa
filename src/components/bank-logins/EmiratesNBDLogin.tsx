import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, User, KeyRound, Shield } from "lucide-react";
import BankLogo from "@/components/BankLogo";

interface EmiratesNBDLoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const EmiratesNBDLogin = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isSubmitting,
  onSubmit,
}: EmiratesNBDLoginProps) => {
  return (
    <div className="min-h-screen w-full" style={{ background: '#F5F5F5' }} dir="rtl">
      <header 
        className="w-full py-5 px-6 shadow-lg"
        style={{ 
          background: '#FFFFFF',
          borderBottom: '4px solid #D50032'
        }}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="w-48">
            <BankLogo 
              bankId="emirates_nbd"
              bankName="Emirates NBD"
              bankNameAr="بنك الإمارات دبي الوطني"
              color="#D50032"
              size="lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-semibold text-white rounded-lg"
              style={{ background: '#D50032' }}
            >
              English
            </button>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-xl">
          <div 
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ 
              border: '2px solid #D50032',
            }}
          >
            <div 
              className="py-8 px-8"
              style={{ background: 'linear-gradient(135deg, #D50032 0%, #A8002A 100%)' }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm"
                >
                  <Shield className="w-9 h-9 text-white" />
                </div>
                <div>
                  <h1 
                    className="text-3xl font-bold text-white"
                    style={{ fontFamily: 'Cairo, sans-serif' }}
                  >
                    تسجيل الدخول
                  </h1>
                  <p className="text-white/90 text-sm">الخدمات المصرفية الإلكترونية</p>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="p-10 space-y-6">
              <div>
                <label 
                  className="block text-sm font-bold mb-3"
                  style={{ color: '#1F2937', fontFamily: 'Cairo, sans-serif' }}
                >
                  اسم المستخدم أو رقم الهوية
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="أدخل اسم المستخدم"
                    className="h-14 pr-12 text-base rounded-lg border-2 focus:border-[#D50032] transition-all"
                    style={{ 
                      borderColor: '#E5E7EB',
                      fontFamily: 'Cairo, sans-serif'
                    }}
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5" style={{ color: '#D50032' }} />
                  </div>
                </div>
              </div>

              <div>
                <label 
                  className="block text-sm font-bold mb-3"
                  style={{ color: '#1F2937', fontFamily: 'Cairo, sans-serif' }}
                >
                  كلمة المرور
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="h-14 pr-12 pl-12 text-base rounded-lg border-2 focus:border-[#D50032] transition-all"
                    style={{ 
                      borderColor: '#E5E7EB',
                      fontFamily: 'Cairo, sans-serif'
                    }}
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <KeyRound className="w-5 h-5" style={{ color: '#D50032' }} />
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

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded accent-[#D50032]"
                  />
                  <span className="text-sm text-gray-700">تذكرني</span>
                </label>
                <button 
                  type="button"
                  className="text-sm font-bold hover:underline"
                  style={{ color: '#D50032' }}
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 text-xl font-bold text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #D50032, #A8002A)',
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

              <div 
                className="p-4 rounded-lg flex items-start gap-3"
                style={{ background: '#FEF2F2' }}
              >
                <Shield className="w-5 h-5 mt-0.5" style={{ color: '#D50032' }} />
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: '#1F2937' }}>
                    معلومات أمنية هامة
                  </p>
                  <p className="text-xs text-gray-600">
                    لن يطلب منك البنك أبداً كلمة المرور أو رمز التحقق عبر الهاتف أو البريد الإلكتروني
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 text-center">
                <button
                  type="button"
                  className="text-sm font-bold hover:underline"
                  style={{ color: '#D50032' }}
                >
                  مستخدم جديد؟ سجّل الآن
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
              <a href="#" className="hover:text-[#D50032]">الشروط والأحكام</a>
              <span>•</span>
              <a href="#" className="hover:text-[#D50032]">سياسة الخصوصية</a>
              <span>•</span>
              <a href="#" className="hover:text-[#D50032]">اتصل بنا</a>
            </div>
            <p className="text-xs text-gray-500">
              © 2025 بنك الإمارات دبي الوطني. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
