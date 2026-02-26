import { useState, useEffect } from 'react';
import { getAllWidgets, WidgetDefinition } from '../components/widgets/widgetRegistry';
import { HudPanel, HudGlowText } from '../components/hud';
import { DEFAULT_LAYOUT, WidgetInstance } from '../components/widgets/WidgetGrid';

const WidgetStore = () => {
  const allWidgets = getAllWidgets();
  const [installedWidgets, setInstalledWidgets] = useState<string[]>([]);

  // Load current widget layout to see what's installed
  useEffect(() => {
    const savedLayout = localStorage.getItem('nexushud-widget-layout');
    if (savedLayout) {
      try {
        const layout: WidgetInstance[] = JSON.parse(savedLayout);
        const widgetTypes = layout.map(w => w.widgetType);
        setInstalledWidgets(widgetTypes);
      } catch (e) {
        console.error('Failed to load layout:', e);
        setInstalledWidgets(DEFAULT_LAYOUT.map(w => w.widgetType));
      }
    } else {
      setInstalledWidgets(DEFAULT_LAYOUT.map(w => w.widgetType));
    }
  }, []);

  const isInstalled = (widgetId: string) => {
    return installedWidgets.includes(widgetId);
  };

  const handleAddWidget = (widget: WidgetDefinition) => {
    const savedLayout = localStorage.getItem('nexushud-widget-layout');
    let currentLayout: WidgetInstance[] = savedLayout ? JSON.parse(savedLayout) : DEFAULT_LAYOUT;

    // Generate unique id for this widget instance
    const existingCount = currentLayout.filter(w => w.widgetType === widget.id).length;
    const newId = `${widget.id}-${existingCount + 1}`;

    // Find an empty spot on the grid (simple algorithm)
    const maxY = Math.max(...currentLayout.map(w => w.layout.y + w.layout.h), 0);
    
    const newWidget: WidgetInstance = {
      id: newId,
      widgetType: widget.id,
      layout: {
        i: newId,
        x: 0,
        y: maxY,
        w: widget.defaultSize.w,
        h: widget.defaultSize.h,
        minW: widget.minSize.w,
        minH: widget.minSize.h,
      },
    };

    currentLayout.push(newWidget);
    localStorage.setItem('nexushud-widget-layout', JSON.stringify(currentLayout));
    setInstalledWidgets([...installedWidgets, widget.id]);
  };

  const handleRemoveWidget = (widgetId: string) => {
    const savedLayout = localStorage.getItem('nexushud-widget-layout');
    if (!savedLayout) return;

    let currentLayout: WidgetInstance[] = JSON.parse(savedLayout);
    
    // Remove the first instance of this widget type
    const indexToRemove = currentLayout.findIndex(w => w.widgetType === widgetId);
    if (indexToRemove !== -1) {
      currentLayout.splice(indexToRemove, 1);
      localStorage.setItem('nexushud-widget-layout', JSON.stringify(currentLayout));
      
      // Update installed list
      const remainingTypes = currentLayout.map(w => w.widgetType);
      setInstalledWidgets(remainingTypes);
    }
  };

  const getWidgetCount = (widgetId: string) => {
    return installedWidgets.filter(id => id === widgetId).length;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          <HudGlowText pulse>Widget Store</HudGlowText>
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Add or remove widgets from your dashboard. Drag and resize them on the Dashboard page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allWidgets.map((widget) => {
          const installed = isInstalled(widget.id);
          const count = getWidgetCount(widget.id);

          return (
            <HudPanel key={widget.id} className="hover:border-[var(--color-accent-primary)]/50 transition-all">
              <div className="p-6 space-y-4">
                {/* Widget Header */}
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{widget.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{widget.name}</h3>
                    {installed && (
                      <span className="text-xs text-[var(--color-accent-primary)]">
                        {count} installed
                      </span>
                    )}
                  </div>
                </div>

                {/* Widget Preview */}
                <div className="h-32 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg flex items-center justify-center">
                  <span className="text-[var(--color-text-secondary)]">Preview</span>
                </div>

                {/* Widget Info */}
                <div className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <p>Default Size: {widget.defaultSize.w} × {widget.defaultSize.h}</p>
                  <p>Min Size: {widget.minSize.w} × {widget.minSize.h}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddWidget(widget)}
                    className="flex-1 px-4 py-2 bg-[var(--color-accent-primary)]/20 border border-[var(--color-accent-primary)] rounded-lg hover:bg-[var(--color-accent-primary)]/30 transition-colors"
                  >
                    <span className="mr-2">+</span>
                    Add
                  </button>
                  {installed && (
                    <button
                      onClick={() => handleRemoveWidget(widget.id)}
                      className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg hover:bg-red-500/30 transition-colors text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </HudPanel>
          );
        })}
      </div>

      <div className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-accent-primary)]/30 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Pro Tip</h2>
        <p className="text-[var(--color-text-secondary)]">
          You can add multiple instances of the same widget! Each widget can be positioned and resized independently on your dashboard.
        </p>
      </div>
    </div>
  );
};

export default WidgetStore;
