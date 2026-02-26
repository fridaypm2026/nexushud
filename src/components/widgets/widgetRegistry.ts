import { ComponentType } from 'react';
import { ClockWidget } from './ClockWidget';
import { CryptoWidget } from './CryptoWidget';
import { WeatherWidget } from './WeatherWidget';
import { AiChatWidget } from './AiChatWidget';
import { SystemStatusWidget } from './SystemStatusWidget';
import { NewsWidget } from './NewsWidget';
import { NotepadWidget } from './NotepadWidget';

export interface WidgetSize {
  w: number;
  h: number;
}

export interface WidgetDefinition {
  id: string;
  name: string;
  icon: string;
  component: ComponentType<any>;
  defaultSize: WidgetSize;
  minSize: WidgetSize;
}

export const widgetRegistry: Record<string, WidgetDefinition> = {
  clock: {
    id: 'clock',
    name: 'Clock',
    icon: '🕐',
    component: ClockWidget,
    defaultSize: { w: 2, h: 2 },
    minSize: { w: 2, h: 2 },
  },
  crypto: {
    id: 'crypto',
    name: 'Crypto Prices',
    icon: '₿',
    component: CryptoWidget,
    defaultSize: { w: 3, h: 3 },
    minSize: { w: 2, h: 2 },
  },
  weather: {
    id: 'weather',
    name: 'Weather',
    icon: '🌤️',
    component: WeatherWidget,
    defaultSize: { w: 2, h: 3 },
    minSize: { w: 2, h: 2 },
  },
  aichat: {
    id: 'aichat',
    name: 'AI Chat',
    icon: '💬',
    component: AiChatWidget,
    defaultSize: { w: 4, h: 4 },
    minSize: { w: 3, h: 3 },
  },
  system: {
    id: 'system',
    name: 'System Status',
    icon: '📊',
    component: SystemStatusWidget,
    defaultSize: { w: 3, h: 3 },
    minSize: { w: 2, h: 2 },
  },
  news: {
    id: 'news',
    name: 'News Feed',
    icon: '📰',
    component: NewsWidget,
    defaultSize: { w: 3, h: 4 },
    minSize: { w: 2, h: 3 },
  },
  notepad: {
    id: 'notepad',
    name: 'Notepad',
    icon: '📝',
    component: NotepadWidget,
    defaultSize: { w: 3, h: 3 },
    minSize: { w: 2, h: 2 },
  },
};

export const getWidgetById = (id: string): WidgetDefinition | undefined => {
  return widgetRegistry[id];
};

export const getAllWidgets = (): WidgetDefinition[] => {
  return Object.values(widgetRegistry);
};
