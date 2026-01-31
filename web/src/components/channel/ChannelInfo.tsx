import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { VerifiedIcon, BellIcon, ChevronDownIcon } from "../icons";

interface ChannelInfoProps {
  name: string;
  handle: string;
  subscribers: string;
  videoCount: number;
  description: string;
  avatar?: string;
  verified?: boolean;
}

const links = [
  {
    label: "jmail.world",
    url: "https://jmail.world",
  },
];

export function ChannelInfo({
  name,
  handle,
  subscribers,
  videoCount,
  description,
  avatar,
  verified = false,
}: ChannelInfoProps) {
  return (
    <div className="flex gap-6 py-4">
      <Avatar src={avatar} alt={name} size="xl" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-(--color-text-primary)">
            {name}
          </h1>
          {verified && (
            <span className="text-(--color-text-secondary)">
              <VerifiedIcon />
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-sm text-(--color-text-secondary) mt-1">
          <span>{handle}</span>
          <span>•</span>
          <span>{subscribers} subscribers</span>
          <span>•</span>
          <span>{videoCount} videos</span>
        </div>
        <p className="text-sm text-(--color-text-secondary) mt-2 line-clamp-1">
          {description}
          {/* <button className="text-(--color-text-primary) ml-1 font-medium">
            ...more
          </button> */}
        </p>
        {links.length > 0 && (
          <div className="flex items-center gap-1 text-sm mt-1">
            <a
              href={links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-link) hover:opacity-80"
            >
              {links[0].label}
            </a>
            {links.length > 1 && (
              <span className="text-(--color-text-secondary)">
                and {links.length - 1} more link{links.length > 2 ? "s" : ""}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center gap-3 mt-4">
          <Button variant="subscribe" icon={<BellIcon />}>
            Subscribed
            <ChevronDownIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
