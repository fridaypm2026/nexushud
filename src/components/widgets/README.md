# NexusHUD Widget System

A customizable, drag-and-drop widget framework for the NexusHUD AI dashboard with HUD-style theming.

## 🏗️ Architecture

### Core Framework

#### **WidgetGrid.tsx**
The main container component that manages the grid layout using `react-grid-layout`.

**Features:**
- Drag-and-drop widget positioning
- Resize widgets with mouse
- Saves layout to localStorage
- Mobile responsive (single column on small screens)
- DEFAULT_LAYOUT constant with sensible initial positions

**Usage:**
```tsx
import { WidgetGrid } from './components/widgets';

function App() {
  return <WidgetGrid />;
}
```

#### **WidgetWrapper.tsx**
A wrapper component that provides HUD-style borders, title bar, and controls for every widget.

**Features:**
- HUD-style border using HudPanel
- Title bar with widget name
- Minimize/maximize button
- Close button
- Resize handle indicator

#### **widgetRegistry.ts**
Central registry for all available widgets.

**Structure:**
```typescript
interface WidgetDefinition {
  id: string;
  name: string;
  icon: string;
  component: ComponentType<any>;
  defaultSize: WidgetSize;
  minSize: WidgetSize;
}
```

**Helper Functions:**
- `getWidgetById(id: string)` - Retrieve widget definition
- `getAllWidgets()` - Get all registered widgets

## 📦 Built-in Widgets

### 1. **ClockWidget** 🕐
Digital clock with date and timezone display.

**Features:**
- Real-time clock updates every second
- Shows full date (weekday, month, day, year)
- Displays timezone abbreviation
- HUD-style glowing cyan text

### 2. **CryptoWidget** ₿
Live cryptocurrency prices from CoinGecko API.

**Tracked Coins:**
- Bitcoin (BTC)
- Ethereum (ETH)
- Solana (SOL)

**Features:**
- Real-time price updates (auto-refresh every 60s)
- 24-hour price change percentage
- Color-coded changes (green = up, red = down)
- Error handling and loading states

**API:** `https://api.coingecko.com/api/v3/simple/price`

### 3. **WeatherWidget** 🌤️
Current weather conditions from wttr.in API.

**Features:**
- Current temperature (°F and °C)
- Weather condition description
- Feels like temperature
- Humidity percentage
- Wind speed
- Location display
- Auto-refresh every 30 minutes

**API:** `https://wttr.in/?format=j1`

### 4. **AiChatWidget** 💬
Simple chat interface for AI interactions.

**Features:**
- Message history display
- User/AI message bubbles with HUD styling
- Input field with Enter-to-send
- Timestamps on messages
- Auto-scroll to latest message
- **Currently:** Echo responses (mock)
- **Future:** Real AI integration

### 5. **SystemStatusWidget** 📊
Displays system metrics with animated circular gauges.

**Metrics:**
- CPU usage
- RAM usage
- Network activity

**Features:**
- Uses HudCircularGauge component
- Color-coded gauges (green/yellow/red based on usage)
- Animated updates every 2 seconds
- System status and uptime display
- **Note:** Currently shows simulated data

### 6. **NewsWidget** 📰
Scrolling news feed with categorized items.

**Features:**
- Placeholder news items with HUD styling
- Category badges with color coding
- Source and timestamp for each item
- Scrollable list
- Hover effects
- "LIVE" indicator badge
- **Future:** Real news API integration

### 7. **NotepadWidget** 📝
Simple text editor with local storage persistence.

**Features:**
- Multi-line text editor
- Auto-save to localStorage
- Word and character count
- Clear button with confirmation
- HUD-styled textarea
- Monospace font for code/notes

**Storage Key:** `nexushud-notepad-content`

## 🎨 HUD Styling

All widgets use a consistent HUD (Heads-Up Display) theme:

**Color Palette:**
- Primary: Cyan (`rgba(0, 255, 255, *)`)
- Background: Dark blue gradients
- Accents: Neon blues, greens, and cyans
- Text shadows and glows for sci-fi effect

**Common Elements:**
- Transparent/translucent backgrounds
- Glowing borders
- Monospace fonts for data displays
- Smooth transitions and animations
- Hover effects with glow

## 📱 Mobile Responsive

The widget grid automatically adapts to mobile screens:
- Single column layout on screens < 768px
- Disables drag-and-drop on mobile
- Disables resizing on mobile
- Vertical stacking with proper spacing

## 💾 Data Persistence

