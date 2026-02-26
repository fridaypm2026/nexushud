# NexusHUD Component Library

A premium Jarvis/Iron Man style HUD component library with pure CSS animations and React components.

## Installation

```tsx
import {
  HudPanel,
  HudButton,
  HudCircularGauge,
  HudDataStream,
  HudGrid,
  HudGlowText,
  HudLoadingRing,
  HudScanLine,
} from './components/hud';
```

## Components

### HudPanel

A container with sci-fi borders, corner accents, and subtle glow effects.

```tsx
<HudPanel title="System Status" variant="default">
  <p>Content goes here</p>
</HudPanel>

// Variants: 'default' | 'warning' | 'success'
<HudPanel title="Alert" variant="warning">
  <p>Warning message</p>
</HudPanel>
```

**Props:**
- `title?: string` - Optional panel title
- `children: React.ReactNode` - Panel content
- `variant?: 'default' | 'warning' | 'success'` - Visual style
- `className?: string` - Additional CSS classes

---

### HudButton

Futuristic button with hover glow and scan-line animation.

```tsx
<HudButton onClick={() => console.log('Clicked')}>
  Activate
</HudButton>

// Variants
<HudButton variant="primary">Primary</HudButton>
<HudButton variant="secondary">Secondary</HudButton>
<HudButton variant="accent">Accent</HudButton>
<HudButton disabled>Disabled</HudButton>
```

**Props:**
- `children: React.ReactNode` - Button text
- `onClick?: () => void` - Click handler
- `variant?: 'primary' | 'secondary' | 'accent'` - Button style
- `disabled?: boolean` - Disabled state
- `className?: string` - Additional CSS classes

---

### HudCircularGauge

Animated circular progress indicator (like Iron Man suit power level).

```tsx
<HudCircularGauge 
  value={75} 
  label="Power"
  color="var(--hud-primary)"
  size={120}
/>

// Custom colors
<HudCircularGauge 
  value={100} 
  label="Shield"
  color="#00ff88"
  size={80}
/>
```

**Props:**
- `value: number` - Progress value (0-100)
- `label?: string` - Label below the value
- `color?: string` - Gauge color (default: var(--hud-primary))
- `size?: number` - Diameter in pixels (default: 120)
- `className?: string` - Additional CSS classes

---

### HudDataStream

Scrolling text/numbers effect like data flowing through a terminal.

```tsx
<HudDataStream speed="normal" density="medium" />

// Fast, high-density stream
<HudDataStream speed="fast" density="high" />
```

**Props:**
- `speed?: 'slow' | 'normal' | 'fast'` - Animation speed
- `density?: 'low' | 'medium' | 'high'` - Number of data lines
- `className?: string` - Additional CSS classes

---

### HudGrid

Animated grid background with subtle pulse effect (Tron/Iron Man style).

```tsx
<HudGrid>
  <div>Your content here</div>
</HudGrid>

// Custom grid size and opacity
<HudGrid gridSize={50} opacity={0.5}>
  <div>Content overlaid on grid</div>
</HudGrid>
```

**Props:**
- `children?: React.ReactNode` - Content to overlay on grid
- `gridSize?: number` - Size of grid cells in pixels (default: 40)
- `opacity?: number` - Grid opacity 0-1 (default: 0.3)
- `className?: string` - Additional CSS classes

---

### HudGlowText

Text with neon glow effect and optional pulse/flicker animations.

```tsx
<HudGlowText>STATUS: ONLINE</HudGlowText>

// With pulse animation
<HudGlowText pulse size="large" color="var(--hud-accent)">
  ALERT
</HudGlowText>

// With flicker effect
<HudGlowText flicker color="#ff3366">
  WARNING
</HudGlowText>
```

**Props:**
- `children: React.ReactNode` - Text content
- `color?: string` - Glow color (default: var(--hud-primary))
- `pulse?: boolean` - Enable pulse animation
- `flicker?: boolean` - Enable flicker effect
- `size?: 'small' | 'medium' | 'large'` - Text size
- `className?: string` - Additional CSS classes

---

### HudLoadingRing

Circular loading spinner with arc reactor style.

```tsx
<HudLoadingRing />

// Custom size and color
<HudLoadingRing size={80} color="var(--hud-accent)" />
```

**Props:**
- `size?: number` - Diameter in pixels (default: 60)
- `color?: string` - Ring color (default: var(--hud-primary))
- `className?: string` - Additional CSS classes

---

### HudScanLine

Horizontal scan line that sweeps across parent container.

```tsx
<div style={{ position: 'relative' }}>
  <HudScanLine />
  <p>Content with scan line effect</p>
</div>

// Custom speed and appearance
<HudScanLine 
  speed="fast" 
  color="var(--hud-accent)"
  height={3}
  opacity={0.8}
/>
```

**Props:**
- `speed?: 'slow' | 'normal' | 'fast'` - Animation speed
- `color?: string` - Scan line color (default: var(--hud-primary))
- `height?: number` - Height in pixels (default: 2)
- `opacity?: number` - Opacity 0-1 (default: 0.6)
- `className?: string` - Additional CSS classes

---

## CSS Variables

Customize the theme by overriding these CSS variables:

```css
:root {
  --hud-primary: #00d4ff;    /* Cyan - primary accent */
  --hud-secondary: #0066ff;  /* Blue - secondary accent */
  --hud-accent: #ff3366;     /* Pink/Red - warning/alert */
  --hud-bg: #0a0a0f;         /* Dark background */
}
```

## Example Layout

```tsx
function Dashboard() {
  return (
    <HudGrid>
      <div style={{ padding: '2rem' }}>
        <HudPanel title="System Overview">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <HudCircularGauge value={85} label="Power" />
            <HudCircularGauge value={92} label="Shield" color="#00ff88" />
            <HudCircularGauge value={67} label="Weapons" color="var(--hud-accent)" />
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <HudGlowText size="small" pulse>
              ALL SYSTEMS OPERATIONAL
            </HudGlowText>
          </div>
        </HudPanel>

        <HudPanel title="Data Stream" variant="default">
          <HudDataStream speed="normal" density="medium" />
        </HudPanel>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <HudButton variant="primary">Activate</HudButton>
          <HudButton variant="secondary">Standby</HudButton>
          <HudButton variant="accent">Emergency</HudButton>
        </div>

        <HudLoadingRing />
      </div>
      <HudScanLine speed="slow" />
    </HudGrid>
  );
}
```

## Features

✨ **Pure CSS Animations** - No heavy JavaScript libraries
🎨 **Customizable Colors** - CSS variables for easy theming
📱 **Mobile Responsive** - Scales beautifully on all devices
⚡ **Premium Effects** - Glow, pulse, flicker, scan lines
🚀 **TypeScript Ready** - Full type definitions included
🎯 **Zero Dependencies** - Just React and CSS

## Notes

- All components use CSS modules to avoid style conflicts
- Shared animations are in `hud-effects.css`
- Parent containers should have `position: relative` for HudScanLine
- Components are optimized for dark backgrounds
