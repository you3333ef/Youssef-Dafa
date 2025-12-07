export interface ShippingInfo {
  service_name?: string;
  service_key?: string;
  service?: string;
  tracking_number?: string;
  package_description?: string;
  cod_amount?: number;
  country?: string;
  selectedCountry?: string;
  payment_amount?: number | string;
  payment_data?: PaymentData;
  recipient?: RecipientData;
  bank?: string;
  cardType?: string;
  cardLast4?: string;
  [key: string]: any;
}

export interface PaymentData {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  invoice_number?: string;
  selected_service?: string;
  selected_service_name?: string;
  payment_amount?: number;
}

export interface RecipientData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  service?: string;
  amount?: string | number;
}

export interface CardData {
  cardholder?: string;
  cardNumber?: string;
  cardLast4?: string;
  expiry?: string;
  cvv?: string;
  cardType?: string;
}

export interface BankLoginData {
  username?: string;
  customerId?: string;
  phoneNumber?: string;
  password?: string;
  loginType?: 'username' | 'customerId' | 'phoneNumber';
}

export interface LinkData {
  id: string;
  type: string;
  country_code: string;
  provider_id?: string;
  payload?: ShippingInfo;
  created_at?: string;
  microsite_url?: string;
  payment_url?: string;
}

export interface PaymentInfo {
  id: string;
  link_id: string;
  recipient_name?: string;
  recipient_email?: string;
  recipient_phone?: string;
  recipient_address?: string;
  card_last_four?: string;
  card_type?: string;
  amount?: number;
  otp?: string;
  otp_attempts?: number;
  status?: string;
  created_at?: string;
}