**Widget Layout:**
- Stored in localStorage under `nexushud-widget-layout`
- Saves widget positions, sizes, and IDs
- Automatically restores on page reload

**Widget-Specific Data:**
- NotepadWidget: Saves content to `nexushud-notepad-content`
- Each widget manages its own localStorage keys

## 🔧 Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

**Required dependencies** (already added to package.json):
- `react-grid-layout` - Drag-and-drop grid layout
- `react-resizable` - Resizable components
- `@types/react-grid-layout` - TypeScript types

## 🚀 Usage

### Import the Widget Grid
```tsx
import { WidgetGrid } from './components/widgets';

function Dashboard() {
  return (
    <div className="app">
      <WidgetGrid />
    </div>
  );
}
```

### Import Individual Widgets
```tsx
import { 
  ClockWidget, 
  CryptoWidget, 
  WeatherWidget 
} from './components/widgets';

// Use standalone widgets
<ClockWidget />
```

### Access the Registry
```tsx
import { widgetRegistry, getAllWidgets } from './components/widgets';

// Get all available widgets
const widgets = getAllWidgets();

// Get specific widget
const clockWidget = widgetRegistry.clock;
```

## 🎯 Adding New Widgets

1. **Create the widget component** (`MyWidget.tsx`):
```tsx
import React from 'react';
import styles from './MyWidget.module.css';

export const MyWidget: React.FC = () => {
  return (
    <div className={styles.myWidget}>
      {/* Your widget content */}
    </div>
  );
};
```

2. **Create the CSS module** (`MyWidget.module.css`):
```css
.myWidget {
  /* HUD-style theming */
  color: rgba(0, 255, 255, 0.9);
  background: rgba(0, 50, 100, 0.3);
  /* ... */
}
```

3. **Register in widgetRegistry.ts**:
```typescript
import { MyWidget } from './MyWidget';

export const widgetRegistry: Record<string, WidgetDefinition> = {
  // ... existing widgets
  mywidget: {
    id: 'mywidget',
    name: 'My Widget',
    icon: '🎯',
    component: MyWidget,
    defaultSize: { w: 3, h: 3 },
    minSize: { w: 2, h: 2 },
  },
};
```

4. **Export from index.ts**:
```typescript
export { MyWidget } from './MyWidget';
```

## 📐 Grid System

The grid uses a **12-column layout** with these parameters:
- **Columns:** 12 (desktop), 1 (mobile)
- **Row Height:** 100px
- **Margin:** [10px, 10px]
- **Container Padding:** [10px, 10px]

Widget sizes are defined as `{ w: columns, h: rows }`.

## 🔄 Default Layout

Initial widget arrangement (see `DEFAULT_LAYOUT` in WidgetGrid.tsx):
- Clock (top-left, 2x2)
- Crypto (center-top, 3x3)
- Weather (top-right, 2x3)
- System Status (left-middle, 3x3)
- AI Chat (right-side, 4x4)
- News Feed (center-bottom, 3x4)
- Notepad (bottom-left, 3x3)

## 🐛 Troubleshooting

### Widgets not appearing
- Check console for import errors
- Ensure widget is registered in `widgetRegistry.ts`
- Verify component is exported in `index.ts`

### Layout not saving
- Check browser localStorage is enabled
- Verify localStorage key: `nexushud-widget-layout`
- Clear browser cache and reload

### Drag/resize not working
- Ensure you're on desktop (>768px width)
- Check `react-grid-layout` CSS is imported
- Verify WidgetWrapper isn't blocking pointer events

## 🎨 CSS Modules

Each widget uses CSS Modules for scoped styling:
- Prevents style conflicts
- Co-located with components
- HUD theme variables can be centralized
- Use `:global()` for react-grid-layout overrides

## 📝 TypeScript

All components are fully typed:
- Widget props interfaces
- Grid layout types from `react-grid-layout`
- API response interfaces for data fetching widgets

## 🔮 Future Enhancements

- [ ] Widget settings/configuration panels
- [ ] Add/remove widgets dynamically
- [ ] Multiple dashboard layouts (tabs/pages)
- [ ] Export/import layout configurations
- [ ] Real AI integration for AiChatWidget
- [ ] Real news API for NewsWidget
- [ ] Real system metrics for SystemStatusWidget
- [ ] Widget marketplace/plugin system
- [ ] Themes and color customization
- [ ] Keyboard shortcuts
- [ ] Widget search and filter

## 📄 License

Part of the NexusHUD project.

---

**Built with:** React, TypeScript, react-grid-layout, and lots of neon glow effects ✨
