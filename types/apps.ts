export type AppId =
  | 'about'
  | 'services'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'terminal'
  | 'resume'
  | 'notes'
  | 'music'
  | 'photos'
  | 'safari';

export type IOSIconStyle =
  | 'about'
  | 'services'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'photos'
  | 'notes'
  | 'safari'
  | 'terminal'
  | 'music'
  | 'settings';

export interface AppMeta {
  id: AppId;
  label: string;
  iosLabel?: string;
  iosIcon: IOSIconStyle;
  windowTitle: string;
  iosTitle?: string;
}
