import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Country, getCountryByCode } from "@/lib/countries";
import { ArrowRight, FileText, Download, Edit, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  clientTaxNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  vatRate: number;
  notes: string;
  items: InvoiceItem[];
  subtotal: number;
  vatAmount: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue";
  createdAt: string;
}

const InvoiceView = () => {
  const { country, id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country || "");

  const [invoice, setInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    const invoices = JSON.parse(sessionStorage.getItem("invoices") || "[]");
    const foundInvoice = invoices.find((inv: Invoice) => inv.id === id);
    setInvoice(foundInvoice || null);
  }, [id]);

  const handleStatusChange = (newStatus: string) => {
    if (!invoice) return;

    const updatedInvoice = { ...invoice, status: newStatus };
    setInvoice(updatedInvoice);

    const invoices = JSON.parse(sessionStorage.getItem("invoices") || "[]");
    const updatedInvoices = invoices.map((inv: Invoice) =>
      inv.id === id ? updatedInvoice : inv
    );
    sessionStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    toast({
      title: "تم تحديث حالة الفاتورة",
      description: `تم تغيير حالة الفاتورة إلى ${newStatus}`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "success"> = {
      draft: "secondary",
      sent: "default",
      paid: "success",
      overdue: "destructive",
    };

    const labels: Record<string, string> = {
      draft: "مسودة",
      sent: "مرسلة",
      paid: "مدفوعة",
      overdue: "متأخرة",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast({
      title: "جاري التحميل",
      description: "سيتم تحميل الفاتورة قريباً",
    });
  };

  if (!selectedCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>دولة غير صحيحة</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>الفاتورة غير موجودة</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 print:hidden">
          <Button
            variant="ghost"
            onClick={() => navigate(`/invoices/list/${country}`)}
            className="mb-4"
          >
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للقائمة
          </Button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">فاتورة رقم {invoice.invoiceNumber}</h1>
                <p className="text-sm text-muted-foreground">
                  {selectedCountry.nameAr}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {invoice.status === "draft" && (
                <Button onClick={() => handleStatusChange("sent")}>
                  <Send className="w-4 h-4 ml-2" />
                  إرسال الفاتورة
                </Button>
              )}
              {invoice.status === "sent" && (
                <Button onClick={() => handleStatusChange("paid")}>
                  <CheckCircle className="w-4 h-4 ml-2" />
                  وضع علامة كمدفوعة
                </Button>
              )}
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 ml-2" />
                تحميل PDF
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                طباعة
              </Button>
              <Button onClick={() => navigate(`/invoices/${invoice.id}/edit?country=${country}`)}>
                <Edit className="w-4 h-4 ml-2" />
                تعديل
              </Button>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="bg-white print:shadow-none">
          {/* Invoice Header */}
          <div className="border-b-2 border-primary pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">فاتورة</h1>
                <p className="text-lg">رقم الفاتورة: {invoice.invoiceNumber}</p>
                <p>تاريخ الإصدار: {invoice.issueDate}</p>
                <p>تاريخ الاستحقاق: {invoice.dueDate}</p>
              </div>
              <div className="text-left">
                <div className="text-6xl mb-2">{selectedCountry.flag}</div>
                <h2 className="font-bold">{selectedCountry.nameAr}</h2>
                <p className="text-sm text-muted-foreground">{selectedCountry.name}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6 print:hidden">
            <div className="flex items-center gap-2">
              <span>الحالة:</span>
              {getStatusBadge(invoice.status)}
            </div>
          </div>

          {/* Client Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="font-bold mb-3">فاتورة إلى:</h3>
              <p className="font-semibold">{invoice.clientName}</p>
              <p>{invoice.clientEmail}</p>
              <p>{invoice.clientPhone}</p>
              <p>{invoice.clientAddress}</p>
              {invoice.clientTaxNumber && (
                <p>الرقم الضريبي: {invoice.clientTaxNumber}</p>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-3">تفاصيل الفاتورة:</h3>
              <p>العملة: {invoice.currency}</p>
              <p>معدل الضريبة: {invoice.vatRate}%</p>
            </Card>
          </div>

          {/* Items Table */}
          <Card className="p-6 mb-6">
            <h3 className="font-bold mb-4">عناصر الفاتورة</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-right p-3">الوصف</th>
                    <th className="text-right p-3">الكمية</th>
                    <th className="text-right p-3">السعر</th>
                    <th className="text-right p-3">الإجمالي</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{item.description}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">
                        {item.unitPrice.toFixed(2)} {invoice.currency}
                      </td>
                      <td className="p-3">
                        {item.total.toFixed(2)} {invoice.currency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <Card className="p-6 w-full md:w-1/2">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span>
                    {invoice.subtotal.toFixed(2)} {invoice.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة ({invoice.vatRate}%):</span>
                  <span>
                    {invoice.vatAmount.toFixed(2)} {invoice.currency}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold text-primary">
                  <span>الإجمالي:</span>
                  <span>
                    {invoice.total.toFixed(2)} {invoice.currency}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <Card className="p-6 mb-6">
              <h3 className="font-bold mb-3">ملاحظات</h3>
              <p>{invoice.notes}</p>
            </Card>
          )}

          {/* Footer */}
          <div className="border-t-2 border-primary pt-6 text-center text-muted-foreground">
            <p>شكراً لتعاملكم معنا</p>
            <p className="text-sm">
              تم إنشاء هذه الفاتورة باستخدام نظام الفواتير الإلكتروني
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;
