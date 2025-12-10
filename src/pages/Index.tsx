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
            <div className="inline-flex items-center gap-1.5 bg-card/50 backdrop-blur-sm border border-border rounded-full px-2 py-0.5 mb-2 animate-fade-in">
              <Sparkles className="w-2.5 h-2.5 text-primary" />
              <span className="text-[10px] text-muted-foreground">منصة موحدة لدول الخليج</span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              منصة الشحن الذكية
            </h1>
            
            <p className="text-sm md:text-base text-muted-foreground mb-1.5 animate-fade-in">
              حلول شحن متطورة وموثوقة
            </p>
            
            <p className="text-xs text-muted-foreground mb-4 max-w-lg mx-auto animate-fade-in">
              نقدم خدمات شحن سريعة وآمنة مع دعم جميع شركات الشحن الكبرى في المنطقة
            </p>
            
            <div className="flex justify-center animate-fade-in">
              <Link to="/services">
                <Button size="default" className="px-4">
                  <span className="ml-1.5">ابدأ الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Minimized */}
      <section className="py-6 relative">
        <div className="container mx-auto px-3">
          <div className="grid md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="text-center p-2">
              <div className="w-9 h-9 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-1.5">
                <Zap className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-bold mb-0.5">سريع وآمن</h3>
              <p className="text-[10px] text-muted-foreground">
                معاملات فورية مع أعلى معايير الأمان
              </p>
            </div>

            <div className="text-center p-2">
              <div className="w-9 h-9 bg-gradient-success rounded-lg flex items-center justify-center mx-auto mb-1.5">
                <Shield className="w-4.5 h-4.5 text-white" />
              </div>
              <h3 className="text-sm font-bold mb-0.5">موثوق ومعتمد</h3>
              <p className="text-[10px] text-muted-foreground">
                جميع الخدمات معتمدة ومطابقة للمعايير المحلية
              </p>
            </div>

            <div className="text-center p-2">
              <div className="w-9 h-9 bg-gradient-card rounded-lg flex items-center justify-center mx-auto mb-1.5 border border-border">
                <Sparkles className="w-4.5 h-4.5 text-primary" />
              </div>
              <h3 className="text-sm font-bold mb-0.5">سهل الاستخدام</h3>
              <p className="text-[10px] text-muted-foreground">
                واجهة بسيطة وسهلة تدعم جميع دول الخليج
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimized */}
      <section className="py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-3 relative">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-lg md:text-xl font-bold mb-2">
              جاهز للبدء؟
            </h2>
            <p className="text-xs text-muted-foreground mb-3">
              انضم إلى آلاف المستخدمين الذين يثقون بمنصتنا
            </p>
            <Link to="/services">
              <Button size="default" className="px-4">
                <span className="ml-1.5">استكشف الخدمات</span>
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
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
