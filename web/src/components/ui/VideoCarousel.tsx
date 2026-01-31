import { ReactNode, useRef } from 'react';
import { ChevronRightIcon } from '../icons';

interface VideoCarouselProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showPlayAll?: boolean;
}

export function VideoCarousel({ children, title, subtitle, showPlayAll = false }: VideoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {(title || showPlayAll) && (
        <div className="flex items-center gap-4 mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-(--color-text-primary)">{title}</h2>
          )}
          {showPlayAll && (
            <button className="flex items-center gap-2 text-sm text-(--color-text-primary) hover:bg-(--color-bg-hover) px-3 py-1.5 rounded-full transition-colors">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M21 16h-7v-1h7v1zm0-5H3v1h18v-1zm0-4H3v1h18V7zM3 16h7v-1H3v1zm11.25 3l.41-1.22 1.22-.41-1.22-.41L14.25 16l-.41 1.22-1.22.41 1.22.41.41.96zM21 19h-7v-1h7v1z" />
              </svg>
              Play all
            </button>
          )}
          {subtitle && (
            <span className="text-sm text-(--color-text-secondary)">{subtitle}</span>
          )}
        </div>
      )}
      <div className="relative group/carousel">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 bg-(--color-bg-elevated) hover:bg-(--color-bg-hover) rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
        >
          <ChevronRightIcon />
        </button>
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-(--color-bg-elevated) hover:bg-(--color-bg-hover) rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 rotate-180"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
