import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, User, KeyRound } from "lucide-react";
import BankLogo from "@/components/BankLogo";

interface AlRajhiBankLoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const AlRajhiBankLogin = ({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  isSubmitting,
  onSubmit,
}: AlRajhiBankLoginProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: '#F8F9FA', fontFamily: 'Cairo, sans-serif' }} dir="rtl">
      <div 
        className="w-full"
        style={{ 
          background: 'linear-gradient(135deg, #006C35 0%, #005028 100%)',
          borderBottom: '3px solid #FFD700',
          boxShadow: '0 2px 8px rgba(0, 108, 53, 0.15)'
        }}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <div className="w-32 sm:w-40">
            <BankLogo 
              bankId="alrajhi_bank"
              bankName="Al Rajhi Bank"
              bankNameAr="مصرف الراجحي"
              color="#006C35"
              size="lg"
              className="filter brightness-0 invert w-full h-auto"
              style={{ maxHeight: '48px' }}
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden md:inline-block text-white text-sm hover:underline transition-all">تواصل معنا</button>
            <button className="hidden md:inline-block text-white text-sm hover:underline transition-all">الفروع</button>
            <button className="px-3 sm:px-4 py-1.5 bg-white/20 text-white text-xs sm:text-sm rounded-md hover:bg-white/30 transition-all font-medium">
              EN
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-8 sm:py-12 px-4">
        <div 
          className="w-full max-w-md bg-white overflow-hidden"
          style={{ 
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            boxShadow: '0 20px 50px rgba(0, 108, 53, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div 
            className="text-center py-8 px-6"
            style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)' }}
          >
            <div 
              className="w-20 h-20 mx-auto mb-5 rounded-full flex items-center justify-center"
              style={{ 
                background: 'linear-gradient(135deg, #006C35, #004D27)',
                boxShadow: '0 8px 24px rgba(0, 108, 53, 0.35)'
              }}
            >
              <User className="w-11 h-11 text-white" strokeWidth={2.5} />
            </div>
            <h1 
              className="text-2xl sm:text-3xl font-extrabold mb-2 tracking-tight"
              style={{ color: '#006C35', fontFamily: 'Cairo, sans-serif' }}
            >
              المباشر للأفراد
            </h1>
            <p className="text-gray-600 text-sm">الخدمات المصرفية عبر الإنترنت</p>
          </div>

          <form onSubmit={onSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <label 
                className="block text-sm font-bold mb-2"
                style={{ color: '#111827', fontFamily: 'Cairo, sans-serif', fontSize: '0.9375rem' }}
              >
                اسم المستخدم
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="أدخل اسم المستخدم"
                  className="h-12 pr-11 text-base rounded-lg border-2 focus:border-[#006C35] transition-colors"
                  style={{ 
                    borderColor: '#D1D5DB',
                    fontFamily: 'Cairo, sans-serif'
                  }}
                  required
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label 
                className="block text-sm font-bold mb-2.5"
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
                  className="h-12 pr-11 pl-11 text-base rounded-lg border-2 focus:border-[#006C35] transition-colors"
                  style={{ 
                    borderColor: '#D1D5DB',
                    fontFamily: 'Cairo, sans-serif'
                  }}
                  required
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <KeyRound className="w-5 h-5 text-gray-400" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded accent-[#006C35]"
                />
                <span className="text-sm text-gray-700">تذكرني</span>
              </label>
              <button 
                type="button"
                className="text-sm font-semibold hover:underline"
                style={{ color: '#006C35' }}
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-bold text-white rounded-lg transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #006C35, #004D27)',
                boxShadow: '0 4px 12px rgba(0, 108, 53, 0.3)',
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
                className="text-sm font-semibold hover:underline"
                style={{ color: '#006C35' }}
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
              © 2025 مصرف الراجحي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <a href="#" className="text-gray-600 hover:text-[#006C35]">الشروط والأحكام</a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-gray-600 hover:text-[#006C35]">سياسة الخصوصية</a>
          <span className="text-gray-400">•</span>
          <a href="#" className="text-gray-600 hover:text-[#006C35]">الأمن والحماية</a>
        </div>
      </div>
    </div>
  );
};
