import { cn } from '../../utils';
import { SearchIcon } from '../icons';

interface Tab {
  id: string;
  label: string;
}

interface ChannelTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
}

export function ChannelTabs({ tabs, activeTab, onTabChange }: ChannelTabsProps) {
  return (
    <div className="flex items-center border-b border-(--color-border-light)">
      <nav className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              'px-6 py-3 text-sm font-medium transition-colors relative',
              activeTab === tab.id
                ? 'text-(--color-text-primary)'
                : 'text-(--color-text-secondary) hover:text-(--color-text-primary)'
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-(--color-text-primary)" />
            )}
          </button>
        ))}
      </nav>
      <button className="p-3 ml-auto text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors">
        <SearchIcon />
      </button>
    </div>
  );
}
