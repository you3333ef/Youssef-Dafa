import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, User, KeyRound, ShieldCheck } from "lucide-react";
import BankLogo from "@/components/BankLogo";

interface NBKLoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const NBKLogin = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isSubmitting,
  onSubmit,
}: NBKLoginProps) => {
  return (
    <div className="min-h-screen w-full" style={{ background: '#F0F4F8' }} dir="rtl">
      <header 
        className="w-full py-5 px-6 shadow-md"
        style={{ 
          background: 'linear-gradient(90deg, #005EB8 0%, #003D7A 100%)',
        }}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="w-36">
            <BankLogo 
              bankId="nbk"
              bankName="National Bank of Kuwait"
              bankNameAr="بنك الكويت الوطني"
              color="#005EB8"
              size="lg"
              className="filter brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white text-sm hover:underline">خدمة العملاء</a>
            <button className="px-4 py-2 bg-white/20 text-white text-sm rounded hover:bg-white/30">
              EN
            </button>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div 
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            style={{ border: '2px solid #005EB8' }}
          >
            <div 
              className="py-10 px-8 text-center"
              style={{ background: 'linear-gradient(135deg, #005EB8 0%, #003D7A 100%)' }}
            >
              <div 
                className="w-24 h-24 mx-auto mb-5 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm"
              >
                <ShieldCheck className="w-12 h-12 text-white" />
              </div>
              <h1 
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: 'Cairo, sans-serif' }}
              >
                NBK Online Banking
              </h1>
              <p className="text-white/90 text-sm">الخدمات المصرفية عبر الإنترنت</p>
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
                    className="h-14 pr-12 text-base rounded-lg border-2 focus:border-[#005EB8] transition-all"
                    style={{ 
                      borderColor: '#CBD5E1',
                      fontFamily: 'Cairo, sans-serif'
                    }}
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5" style={{ color: '#005EB8' }} />
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
                    className="text-xs font-semibold hover:underline"
                    style={{ color: '#005EB8' }}
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
                    className="h-14 pr-12 pl-12 text-base rounded-lg border-2 focus:border-[#005EB8] transition-all"
                    style={{ 
                      borderColor: '#CBD5E1',
                      fontFamily: 'Cairo, sans-serif'
                    }}
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <KeyRound className="w-5 h-5" style={{ color: '#005EB8' }} />
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
                    style={{ accentColor: '#005EB8' }}
                  />
                  <span className="text-sm text-gray-700">تذكر اسم المستخدم</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 text-xl font-bold text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: 'linear-gradient(135deg, #005EB8, #003D7A)',
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
                className="p-4 rounded-xl flex items-center gap-3"
                style={{ background: '#EFF6FF' }}
              >
                <ShieldCheck className="w-5 h-5" style={{ color: '#005EB8' }} />
                <p className="text-xs text-gray-700">
                  اتصال آمن ومشفر بالكامل
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200 text-center space-y-3">
                <button
                  type="button"
                  className="text-sm font-bold hover:underline"
                  style={{ color: '#005EB8' }}
                >
                  مستخدم جديد؟ التسجيل في الخدمة
                </button>
                <div className="flex items-center justify-center gap-3 text-xs text-gray-600">
                  <a href="#" className="hover:underline">مركز المساعدة</a>
                  <span>•</span>
                  <a href="#" className="hover:underline">الأسئلة الشائعة</a>
                </div>
              </div>
            </form>

            <div 
              className="py-4 text-center"
              style={{ 
                background: '#F8FAFC',
              }}
            >
              <p className="text-xs text-gray-500">
                © 2025 بنك الكويت الوطني. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
