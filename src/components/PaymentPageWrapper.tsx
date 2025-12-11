import React from 'react';
import { useAutoApplyIdentity } from '@/hooks/useAutoApplyIdentity';
import { DynamicMetaTags } from '@/components/DynamicMetaTags';
import BrandedTopBar from '@/components/BrandedTopBar';

interface PaymentPageWrapperProps {
  children: React.ReactNode;
  serviceKey?: string;
  serviceName?: string;
  showTopBar?: boolean;
  showCarousel?: boolean;
  showBackButton?: boolean;
  backPath?: string;
  title?: string;
  description?: string;
}

export const PaymentPageWrapper: React.FC<PaymentPageWrapperProps> = ({
  children,
  serviceKey,
  serviceName,
  showTopBar = true,
  showCarousel = true,
  showBackButton = true,
  backPath,
  title,
  description,
}) => {
  const { entity, identity } = useAutoApplyIdentity();

  return (
    <>
      <DynamicMetaTags 
        entityKey={entity || undefined}
        title={title}
        description={description}
      />

      {showTopBar && serviceKey && (
        <BrandedTopBar 
          serviceKey={serviceKey}
          serviceName={serviceName || serviceKey}
          showBackButton={showBackButton}
          backPath={backPath}
          showCarousel={showCarousel}
        />
      )}

      <div 
        className="min-h-screen"
        dir="rtl"
        style={{
          backgroundColor: identity?.colors.background || '#FFFFFF',
          fontFamily: identity?.fonts[0] || 'Cairo, Tajawal, sans-serif',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PaymentPageWrapper;
