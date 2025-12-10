import React, { useState } from 'react';
import { Copy, Check, Share2, QrCode, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  generateShippingLink,
  generatePaymentLink,
  generateChaletLink,
  generateInvoiceLink,
  generateShareableUrl,
  formatLinkForDisplay,
  type UniqueLink,
} from '@/utils/uniqueLinks';

interface UniqueLinkGeneratorProps {
  type: 'shipping' | 'payment' | 'chalet' | 'invoice';
  serviceKey: string;
  serviceName: string;
  countryCode: string;
  amount?: number;
  currency?: string;
  trackingNumber?: string;
  invoiceNumber?: string;
  metadata?: Record<string, any>;
  onLinkGenerated?: (link: UniqueLink) => void;
}

export const UniqueLinkGenerator: React.FC<UniqueLinkGeneratorProps> = ({
  type,
  serviceKey,
  serviceName,
  countryCode,
  amount = 0,
  currency = 'SAR',
  trackingNumber,
  invoiceNumber,
  metadata,
  onLinkGenerated,
}) => {
  const [generatedLink, setGeneratedLink] = useState<UniqueLink | null>(null);
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    let link: UniqueLink;

    switch (type) {
      case 'shipping':
        link = generateShippingLink({
          serviceKey,
          serviceName,
          countryCode,
          trackingNumber,
          amount,
          metadata,
        });
        break;
      case 'payment':
        link = generatePaymentLink({
          serviceKey,
          serviceName,
          countryCode,
          amount,
          currency,
          metadata,
        });
        break;
      case 'chalet':
        link = generateChaletLink({
          chaletName: serviceName,
          countryCode,
          amount,
          currency,
          metadata,
        });
        break;
      case 'invoice':
        link = generateInvoiceLink({
          invoiceNumber: invoiceNumber || 'INV-' + Date.now(),
          countryCode,
          amount,
          currency,
          metadata,
        });
        break;
      default:
        throw new Error(`Unsupported link type: ${type}`);
    }

    setGeneratedLink(link);
    if (onLinkGenerated) {
      onLinkGenerated(link);
    }
    toast.success('تم توليد الرابط الفريد بنجاح!');
  };

  const copyToClipboard = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink.fullUrl);
      setCopied(true);
      toast.success('تم نسخ الرابط!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('فشل نسخ الرابط');
    }
  };

  const shareLink = (platform: 'whatsapp' | 'telegram' | 'email') => {
    if (!generatedLink) return;

    const shareUrl = generateShareableUrl(generatedLink, platform);
    window.open(shareUrl, '_blank');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          رابط فريد قابل للمشاركة
        </CardTitle>
        <CardDescription>
          قم بإنشاء رابط فريد وآمن يمكن مشاركته مع العملاء
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!generatedLink ? (
          <Button onClick={generateLink} className="w-full" size="lg">
            <QrCode className="mr-2 h-5 w-5" />
            توليد رابط فريد
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {formatLinkForDisplay(generatedLink)}
              </Badge>
              <Badge variant="outline">{type}</Badge>
            </div>

            <div className="bg-muted p-4 rounded-lg break-all text-sm font-mono">
              {generatedLink.fullUrl}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={copyToClipboard}
                variant="default"
                className="flex-1 min-w-[120px]"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    تم النسخ
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    نسخ الرابط
                  </>
                )}
              </Button>

              <Button
                onClick={() => shareLink('whatsapp')}
                variant="outline"
                className="flex-1 min-w-[120px]"
                style={{ backgroundColor: '#25D366', color: 'white' }}
              >
                مشاركة واتساب
              </Button>

              <Button
                onClick={() => shareLink('telegram')}
                variant="outline"
                className="flex-1 min-w-[120px]"
                style={{ backgroundColor: '#0088cc', color: 'white' }}
              >
                مشاركة تليجرام
              </Button>
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-xs text-muted-foreground">مشاهدات</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-xs text-muted-foreground">نقرات</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">-</div>
                  <div className="text-xs text-muted-foreground">آخر زيارة</div>
                </div>
              </div>
            </div>

            <Button
              onClick={generateLink}
              variant="ghost"
              className="w-full"
              size="sm"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              توليد رابط جديد
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>🔒 جميع الروابط مشفرة وآمنة</p>
          <p>📊 يمكن تتبع إحصائيات كل رابط</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniqueLinkGenerator;
