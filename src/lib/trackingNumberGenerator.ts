export const generateTrackingNumber = (companyKey: string): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  
  switch (companyKey.toLowerCase()) {
    case 'aramex':
      return `AX${timestamp.toString().slice(-8)}${random.toString().padStart(5, '0')}`;
    
    case 'dhl':
    case 'dhlkw':
    case 'dhlqa':
    case 'dhlom':
    case 'dhlbh':
      return `${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    
    case 'fedex':
      return `${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    
    case 'ups':
      return `1Z${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(10000000000000 + Math.random() * 90000000000000)}`;
    
    case 'smsa':
      return `${Math.floor(300000000 + Math.random() * 100000000)}`;
    
    case 'zajil':
      return `ZJ${timestamp.toString().slice(-10)}`;
    
    case 'naqel':
      return `NQ${timestamp.toString().slice(-8)}${random.toString().padStart(4, '0')}`;
    
    case 'saudipost':
      return `SP${timestamp.toString().slice(-10)}`;
    
    case 'empost':
      return `EP${timestamp.toString().slice(-10)}`;
    
    case 'kwpost':
      return `KW${timestamp.toString().slice(-10)}`;
    
    case 'qpost':
      return `QP${timestamp.toString().slice(-10)}`;
    
    case 'omanpost':
      return `OM${timestamp.toString().slice(-10)}`;
    
    case 'bahpost':
      return `BH${timestamp.toString().slice(-10)}`;
    
    case 'albaraka':
      return `BRK${timestamp.toString().slice(-9)}`;
    
    case 'alfuttaim':
      return `AFT${timestamp.toString().slice(-9)}`;
    
    case 'alshaya':
      return `ASH${timestamp.toString().slice(-9)}`;
    
    case 'shipco':
      return `SC${timestamp.toString().slice(-10)}`;
    
    case 'hellmann':
      return `HW${timestamp.toString().slice(-10)}`;
    
    case 'dsv':
      return `DSV${timestamp.toString().slice(-9)}`;
    
    case 'agility':
      return `AGT${timestamp.toString().slice(-9)}`;
    
    case 'bahri':
    case 'national':
      return `NSC${timestamp.toString().slice(-9)}`;
    
    case 'genacom':
    case 'jinaken':
      return `GC${timestamp.toString().slice(-10)}`;
    
    case 'jinakum':
      return `JK${timestamp.toString().slice(-10)}`;
    
    default:
      return `TRK${timestamp.toString().slice(-10)}`;
  }
};

export const formatTrackingNumber = (trackingNumber: string, companyKey: string): string => {
  const cleanNumber = trackingNumber.replace(/\s+/g, '');
  
  switch (companyKey.toLowerCase()) {
    case 'aramex':
      if (cleanNumber.length >= 13) {
        return `${cleanNumber.slice(0, 2)} ${cleanNumber.slice(2, 10)} ${cleanNumber.slice(10)}`;
      }
      return cleanNumber;
    
    case 'dhl':
    case 'dhlkw':
    case 'dhlqa':
    case 'dhlom':
    case 'dhlbh':
      if (cleanNumber.length === 10) {
        return `${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 8)} ${cleanNumber.slice(8)}`;
      }
      return cleanNumber;
    
    case 'fedex':
      if (cleanNumber.length === 12) {
        return `${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 8)} ${cleanNumber.slice(8)}`;
      }
      return cleanNumber;
    
    case 'ups':
      if (cleanNumber.startsWith('1Z') && cleanNumber.length >= 18) {
        return `${cleanNumber.slice(0, 2)} ${cleanNumber.slice(2, 5)} ${cleanNumber.slice(5, 8)} ${cleanNumber.slice(8, 10)} ${cleanNumber.slice(10, 14)} ${cleanNumber.slice(14)}`;
      }
      return cleanNumber;
    
    case 'smsa':
      if (cleanNumber.length >= 9) {
        return `${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3, 6)} ${cleanNumber.slice(6)}`;
      }
      return cleanNumber;
    
    default:
      if (cleanNumber.length >= 10) {
        return `${cleanNumber.slice(0, 4)} ${cleanNumber.slice(4, 8)} ${cleanNumber.slice(8)}`;
      }
      return cleanNumber;
  }
};

export const validateTrackingNumber = (trackingNumber: string, companyKey: string): boolean => {
  const cleanNumber = trackingNumber.replace(/\s+/g, '');
  
  switch (companyKey.toLowerCase()) {
    case 'aramex':
      return /^AX\d{13}$/.test(cleanNumber);
    
    case 'dhl':
    case 'dhlkw':
    case 'dhlqa':
    case 'dhlom':
    case 'dhlbh':
      return /^\d{10}$/.test(cleanNumber);
    
    case 'fedex':
      return /^\d{12,14}$/.test(cleanNumber);
    
    case 'ups':
      return /^1Z[A-Z]{3}\d{14}$/.test(cleanNumber);
    
    case 'smsa':
      return /^\d{9,10}$/.test(cleanNumber);
    
    case 'zajil':
      return /^ZJ\d{10}$/.test(cleanNumber);
    
    case 'naqel':
      return /^NQ\d{12}$/.test(cleanNumber);
    
    case 'saudipost':
      return /^SP\d{10}$/.test(cleanNumber);
    
    case 'empost':
      return /^EP\d{10}$/.test(cleanNumber);
    
    case 'kwpost':
      return /^KW\d{10}$/.test(cleanNumber);
    
    case 'qpost':
      return /^QP\d{10}$/.test(cleanNumber);
    
    case 'omanpost':
      return /^OM\d{10}$/.test(cleanNumber);
    
    case 'bahpost':
      return /^BH\d{10}$/.test(cleanNumber);
    
    default:
      return cleanNumber.length >= 8 && cleanNumber.length <= 30;
  }
};
