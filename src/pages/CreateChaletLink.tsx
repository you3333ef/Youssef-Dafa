import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountryByCode, formatCurrency } from "@/lib/countries";
import { getBanksByCountry } from "@/lib/banks";
import { useCreateLink } from "@/hooks/useSupabase";
import { getChaletsByCountry, ChaletService } from "@/lib/gccChaletServices";
import { getCurrency, getDefaultTitle } from "@/utils/countryData";
import { getServiceBranding } from "@/lib/serviceLogos";
import { ArrowRight, Home, Copy, Check, Building2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateChaletLink = () => {
  const { country } = useParams<{ country: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const countryData = getCountryByCode(country?.toUpperCase() || "");
  
  const chalets = useMemo(() => getChaletsByCountry(country?.toUpperCase() || ""), [country]);
  const createLink = useCreateLink();
  
  const [selectedChaletKey, setSelectedChaletKey] = useState<string>("");
  const [pricePerNight, setPricePerNight] = useState<number>(0);
  const [nights, setNights] = useState<number>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const selectedChalet = chalets?.find((c) => c.key === selectedChaletKey);
  const totalAmount = pricePerNight * nights;
  
  const banks = useMemo(() => getBanksByCountry(country?.toUpperCase() || ""), [country]);

  const serviceBranding = useMemo(() => 
    selectedChaletKey ? getServiceBranding(selectedChaletKey) : getServiceBranding('sa-abha-mountain'),
    [selectedChaletKey]
  );

  const chaletTheme = {
    primary: serviceBranding.colors.primary,
    secondary: serviceBranding.colors.secondary,
    gradient: serviceBranding.gradients?.primary || `linear-gradient(135deg, ${serviceBranding.colors.primary}, ${serviceBranding.colors.secondary})`,
    bgLight: "#f0fdf4"
  };
  
  useEffect(() => {
    if (selectedChalet) {
      setPricePerNight(selectedChalet.defaultPrice);
    }
  }, [selectedChalet]);
  
  const handleCreate = async () => {
    if (!selectedChalet || !countryData) return;

    const payload = {
      chalet_key: selectedChalet.key,
      chalet_name: selectedChalet.name,
      chalet_name_en: selectedChalet.nameEn,
      city: selectedChalet.city,
      price_per_night: pricePerNight,
      nights,
      guest_count: guestCount,
      total_amount: totalAmount,
      currency: countryData.currency,
      selected_bank: selectedBank || null,
      payment_method: selectedBank ? "bank_login" : "card",
    };

    try {
      const link = await createLink.mutateAsync({
        type: "chalet",
        country_code: country!,
        payload,
      });

      const micrositeUrl = `${window.location.origin}/r/${country}/${link.type}/${link.id}?service=${selectedChalet.key}`;

      setCreatedLink(micrositeUrl);
    } catch (error) {
      console.error("Error creating link:", error);
    }
  };
  
  const handleCopy = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "تم النسخ!",
        description: "تم نسخ الرابط إلى الحافظة",
      });
    }
  };
  
  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl" style={{ background: chaletTheme.bgLight }}>
        <div className="text-center p-8">
          <Home className="w-16 h-16 mx-auto mb-4" style={{ color: chaletTheme.primary }} />
          <h2 className="text-2xl font-bold mb-2">الدولة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">الرجاء اختيار دولة صحيحة</p>
          <Button onClick={() => navigate('/services')} style={{ background: chaletTheme.gradient, color: 'white' }}>
            العودة للخدمات
          </Button>
        </div>
      </div>
    );
  }
  
  if (createdLink) {
    return (
      <div className="min-h-screen py-6" dir="rtl" style={{ background: `linear-gradient(to bottom, ${chaletTheme.bgLight}, white)` }}>
        <div className="container mx-auto px-4">
          <Card className="max-w-xl mx-auto p-4 text-center border-2" style={{ borderColor: `${chaletTheme.primary}30` }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: chaletTheme.gradient }}>
              <Check className="w-7 h-7 text-white" />
            </div>
            
            <h2 className="text-xl font-bold mb-2">تم إنشاء الرابط بنجاح!</h2>
            <p className="text-sm text-muted-foreground mb-4">
              شارك هذا الرابط مع عملائك
            </p>

            <div className="p-4 rounded-lg mb-4 space-y-2 text-right border-2" style={{ background: chaletTheme.bgLight, borderColor: `${chaletTheme.primary}20` }}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{selectedChalet?.name}</span>
                <span className="text-muted-foreground">الشاليه:</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{nights} ليلة</span>
                <span className="text-muted-foreground">المدة:</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{guestCount} ضيف</span>
                <span className="text-muted-foreground">الضيوف:</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {formatCurrency(pricePerNight, countryData.currency)}
                </span>
                <span className="text-muted-foreground">سعر الليلة:</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t" style={{ borderColor: `${chaletTheme.primary}20` }}>
                <span className="font-bold text-lg" style={{ color: chaletTheme.primary }}>
                  {formatCurrency(totalAmount, countryData.currency)}
                </span>
                <span className="text-muted-foreground">الإجمالي:</span>
              </div>
            </div>

            <div className="bg-secondary/50 p-3 rounded-lg mb-4 break-all">
              <code className="text-xs">{createdLink}</code>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={handleCopy} style={{ background: chaletTheme.gradient, color: 'white' }}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 ml-2" />
                    <span className="text-sm">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 ml-2" />
                    <span className="text-sm">نسخ الرابط</span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={() => window.open(createdLink, "_blank")}
                style={{ borderColor: chaletTheme.primary, color: chaletTheme.primary }}
              >
                <span className="ml-2 text-sm">عرض المعاينة</span>
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              className="mt-4 text-sm"
              onClick={() => navigate("/services")}
            >
              إنشاء رابط جديد
            </Button>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-4" dir="rtl" style={{ background: `linear-gradient(to bottom, ${chaletTheme.bgLight}, white)` }}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-4 shadow-xl border-2" style={{ borderColor: `${chaletTheme.primary}20` }}>
            <div
              className="h-20 -m-4 mb-4 rounded-t-xl relative overflow-hidden"
              style={{ background: chaletTheme.gradient }}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Home className="w-6 h-6" />
                    <h1 className="text-xl font-bold">حجز الشاليهات</h1>
                  </div>
                  <p className="text-sm opacity-90">إنشاء رابط حجز - {countryData.nameAr}</p>
                </div>
                <div className="text-4xl">🏖️</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm mb-2 font-semibold" style={{ color: chaletTheme.primary }}>
                  اختر الشاليه *
                </Label>
                <Select onValueChange={setSelectedChaletKey}>
                  <SelectTrigger className="w-full h-11 border-2" style={{ borderColor: `${chaletTheme.primary}30` }}>
                    <SelectValue placeholder="اختر شاليه..." />
                  </SelectTrigger>
                  <SelectContent>
                    {chalets?.map((chalet) => (
                      <SelectItem key={chalet.key} value={chalet.key}>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4" style={{ color: chaletTheme.primary }} />
                          <span className="text-sm">{chalet.name}</span>
                          {chalet.verified && (
                            <span className="text-xs px-2 py-0.5 rounded" style={{ background: `${chaletTheme.primary}20`, color: chaletTheme.primary }}>
                              ✅ موثّق
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedChalet && (
                <>
                  <div className="p-3 rounded-lg border-2" style={{ background: chaletTheme.bgLight, borderColor: `${chaletTheme.primary}20` }}>
                    <p className="text-xs text-muted-foreground mb-1">
                      <strong>🏛️ المدينة:</strong> {selectedChalet.city}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      <strong>📖 الوصف:</strong> {selectedChalet.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>👥 السعة:</strong> حتى {selectedChalet.capacity} ضيف
                    </p>
                    {selectedChalet.amenities && selectedChalet.amenities.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">⭐ المرافق:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedChalet.amenities.slice(0, 6).map((amenity, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 rounded" style={{ background: `${chaletTheme.primary}15`, color: chaletTheme.primary }}>
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 font-semibold" style={{ color: chaletTheme.primary }}>
                      💵 سعر الليلة ({countryData.currency})
                    </Label>
                    <Input
                      type="number"
                      value={pricePerNight}
                      onChange={(e) => setPricePerNight(Number(e.target.value))}
                      className="h-10 text-sm border-2 font-semibold"
                      style={{ borderColor: `${chaletTheme.primary}20` }}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 font-semibold" style={{ color: chaletTheme.primary }}>
                      🌙 عدد الليالي
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={nights}
                      onChange={(e) => setNights(Number(e.target.value))}
                      className="h-10 text-sm border-2 font-semibold"
                      style={{ borderColor: `${chaletTheme.primary}20` }}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 font-semibold" style={{ color: chaletTheme.primary }}>
                      👥 عدد الضيوف
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max={selectedChalet.capacity}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="h-10 text-sm border-2 font-semibold"
                      style={{ borderColor: `${chaletTheme.primary}20` }}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm mb-2 flex items-center gap-2">
                      <Building2 className="w-3 h-3" style={{ color: chaletTheme.primary }} />
                      البنك (اختياري)
                    </Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger className="h-10 border-2" style={{ borderColor: `${chaletTheme.primary}30` }}>
                        <SelectValue placeholder="اختر بنك (يمكن التخطي)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skip">بدون تحديد بنك</SelectItem>
                        {banks.map((bank) => (
                          <SelectItem key={bank.id} value={bank.id}>
                            {bank.nameAr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      💡 يمكن للعميل اختيار أو تغيير البنك أثناء الدفع
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl text-white" style={{ background: chaletTheme.gradient }}>
                    <p className="text-xs mb-1 opacity-90">💰 المبلغ الإجمالي</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalAmount, countryData.currency)}
                    </p>
                    <p className="text-xs mt-1 opacity-80">
                      {pricePerNight} × {nights} ليلة
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleCreate}
                    disabled={createLink.isPending}
                    className="w-full py-6 text-base font-bold shadow-lg text-white"
                    style={{ background: chaletTheme.gradient }}
                  >
                    {createLink.isPending ? (
                      <span>جاري الإنشاء...</span>
                    ) : (
                      <>
                        <Home className="w-5 h-5 ml-2" />
                        <span>إنشاء رابط الحجز</span>
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateChaletLink;
