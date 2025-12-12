import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, User, KeyRound, Lock } from "lucide-react";
import BankLogo from "@/components/BankLogo";

interface QNBLoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const QNBLogin = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isSubmitting,
  onSubmit,
}: QNBLoginProps) => {
  return (
    <div className="min-h-screen w-full" style={{ background: '#FFFFFF' }} dir="rtl">
      <header 
        className="w-full py-6 px-6"
        style={{ 
          background: 'linear-gradient(135deg, #6E1D3E 0%, #4A1428 100%)',
        }}
      >
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="w-32">
            <BankLogo 
              bankId="qnb"
              bankName="Qatar National Bank"
              bankNameAr="بنك قطر الوطني"
              color="#6E1D3E"
              size="lg"
              className="filter brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 bg-white/20 text-white text-sm rounded-lg hover:bg-white/30 font-semibold">
              EN
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl py-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 
              className="text-5xl font-bold mb-4"
              style={{ color: '#6E1D3E', fontFamily: 'Cairo, sans-serif' }}
            >
              الخدمات المصرفية
              <br />
              عبر الإنترنت
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              خدماتك المصرفية في أي وقت ومن أي مكان
            </p>
            <div className="space-y-4">
              {[
                'تحويل الأموال محلياً ودولياً',
                'إدارة الحسابات والبطاقات',
                'دفع الفواتير بسهولة',
                'خدمات الاستثمار'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: '#6E1D3E' }}
                  >
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div 
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
              style={{ border: '2px solid #E5E7EB' }}
            >
              <div 
                className="py-8 px-8 text-center"
                style={{ background: 'linear-gradient(135deg, #6E1D3E 0%, #4A1428 100%)' }}
              >
                <div 
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm"
                >
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 
                  className="text-2xl font-bold text-white mb-1"
                  style={{ fontFamily: 'Cairo, sans-serif' }}
                >
                  تسجيل الدخول
                </h2>
                <p className="text-white/90 text-sm">QNB Internet Banking</p>
              </div>

              <form onSubmit={onSubmit} className="p-8 space-y-6">
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
                      className="h-14 pr-12 text-base rounded-xl border-2 focus:border-[#6E1D3E] transition-all"
                      style={{ 
                        borderColor: '#D1D5DB',
                        fontFamily: 'Cairo, sans-serif'
                      }}
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5" style={{ color: '#6E1D3E' }} />
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
                      className="h-14 pr-12 pl-12 text-base rounded-xl border-2 focus:border-[#6E1D3E] transition-all"
                      style={{ 
                        borderColor: '#D1D5DB',
                        fontFamily: 'Cairo, sans-serif'
                      }}
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <KeyRound className="w-5 h-5" style={{ color: '#6E1D3E' }} />
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
                      className="w-4 h-4 rounded"
                      style={{ accentColor: '#6E1D3E' }}
                    />
                    <span className="text-sm text-gray-700">تذكرني</span>
                  </label>
                  <button 
                    type="button"
                    className="text-sm font-bold hover:underline"
                    style={{ color: '#6E1D3E' }}
                  >
                    نسيت كلمة المرور؟
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 text-lg font-bold text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{
                    background: 'linear-gradient(135deg, #6E1D3E, #4A1428)',
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
                    style={{ color: '#6E1D3E' }}
                  >
                    مستخدم جديد؟ التسجيل في الخدمة
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
                  © 2025 بنك قطر الوطني. جميع الحقوق محفوظة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
