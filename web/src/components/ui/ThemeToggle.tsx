import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';
import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon, SystemIcon } from '../icons';

const themes = [
  { id: 'light', label: 'Light', icon: SunIcon },
  { id: 'dark', label: 'Dark', icon: MoonIcon },
  { id: 'system', label: 'System', icon: SystemIcon },
] as const;

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const CurrentIcon = resolvedTheme === 'dark' ? MoonIcon : SunIcon;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
          'hover:bg-(--color-bg-hover) text-(--color-text-primary)'
        )}
        aria-label="Toggle theme"
      >
        <CurrentIcon />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-12 w-40 rounded-xl py-2 shadow-lg z-50',
            'bg-(--color-bg-elevated) border border-(--color-border)'
          )}
        >
          {themes.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setTheme(id);
                setIsOpen(false);
              }}
              className={cn(
                'w-full px-4 py-2 flex items-center gap-3 text-sm transition-colors',
                'hover:bg-(--color-bg-hover)',
                theme === id
                  ? 'text-(--color-text-primary)'
                  : 'text-(--color-text-secondary)'
              )}
            >
              <Icon />
              <span>{label}</span>
              {theme === id && (
                <svg viewBox="0 0 24 24" className="w-4 h-4 ml-auto" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
