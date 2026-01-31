import { Link } from "react-router";
import type { Video } from "../../hooks/useData";
import { getThumbnailUrl } from "../../utils/thumbnail";
import { formatDuration } from "../../utils";
import { MoreVertIcon } from "../icons";

interface VideoSidebarProps {
  videos: Video[];
}

interface SidebarVideoCardProps {
  video: Video;
}

function SidebarVideoCard({ video }: SidebarVideoCardProps) {
  return (
    <Link
      to={`/watch/${video.id}`}
      className="flex gap-2 group"
    >
      <div className="relative w-40 shrink-0 aspect-video bg-(--color-bg-tertiary) rounded-lg overflow-hidden">
        <img
          src={getThumbnailUrl(video.filename)}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-1 right-1 bg-(--color-overlay) text-white text-xs px-1 py-0.5 rounded font-medium">
          {formatDuration(video.length)}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <h3 className="text-sm font-medium text-(--color-text-primary) line-clamp-2 leading-5">
            {video.title}
          </h3>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-1 -mr-1 hover:bg-(--color-bg-hover) rounded-full">
            <MoreVertIcon />
          </button>
        </div>
        <p className="text-xs text-(--color-text-secondary) mt-1">Jeffery Epstein</p>
        <div className="flex items-center gap-1 text-xs text-(--color-text-secondary)">
          <span>1.2K views</span>
          <span>•</span>
          <span>2 days ago</span>
        </div>
      </div>
    </Link>
  );
}

export function VideoSidebar({ videos }: VideoSidebarProps) {
  return (
    <aside className="w-full lg:w-[400px] flex-shrink-0">
      {/* Filter chips */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-none pb-2">
        <button className="px-3 py-1.5 bg-(--color-text-primary) text-(--color-bg-primary) rounded-lg text-sm font-medium whitespace-nowrap">
          All
        </button>
        <button className="px-3 py-1.5 bg-(--color-bg-secondary) text-(--color-text-primary) rounded-lg text-sm font-medium whitespace-nowrap hover:bg-(--color-bg-hover)">
          From Jeffery Epstein
        </button>
        <button className="px-3 py-1.5 bg-(--color-bg-secondary) text-(--color-text-primary) rounded-lg text-sm font-medium whitespace-nowrap hover:bg-(--color-bg-hover)">
          Recently uploaded
        </button>
      </div>

      {/* Video list */}
      <div className="flex flex-col gap-2">
        {videos.map((video) => (
          <SidebarVideoCard key={video.id} video={video} />
        ))}
      </div>
    </aside>
  );
}
