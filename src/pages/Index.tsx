import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Shield, Zap } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead 
        title="نظام الدفع الآمن - روابط دفع ذكية للشاليهات والشحن"
        description="أنشئ روابط دفع آمنة ومحمية للشاليهات وخدمات الشحن في دول الخليج. دعم جميع شركات الشحن الكبرى مثل أرامكس، دي إتش إل، فيديكس، سمسا والمزيد"
        image="/og-aramex.jpg"
        type="website"
      />
      <div className="min-h-screen" dir="rtl">
      {/* Hero Section - Minimized */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5" />
        
        <div className="container mx-auto px-3 py-6 md:py-8 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 bg-card/50 backdrop-blur-sm border border-border rounded-full px-1.5 sm:px-2 py-0.5 mb-1.5 sm:mb-2 animate-fade-in">
              <Sparkles className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-primary" />
              <span className="text-[9px] sm:text-[10px] text-muted-foreground">منصة موحدة لدول الخليج</span>
            </div>
            
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              منصة الشحن الذكية
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-1 sm:mb-1.5 animate-fade-in">
              حلول شحن متطورة وموثوقة
            </p>
            
            <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-3 sm:mb-4 max-w-xs sm:max-w-md md:max-w-lg mx-auto animate-fade-in">
              نقدم خدمات شحن سريعة وآمنة مع دعم جميع شركات الشحن الكبرى في المنطقة
            </p>
            
            <div className="flex justify-center animate-fade-in">
              <Link to="/services">
                <Button size="default" className="px-3 sm:px-4 h-8 sm:h-9">
                  <span className="ml-1 sm:ml-1.5 text-xs sm:text-sm">ابدأ الآن</span>
                  <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Minimized */}
      <section className="py-4 sm:py-5 md:py-6 relative">
        <div className="container mx-auto px-2 sm:px-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto">
            <div className="text-center p-1.5 sm:p-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-primary rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-1.5">
                <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary-foreground" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold mb-0.5">سريع وآمن</h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                معاملات فورية مع أعلى معايير الأمان
              </p>
            </div>

            <div className="text-center p-1.5 sm:p-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-success rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-1.5">
                <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold mb-0.5">موثوق ومعتمد</h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                جميع الخدمات معتمدة ومطابقة للمعايير المحلية
              </p>
            </div>

            <div className="text-center p-1.5 sm:p-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-card rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-1.5 border border-border">
                <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold mb-0.5">سهل الاستخدام</h3>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">
                واجهة بسيطة وسهلة تدعم جميع دول الخليج
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimized */}
      <section className="py-4 sm:py-5 md:py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-2 sm:px-3 relative">
          <div className="max-w-xs sm:max-w-md md:max-w-xl mx-auto text-center">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2">
              جاهز للبدء؟
            </h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">
              انضم إلى آلاف المستخدمين الذين يثقون بمنصتنا
            </p>
            <Link to="/services">
              <Button size="default" className="px-3 sm:px-4 h-8 sm:h-9">
                <span className="ml-1 sm:ml-1.5 text-xs sm:text-sm">استكشف الخدمات</span>
                <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Index;
