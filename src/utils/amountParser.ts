export const parseAmount = (rawAmount: any, defaultValue: number = 500): number => {
  if (rawAmount === undefined || rawAmount === null) {
    return defaultValue;
  }
  
  if (typeof rawAmount === 'number') {
    return rawAmount;
  }
  
  if (typeof rawAmount === 'string') {
    const parsed = parseFloat(rawAmount);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  
  return defaultValue;
};

export const safeParseAmount = (rawAmount: any): number | null => {
  if (rawAmount === undefined || rawAmount === null) {
    return null;
  }
  
  if (typeof rawAmount === 'number') {
    return rawAmount;
  }
  
  if (typeof rawAmount === 'string') {
    const parsed = parseFloat(rawAmount);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  
  return null;
};
