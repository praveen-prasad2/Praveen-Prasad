'use client';

interface WallpaperProps {
  color: string;
  image?: string;
  dark?: boolean;
}

export default function Wallpaper({ color, image, dark = false }: WallpaperProps) {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      aria-hidden
      style={{
        backgroundColor: color,
        ...(image ? { backgroundImage: `url(${image})` } : {}),
      }}
    >
      {!dark && !image && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 71px, rgba(0,0,0,0.04) 72px)',
          }}
        />
      )}
    </div>
  );
}
