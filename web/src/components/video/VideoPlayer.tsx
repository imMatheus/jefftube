interface VideoPlayerProps {
  src: string;
  poster?: string;
}

export function VideoPlayer({ src, poster }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <video
        className="w-full h-full"
        controls
        autoPlay
        playsInline
        poster={poster}
        src={src}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
