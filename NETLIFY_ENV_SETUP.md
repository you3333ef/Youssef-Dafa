# إعداد متغيرات البيئة في Netlify

## المشكلة 🔴
الشاشة السوداء في deployment تحدث بسبب عدم وجود متغيرات البيئة لـ Supabase.

## الحل ✅

### الخطوة 1: الذهاب إلى إعدادات Netlify
1. افتح موقعك في Netlify Dashboard
2. اذهب إلى **Site settings**
3. من القائمة الجانبية، اختر **Build & deploy**
4. ثم اختر **Environment**
5. انقر على **Environment variables**

### الخطوة 2: إضافة المتغيرات التالية

انقر **Add a variable** وأضف كل متغير:

#### المتغير 1: VITE_SUPABASE_PROJECT_ID
```
Key: VITE_SUPABASE_PROJECT_ID
Value: ktgieynieeqnjdhmpjht
```

#### المتغير 2: VITE_SUPABASE_URL
```
Key: VITE_SUPABASE_URL
Value: https://ktgieynieeqnjdhmpjht.supabase.co
```

#### المتغير 3: VITE_SUPABASE_PUBLISHABLE_KEY
```
Key: VITE_SUPABASE_PUBLISHABLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Z2lleW5pZWVxbmpkaG1wamh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NzUyOTQsImV4cCI6MjA0NDQ1MTI5NH0.IaQ1swTU5LpE-OsqoOk6FZU-Ims_uIwV5fy-yJnY-Tw
```

### الخطوة 3: إعادة النشر
بعد إضافة المتغيرات:
1. احفظ التغييرات
2. اذهب إلى **Deploys**
3. انقر على **Trigger deploy** > **Clear cache and deploy site**

---

## طريقة سريعة: استخدام Netlify CLI ⚡

إذا كان لديك Netlify CLI مثبت:

```bash
# Login to Netlify
netlify login

# Link to your site
netlify link

# Set environment variables
netlify env:set VITE_SUPABASE_PROJECT_ID "ktgieynieeqnjdhmpjht"
netlify env:set VITE_SUPABASE_URL "https://ktgieynieeqnjdhmpjht.supabase.co"
netlify env:set VITE_SUPABASE_PUBLISHABLE_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Z2lleW5pZWVxbmpkaG1wamh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NzUyOTQsImV4cCI6MjA0NDQ1MTI5NH0.IaQ1swTU5LpE-OsqoOk6FZU-Ims_uIwV5fy-yJnY-Tw"

# Trigger rebuild
netlify deploy --prod
```

---

## ملاحظات مهمة 📝

### هل هذه المفاتيح آمنة؟
✅ **نعم** - هذه مفاتيح عامة (publishable keys) وآمنة للمشاركة:
- `VITE_SUPABASE_PUBLISHABLE_KEY` هو مفتاح عام
- يمكن رؤيته في كود JavaScript للمتصفح
- لا يمنح صلاحيات admin
- آمن للاستخدام في الـ frontend

❌ **لا تشارك** المفاتيح الخاصة مثل:
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_SECRET_KEY`

### لماذا يبدأ بـ VITE_?
Vite يطلب أن تبدأ متغيرات البيئة العامة بـ `VITE_` لتكون متاحة في المتصفح.

### التحقق من نجاح الإعداد
بعد إعادة النشر، افتح Developer Console في المتصفح:
```javascript
// في console، اكتب:
console.log(import.meta.env.VITE_SUPABASE_URL)
// يجب أن يظهر: https://ktgieynieeqnjdhmpjht.supabase.co
```

إذا ظهرت القيمة، المتغيرات تعمل بشكل صحيح! ✅

---

## استكشاف الأخطاء 🔍

### المشكلة: لا تزال الشاشة سوداء
**الحلول:**
1. تأكد من كتابة أسماء المتغيرات بشكل صحيح (حساسة لحالة الأحرف)
2. تأكد من عدم وجود مسافات قبل أو بعد القيم
3. احذف cache وأعد النشر: **Clear cache and deploy site**
4. افتح Network tab في Developer Tools وابحث عن أخطاء 401/403

### المشكلة: خطأ CORS
إذا ظهر خطأ CORS:
1. اذهب إلى Supabase Dashboard
2. Settings > API
3. تحقق من **Site URL** و **Additional Redirect URLs**
4. أضف نطاق Netlify الخاص بك

### المشكلة: Cannot read property of undefined
تأكد من:
1. جميع المتغيرات الثلاثة موجودة
2. لا توجد أخطاء إملائية في أسماء المتغيرات
3. القيم صحيحة ومطابقة لـ Supabase project

---

## بعد الإعداد ✅

بمجرد إضافة المتغيرات، سيعمل الموقع بشكل كامل:
- ✅ صفحات الدفع ستظهر
- ✅ البيانات ستُحفظ في Supabase
- ✅ React Router سيعمل بشكل صحيح
- ✅ جميع الوظائف ستكون متاحة

---

**آخر تحديث:** ديسمبر 2025
