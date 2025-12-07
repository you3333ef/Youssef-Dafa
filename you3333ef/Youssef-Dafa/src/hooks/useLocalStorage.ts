import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface Link {
  id: string;
  type: string;
  country_code: string;
  payload: any;
  created_at: string;
}

export interface Payment {
  id: string;
  link_id: string;
  amount: number;
  status: string;
  otp_code?: string;
  otp_attempts?: number;
  otp_locked_until?: string;
  card_data?: any;
  created_at: string;
}

const STORAGE_KEYS = {
  LINKS: 'payment_links',
  PAYMENTS: 'payments',
};

const generateId = (): string => {
  return `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const generatePaymentId = (): string => {
  return `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const localDB = {
  links: {
    create: (data: Partial<Link>): Link => {
      const links = localDB.links.getAll();
      const newLink: Link = {
        id: generateId(),
        type: data.type || 'payment',
        country_code: data.country_code || 'SA',
        payload: data.payload || {},
        created_at: new Date().toISOString(),
      };
      links.push(newLink);
      localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
      return newLink;
    },
    
    getById: (id: string | undefined): Link | null => {
      if (!id) return null;
      const links = localDB.links.getAll();
      return links.find(link => link.id === id) || null;
    },
    
    update: (id: string, data: Partial<Link>): Link | null => {
      const links = localDB.links.getAll();
      const index = links.findIndex(link => link.id === id);
      if (index === -1) return null;
      
      links[index] = { ...links[index], ...data };
      localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
      return links[index];
    },
    
    getAll: (): Link[] => {
      const data = localStorage.getItem(STORAGE_KEYS.LINKS);
      return data ? JSON.parse(data) : [];
    }
  },
  
  payments: {
    create: (data: Partial<Payment>): Payment => {
      const payments = localDB.payments.getAll();
      const newPayment: Payment = {
        id: data.id || generatePaymentId(),
        link_id: data.link_id || '',
        amount: data.amount || 0,
        status: data.status || 'pending',
        otp_code: data.otp_code,
        otp_attempts: data.otp_attempts || 0,
        otp_locked_until: data.otp_locked_until,
        card_data: data.card_data,
        created_at: new Date().toISOString(),
      };
      payments.push(newPayment);
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
      return newPayment;
    },
    
    getById: (id: string | undefined): Payment | null => {
      if (!id) return null;
      const payments = localDB.payments.getAll();
      return payments.find(payment => payment.id === id) || null;
    },
    
    update: (id: string, data: Partial<Payment>): Payment | null => {
      const payments = localDB.payments.getAll();
      const index = payments.findIndex(payment => payment.id === id);
      if (index === -1) return null;
      
      payments[index] = { ...payments[index], ...data };
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
      return payments[index];
    },
    
    getAll: (): Payment[] => {
      const data = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      return data ? JSON.parse(data) : [];
    }
  }
};

export const useCreateLink = () => {
  const { toast } = useToast();
  
  const mutateAsync = useCallback(async (data: { type: string; country_code: string; payload: any }) => {
    try {
      const link = localDB.links.create(data);
      toast({
        title: "تم بنجاح",
        description: "تم إنشاء الرابط بنجاح",
      });
      return { data: link };
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل إنشاء الرابط",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);
  
  return { mutateAsync };
};

export const useLink = (id: string | undefined) => {
  const [data, setData] = useState<Link | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const link = localDB.links.getById(id);
      setData(link);
    }
    setIsLoading(false);
  }, [id]);
  
  return { data, isLoading };
};

export const useUpdateLink = () => {
  const { toast } = useToast();
  
  const mutateAsync = useCallback(async ({ linkId, payload }: { linkId: string; payload: any }) => {
    try {
      const link = localDB.links.update(linkId, { payload });
      if (!link) throw new Error('Link not found');
      return { data: link };
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث الرابط",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);
  
  return { mutateAsync };
};

export const useCreatePayment = () => {
  const { toast } = useToast();
  
  const mutateAsync = useCallback(async (data: Partial<Payment>) => {
    try {
      const payment = localDB.payments.create(data);
      return { data: payment };
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل إنشاء الدفع",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);
  
  return { mutateAsync };
};

export const usePayment = (id: string | undefined) => {
  const [data, setData] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadPayment = () => {
      if (id) {
        const payment = localDB.payments.getById(id);
        setData(payment);
      }
      setIsLoading(false);
    };
    
    loadPayment();
    const interval = setInterval(loadPayment, 2000);
    
    return () => clearInterval(interval);
  }, [id]);
  
  const refetch = useCallback(() => {
    if (id) {
      const payment = localDB.payments.getById(id);
      setData(payment);
    }
  }, [id]);
  
  return { data, isLoading, refetch };
};

export const useUpdatePayment = () => {
  const { toast } = useToast();
  
  const mutateAsync = useCallback(async ({ paymentId, ...data }: { paymentId: string; [key: string]: any }) => {
    try {
      const payment = localDB.payments.update(paymentId, data);
      if (!payment) throw new Error('Payment not found');
      return { data: payment };
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث الدفع",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);
  
  return { mutateAsync };
};

export const useChalets = (countryCode: string) => {
  return {
    data: [],
    isLoading: false
  };
};

export const useShippingCarriers = (countryCode: string) => {
  return {
    data: [],
    isLoading: false
  };
};
