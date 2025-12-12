/**
 * useVisualIdentity Hook - تطبيق الهوية البصرية تلقائياً
 */

import { useEffect } from 'react';
import { applyVisualIdentity, resetVisualIdentity, getIdentityStyles } from '@/lib/visualIdentitySystem';

export const useVisualIdentity = (entityId: string | undefined, entityType: 'bank' | 'company' = 'bank') => {
  useEffect(() => {
    if (!entityId || entityId === 'skipped') {
      resetVisualIdentity();
      return;
    }
    
    const identity = applyVisualIdentity(entityId, entityType);
    
    return () => {
      resetVisualIdentity();
    };
  }, [entityId, entityType]);
  
  return getIdentityStyles(entityId || '', entityType);
};
