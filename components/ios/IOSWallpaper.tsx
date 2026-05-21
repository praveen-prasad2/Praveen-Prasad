'use client';

interface IOSWallpaperProps {
  color: string;
}

export default function IOSWallpaper({ color }: IOSWallpaperProps) {
  return (
    <div className="absolute inset-0" aria-hidden style={{ backgroundColor: color }} />
  );
}
