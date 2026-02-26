# NexusHUD Branding Assets

## 🎨 Created SVG Assets

All assets follow the Jarvis/Iron Man futuristic aesthetic with cyan (#00d4ff) glows on dark (#0a0a0f) backgrounds.

### 1. **app-icon.svg** (512x512)
**The main application icon**
- Hexagonal frame (futuristic geometric shape)
- Arc reactor-inspired concentric rings
- Stylized "N" formed by neural network nodes and connections
- Multiple glow effects and filters for premium look
- Scales perfectly from 16px to 512px
- **Use for:** App icon, PWA manifest, general branding

### 2. **favicon.svg** (64x64)
**Simplified browser tab icon**
- Compact hexagon with simplified "N"
- Optimized for 16x16 display in browser tabs
- Maintains recognizability at tiny sizes
- **Use for:** Browser favicon (already linked in index.html)

### 3. **logo-full.svg** (800x300)
**Complete horizontal logo with icon and text**
- Icon on left + "NEXUS HUD" text on right
- "AI COMMAND CENTER" subtitle
- Gradient text effects with glow
- **Use for:** Website headers, marketing materials, about pages

### 4. **logo-text.svg** (600x180)
**Text-only wordmark**
- "NEXUS HUD" with futuristic gradient
- No icon, just typography
- **Use for:** Minimal branding contexts, footers, text-based layouts

### 5. **splash-screen.svg** (1920x1080)
**Full-screen loading/splash screen**
- Large centered icon with animated pulse effects
- "NEXUS HUD" title
- "AI COMMAND CENTER" subtitle
- "INITIALIZING..." with animated dots
- Subtle grid background and scan line animation
- **Use for:** App loading screen, full-screen intro

## 🔧 Usage

### In Your React App

```tsx
// Import as React component (if using SVGR)
import AppIcon from './public/icons/app-icon.svg?react';
import SplashScreen from './public/icons/splash-screen.svg?react';

// Or as image URL
<img src="/icons/app-icon.svg" alt="NexusHUD" />
```

### As Background/Hero

```css
.splash-screen {
  background-image: url('/icons/splash-screen.svg');
  background-size: cover;
  background-position: center;
}

.logo {
  content: url('/icons/logo-full.svg');
  width: 400px;
  height: auto;
}
```

## 🖼️ Generating PNG Icons

Run the provided script to generate all required PNG sizes:

```bash
cd /data/.openclaw/workspace/app/public/icons/
./generate-icons.sh
```

This will create:
- **PWA icons:** 72, 96, 128, 144, 152, 192, 384, 512px (PNG)
- **Apple Touch Icon:** 180x180px (PNG)
- **Favicon:** Multi-size ICO (16, 32, 48px)

**Requirements:** ImageMagick (`convert` command)
- Debian/Ubuntu: `sudo apt-get install imagemagick`
- macOS: `brew install imagemagick`

## 🎨 Color Palette

```css
:root {
  --nexus-cyan: #00d4ff;        /* Primary brand color */
  --nexus-cyan-bright: #00aaff; /* Bright variant */
  --nexus-cyan-dark: #0088cc;   /* Dark variant */
  --nexus-dark-bg: #0a0a0f;     /* Dark background */
  --nexus-white: #ffffff;       /* Highlights/text */
}
```

## ✨ Design Features

### Premium Quality Elements
- **Gradients:** Radial and linear gradients for depth
- **Glow effects:** SVG filters for authentic neon/holographic feel
- **Animations:** Pulse, fade, and scan line effects (splash-screen.svg)
- **Scalability:** Vector-based, crisp at any size
- **Layering:** Multiple opacity layers for sophisticated depth

### Technical Specs
- All SVGs use proper viewBox for responsive scaling
- IDs namespaced to avoid conflicts when embedded
- Filters optimized for performance
- Compatible with all modern browsers
- No external dependencies

## 📱 Already Integrated

✅ `index.html` updated with:
- Favicon link → `/icons/favicon.svg`
- Title → "NexusHUD — AI Command Center"

## 🚀 Next Steps

1. **Run generate-icons.sh** to create PNG versions
2. **Update manifest.json** with new icon paths
3. **Test across devices** (desktop, mobile, PWA install)
4. **Consider creating:**
   - Animated logo variants (with CSS/SMIL)
   - Social media profile pictures (1:1 square crop)
   - Open Graph images (1200x630px)
   - Loading spinners based on the arc reactor design

---

**Created:** 2026-02-26  
**Style:** Jarvis/Iron Man futuristic AI aesthetic  
**Format:** SVG (vector, scalable, web-optimized)  
**License:** Project-specific, do not redistribute without authorization
