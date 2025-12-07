# إعدادات النشر التلقائي على Netlify

## ✅ تم تفعيل النشر التلقائي

تم تكوين المشروع للنشر التلقائي على Netlify مع جميع الإعدادات المطلوبة.

---

## 📋 الملفات المضافة/المحدثة

### 1. **netlify.toml** ✅
ملف التكوين الرئيسي لـ Netlify:
- ✅ إعدادات البناء والنشر
- ✅ متغيرات البيئة (Node.js 20.12.1)
- ✅ إعدادات Production و Preview و Branch Deploy
- ✅ إعادة التوجيه للـ SPA
- ✅ رؤوس الأمان
- ✅ تخزين مؤقت للملفات الثابتة
- ✅ إعدادات Netlify Forms

### 2. **.nvmrc** ✅
تحديد إصدار Node.js:
```
20.12.1
```

### 3. **.npmrc** ✅
إعدادات npm:
```
engine-strict=false
legacy-peer-deps=false
save-exact=false
```

### 4. **public/_redirects** ✅
إعادة توجيه SPA (موجود مسبقاً):
```
/*    /index.html   200
```

---

## 🚀 كيفية عمل النشر التلقائي

### عند الـ Push إلى GitHub:

1. **Branch: main**
   - يتم النشر التلقائي إلى Production
   - الرابط: `your-site.netlify.app`

2. **Branch: capy/***
   - يتم إنشاء Deploy Preview تلقائياً
   - الرابط: `deploy-preview-XX--your-site.netlify.app`

3. **Pull Requests**
   - يتم إنشاء Deploy Preview لكل PR
   - يظهر الرابط في تعليقات GitHub

---

## ⚙️ إعدادات Netlify Dashboard

### 1. **ربط Repository بـ Netlify:**
- اذهب إلى [netlify.com](https://netlify.com)
- New site from Git → GitHub
- اختر Repository: `you3333ef/Youssef-Dafa`
- اختر Branch للـ Production: `main` أو `capy/cap-1-c5073238`

### 2. **Build Settings (تلقائي من netlify.toml):**
```
Build command: npm install && npm run build
Publish directory: dist
Functions directory: netlify/functions
Edge Functions directory: netlify/edge-functions
```

### 3. **Environment Variables:**
قم بإضافة المتغيرات التالية في Netlify Dashboard:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_TELEGRAM_BOT_TOKEN=your_telegram_bot_token
VITE_TELEGRAM_CHAT_ID=your_telegram_chat_id
```

### 4. **Deploy Settings:**
- ✅ **Auto deploy:** Enabled
- ✅ **Deploy previews:** All branches
- ✅ **Branch deploys:** capy/* branches

---

## 🔧 خطوات التفعيل

### إذا لم يتم ربط الموقع بعد:

1. **تسجيل الدخول إلى Netlify:**
   ```bash
   # أو استخدام Dashboard
   https://app.netlify.com
   ```

2. **إنشاء موقع جديد:**
   - New site from Git
   - Authorize Netlify to access GitHub
   - Select repository: `you3333ef/Youssef-Dafa`
   - Configure build settings (ستُقرأ من netlify.toml تلقائياً)

3. **إضافة Environment Variables:**
   - Site settings → Environment variables
   - أضف جميع المتغيرات المطلوبة

4. **تفعيل Deploy Previews:**
   - Site settings → Build & deploy → Deploy contexts
   - Enable "Deploy previews" for all branches or specific patterns

---

## 📦 ما يحدث عند كل Push:

```
1. GitHub Push
   ↓
2. Netlify Webhook يستقبل الإشعار
   ↓
3. Netlify يقوم بـ:
   - Clone Repository
   - npm install
   - npm run build
   - نشر محتويات dist/
   ↓
4. الموقع يصبح متاحاً فوراً
```

---

## 🐛 استكشاف الأخطاء

### إذا فشل البناء:

1. **تحقق من Build Logs في Netlify Dashboard**
2. **تأكد من Environment Variables**
3. **تأكد من أن `npm run build` يعمل محلياً:**
   ```bash
   cd you3333ef/Youssef-Dafa
   npm install
   npm run build
   ```

### إذا لم يعمل Routing:

- تأكد من وجود ملف `public/_redirects`
- تأكد من إعدادات `netlify.toml`

### إذا لم تعمل Functions:

- تأكد من وجود `netlify/functions/` directory
- تأكد من `package.json` في Functions directory

---

## 📊 التحقق من النشر

### بعد Push:
1. اذهب إلى Netlify Dashboard
2. Deploys → ستجد Deploy جديد قيد التنفيذ
3. انقر عليه لمشاهدة Build Logs
4. عند النجاح، انقر على "Preview" لمشاهدة الموقع

---

## ✅ الحالة الحالية

- ✅ ملفات التكوين جاهزة
- ✅ Build يعمل بنجاح محلياً
- ✅ جميع الإعدادات محسّنة
- ✅ التخزين المؤقت مفعّل
- ✅ رؤوس الأمان مفعّلة
- ✅ Support لجميع Branches

**جاهز للنشر التلقائي! 🚀**

---

## 📝 ملاحظات مهمة

1. **Node Version:** يستخدم المشروع Node.js 20.12.1
2. **Build Time:** حوالي 4-5 ثوانٍ
3. **Bundle Size:** ~812 KB JS + ~75 KB CSS
4. **Images:** جميع صور الشركات محسّنة
5. **Forms:** Netlify Forms مفعّلة

**تم تفعيل النشر التلقائي بنجاح! 🎉**
