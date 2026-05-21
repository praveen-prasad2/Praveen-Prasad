'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ContextMenuProps {
  x: number;
  y: number;
  open: boolean;
  onClose: () => void;
  onChangeWallpaper: () => void;
  onSortIcons: () => void;
}

export default function ContextMenu({
  x,
  y,
  open,
  onClose,
  onChangeWallpaper,
  onSortIcons,
}: ContextMenuProps) {
  const items = [
    { label: 'Change Wallpaper', action: onChangeWallpaper },
    { label: 'Sort Icons by Name', action: onSortIcons },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[180]" onClick={onClose} />
          <motion.div
            className="fixed z-[181] min-w-[200px] overflow-hidden rounded-apple-md border border-apple-hairline bg-apple-canvas py-1"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                className="block w-full px-4 py-2 text-left text-caption text-apple-ink active:bg-apple-parchment"
                onClick={() => {
                  item.action();
                  onClose();
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
