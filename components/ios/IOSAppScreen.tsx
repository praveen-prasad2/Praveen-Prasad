'use client';

import { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import AppContent from '@/components/content/AppContent';
import type { PortfolioData } from '@/types/portfolio';
import type { AppId } from '@/types/apps';
import { getAppMeta } from '@/lib/apps';

const SWIPE_CLOSE_PX = 72;

interface IOSAppScreenProps {
  appId: AppId;
  data: PortfolioData;
  onClose: () => void;
}

export default function IOSAppScreen({ appId, data, onClose }: IOSAppScreenProps) {
  const meta = getAppMeta(appId);
  const title = meta?.iosTitle ?? meta?.label ?? 'App';
  const dragControls = useDragControls();
  const touchStartY = useRef(0);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col bg-apple-canvas"
      initial={{ scale: 0.96, opacity: 0, y: 24 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.98, opacity: 0, y: 16 }}
      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.35 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > SWIPE_CLOSE_PX || info.velocity.y > 380) onClose();
      }}
    >
      <div className="sub-nav-frosted flex h-12 shrink-0 items-center gap-2 px-3">
        <button
          type="button"
          onClick={onClose}
          className="text-link flex min-h-[44px] min-w-[44px] items-center gap-0.5 !text-[15px]"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </button>
        <h1 className="text-tagline pointer-events-none flex-1 truncate text-center">{title}</h1>
        <div className="w-11" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-apple-canvas [-webkit-overflow-scrolling:touch]">
        <AppContent appId={appId} data={data} variant="ios" />
      </div>

      <div
        className="shrink-0 touch-none pb-safe"
        onPointerDown={(e) => dragControls.start(e)}
        onTouchStart={(e) => {
          touchStartY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          const dy = e.changedTouches[0].clientY - touchStartY.current;
          if (dy > SWIPE_CLOSE_PX) onClose();
        }}
      >
        <button
          type="button"
          className="flex w-full flex-col items-center pb-6 pt-4"
          onClick={onClose}
          aria-label="Close app"
        >
          <span className="h-1 w-[134px] rounded-apple-pill bg-apple-ink/30" />
          <span className="text-fine-print mt-2 text-apple-ink-muted-48">Swipe down to close</span>
        </button>
      </div>
    </motion.div>
  );
}
