// Utility functions to extract payment data from different service types

export interface PaymentData {
  amount: number;
  currency: string;
  serviceName: string;
  serviceType: string;
  reference: string;
  description: string;
  customerName?: string;
  details: Record<string, any>;
}

/**
 * Extract payment amount from link payload based on service type
 */
export const getPaymentAmount = (payload: any): number => {
  if (!payload) return 500; // Default fallback

  // Try different amount fields based on service type
  const amountFields = [
    payload.total_amount,      // Chalet
    payload.fee_amount,         // Health, Government, Logistics
    payload.cod_amount,         // Shipping
    payload.payment_amount,     // General payment
    payload.amount,             // Generic
  ];

  for (const field of amountFields) {
    if (field !== undefined && field !== null) {
      const parsed = typeof field === 'number' ? field : parseFloat(field);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
  }

  return 500; // Final fallback
};

/**
 * Get service display name
 */
export const getServiceDisplayName = (payload: any, fallback: string = 'خدمة'): string => {
  return payload?.service_name || 
         payload?.chalet_name || 
         payload?.name || 
         fallback;
};

/**
 * Get reference number for the service
 */
export const getServiceReference = (payload: any): string => {
  return payload?.tracking_number ||       // Shipping
         payload?.appointment_number ||    // Health
         payload?.reference_number ||      // Government
         payload?.shipment_number ||       // Logistics
         payload?.booking_number ||        // Chalet
         payload?.invoice_number ||        // Invoice
         payload?.reference ||             // Generic
         'N/A';
};

/**
 * Get service type from link data
 */
export const getServiceType = (linkData: any): string => {
  return linkData?.type || 'general';
};

/**
 * Get detailed service information for display
 */
export const getServiceDetails = (payload: any, type: string): Record<string, string> => {
  const details: Record<string, string> = {};

  switch (type) {
    case 'shipping':
      details['رقم الشحنة'] = payload?.tracking_number || '';
      details['وصف الطرد'] = payload?.package_description || '';
      details['من يدفع'] = payload?.payer_type === 'recipient' ? 'المستلم' : 'المرسل';
      break;

    case 'chalet':
      details['اسم الشاليه'] = payload?.chalet_name || '';
      details['المدينة'] = payload?.city || '';
      details['عدد الليالي'] = payload?.nights ? `${payload.nights} ليلة` : '';
      details['عدد الضيوف'] = payload?.guest_count ? `${payload.guest_count} ضيف` : '';
      details['سعر الليلة'] = payload?.price_per_night || '';
      break;

    case 'health':
      details['رقم الموعد'] = payload?.appointment_number || '';
      details['اسم المريض'] = payload?.patient_name || '';
      details['الطبيب'] = payload?.doctor_name || '';
      details['تاريخ الموعد'] = payload?.appointment_date || '';
      details['نوع الخدمة'] = payload?.service_name || '';
      break;

    case 'government':
      details['رقم المعاملة'] = payload?.reference_number || '';
      details['اسم مقدم الطلب'] = payload?.applicant_name || '';
      details['رقم الهوية'] = payload?.applicant_id || '';
      details['نوع الخدمة'] = payload?.service_name || '';
      break;

    case 'logistics':
      details['رقم الشحنة'] = payload?.shipment_number || '';
      details['اسم العميل'] = payload?.client_name || '';
      details['وصف البضاعة'] = payload?.cargo_description || '';
      details['من'] = payload?.origin || '';
      details['إلى'] = payload?.destination || '';
      details['نوع الخدمة'] = payload?.service_name || '';
      break;

    case 'payment':
    default:
      details['رقم الفاتورة'] = payload?.invoice_number || '';
      details['الخدمة'] = payload?.selected_service_name || payload?.service_name || '';
      break;
  }

  // Remove empty values
  return Object.fromEntries(
    Object.entries(details).filter(([_, value]) => value && value.trim() !== '')
  );
};

/**
 * Get full payment data object
 */
export const getPaymentData = (linkData: any): PaymentData => {
  const payload = linkData?.payload || {};
  const type = getServiceType(linkData);
  const country = payload?.selectedCountry || payload?.country_code || 'SA';

  return {
    amount: getPaymentAmount(payload),
    currency: country,
    serviceName: getServiceDisplayName(payload),
    serviceType: type,
    reference: getServiceReference(payload),
    description: payload?.service_description || payload?.notes || '',
    customerName: payload?.customer_name || payload?.patient_name || payload?.applicant_name || payload?.client_name,
    details: getServiceDetails(payload, type),
  };
};
