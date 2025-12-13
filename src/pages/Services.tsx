import { useState, useMemo } from "react";
import { Home, Package, FileText, Heart, Truck, Building2, CreditCard, Landmark } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { Country, COUNTRIES } from "@/lib/countries";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";
import BackButton from "@/components/BackButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>();

  const baseServices = [
    {
      title: "Chalet Booking",
      titleAr: "حجز الشاليهات",
      description: "احجز شاليه أحلامك بأسعار مخصصة",
      icon: Home,
      href: selectedCountry ? `/create/${selectedCountry.code}/chalet` : "#",
      gradient: "var(--gradient-primary)",
    },
    {
      title: "Shipping Services",
      titleAr: "خدمات الشحن",
      description: "شحن سريع وآمن مع شركات محلية معتمدة",
      icon: Package,
      href: selectedCountry ? `/create/${selectedCountry.code}/shipping` : "#",
      gradient: "var(--gradient-success)",
    },
    {
      title: "Invoices",
      titleAr: "الفواتير",
      description: "إنشاء وإدارة الفواتير بسهولة",
      icon: FileText,
      href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(210 95% 50%), hsl(220 90% 60%))",
      sublinks: [
        {
          title: "إنشاء فاتورة جديدة",
          href: selectedCountry ? `/invoices/create/${selectedCountry.code}` : "#",
        },
        {
          title: "عرض جميع الفواتير",
          href: selectedCountry ? `/invoices/list/${selectedCountry.code}` : "#",
        },
      ],
    },
    {
      title: "Health Services",
      titleAr: "الخدمات الصحية",
      description: "خدمات طبية وصحية معتمدة",
      icon: Heart,
      href: selectedCountry ? `/health/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(0 85% 55%), hsl(10 80% 60%))",
    },
    {
      title: "Logistics",
      titleAr: "الخدمات اللوجستية",
      description: "حلول لوجستية متكاملة",
      icon: Truck,
      href: selectedCountry ? `/logistics/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(260 95% 55%), hsl(280 90% 60%))",
    },
    {
      title: "Contracts",
      titleAr: "العقود",
      description: "إدارة وتوثيق العقود الإلكترونية",
      icon: Building2,
      href: selectedCountry ? `/contracts/${selectedCountry.code}` : "#",
      gradient: "linear-gradient(135deg, hsl(40 95% 55%), hsl(30 90% 50%))",
    },
    {
      title: "Payment Links",
      titleAr: "خدمة السداد",
      description: "إنشاء روابط سداد متغيرة وسريعة",
      icon: CreditCard,
      href: selectedCountry ? `/create/${selectedCountry.code}/payment` : "#",
      gradient: "linear-gradient(135deg, hsl(260 85% 55%), hsl(200 90% 60%))",
    },
  ];

  const governmentServices: Record<string, any> = {
    SA: {
      title: "SADAD Payment",
      titleAr: "سداد",
      description: "نظام المدفوعات الوطني للخدمات الحكومية",
      icon: Landmark,
      href: `/sadad/${selectedCountry?.code || 'SA'}`,
      gradient: "linear-gradient(135deg, #F58220, #E67317)",
    },
    KW: {
      title: "KNET Payment",
      titleAr: "كي نت",
      description: "شبكة الكويت الوطنية للمدفوعات الإلكترونية",
      icon: Landmark,
      href: `/knet/${selectedCountry?.code || 'KW'}`,
      gradient: "linear-gradient(135deg, #007A3D, #CE1126)",
    },
    BH: {
      title: "BENEFIT Payment",
      titleAr: "بنفت",
      description: "الشبكة الإلكترونية للمعاملات المالية",
      icon: Landmark,
      href: `/benefit/${selectedCountry?.code || 'BH'}`,
      gradient: "linear-gradient(135deg, #CE1126, #D32027)",
    },
    OM: {
      title: "OmanNet Payment",
      titleAr: "أومان نت",
      description: "البطاقة الوطنية للدفع الإلكتروني",
      icon: Landmark,
      href: `/omannet/${selectedCountry?.code || 'OM'}`,
      gradient: "linear-gradient(135deg, #D0032C, #009A44)",
    },
    AE: {
      title: "Jaywan Payment",
      titleAr: "جيوان",
      description: "نظام البطاقة الوطنية الإماراتي للدفع الإلكتروني",
      icon: Landmark,
      href: `/jaywan/${selectedCountry?.code || 'AE'}`,
      gradient: "linear-gradient(135deg, #CE1126, #00732F)",
    },
    QA: {
      title: "Qatar Payment Gateway",
      titleAr: "بوابة الدفع الحكومي",
      description: "نظام الدفع الإلكتروني للخدمات الحكومية",
      icon: Landmark,
      href: `/qatar-payment/${selectedCountry?.code || 'QA'}`,
      gradient: "linear-gradient(135deg, #8D1B3D, #6B1529)",
    },
  };

  const services = useMemo(() => {
    if (selectedCountry && governmentServices[selectedCountry.code]) {
      return [governmentServices[selectedCountry.code], ...baseServices];
    }
    return baseServices;
  }, [selectedCountry]);

  const handleCountryChange = (countryCode: string) => {
    const country = COUNTRIES.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <>
      <SEOHead 
        title="خدمات الشحن في دول الخليج"
        description="اختر شركة الشحن المفضلة لديك من بين جميع شركات الشحن الكبرى في دول الخليج: أرامكس، دي إتش إل، فيديكس، يو بي إس، سمسا، زاجل، ناقل، والبريد الوطني"
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen py-6 bg-gradient-to-br from-background via-background to-muted/20" dir="rtl">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-4">
          <BackButton />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            اختر خدمتك
          </h1>
          <p className="text-base text-muted-foreground">
            ابدأ بتحديد الدولة، ثم اختر الخدمة المناسبة
          </p>
        </div>

        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <label className="block text-lg font-bold mb-3 text-center">
              اختر الدولة
            </label>
            <Select onValueChange={handleCountryChange}>
              <SelectTrigger className="w-full h-14 text-lg bg-card/80 backdrop-blur-sm border-2 hover:border-primary transition-all shadow-lg">
                <SelectValue placeholder="اختر دولة..." />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {COUNTRIES.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.code}
                    className="text-base py-3 cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div className="text-right">
                        <div className="font-bold text-base">{country.nameAr}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.name}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedCountry ? (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              الخدمات المتاحة في {selectedCountry.nameAr}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
              <Package className="w-10 h-10 text-primary-foreground" />
            </div>
            <p className="text-base text-muted-foreground">
              الرجاء اختيار دولة لعرض الخدمات المتاحة
            </p>
          </div>
        )}
      </div>
      <div className="h-20" />
    </div>
    <BottomNav />
    </>
  );
};

export default Services;
