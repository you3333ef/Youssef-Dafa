const isDevelopment = import.meta.env.MODE === 'development';

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.info(`ℹ️ ${message}`, ...args);
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.warn(`⚠️ ${message}`, ...args);
    }
  },
  
  error: (message: string, error?: any) => {
    if (isDevelopment) {
      console.error(`❌ ${message}`, error);
    }
  },
  
  debug: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`🔍 ${message}`, ...args);
    }
  },

  success: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(`✅ ${message}`, ...args);
    }
  }
};

export default logger;
