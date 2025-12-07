# إصلاح مشكلة النشر على Netlify

تاريخ: 7 ديسمبر 2025

## المشكلة
```
[ERROR] Deploy logs are currently unavailable
```

## الحلول المطبقة

### 1. تحديث netlify.toml
تم إضافة Edge Functions للمسارات الجديدة:
- ✅ `/payment/*` - خدمة السداد
- ✅ `/booking/*` - حجز الشاليهات
- ✅ `/gov/*` - الخدمات الحكومية
- ✅ `/health-service/*` - الخدمات الصحية
- ✅ `/logistics-service/*` - الخدمات اللوجستية

### 2. تحديث Edge Function (og-injector.ts)
تم تحديث الدالة لدعم جميع المسارات الجديدة مع اكتشاف تلقائي لنوع الخدمة.

### 3. التحقق من البناء
```bash
✓ built in 4.91s
```
البناء يعمل بشكل صحيح بدون أخطاء.

## خطوات النشر على Netlify

### الطريقة الأولى: النشر التلقائي (موصى بها)

1. **تأكد من رفع التغييرات:**
```bash
git status
git add .
git commit -m "إصلاح إعدادات Netlify والمسارات الجديدة"
git push origin capy/cap-1-21946017
```

2. **Netlify سيقوم بالنشر تلقائياً** عند push للبرانش.

3. **تحقق من حالة النشر:**
   - افتح Netlify Dashboard
   - اذهب إلى Deploy → Latest deploy
   - راقب سجل البناء

### الطريقة الثانية: النشر اليدوي

إذا لم يعمل النشر التلقائي:

```bash
# 1. تثبيت Netlify CLI
npm install -g netlify-cli

# 2. تسجيل الدخول
netlify login

# 3. ربط المشروع
netlify link

# 4. النشر
netlify deploy --prod
```

### الطريقة الثالثة: رفع dist مباشرة

```bash
# 1. بناء المشروع
npm run build

# 2. رفع مجلد dist
# اذهب إلى Netlify Dashboard → Deploys → Drag & Drop
# اسحب مجلد dist إلى المتصفح
```

## الملفات المحدثة

### ✅ netlify.toml
```toml
[[edge_functions]]
  path = "/payment/*"
  function = "og-injector"

[[edge_functions]]
  path = "/booking/*"
  function = "og-injector"

[[edge_functions]]
  path = "/gov/*"
  function = "og-injector"

[[edge_functions]]
  path = "/health-service/*"
  function = "og-injector"

[[edge_functions]]
  path = "/logistics-service/*"
  function = "og-injector"
```

### ✅ netlify/edge-functions/og-injector.ts
تم تحديث منطق اكتشاف المسارات:
```typescript
const shouldProcess = path.startsWith('/pay/') || 
                     path.startsWith('/r/') || 
                     path.startsWith('/payment/') || 
                     path.startsWith('/booking/') || 
                     path.startsWith('/gov/') || 
                     path.startsWith('/health-service/') || 
                     path.startsWith('/logistics-service/');
```

## التحقق بعد النشر

### 1. اختبار المسارات الجديدة
```bash
# Payment
https://your-site.netlify.app/payment/test-id

# Booking
https://your-site.netlify.app/booking/test-id

# Government
https://your-site.netlify.app/gov/test-id

# Health
https://your-site.netlify.app/health-service/test-id

# Logistics
https://your-site.netlify.app/logistics-service/test-id
```

### 2. اختبار OG Tags
استخدم أي من هذه الأدوات:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. اختبار SPA Routing
تأكد من أن جميع الروابط تعمل والتنقل سليم:
- الصفحة الرئيسية: `/`
- الخدمات: `/services`
- إنشاء رابط سداد: `/create/sa/payment`
- إنشاء رابط حجز: `/create/sa/chalet`

## استكشاف الأخطاء

### خطأ: "Deploy logs are currently unavailable"
**السبب:** مشكلة مؤقتة في Netlify
**الحل:** 
1. انتظر 5-10 دقائق
2. حاول النشر مرة أخرى
3. تحقق من Status Page: https://www.netlifystatus.com/

### خطأ: "Build failed"
**الحل:**
```bash
# 1. احذف node_modules و package-lock.json
rm -rf node_modules package-lock.json

# 2. أعد التثبيت
npm install

# 3. جرب البناء محلياً
npm run build

# 4. إذا نجح، ارفع التغييرات
git push
```

### خطأ: "Function failed to deploy"
**الحل:**
1. تحقق من أن Edge Functions مكتوبة بـ TypeScript صحيح
2. تأكد من أن netlify.toml يشير إلى المسار الصحيح
3. راجع سجلات النشر في Netlify Dashboard

### خطأ: 404 على المسارات الجديدة
**الحل:**
1. تأكد من وجود `_redirects` في dist
2. تحقق من إعدادات netlify.toml
3. مسح الكاش في Netlify: Settings → Build & deploy → Post processing → Clear cache

## متغيرات البيئة المطلوبة

تأكد من إضافة المتغيرات التالية في Netlify:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
```

**خطوات الإضافة:**
1. Netlify Dashboard → Site settings
2. Build & deploy → Environment
3. Add variable → أضف كل متغير

## الدعم

إذا استمرت المشكلة:
1. تحقق من Netlify Status: https://www.netlifystatus.com/
2. راجع Netlify Forums: https://answers.netlify.com/
3. تواصل مع Netlify Support من Dashboard

---

## ملخص التغييرات

✅ تم إصلاح netlify.toml
✅ تم تحديث Edge Functions
✅ تم التحقق من البناء
✅ تم التأكد من _redirects
✅ جاهز للنشر

**الحالة:** جاهز للنشر على Netlify ✨
