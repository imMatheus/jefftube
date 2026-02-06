import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { Header } from "../layout/Header";
import { VideoPlayer } from "./VideoPlayer";
import { VideoInfo } from "./VideoInfo";
import { VideoSidebar } from "./VideoSidebar";
import { CommentSection } from "../comments";
import { useData } from "../../hooks/useData";
import { getVideoUrl, getThumbnailUrl } from "../../utils/thumbnail";
import { NotFoundPageContent } from "../NotFoundPage";

export function VideoPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const { videos } = useData();

  const video = videos.find((v) => v.id === videoId);
  const suggestedVideos = videos.filter((v) => v.id !== videoId).slice(0, 500);

  if (!video) {
    return (
      <div className="min-h-screen bg-(--color-bg-primary) text-(--color-text-primary)">
        <Header />
        <NotFoundPageContent />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--color-bg-primary) text-(--color-text-primary)">
      <Helmet>
        <title>{video.title} - JeffTube</title>
        <meta name="description" content={`Watch ${video.title} on JeffTube`} />
      </Helmet>
      <Header />
      <main className="pt-14 px-4">
        <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-6 py-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <VideoPlayer
              src={getVideoUrl(video.filename)}
              poster={getThumbnailUrl(video)}
            />
            <VideoInfo video={video} />
            <CommentSection videoId={video.id} />
          </div>

          {/* Sidebar */}
          <VideoSidebar videos={suggestedVideos} />
        </div>
      </main>
    </div>
  );
}
