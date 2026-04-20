export const THEME_STORAGE_KEY = 'portfolio-theme';

export type ThemeMode = 'dark' | 'light';

export function applyThemeClass(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark);
}

export function readStoredTheme(): ThemeMode | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    if (t === 'light' || t === 'dark') return t;
  } catch {
    /* ignore */
  }
  return null;
}

export function getSystemDarkPreference(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function themeInitScript(): string {
  const k = JSON.stringify(THEME_STORAGE_KEY);
  return `(function(){try{var k=${k};var t=localStorage.getItem(k);var d;if(t==="light")d=false;else if(t==="dark")d=true;else d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
}
