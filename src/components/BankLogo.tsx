import React from 'react';

interface BankLogoProps {
  bankId: string;
  bankName: string;
  bankNameAr: string;
  color?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BankLogo: React.FC<BankLogoProps> = ({ 
  bankId, 
  bankName, 
  bankNameAr, 
  color = '#004B87',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-base'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = getInitials(bankName);

  return (
    <div 
      className={`${sizeClasses[size]} rounded-lg flex items-center justify-center font-bold text-white shadow-md ${className}`}
      style={{ 
        backgroundColor: color,
        background: `linear-gradient(135deg, ${color}, ${color}dd)`
      }}
    >
      <span className="drop-shadow-sm">{initials}</span>
    </div>
  );
};

export default BankLogo;
