interface ChannelBannerProps {
  src?: string;
  alt?: string;
}

export function ChannelBanner({
  src,
  alt = "Channel banner",
}: ChannelBannerProps) {
  return (
    <div className="w-full h-[264px] rounded-2xl overflow-hidden bg-(--color-bg-tertiary)">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-(--color-bg-secondary) via-(--color-bg-tertiary) to-(--color-bg-secondary)" />
      )}
    </div>
  );
}
