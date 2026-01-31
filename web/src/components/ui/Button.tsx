import { ReactNode } from 'react';
import { cn } from '../../utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'subscribe';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

const variantClasses = {
  primary: 'bg-(--color-button-primary-bg) text-(--color-button-primary-text) hover:bg-(--color-button-primary-hover)',
  secondary: 'bg-(--color-button-secondary-bg) text-(--color-button-secondary-text) hover:bg-(--color-button-secondary-hover)',
  ghost: 'bg-transparent text-(--color-text-primary) hover:bg-(--color-bg-hover)',
  subscribe: 'bg-(--color-button-secondary-bg) text-(--color-button-secondary-text) hover:bg-(--color-button-secondary-hover)',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-2.5 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  icon,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full font-medium flex items-center gap-2 transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon}
      {children}
    </button>
  );
}
