'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import { DESKTOP_APPS } from '@/components/macos/constants';
import type { WindowState } from '@/components/macos/types';
import type { AppId } from '@/types/apps';

interface StoreState {
  windows: WindowState[];
  nextZ: number;
  activeId: string | null;
}

type Action =
  | { type: 'OPEN'; appId: AppId }
  | { type: 'CLOSE'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'RESTORE'; id: string }
  | { type: 'MAXIMIZE'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'MOVE'; id: string; x: number; y: number }
  | { type: 'RESIZE'; id: string; width: number; height: number };

function getApp(appId: AppId) {
  return DESKTOP_APPS.find((a) => a.id === appId);
}

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case 'OPEN': {
      const existing = state.windows.find(
        (w) => w.appId === action.appId && !w.minimized
      );
      if (existing) {
        return {
          ...state,
          activeId: existing.id,
          nextZ: state.nextZ + 1,
          windows: state.windows.map((w) =>
            w.id === existing.id
              ? { ...w, zIndex: state.nextZ + 1, minimized: false }
              : w
          ),
        };
      }
      const minimized = state.windows.find(
        (w) => w.appId === action.appId && w.minimized
      );
      if (minimized) {
        return {
          ...state,
          activeId: minimized.id,
          nextZ: state.nextZ + 1,
          windows: state.windows.map((w) =>
            w.id === minimized.id
              ? { ...w, minimized: false, zIndex: state.nextZ + 1 }
              : w
          ),
        };
      }
      const app = getApp(action.appId);
      if (!app) return state;
      const offset = state.windows.length * 24;
      const id = `${action.appId}-${Date.now()}`;
      const win: WindowState = {
        id,
        appId: action.appId,
        title: app.windowTitle,
        x: 80 + offset,
        y: 48 + offset,
        width: app.defaultSize.width,
        height: app.defaultSize.height,
        zIndex: state.nextZ + 1,
        minimized: false,
        maximized: false,
      };
      return {
        windows: [...state.windows, win],
        nextZ: state.nextZ + 1,
        activeId: id,
      };
    }
    case 'CLOSE':
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
        activeId: state.activeId === action.id ? null : state.activeId,
      };
    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
        activeId: state.activeId === action.id ? null : state.activeId,
      };
    case 'RESTORE':
      return {
        ...state,
        nextZ: state.nextZ + 1,
        activeId: action.id,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, minimized: false, zIndex: state.nextZ + 1 }
            : w
        ),
      };
    case 'MAXIMIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, maximized: !w.maximized } : w
        ),
      };
    case 'FOCUS':
      return {
        ...state,
        nextZ: state.nextZ + 1,
        activeId: action.id,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, zIndex: state.nextZ + 1 } : w
        ),
      };
    case 'MOVE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w
        ),
      };
    case 'RESIZE':
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id
            ? { ...w, width: action.width, height: action.height }
            : w
        ),
      };
    default:
      return state;
  }
}

interface WindowContextValue {
  windows: WindowState[];
  activeId: string | null;
  openApp: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
}

const WindowContext = createContext<WindowContextValue | null>(null);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    windows: [],
    nextZ: 10,
    activeId: null,
  });

  const openApp = useCallback((appId: AppId) => {
    dispatch({ type: 'OPEN', appId });
  }, []);

  const value = useMemo<WindowContextValue>(
    () => ({
      windows: state.windows,
      activeId: state.activeId,
      openApp,
      closeWindow: (id) => dispatch({ type: 'CLOSE', id }),
      minimizeWindow: (id) => dispatch({ type: 'MINIMIZE', id }),
      restoreWindow: (id) => dispatch({ type: 'RESTORE', id }),
      toggleMaximize: (id) => dispatch({ type: 'MAXIMIZE', id }),
      focusWindow: (id) => dispatch({ type: 'FOCUS', id }),
      moveWindow: (id, x, y) => dispatch({ type: 'MOVE', id, x, y }),
      resizeWindow: (id, width, height) =>
        dispatch({ type: 'RESIZE', id, width, height }),
    }),
    [state.windows, state.activeId, openApp]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}

export function useWindows() {
  const ctx = useContext(WindowContext);
  if (!ctx) throw new Error('useWindows must be used within WindowProvider');
  return ctx;
}
