import { useState } from 'react';
import { Avatar } from '../ui/Avatar';
import { IconButton } from '../ui/IconButton';
import { ThemeToggle } from '../ui/ThemeToggle';
import { InfoModal } from '../ui/InfoModal';
import {
  MenuIcon,
  JeffTubeLogo,
  SearchIcon,
  MicIcon,
  CreateIcon,
  NotificationIcon,
  KeyboardIcon,
  QuestionIcon,
} from '../icons';

export function Header() {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 bg-(--color-bg-primary) flex items-center justify-between px-4 z-50">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <IconButton ariaLabel="Menu">
            <MenuIcon />
          </IconButton>
          <a href="/" className="flex items-center gap-1">
            <JeffTubeLogo />
          </a>
        </div>

        {/* Center section - Search */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl mx-4">
          <div className="flex flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-10 bg-(--color-bg-input) border border-(--color-border) rounded-l-full px-4 pl-4 text-(--color-text-primary) placeholder-(--color-text-muted) focus:outline-none focus:border-blue-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-muted)">
                <KeyboardIcon />
              </div>
            </div>
            <button className="h-10 px-6 bg-(--color-bg-secondary) border border-l-0 border-(--color-border) rounded-r-full hover:bg-(--color-bg-hover) transition-colors">
              <SearchIcon />
            </button>
          </div>
          <IconButton ariaLabel="Search with your voice" className="bg-(--color-bg-secondary)">
            <MicIcon />
          </IconButton>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-(--color-bg-hover) rounded-full transition-colors">
            <CreateIcon />
            <span className="text-sm font-medium">Create</span>
          </button>
          <IconButton ariaLabel="Notifications">
            <NotificationIcon />
          </IconButton>
          <IconButton ariaLabel="What is this?" onClick={() => setIsInfoModalOpen(true)}>
            <QuestionIcon />
          </IconButton>
          <ThemeToggle />
          <button className="ml-2">
            <Avatar size="sm" alt="User" />
          </button>
        </div>
      </header>

      <InfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </>
  );
}
