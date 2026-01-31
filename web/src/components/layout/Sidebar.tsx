import { cn } from '../../utils';
import { Avatar } from '../ui/Avatar';
import {
  HomeIcon,
  ShortsIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HistoryIcon,
  PlaylistIcon,
  WatchLaterIcon,
  LikedVideosIcon,
  YourVideosIcon,
  DownloadIcon,
  MusicIcon,
  MoviesIcon,
  LiveIcon,
  JeffTubePremiumIcon,
  JeffTubeStudioIcon,
} from '../icons';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isLive?: boolean;
}

function SidebarItem({ icon, label, active = false, isLive = false }: SidebarItemProps) {
  return (
    <a
      href="#"
      className={cn(
        'flex items-center gap-6 px-3 py-2.5 rounded-lg hover:bg-(--color-bg-hover) transition-colors',
        active && 'bg-(--color-bg-secondary)'
      )}
    >
      <span className="text-(--color-text-primary)">{icon}</span>
      <span className="text-sm text-(--color-text-primary) flex-1">{label}</span>
      {isLive && (
        <span className="w-2 h-2 rounded-full bg-(--color-live) animate-pulse" />
      )}
    </a>
  );
}

interface SubscriptionItemProps {
  name: string;
  avatar?: string;
  isLive?: boolean;
}

function SubscriptionItem({ name, avatar, isLive = false }: SubscriptionItemProps) {
  return (
    <a
      href="#"
      className="flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-(--color-bg-hover) transition-colors"
    >
      <Avatar src={avatar} alt={name} size="xs" />
      <span className="text-sm text-(--color-text-primary) flex-1 truncate">{name}</span>
      {isLive && (
        <span className="w-2 h-2 rounded-full bg-(--color-live) animate-pulse" />
      )}
    </a>
  );
}

function SectionHeader({ title, hasArrow = false }: { title: string; hasArrow?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 mt-2">
      <span className="text-base font-medium text-(--color-text-primary)">{title}</span>
      {hasArrow && <ChevronRightIcon />}
    </div>
  );
}

export function Sidebar() {
  const subscriptions = [
    { name: 'Channel 4.0', isLive: true },
    { name: 'Midjourney', isLive: true },
    { name: 'penguinz0', isLive: true },
    { name: '442oons', isLive: false, hasNew: true },
    { name: 'A Byte of Code' },
    { name: 'A_Seagull' },
    { name: 'Adam' },
  ];

  return (
    <aside className="fixed top-14 left-0 w-60 h-[calc(100vh-56px)] bg-(--color-bg-primary) overflow-y-auto scrollbar-thin">
      <nav className="py-3 px-3">
        {/* Main nav */}
        <SidebarItem icon={<HomeIcon />} label="Home" />
        <SidebarItem icon={<ShortsIcon />} label="Shorts" />

        <div className="border-t border-(--color-border-light) my-3" />

        {/* Subscriptions */}
        <SectionHeader title="Subscriptions" hasArrow />
        {subscriptions.map((sub) => (
          <SubscriptionItem
            key={sub.name}
            name={sub.name}
            isLive={sub.isLive}
          />
        ))}
        <button className="flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-(--color-bg-hover) transition-colors w-full">
          <ChevronDownIcon />
          <span className="text-sm text-(--color-text-primary)">Show more</span>
        </button>

        <div className="border-t border-(--color-border-light) my-3" />

        {/* Your JeffTube */}
        <SectionHeader title="Your JeffTube" hasArrow />
        <SidebarItem icon={<HistoryIcon />} label="History" />
        <SidebarItem icon={<PlaylistIcon />} label="Playlists" />
        <SidebarItem icon={<WatchLaterIcon />} label="Watch later" />
        <SidebarItem icon={<LikedVideosIcon />} label="Liked videos" />
        <SidebarItem icon={<YourVideosIcon />} label="Your videos" />
        <SidebarItem icon={<DownloadIcon />} label="Downloads" />

        <div className="border-t border-(--color-border-light) my-3" />

        {/* Explore */}
        <SectionHeader title="Explore" />
        <SidebarItem icon={<MusicIcon />} label="Music" />
        <SidebarItem icon={<MoviesIcon />} label="Movies & TV" />
        <SidebarItem icon={<LiveIcon />} label="Live" />
        <button className="flex items-center gap-6 px-3 py-2 rounded-lg hover:bg-(--color-bg-hover) transition-colors w-full">
          <ChevronDownIcon />
          <span className="text-sm text-(--color-text-primary)">Show more</span>
        </button>

        <div className="border-t border-(--color-border-light) my-3" />

        {/* More from JeffTube */}
        <SectionHeader title="More from JeffTube" />
        <SidebarItem icon={<JeffTubePremiumIcon />} label="JeffTube Premium" />
        <SidebarItem icon={<JeffTubeStudioIcon />} label="JeffTube Studio" />
      </nav>
    </aside>
  );
}
