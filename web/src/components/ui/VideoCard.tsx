import { Link } from "react-router";
import { cn, formatDuration } from "../../utils";
import { MoreVertIcon, VerifiedIcon } from "../icons";

interface VideoCardProps {
  videoId: string;
  thumbnail?: string;
  duration: number;
  title: string;
  channel?: string;
  channelAvatar?: string;
  views: string;
  uploadedAt: string;
  showChannel?: boolean;
  size?: "sm" | "md" | "lg";
  verified?: boolean;
}

const sizeClasses = {
  sm: "w-[168px]",
  md: "w-[210px]",
  lg: "w-full max-w-[360px]",
};

export function VideoCard({
  videoId,
  thumbnail,
  duration,
  title,
  channel,
  views,
  uploadedAt,
  showChannel = false,
  size = "md",
  verified = false,
}: VideoCardProps) {
  return (
    <Link
      to={`/watch/${videoId}`}
      className={cn("group flex-shrink-0 block", sizeClasses[size])}
    >
      <div className="relative aspect-video bg-(--color-bg-tertiary) rounded-xl overflow-hidden mb-2">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-(--color-bg-secondary) to-(--color-bg-tertiary) flex items-center justify-center">
            <div className="w-12 h-12 bg-(--color-bg-hover) rounded-lg" />
          </div>
        )}
        <div className="absolute bottom-1 right-1 bg-(--color-overlay) text-white text-xs px-1 py-0.5 rounded font-medium">
          {formatDuration(duration)}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-sm font-medium text-(--color-text-primary) line-clamp-2 leading-5">
              {title}
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1 -mr-1 hover:bg-(--color-bg-hover) rounded-full"
            >
              <MoreVertIcon />
            </button>
          </div>
          {showChannel && channel && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-(--color-text-secondary) hover:text-(--color-text-primary) cursor-pointer">
                {channel}
              </span>
              {verified && <VerifiedIcon />}
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-(--color-text-secondary) mt-0.5">
            <span>{views} views</span>
            <span>•</span>
            <span>{uploadedAt}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
