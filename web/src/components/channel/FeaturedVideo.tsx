import { VerifiedIcon, MoreVertIcon } from '../icons';

interface FeaturedVideoProps {
  thumbnail?: string;
  duration: string;
  title: string;
  channel: string;
  views: string;
  uploadedAt: string;
  description: string;
  verified?: boolean;
}

export function FeaturedVideo({
  thumbnail,
  duration,
  title,
  channel,
  views,
  uploadedAt,
  description,
  verified = false,
}: FeaturedVideoProps) {
  return (
    <div className="flex gap-4 py-6">
      <div className="relative w-[360px] flex-shrink-0 aspect-video bg-(--color-bg-tertiary) rounded-xl overflow-hidden">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-(--color-bg-secondary) to-(--color-bg-tertiary) flex items-center justify-center">
            <div className="text-4xl font-bold text-(--color-text-muted)">2023</div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-(--color-overlay) text-white text-xs px-1 py-0.5 rounded font-medium">
          {duration}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-(--color-text-primary) line-clamp-2">{title}</h3>
          <button className="p-2 hover:bg-(--color-bg-hover) rounded-full transition-colors flex-shrink-0 ml-2">
            <MoreVertIcon />
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs text-(--color-text-secondary) mt-2">
          <span className="flex items-center gap-1">
            {channel}
            {verified && <VerifiedIcon />}
          </span>
          <span>•</span>
          <span>{views} views</span>
          <span>•</span>
          <span>{uploadedAt}</span>
        </div>
        <p className="text-sm text-(--color-text-secondary) mt-3 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
