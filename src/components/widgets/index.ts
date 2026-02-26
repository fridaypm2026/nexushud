// Core framework
export { WidgetGrid, DEFAULT_LAYOUT } from './WidgetGrid';
export { WidgetWrapper } from './WidgetWrapper';
export { widgetRegistry, getWidgetById, getAllWidgets } from './widgetRegistry';
export type { WidgetDefinition, WidgetSize } from './widgetRegistry';

// Individual widgets
export { ClockWidget } from './ClockWidget';
export { CryptoWidget } from './CryptoWidget';
export { WeatherWidget } from './WeatherWidget';
export { AiChatWidget } from './AiChatWidget';
export { SystemStatusWidget } from './SystemStatusWidget';
export { NewsWidget } from './NewsWidget';
export { NotepadWidget } from './NotepadWidget';
