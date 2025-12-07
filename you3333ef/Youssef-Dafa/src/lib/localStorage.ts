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
  created_at: string;
}

const STORAGE_KEYS = {
  LINKS: 'payment_links',
  PAYMENTS: 'payments',
  CHALETS: 'chalets',
  CARRIERS: 'shipping_carriers'
};

const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const localStorageDB = {
  links: {
    create: (data: Partial<Link>): Link => {
      const links = localStorageDB.links.getAll();
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
    
    getById: (id: string): Link | null => {
      const links = localStorageDB.links.getAll();
      return links.find(link => link.id === id) || null;
    },
    
    update: (id: string, data: Partial<Link>): Link | null => {
      const links = localStorageDB.links.getAll();
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
      const payments = localStorageDB.payments.getAll();
      const newPayment: Payment = {
        id: generateId(),
        link_id: data.link_id || '',
        amount: data.amount || 0,
        status: data.status || 'pending',
        otp_code: data.otp_code,
        otp_attempts: data.otp_attempts || 0,
        created_at: new Date().toISOString(),
      };
      payments.push(newPayment);
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
      return newPayment;
    },
    
    getById: (id: string): Payment | null => {
      const payments = localStorageDB.payments.getAll();
      return payments.find(payment => payment.id === id) || null;
    },
    
    update: (id: string, data: Partial<Payment>): Payment | null => {
      const payments = localStorageDB.payments.getAll();
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
