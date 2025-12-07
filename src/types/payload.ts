export interface PaymentPayload {
  service_name?: string;
  service_key?: string;
  chalet_name?: string;
  tracking_number?: string;
  package_description?: string;
  cod_amount?: number | string;
  country?: string;
  service?: string;
  amount?: number | string;
  currency?: string;
  recipient_name?: string;
  recipient_email?: string;
  recipient_phone?: string;
  recipient_address?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_address?: string;
  [key: string]: unknown;
}
