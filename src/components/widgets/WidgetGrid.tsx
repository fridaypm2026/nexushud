import React, { useState, useEffect } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import { WidgetWrapper } from './WidgetWrapper';
import { getWidgetById } from './widgetRegistry';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from './WidgetGrid.module.css';

export interface WidgetInstance {
  id: string;
  widgetType: string;
  layout: Layout;
}

// Default layout for initial widgets
export const DEFAULT_LAYOUT: WidgetInstance[] = [
  {
    id: 'clock-1',
    widgetType: 'clock',
    layout: { i: 'clock-1', x: 0, y: 0, w: 2, h: 2 },
  },
  {
    id: 'crypto-1',
    widgetType: 'crypto',
    layout: { i: 'crypto-1', x: 2, y: 0, w: 3, h: 3 },
  },
  {
    id: 'weather-1',
    widgetType: 'weather',
    layout: { i: 'weather-1', x: 5, y: 0, w: 2, h: 3 },
  },
  {
    id: 'system-1',
    widgetType: 'system',
    layout: { i: 'system-1', x: 0, y: 2, w: 3, h: 3 },
  },
  {
    id: 'aichat-1',
    widgetType: 'aichat',
    layout: { i: 'aichat-1', x: 7, y: 0, w: 4, h: 4 },
  },
  {
    id: 'news-1',
    widgetType: 'news',
    layout: { i: 'news-1', x: 3, y: 3, w: 3, h: 4 },
  },
  {
    id: 'notepad-1',
    widgetType: 'notepad',
    layout: { i: 'notepad-1', x: 0, y: 5, w: 3, h: 3 },
  },
];

const STORAGE_KEY = 'nexushud-widget-layout';

export const WidgetGrid: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetInstance[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Load layout from localStorage or use default
  useEffect(() => {
    const savedLayout = localStorage.getItem(STORAGE_KEY);
    if (savedLayout) {
      try {
        setWidgets(JSON.parse(savedLayout));
      } catch (e) {
        console.error('Failed to load saved layout:', e);
        setWidgets(DEFAULT_LAYOUT);
      }
    } else {
      setWidgets(DEFAULT_LAYOUT);
    }
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Save layout to localStorage
  const saveLayout = (updatedWidgets: WidgetInstance[]) => {
    setWidgets(updatedWidgets);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWidgets));
  };

  // Handle layout change from drag/resize
  const handleLayoutChange = (newLayout: Layout[]) => {
    const updatedWidgets = widgets.map((widget) => {
      const layoutItem = newLayout.find((l) => l.i === widget.id);
      if (layoutItem) {
        return { ...widget, layout: layoutItem };
      }
      return widget;
    });
    saveLayout(updatedWidgets);
  };

  // Close widget
  const handleCloseWidget = (widgetId: string) => {
    const updatedWidgets = widgets.filter((w) => w.id !== widgetId);
    saveLayout(updatedWidgets);
  };

  // Render widget content
  const renderWidget = (widget: WidgetInstance) => {
    const definition = getWidgetById(widget.widgetType);
    if (!definition) return null;

    const WidgetComponent = definition.component;

    return (
      <div key={widget.id} data-grid={widget.layout}>
        <WidgetWrapper
          title={definition.name}
          onClose={() => handleCloseWidget(widget.id)}
        >
          <WidgetComponent />
        </WidgetWrapper>
      </div>
    );
  };

  const layout = widgets.map((w) => w.layout);

  return (
    <div className={styles.gridContainer}>
      <GridLayout
        className={styles.layout}
        layout={layout}
        onLayoutChange={handleLayoutChange}
        cols={isMobile ? 1 : 12}
        rowHeight={100}
        width={isMobile ? window.innerWidth - 20 : 1200}
        isDraggable={!isMobile}
        isResizable={!isMobile}
        compactType={isMobile ? 'vertical' : null}
        preventCollision={!isMobile}
        margin={[10, 10]}
        containerPadding={[10, 10]}
      >
        {widgets.map(renderWidget)}
      </GridLayout>
    </div>
  );
};
