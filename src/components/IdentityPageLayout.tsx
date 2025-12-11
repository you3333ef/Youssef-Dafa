import React from 'react';
import { 
  DynamicIdentityProvider, 
  IdentityTopBar, 
  IdentityHeader, 
  IdentityContainer,
  IdentityCard,
  IdentityButton
} from './DynamicIdentity';

interface IdentityPageLayoutProps {
  entityKey?: string;
  children: React.ReactNode;
  showTopBar?: boolean;
  showHeader?: boolean;
  showBackground?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  showLogo?: boolean;
  showAnimatedImages?: boolean;
  className?: string;
}

export const IdentityPageLayout: React.FC<IdentityPageLayoutProps> = ({
  entityKey,
  children,
  showTopBar = true,
  showHeader = true,
  showBackground = true,
  headerTitle,
  headerSubtitle,
  showLogo = true,
  showAnimatedImages = true,
  className = ''
}) => {
  return (
    <DynamicIdentityProvider entityKey={entityKey}>
      <div className={`min-h-screen flex flex-col ${className}`}>
        {showTopBar && <IdentityTopBar entityKey={entityKey} />}
        
        {showHeader && (
          <IdentityHeader
            entityKey={entityKey}
            showLogo={showLogo}
            showAnimatedImages={showAnimatedImages}
            title={headerTitle}
            subtitle={headerSubtitle}
          />
        )}
        
        <IdentityContainer 
          entityKey={entityKey} 
          showBackground={showBackground}
          className="flex-1"
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </div>
        </IdentityContainer>
      </div>
    </DynamicIdentityProvider>
  );
};

interface IdentityFormLayoutProps {
  entityKey?: string;
  children: React.ReactNode;
  title: string;
  description?: string;
  onSubmit?: (e: React.FormEvent) => void;
  submitLabel?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  cancelLabel?: string;
  className?: string;
}

export const IdentityFormLayout: React.FC<IdentityFormLayoutProps> = ({
  entityKey,
  children,
  title,
  description,
  onSubmit,
  submitLabel = 'إرسال',
  showCancel = false,
  onCancel,
  cancelLabel = 'إلغاء',
  className = ''
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <IdentityPageLayout entityKey={entityKey} className={className}>
      <IdentityCard entityKey={entityKey} className="max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            {description && (
              <p className="text-gray-600">{description}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {children}
            
            <div className="flex gap-4 justify-end pt-4">
              {showCancel && (
                <IdentityButton
                  entityKey={entityKey}
                  variant="outline"
                  type="button"
                  onClick={onCancel}
                >
                  {cancelLabel}
                </IdentityButton>
              )}
              <IdentityButton
                entityKey={entityKey}
                variant="primary"
                type="submit"
              >
                {submitLabel}
              </IdentityButton>
            </div>
          </form>
        </div>
      </IdentityCard>
    </IdentityPageLayout>
  );
};

interface IdentityDashboardLayoutProps {
  entityKey?: string;
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
  className?: string;
}

export const IdentityDashboardLayout: React.FC<IdentityDashboardLayoutProps> = ({
  entityKey,
  children,
  title,
  actions,
  className = ''
}) => {
  return (
    <IdentityPageLayout entityKey={entityKey} className={className}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          {actions && (
            <div className="flex gap-2">{actions}</div>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {children}
        </div>
      </div>
    </IdentityPageLayout>
  );
};

interface IdentityPaymentLayoutProps {
  entityKey?: string;
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

export const IdentityPaymentLayout: React.FC<IdentityPaymentLayoutProps> = ({
  entityKey,
  children,
  currentStep,
  totalSteps,
  className = ''
}) => {
  return (
    <IdentityPageLayout 
      entityKey={entityKey} 
      showAnimatedImages={false}
      className={className}
    >
      <div className="max-w-3xl mx-auto">
        {currentStep && totalSteps && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                خطوة {currentStep} من {totalSteps}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${(currentStep / totalSteps) * 100}%`,
                  backgroundColor: 'var(--identity-primary, #0073E6)'
                }}
              />
            </div>
          </div>
        )}
        
        <IdentityCard entityKey={entityKey}>
          {children}
        </IdentityCard>
      </div>
    </IdentityPageLayout>
  );
};

export default IdentityPageLayout;
