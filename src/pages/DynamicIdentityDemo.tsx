import React, { useState } from 'react';
import { EntityType } from '@/lib/dynamicIdentity';
import { DynamicIdentity, EntityHeader, EntityButton, EntityContainer } from '@/components/DynamicIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DynamicIdentityDemo = () => {
  const [selectedEntity, setSelectedEntity] = useState<EntityType>('chalets');

  const entities: { type: EntityType; nameEn: string; nameAr: string }[] = [
    { type: 'chalets', nameEn: 'Chalets', nameAr: 'الشاليهات' },
    { type: 'government_payment', nameEn: 'Government Payment', nameAr: 'الدفع الحكومي' },
    { type: 'local_payment', nameEn: 'Local Payment', nameAr: 'الدفع المحلي' },
    { type: 'invoices', nameEn: 'Invoices', nameAr: 'الفواتير' },
    { type: 'contracts', nameEn: 'Contracts', nameAr: 'العقود' },
    { type: 'health_links', nameEn: 'Health Services', nameAr: 'الخدمات الصحية' },
    { type: 'bank_pages', nameEn: 'Bank Pages', nameAr: 'الصفحات البنكية' },
  ];

  return (
    <DynamicIdentity entityType={selectedEntity}>
      <EntityContainer entityType={selectedEntity} useBackgroundImage={false}>
        <div className="container mx-auto px-4 py-8">
          <EntityHeader
            entityType={selectedEntity}
            title="نظام الهوية الديناميكية"
            subtitle="Dynamic Identity System"
            showLogo={true}
            animateImages={true}
            className="mb-8"
          />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>اختر نوع الكيان | Select Entity Type</CardTitle>
              <CardDescription>
                سيتم تطبيق الهوية المرئية الخاصة بكل كيان تلقائياً
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedEntity} onValueChange={(value) => setSelectedEntity(value as EntityType)}>
                <TabsList className="grid grid-cols-4 gap-2 md:grid-cols-7 mb-8">
                  {entities.map((entity) => (
                    <TabsTrigger key={entity.type} value={entity.type} className="text-xs md:text-sm">
                      {entity.nameAr}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {entities.map((entity) => (
                  <TabsContent key={entity.type} value={entity.type}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">{entity.nameEn} - {entity.nameAr}</h3>
                        <p className="text-gray-600 mb-6">
                          هذه هي الهوية المرئية الخاصة بـ {entity.nameAr}. يتم تطبيق الألوان والخطوط وأنماط الأزرار تلقائياً.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>الأزرار الأساسية</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <EntityButton entityType={entity.type} variant="primary" className="w-full">
                              زر أساسي | Primary Button
                            </EntityButton>
                            <EntityButton entityType={entity.type} variant="secondary" className="w-full">
                              زر ثانوي | Secondary Button
                            </EntityButton>
                            <EntityButton entityType={entity.type} variant="outline" className="w-full">
                              زر محدد | Outline Button
                            </EntityButton>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>معلومات الألوان</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <div className="text-sm font-medium mb-2">اللون الأساسي</div>
                              <div 
                                className="w-full h-12 rounded" 
                                style={{ backgroundColor: 'var(--entity-primary)' }}
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium mb-2">اللون الثانوي</div>
                              <div 
                                className="w-full h-12 rounded" 
                                style={{ backgroundColor: 'var(--entity-secondary)' }}
                              />
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>معلومات الخطوط</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <div className="text-sm font-medium mb-2">الخط الأساسي</div>
                              <div 
                                className="text-lg"
                                style={{ fontFamily: 'var(--entity-font-primary)' }}
                              >
                                Sample Text - نص تجريبي
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-medium mb-2">الخط الثانوي</div>
                              <div 
                                className="text-lg"
                                style={{ fontFamily: 'var(--entity-font-secondary)' }}
                              >
                                Sample Text - نص تجريبي
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>مثال على نموذج</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                              <label className="block text-sm font-medium mb-2">الاسم الكامل</label>
                              <input
                                type="text"
                                placeholder="أدخل الاسم الكامل"
                                className="w-full px-4 py-2 border rounded"
                                style={{
                                  borderColor: 'var(--entity-primary)',
                                  borderRadius: 'var(--entity-button-radius)',
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                              <input
                                type="email"
                                placeholder="أدخل البريد الإلكتروني"
                                className="w-full px-4 py-2 border rounded"
                                style={{
                                  borderColor: 'var(--entity-primary)',
                                  borderRadius: 'var(--entity-button-radius)',
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">رسالة</label>
                              <textarea
                                placeholder="أدخل رسالتك"
                                rows={4}
                                className="w-full px-4 py-2 border rounded"
                                style={{
                                  borderColor: 'var(--entity-primary)',
                                  borderRadius: 'var(--entity-button-radius)',
                                }}
                              />
                            </div>
                            <EntityButton entityType={entity.type} variant="primary" type="submit">
                              إرسال | Submit
                            </EntityButton>
                          </form>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>بطاقات تفاعلية</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((num) => (
                              <div
                                key={num}
                                className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                                style={{
                                  backgroundColor: 'white',
                                  borderLeft: `4px solid var(--entity-primary)`,
                                  borderRadius: 'var(--entity-button-radius)',
                                }}
                              >
                                <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--entity-primary)' }}>
                                  عنصر {num}
                                </h4>
                                <p className="text-gray-600">
                                  هذا نص تجريبي لعرض كيفية تطبيق الهوية المرئية على المكونات المختلفة.
                                </p>
                                <EntityButton 
                                  entityType={entity.type} 
                                  variant="outline" 
                                  className="mt-4 w-full"
                                >
                                  اقرأ المزيد
                                </EntityButton>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </EntityContainer>
    </DynamicIdentity>
  );
};

export default DynamicIdentityDemo;
