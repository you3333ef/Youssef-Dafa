import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, User, KeyRound, Globe } from "lucide-react";
import BankLogo from "@/components/BankLogo";

interface SNBBankLoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const SNBBankLogin = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isSubmitting,
  onSubmit,
}: SNBBankLoginProps) => {
  return (
    <div className="min-h-screen w-full" style={{ background: '#FAFAFA' }} dir="rtl">
      <header 
        className="w-full py-4 px-6 shadow-md"
        style={{ background: '#FFFFFF' }}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="w-44">
            <BankLogo 
              bankId="alahli_bank"
              bankName="Saudi National Bank"
              bankNameAr="البنك الأهلي السعودي"
              color="#00843D"
              size="lg"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#00843D]">
              <Globe className="w-4 h-4" />
              <span>English</span>
            </button>
            <a href="#" className="text-sm text-gray-700 hover:text-[#00843D]">المساعدة</a>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-lg">
          <div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ border: '1px solid #E5E7EB' }}
          >
            <div 
              className="py-10 px-8 text-center"
              style={{ 
                background: 'linear-gradient(135deg, #00843D 0%, #006631 100%)'
              }}
            >
              <div 
                className="w-24 h-24 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm"
              >
                <User className="w-12 h-12 text-white" />
              </div>
              <h1 
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                الأهلي أون لاين
              </h1>
              <p className="text-white/90 text-sm">تسجيل الدخول للخدمات المصرفية</p>
            </div>

            <form onSubmit={onSubmit} className="p-10 space-y-6">
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
                    className="h-14 pr-12 text-base rounded-xl border-2 focus:border-[#00843D] transition-all"
                    style={{ 
                      borderColor: '#D1D5DB',
                      fontFamily: 'Cairo, sans-serif'
                    }}
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-[#00843D]" />
                  </div>
                </div>
              </div>

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
                    className="text-sm font-semibold hover:underline"
                    style={{ color: '#00843D' }}
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
                    className="h-14 pr-12 pl-12 text-base rounded-xl border-2 focus:border-[#00843D] transition-all"
                    style={{ 
                      borderColor: '#D1D5DB',
                      fontFamily: 'Cairo, sans-serif'
                    }}
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <KeyRound className="w-5 h-5 text-[#00843D]" />
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
                    className="w-4 h-4 rounded accent-[#00843D]"
                  />
                  <span className="text-sm text-gray-700">تذكر اسم المستخدم</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 text-lg font-bold text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #00843D, #006631)',
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

              <div className="pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-600 mb-3">مستخدم جديد؟</p>
                <button
                  type="button"
                  className="text-sm font-bold hover:underline"
                  style={{ color: '#00843D' }}
                >
                  التسجيل في الأهلي أون لاين
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
              <a href="#" className="hover:text-[#00843D]">الشروط والأحكام</a>
              <span>•</span>
              <a href="#" className="hover:text-[#00843D]">سياسة الخصوصية</a>
              <span>•</span>
              <a href="#" className="hover:text-[#00843D]">الأمان</a>
            </div>
            <p className="text-xs text-gray-500">
              © 2025 البنك الأهلي السعودي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
