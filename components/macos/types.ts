export type { AppId } from '@/types/apps';

export interface DesktopApp {
  id: import('@/types/apps').AppId;
  label: string;
  icon: 'folder-blue' | 'folder-purple' | 'folder-green' | 'app-code' | 'app-safari' | 'app-mail' | 'app-terminal' | 'app-notes' | 'app-music' | 'app-resume';
  /** Custom icon image from /public — overrides built-in app icon */
  iconImage?: string;
  defaultPosition: { x: number; y: number };
  windowTitle: string;
  defaultSize: { width: number; height: number };
}

export interface WindowState {
  id: string;
  appId: import('@/types/apps').AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}
