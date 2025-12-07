import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Country, getCountryByCode } from "@/lib/countries";
import { ArrowRight, FileText, Search, Eye, Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  total: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  createdAt: string;
}

const InvoiceList = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const selectedCountry = getCountryByCode(country || "");

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedInvoices = JSON.parse(sessionStorage.getItem("invoices") || "[]");
    setInvoices(storedInvoices);
  }, []);

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleDeleteInvoice = (invoiceId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الفاتورة؟")) {
      const updatedInvoices = invoices.filter((inv) => inv.id !== invoiceId);
      setInvoices(updatedInvoices);
      sessionStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      toast({
        title: "تم حذف الفاتورة",
        description: "تم حذف الفاتورة بنجاح",
      });
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">قائمة الفواتير</h1>
                <p className="text-sm text-muted-foreground">
                  {selectedCountry.nameAr}
                </p>
              </div>
            </div>
            <Button onClick={() => navigate(`/invoices/create/${country}`)}>
              <Plus className="w-4 h-4 ml-2" />
              فاتورة جديدة
            </Button>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4 mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute right-3 top-3 text-muted-foreground" />
            <Input
              placeholder="البحث برقم الفاتورة أو اسم العميل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
        </Card>

        {/* Invoices List */}
        {filteredInvoices.length > 0 ? (
          <div className="grid gap-4">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{invoice.invoiceNumber}</h3>
                      {getStatusBadge(invoice.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      العميل: {invoice.clientName}
                    </p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>تاريخ الإصدار: {invoice.issueDate}</span>
                      <span>تاريخ الاستحقاق: {invoice.dueDate}</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-primary">
                      {invoice.total.toFixed(2)} {invoice.currency}
                    </p>
                  </div>
                  <div className="flex gap-2 mr-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/invoices/${invoice.id}/view?country=${country}`)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/invoices/${invoice.id}/edit?country=${country}`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteInvoice(invoice.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-bold mb-2">لا توجد فواتير</h3>
            <p className="text-muted-foreground mb-4">
              لم يتم إنشاء أي فواتير بعد
            </p>
            <Button onClick={() => navigate(`/invoices/create/${country}`)}>
              <Plus className="w-4 h-4 ml-2" />
              إنشاء أول فاتورة
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;
