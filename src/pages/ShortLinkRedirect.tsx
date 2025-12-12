import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import PageLoader from "@/components/PageLoader";

const ShortLinkRedirect = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const company = params.get('c') || params.get('company') || 'aramex';
    const currency = params.get('cur') || params.get('currency') || 'SAR';
    const amount = params.get('a') || params.get('amount') || '500';
    const title = params.get('t') || params.get('title') || 'Payment';

    const fullUrl = `/pay/${code}/recipient?company=${company}&currency=${currency}&amount=${amount}&title=${encodeURIComponent(title)}`;
    
    navigate(fullUrl, { replace: true });
  }, [code, navigate]);

  return <PageLoader message="جاري توجيهك للصفحة..." />;
};

export default ShortLinkRedirect;
