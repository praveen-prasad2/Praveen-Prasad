'use client';

import { IOS_DOCK_APPS } from './constants';
import { getAppMeta } from '@/lib/apps';
import IOSAppIcon from './IOSAppIcon';
import type { AppId } from '@/types/apps';

export default function IOSDock({ onOpen }: { onOpen: (id: AppId) => void }) {
  const apps = IOS_DOCK_APPS.map((id) => getAppMeta(id)).filter(Boolean);

  return (
    <div className="px-3 pb-2">
      <div className="dock-frosted flex items-center justify-around rounded-[28px] px-4 py-3">
        {apps.map((app) =>
          app ? (
            <IOSAppIcon key={app.id} app={app} onOpen={() => onOpen(app.id)} size="dock" />
          ) : null
        )}
      </div>
    </div>
  );
}
