import React, { useEffect, useState } from 'react';
import { EntityType, getEntityIdentity, getCSSVariablesForEntity } from '@/lib/dynamicIdentity';

interface DynamicIdentityProps {
  entityType: EntityType;
  children?: React.ReactNode;
}

export const DynamicIdentity: React.FC<DynamicIdentityProps> = ({ entityType, children }) => {
  const identity = getEntityIdentity(entityType);

  useEffect(() => {
    if (!identity) return;

    const root = document.documentElement;
    const cssVars = getCSSVariablesForEntity(entityType);

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      Object.keys(cssVars).forEach(key => {
        root.style.removeProperty(key);
      });
    };
  }, [entityType, identity]);

  if (!identity) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

interface EntityHeaderProps {
  entityType: EntityType;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
  animateImages?: boolean;
}

export const EntityHeader: React.FC<EntityHeaderProps> = ({
  entityType,
  title,
  subtitle,
  showLogo = true,
  className = '',
  animateImages = true,
}) => {
  const identity = getEntityIdentity(entityType);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!identity || !animateImages || identity.animated_header_images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % identity.animated_header_images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [identity, animateImages]);

  if (!identity) {
    return (
      <div className={className}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    );
  }

  const headerStyles: React.CSSProperties = {
    background: `linear-gradient(135deg, ${identity.colors.primary}, ${identity.colors.secondary})`,
    color: '#FFFFFF',
    padding: '32px 24px',
    borderRadius: identity.buttons.style === 'rounded' ? '12px' : '4px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    fontFamily: identity.fonts.primary,
    position: 'relative',
    overflow: 'hidden',
  };

  const backgroundImageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: animateImages 
      ? `url(${identity.animated_header_images[currentImageIndex]})`
      : `url(${identity.animated_header_images[0]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.2,
    transition: 'background-image 1s ease-in-out',
    zIndex: 0,
  };

  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div className={className} style={headerStyles}>
      <div style={backgroundImageStyle} />
      <div style={contentStyles}>
        {showLogo && (
          <img
            src={identity.logo}
            alt={`${entityType} logo`}
            style={{
              maxHeight: '80px',
              marginBottom: '16px',
              filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: subtitle ? '8px' : '0' }}>
          {title}
        </h1>
        {subtitle && <p style={{ fontSize: '18px', opacity: 0.95 }}>{subtitle}</p>}
      </div>
    </div>
  );
};

interface EntityButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  entityType: EntityType;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const EntityButton: React.FC<EntityButtonProps> = ({
  entityType,
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const identity = getEntityIdentity(entityType);

  if (!identity) {
    return <button className={className} {...props}>{children}</button>;
  }

  const getBackgroundColor = () => {
    if (variant === 'outline') return 'transparent';
    if (variant === 'secondary') return identity.colors.secondary;
    return identity.colors.primary;
  };

  const getHoverColor = () => {
    const color = variant === 'secondary' ? identity.colors.secondary : identity.colors.primary;
    if (identity.buttons.hover === 'darken') {
      return adjustColorBrightness(color, -20);
    }
    return adjustColorBrightness(color, 20);
  };

  const styles: React.CSSProperties = {
    backgroundColor: isHovered && variant !== 'outline' ? getHoverColor() : getBackgroundColor(),
    color: variant === 'outline' ? identity.colors.primary : '#FFFFFF',
    border: variant === 'outline' ? `2px solid ${identity.colors.primary}` : 'none',
    borderRadius: identity.buttons.style === 'rounded' ? '8px' : '2px',
    padding: '12px 24px',
    fontFamily: identity.fonts.primary,
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: isHovered ? '0 6px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
  };

  return (
    <button
      className={className}
      style={styles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

interface EntityContainerProps {
  entityType: EntityType;
  children: React.ReactNode;
  className?: string;
  useBackgroundImage?: boolean;
}

export const EntityContainer: React.FC<EntityContainerProps> = ({
  entityType,
  children,
  className = '',
  useBackgroundImage = false,
}) => {
  const identity = getEntityIdentity(entityType);

  if (!identity) {
    return <div className={className}>{children}</div>;
  }

  const styles: React.CSSProperties = {
    backgroundColor: identity.colors.background,
    fontFamily: identity.fonts.primary,
    minHeight: '100vh',
    position: 'relative',
    ...(useBackgroundImage && identity.background_images.length > 0 && {
      backgroundImage: `url(${identity.background_images[0]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }),
  };

  const overlayStyles: React.CSSProperties = useBackgroundImage ? {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${identity.colors.background}E6`,
    zIndex: 0,
  } : {};

  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 1,
  };

  return (
    <div className={className} style={styles}>
      {useBackgroundImage && <div style={overlayStyles} />}
      <div style={contentStyles}>{children}</div>
    </div>
  );
};

function adjustColorBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + percent));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + percent));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default DynamicIdentity;
