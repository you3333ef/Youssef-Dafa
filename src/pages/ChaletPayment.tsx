import React from 'react';
import { DynamicIdentityProvider, DynamicIdentityWrapper } from '@/components/DynamicIdentityProvider';
import { DynamicIdentityTopBar } from '@/components/DynamicIdentityTopBar';
import { DynamicIdentityButton } from '@/components/DynamicIdentityButton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Users, CreditCard } from 'lucide-react';

const ChaletPayment = () => {
  return (
    <DynamicIdentityProvider entityKey="chalets">
      <div className="min-h-screen dynamic-bg">
        <DynamicIdentityTopBar 
          entityKey="chalets" 
          title="حجز الشاليهات" 
          showLogo={true}
        />
        
        <div className="container mx-auto px-4 py-8">
          <DynamicIdentityWrapper
            entityKey="chalets"
            showLogo={false}
            showAnimatedHeader={true}
            variant="card"
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold dynamic-primary-text mb-2">
                  احجز شاليه أحلامك
                </h1>
                <p className="text-gray-600 dynamic-font-primary">
                  استمتع بإقامة مميزة في أفضل الشاليهات
                </p>
              </div>

              <Card className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="chalet-name" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      اسم الشاليه
                    </Label>
                    <Input 
                      id="chalet-name" 
                      placeholder="أدخل اسم الشاليه"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="guests" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      عدد الضيوف
                    </Label>
                    <Input 
                      id="guests" 
                      type="number"
                      placeholder="4"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="check-in" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      تاريخ الوصول
                    </Label>
                    <Input 
                      id="check-in" 
                      type="date"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="check-out" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      تاريخ المغادرة
                    </Label>
                    <Input 
                      id="check-out" 
                      type="date"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">المبلغ الإجمالي:</span>
                    <span className="text-2xl font-bold dynamic-primary-text">1,500 ر.س</span>
                  </div>

                  <DynamicIdentityButton 
                    entityKey="chalets"
                    variant="primary"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    إتمام الحجز والدفع
                  </DynamicIdentityButton>
                </div>
              </Card>

              <div className="dynamic-card">
                <h3 className="font-bold text-lg mb-3 dynamic-primary-text">
                  مميزات الحجز
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full dynamic-primary-bg"></span>
                    دفع آمن ومضمون 100%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full dynamic-primary-bg"></span>
                    إمكانية الإلغاء المجاني قبل 24 ساعة
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full dynamic-primary-bg"></span>
                    خدمة عملاء على مدار الساعة
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full dynamic-primary-bg"></span>
                    تأكيد فوري للحجز
                  </li>
                </ul>
              </div>
            </div>
          </DynamicIdentityWrapper>
        </div>
      </div>
    </DynamicIdentityProvider>
  );
};

export default ChaletPayment;
