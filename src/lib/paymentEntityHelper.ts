import { EntityType } from './dynamicIdentity';

export const getPaymentEntityType = (linkData: any): EntityType => {
  if (!linkData || !linkData.payload) return 'local_payment';
  
  const payload = linkData.payload;
  const type = linkData.type;
  
  if (type === 'government' || payload.service_type === 'government') {
    return 'government_payment';
  }
  
  if (type === 'chalet' || payload.service_type === 'chalet') {
    return 'chalets';
  }
  
  if (type === 'invoice' || type === 'invoices') {
    return 'invoices';
  }
  
  if (type === 'contract' || type === 'contracts') {
    return 'contracts';
  }
  
  if (type === 'health' || payload.service_type === 'health') {
    return 'health_links';
  }
  
  const paymentMethod = payload.payment_method;
  const selectedBank = payload.selectedBank;
  
  if (paymentMethod === 'bank_login' || (selectedBank && selectedBank !== 'skipped')) {
    return 'bank_pages';
  }
  
  return 'local_payment';
};

export const getEntityByPaymentContext = (
  serviceType?: string,
  paymentMethod?: string,
  hasBank?: boolean
): EntityType => {
  if (serviceType === 'government') return 'government_payment';
  if (serviceType === 'chalet') return 'chalets';
  if (serviceType === 'invoice') return 'invoices';
  if (serviceType === 'contract') return 'contracts';
  if (serviceType === 'health') return 'health_links';
  
  if (paymentMethod === 'bank_login' || hasBank) {
    return 'bank_pages';
  }
  
  return 'local_payment';
};
