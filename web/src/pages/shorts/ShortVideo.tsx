import { useRef, useEffect, useState } from "react";
import { Link } from "react-router";
import type { Video } from "../../hooks/useData";
import { getVideoUrl, getThumbnailUrl } from "../../utils/thumbnail";
import { Avatar } from "../../components/ui/Avatar";
import {
  LikeIcon,
  DislikeIcon,
  ShareIcon,
  MoreVertIcon,
  PlayIcon,
  PauseIcon,
  VolumeIcon,
  VolumeMutedIcon,
  CommentIcon,
} from "../../components/icons";

interface ShortVideoProps {
  video: Video;
  isActive: boolean;
}

export function ShortVideo({ video, isActive }: ShortVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPoster, setShowPoster] = useState(true);
  const [showPlayPauseOverlay, setShowPlayPauseOverlay] = useState(false);
  const [overlayIcon, setOverlayIcon] = useState<"play" | "pause">("play");
  const [isMuted, setIsMuted] = useState(false);
  const overlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle play/pause based on active state
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isActive) {
      setTimeout(() => {
        setShowPoster(false);
      }, 0);
      videoEl.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoEl.pause();
      videoEl.currentTime = 0;

      setTimeout(() => {
        setIsPlaying(false);
        setProgress(0);
        setShowPoster(true);
      }, 0);
    }
  }, [isActive]);

  // Handle time updates for progress bar
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !isActive) return;

    const handleTimeUpdate = () => {
      const prog = (videoEl.currentTime / videoEl.duration) * 100;
      setProgress(isNaN(prog) ? 0 : prog);
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    return () => videoEl.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isActive]);

  // Cleanup overlay timeout on unmount
  useEffect(() => {
    return () => {
      if (overlayTimeoutRef.current) {
        clearTimeout(overlayTimeoutRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    const videoEl = videoRef.current;
    if (!videoEl || !isActive) return;

    // Clear any existing timeout
    if (overlayTimeoutRef.current) {
      clearTimeout(overlayTimeoutRef.current);
    }

    if (isPlaying) {
      videoEl.pause();
      setIsPlaying(false);
      setOverlayIcon("pause");
    } else {
      videoEl.play().catch(() => { });
      setIsPlaying(true);
      setOverlayIcon("play");
    }

    // Show overlay and hide after 1 second
    setShowPlayPauseOverlay(true);
    overlayTimeoutRef.current = setTimeout(() => {
      setShowPlayPauseOverlay(false);
    }, 1000);
  };

  const toggleMute = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = !videoEl.muted;
    setIsMuted(videoEl.muted);
  };

  const thumbnailUrl = getThumbnailUrl(video);

  return (
    <div className="h-[calc(100vh-56px)] snap-start flex items-center justify-center px-4 sm:px-8 md:px-12 pt-4 sm:pt-8 pb-2 sm:pb-4">
      <div className="relative h-full max-h-[calc(100vh-80px)] sm:max-h-[calc(100vh-120px)]">
        {/* Video container */}
        <div className="relative h-full aspect-9/16 bg-black rounded-xl sm:rounded-2xl overflow-hidden">
          {/* Poster image when not active */}
          {showPoster && (
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Video element */}
          <video
            ref={videoRef}
            src={getVideoUrl(video.filename)}
            className="w-full h-full object-cover cursor-pointer"
            loop
            playsInline
            muted={false}
            preload={isActive ? "auto" : "none"}
            onClick={togglePlay}
          />

          {/* Play/Pause overlay */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${showPlayPauseOverlay ? "opacity-100" : "opacity-0"
              }`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 flex items-center justify-center">
              {overlayIcon === "play" ? (
                <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </div>
          </div>

          {/* Top controls */}
          <div className="absolute top-0 left-0 right-0 p-2 sm:p-3 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={togglePlay}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button
                onClick={toggleMute}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              >
                {isMuted ? <VolumeMutedIcon /> : <VolumeIcon />}
              </button>
            </div>
          </div>

          {/* Bottom overlay with channel info and title */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 pb-4 sm:pb-5 bg-gradient-to-t from-black/70 to-transparent">
            {/* Channel info */}
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <Link to="/">
                <Avatar
                  src="https://assets.getkino.com/photos/EFTA00003692-0.png"
                  size="md"
                />
              </Link>
              <Link to="/" className="font-semibold text-sm sm:text-base hover:underline text-white truncate max-w-[120px] sm:max-w-none">
                @jefferyepstein
              </Link>
              <button className="px-3 sm:px-4 py-1.5 bg-white text-black rounded-full text-sm sm:text-base font-semibold hover:bg-white/90 shrink-0">
                Subscribe
              </button>
            </div>

            {/* Video title */}
            <p className="text-sm sm:text-base text-white line-clamp-2">{video.title}</p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div
              className="h-full bg-red-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action buttons - overlayed on video */}
        <div className="absolute right-2 sm:right-3 bottom-24 sm:bottom-28 flex flex-col items-center gap-3">
          <ActionButton icon={<LikeIcon />} label="Like" />
          <ActionButton icon={<DislikeIcon />} label="Dislike" />
          <ActionButton icon={<CommentIcon />} label="224" />
          <ActionButton icon={<ShareIcon />} label="Share" />
          <ActionButton icon={<MoreVertIcon />} label="More" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex cursor-pointer flex-col items-center gap-1.5">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/50 hover:bg-black/60 flex items-center justify-center transition-colors text-white [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-7 sm:[&>svg]:h-7">
        {icon}
      </div>
      <span className="text-sm sm:text-base text-white font-bold">{label}</span>
    </button>
  );
}
