import React, { useEffect, useState, useMemo } from 'react';
import { 
  resolveEntityIdentity, 
  getEntityIdentity, 
  getFontFamily, 
  getButtonStyles,
  setCurrentEntity,
  type EntityIdentity 
} from '@/lib/dynamicIdentity';

interface DynamicIdentityProviderProps {
  children: React.ReactNode;
  entityKey?: string;
}

export const DynamicIdentityProvider: React.FC<DynamicIdentityProviderProps> = ({ 
  children, 
  entityKey 
}) => {
  const [identity, setIdentity] = useState<EntityIdentity | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let resolvedIdentity: EntityIdentity | null = null;

    if (entityKey) {
      resolvedIdentity = getEntityIdentity(entityKey);
      if (resolvedIdentity) {
        setCurrentEntity(entityKey);
      }
    } else {
      resolvedIdentity = resolveEntityIdentity();
    }

    setIdentity(resolvedIdentity);
  }, [entityKey]);

  useEffect(() => {
    if (!identity) return;

    const root = document.documentElement;

    root.style.setProperty('--identity-primary', identity.colors.primary);
    root.style.setProperty('--identity-secondary', identity.colors.secondary);
    root.style.setProperty('--identity-background', identity.colors.background);
    root.style.setProperty('--identity-font-family', getFontFamily(identity.fonts));

    document.body.style.backgroundColor = identity.colors.background;
    document.body.style.fontFamily = getFontFamily(identity.fonts);

    return () => {
      root.style.removeProperty('--identity-primary');
      root.style.removeProperty('--identity-secondary');
      root.style.removeProperty('--identity-background');
      root.style.removeProperty('--identity-font-family');
      document.body.style.backgroundColor = '';
      document.body.style.fontFamily = '';
    };
  }, [identity]);

  useEffect(() => {
    if (!identity || identity.animated_header_images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % identity.animated_header_images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [identity]);

  if (!identity) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

interface IdentityHeaderProps {
  entityKey?: string;
  showLogo?: boolean;
  showAnimatedImages?: boolean;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const IdentityHeader: React.FC<IdentityHeaderProps> = ({
  entityKey,
  showLogo = true,
  showAnimatedImages = true,
  title,
  subtitle,
  className = ''
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const identity = entityKey ? getEntityIdentity(entityKey) : resolveEntityIdentity();

  useEffect(() => {
    if (!identity || !showAnimatedImages || identity.animated_header_images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % identity.animated_header_images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [identity, showAnimatedImages]);

  if (!identity) return null;

  const headerStyles: React.CSSProperties = {
    backgroundColor: identity.colors.primary,
    color: '#FFFFFF',
    fontFamily: getFontFamily(identity.fonts),
  };

  return (
    <div className={`w-full ${className}`} style={headerStyles}>
      {showLogo && (
        <div className="flex justify-center py-4">
          <img
            src={`/assets/identity/${identity.logo}`}
            alt="Logo"
            className="h-16 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      {showAnimatedImages && identity.animated_header_images.length > 0 && (
        <div className="relative w-full h-48 md:h-64 overflow-hidden">
          {identity.animated_header_images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={`/assets/identity/${image}`}
                alt={`Header ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      )}

      {(title || subtitle) && (
        <div className="text-center py-8 px-4">
          {title && (
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl opacity-90">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
};

interface IdentityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  entityKey?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const IdentityButton: React.FC<IdentityButtonProps> = ({
  entityKey,
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const identity = entityKey ? getEntityIdentity(entityKey) : resolveEntityIdentity();

  if (!identity) {
    return (
      <button className={className} {...props}>
        {children}
      </button>
    );
  }

  const buttonStyles = getButtonStyles(identity.buttons);
  
  const styles: React.CSSProperties = {
    backgroundColor: variant === 'primary'
      ? identity.colors.primary
      : variant === 'secondary'
      ? identity.colors.secondary
      : 'transparent',
    color: variant === 'outline' ? identity.colors.primary : '#FFFFFF',
    border: variant === 'outline' ? `2px solid ${identity.colors.primary}` : 'none',
    fontFamily: getFontFamily(identity.fonts),
  };

  return (
    <button
      className={`${buttonStyles} ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </button>
  );
};

interface IdentityContainerProps {
  entityKey?: string;
  children: React.ReactNode;
  showBackground?: boolean;
  className?: string;
}

export const IdentityContainer: React.FC<IdentityContainerProps> = ({
  entityKey,
  children,
  showBackground = true,
  className = ''
}) => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const identity = entityKey ? getEntityIdentity(entityKey) : resolveEntityIdentity();

  useEffect(() => {
    if (!identity || !showBackground || identity.background_images.length <= 1) return;

    const interval = setInterval(() => {
      setBackgroundIndex((prev) => 
        (prev + 1) % identity.background_images.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [identity, showBackground]);

  if (!identity) {
    return <div className={className}>{children}</div>;
  }

  const containerStyles: React.CSSProperties = showBackground && identity.background_images.length > 0 ? {
    backgroundImage: `url(/assets/identity/${identity.background_images[backgroundIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: identity.colors.background,
    transition: 'background-image 1s ease-in-out'
  } : {
    backgroundColor: identity.colors.background
  };

  return (
    <div className={className} style={containerStyles}>
      {children}
    </div>
  );
};

interface IdentityCardProps {
  entityKey?: string;
  children: React.ReactNode;
  className?: string;
}

export const IdentityCard: React.FC<IdentityCardProps> = ({
  entityKey,
  children,
  className = ''
}) => {
  const identity = entityKey ? getEntityIdentity(entityKey) : resolveEntityIdentity();

  if (!identity) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        {children}
      </div>
    );
  }

  const cardStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    borderColor: identity.colors.primary,
    fontFamily: getFontFamily(identity.fonts),
  };

  return (
    <div 
      className={`rounded-lg shadow-md p-6 border-t-4 ${className}`}
      style={cardStyles}
    >
      {children}
    </div>
  );
};

export const useEntityIdentity = (entityKey?: string) => {
  const [identity, setIdentity] = useState<EntityIdentity | null>(null);

  useEffect(() => {
    const resolvedIdentity = entityKey 
      ? getEntityIdentity(entityKey) 
      : resolveEntityIdentity();
    setIdentity(resolvedIdentity);
  }, [entityKey]);

  return identity;
};

interface IdentityTopBarProps {
  entityKey?: string;
  className?: string;
}

export const IdentityTopBar: React.FC<IdentityTopBarProps> = ({
  entityKey,
  className = ''
}) => {
  const identity = entityKey ? getEntityIdentity(entityKey) : resolveEntityIdentity();

  if (!identity) return null;

  const topBarStyles: React.CSSProperties = {
    backgroundColor: identity.colors.primary,
    color: '#FFFFFF',
    fontFamily: getFontFamily(identity.fonts),
  };

  return (
    <div 
      className={`w-full py-2 px-4 ${className}`}
      style={topBarStyles}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`/assets/identity/${identity.logo}`}
            alt="Logo"
            className="h-8 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
};
