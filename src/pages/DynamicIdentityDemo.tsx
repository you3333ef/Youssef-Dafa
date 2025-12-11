import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IdentityPageLayout,
  IdentityFormLayout,
  IdentityDashboardLayout,
  IdentityPaymentLayout
} from '@/components/IdentityPageLayout';
import { 
  IdentityButton, 
  IdentityCard 
} from '@/components/DynamicIdentity';
import { 
  getAllEntities, 
  getEntityIdentity,
  setCurrentEntity 
} from '@/lib/dynamicIdentity';

const DynamicIdentityDemo = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>('government_payment');
  const [demoMode, setDemoMode] = useState<'basic' | 'form' | 'dashboard' | 'payment'>('basic');
  const navigate = useNavigate();

  const entities = getAllEntities();

  const handleEntityChange = (entityKey: string) => {
    setSelectedEntity(entityKey);
    setCurrentEntity(entityKey);
  };

  const renderDemo = () => {
    switch (demoMode) {
      case 'form':
        return (
          <IdentityFormLayout
            entityKey={selectedEntity}
            title="نموذج تجريبي"
            description="هذا نموذج تجريبي لإظهار كيفية استخدام نظام الهوية الديناميكية مع النماذج"
            onSubmit={(e) => {
              e.preventDefault();
              alert('تم الإرسال!');
            }}
            submitLabel="إرسال"
            showCancel={true}
            onCancel={() => setDemoMode('basic')}
            cancelLabel="إلغاء"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">الاسم</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder="أدخل اسمك"
                  style={{ borderColor: 'var(--identity-primary)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder="أدخل بريدك الإلكتروني"
                  style={{ borderColor: 'var(--identity-primary)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الرسالة</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  rows={4}
                  placeholder="أدخل رسالتك"
                  style={{ borderColor: 'var(--identity-primary)' }}
                />
              </div>
            </div>
          </IdentityFormLayout>
        );

      case 'dashboard':
        return (
          <IdentityDashboardLayout
            entityKey={selectedEntity}
            title="لوحة التحكم"
            actions={
              <>
                <IdentityButton entityKey={selectedEntity} variant="primary">
                  إضافة جديد
                </IdentityButton>
                <IdentityButton entityKey={selectedEntity} variant="outline">
                  تصدير
                </IdentityButton>
              </>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IdentityCard entityKey={selectedEntity}>
                <h3 className="text-xl font-bold mb-2">المعاملات</h3>
                <p className="text-3xl font-bold" style={{ color: 'var(--identity-primary)' }}>1,234</p>
                <p className="text-sm text-gray-600">معاملة نشطة</p>
              </IdentityCard>
              
              <IdentityCard entityKey={selectedEntity}>
                <h3 className="text-xl font-bold mb-2">الإيرادات</h3>
                <p className="text-3xl font-bold" style={{ color: 'var(--identity-primary)' }}>$56,789</p>
                <p className="text-sm text-gray-600">هذا الشهر</p>
              </IdentityCard>
              
              <IdentityCard entityKey={selectedEntity}>
                <h3 className="text-xl font-bold mb-2">العملاء</h3>
                <p className="text-3xl font-bold" style={{ color: 'var(--identity-primary)' }}>890</p>
                <p className="text-sm text-gray-600">عميل نشط</p>
              </IdentityCard>
            </div>

            <IdentityCard entityKey={selectedEntity}>
              <h3 className="text-xl font-bold mb-4">آخر المعاملات</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">معاملة #{i}</p>
                      <p className="text-sm text-gray-600">منذ {i} ساعات</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: 'var(--identity-primary)' }}>
                        ${(Math.random() * 1000).toFixed(2)}
                      </p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        مكتملة
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </IdentityCard>

            <div className="flex justify-center">
              <IdentityButton 
                entityKey={selectedEntity} 
                variant="outline"
                onClick={() => setDemoMode('basic')}
              >
                العودة للرئيسية
              </IdentityButton>
            </div>
          </IdentityDashboardLayout>
        );

      case 'payment':
        return (
          <IdentityPaymentLayout
            entityKey={selectedEntity}
            currentStep={2}
            totalSteps={4}
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">تفاصيل الدفع</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">رقم البطاقة</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="1234 5678 9012 3456"
                    style={{ borderColor: 'var(--identity-primary)' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                      placeholder="MM/YY"
                      style={{ borderColor: 'var(--identity-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                      placeholder="123"
                      style={{ borderColor: 'var(--identity-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">اسم حامل البطاقة</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="الاسم كما هو على البطاقة"
                    style={{ borderColor: 'var(--identity-primary)' }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>المبلغ الفرعي</span>
                  <span>$100.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>الرسوم</span>
                  <span>$5.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>الإجمالي</span>
                  <span style={{ color: 'var(--identity-primary)' }}>$105.00</span>
                </div>
              </div>

              <div className="flex gap-4">
                <IdentityButton 
                  entityKey={selectedEntity} 
                  variant="outline"
                  onClick={() => setDemoMode('basic')}
                  className="flex-1"
                >
                  السابق
                </IdentityButton>
                <IdentityButton 
                  entityKey={selectedEntity} 
                  variant="primary"
                  className="flex-1"
                >
                  التالي
                </IdentityButton>
              </div>
            </div>
          </IdentityPaymentLayout>
        );

      default:
        return (
          <IdentityPageLayout
            entityKey={selectedEntity}
            headerTitle="نظام الهوية الديناميكية"
            headerSubtitle="تجربة متعددة الكيانات مع تصاميم فريدة لكل جهة"
            showLogo={true}
            showAnimatedImages={true}
          >
            <div className="space-y-8">
              <IdentityCard entityKey={selectedEntity}>
                <h2 className="text-2xl font-bold mb-4">اختر الكيان</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {entities.map((entityKey) => {
                    const entity = getEntityIdentity(entityKey);
                    if (!entity) return null;

                    return (
                      <button
                        key={entityKey}
                        onClick={() => handleEntityChange(entityKey)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedEntity === entityKey
                            ? 'border-current shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{
                          borderColor: selectedEntity === entityKey ? entity.colors.primary : undefined,
                          backgroundColor: selectedEntity === entityKey ? entity.colors.background : undefined
                        }}
                      >
                        <div className="text-center">
                          <div
                            className="w-12 h-12 rounded-full mx-auto mb-2"
                            style={{ backgroundColor: entity.colors.primary }}
                          />
                          <p className="font-medium text-sm">
                            {entityKey.replace(/_/g, ' ').toUpperCase()}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </IdentityCard>

              <IdentityCard entityKey={selectedEntity}>
                <h2 className="text-2xl font-bold mb-4">أوضاع العرض التجريبية</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <IdentityButton
                    entityKey={selectedEntity}
                    variant={demoMode === 'basic' ? 'primary' : 'outline'}
                    onClick={() => setDemoMode('basic')}
                    className="w-full"
                  >
                    الوضع الأساسي
                  </IdentityButton>
                  <IdentityButton
                    entityKey={selectedEntity}
                    variant={demoMode === 'form' ? 'primary' : 'outline'}
                    onClick={() => setDemoMode('form')}
                    className="w-full"
                  >
                    نموذج
                  </IdentityButton>
                  <IdentityButton
                    entityKey={selectedEntity}
                    variant={demoMode === 'dashboard' ? 'primary' : 'outline'}
                    onClick={() => setDemoMode('dashboard')}
                    className="w-full"
                  >
                    لوحة تحكم
                  </IdentityButton>
                  <IdentityButton
                    entityKey={selectedEntity}
                    variant={demoMode === 'payment' ? 'primary' : 'outline'}
                    onClick={() => setDemoMode('payment')}
                    className="w-full"
                  >
                    دفع
                  </IdentityButton>
                </div>
              </IdentityCard>

              <IdentityCard entityKey={selectedEntity}>
                <h2 className="text-2xl font-bold mb-4">معلومات الكيان الحالي</h2>
                {selectedEntity && getEntityIdentity(selectedEntity) && (() => {
                  const entity = getEntityIdentity(selectedEntity)!;
                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold mb-2">الألوان</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded border"
                                style={{ backgroundColor: entity.colors.primary }}
                              />
                              <span className="text-sm">Primary: {entity.colors.primary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded border"
                                style={{ backgroundColor: entity.colors.secondary }}
                              />
                              <span className="text-sm">Secondary: {entity.colors.secondary}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded border"
                                style={{ backgroundColor: entity.colors.background }}
                              />
                              <span className="text-sm">Background: {entity.colors.background}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">الخطوط</h3>
                          <ul className="list-disc list-inside space-y-1">
                            {entity.fonts.map((font, index) => (
                              <li key={index} className="text-sm">{font}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">نمط الأزرار</h3>
                          <p className="text-sm">النمط: {entity.buttons.style}</p>
                          <p className="text-sm">التأثير عند التحويم: {entity.buttons.hover}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-2">الموارد</h3>
                          <p className="text-sm">صور العنوان: {entity.animated_header_images.length}</p>
                          <p className="text-sm">صور الخلفية: {entity.background_images.length}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </IdentityCard>
            </div>
          </IdentityPageLayout>
        );
    }
  };

  return renderDemo();
};

export default DynamicIdentityDemo;
