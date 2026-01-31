import { ReactNode } from 'react';
import { cn } from '../../utils';

interface IconButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export function IconButton({ children, className, onClick, ariaLabel }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center hover:bg-(--color-bg-hover) transition-colors',
        className
      )}
    >
      {children}
    </button>
  );
}
