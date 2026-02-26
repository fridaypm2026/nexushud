# NexusHUD Profile & Social System

A MySpace-inspired, Jarvis-style customizable profile system with advanced theming capabilities.

## 🎨 Components

### 1. **ProfilePage.tsx**
Full-featured MySpace-style profile page with:
- **Banner Header** - Customizable gradient background
- **Avatar** - Circular with animated HUD glow ring
- **User Info** - Username, bio, status message
- **Activity Fields** - "Currently listening/watching/playing" (classic MySpace!)
- **Stats Display** - Widgets created, days active, theme downloads, profile views
- **Top 8 Friends** - Grid layout just like MySpace
- **Visitor Counter** - Retro digital counter with flicker effect
- **Sidebar** - Online friends list

**Usage:**
```tsx
import { ProfilePage } from '@/components/profile';

<ProfilePage onEdit={() => setEditMode(true)} />
```

### 2. **ProfileEditor.tsx**
Complete profile editing interface with:
- All profile fields (username, avatar URL, bio, status)
- MySpace activity fields (listening/watching/playing)
- Banner gradient CSS editor
- Theme color pickers (primary, secondary, accent, background, text)
- **Live Preview Pane** - See changes in real-time
- Save/Cancel buttons

**Usage:**
```tsx
import { ProfileEditor } from '@/components/profile';

<ProfileEditor
  onSave={(profile) => console.log('Saved:', profile)}
  onCancel={() => setEditMode(false)}
/>
```

### 3. **ProfileCard.tsx**
Mini profile card for feeds and friend lists:
- Avatar with glow effect
- Username and status
- Online/offline indicator with pulse animation
- Hover effects with corner decorations

**Usage:**
```tsx
import { ProfileCard } from '@/components/profile';

<ProfileCard
  profile={friendData}
  onClick={() => viewProfile(friendData.id)}
/>
```

### 4. **ThemeCustomizer.tsx**
Advanced theme editor with:
- **8 Preset Themes:**
  - Jarvis Blue (default cyan HUD)
  - Arc Reactor (bright blue)
  - Cyberpunk (pink/purple/yellow)
  - Matrix (green terminal)
  - Solar Flare (orange/red)
  - Midnight (deep blue)
  - Neon Pink (hot pink)
  - Stealth (grayscale)
- **Custom Theme Builder** - Full color control
- **Live Preview** - See theme applied in real-time
- **Save/Load System** - Store custom themes in localStorage
- **Global Application** - Updates CSS variables across entire app

**Usage:**
```tsx
import { ThemeCustomizer } from '@/components/profile';

<ThemeCustomizer
  onApply={(theme) => console.log('Theme applied:', theme)}
/>
```

## 📦 Type Definitions

### UserProfile
```typescript
interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  status: string;
  currentlyListening: string;
  currentlyWatching: string;
  currentlyPlaying: string;
  theme: Theme;
  bannerGradient: string;
  stats: ProfileStats;
  topFriends: Friend[];
  visitorCount: number;
  createdAt: string;
  lastActive: string;
  isOnline: boolean;
}
```

### Theme
```typescript
interface Theme {
  id: string;
  name: string;
  primary: string;      // Main glow color
  secondary: string;    // Supporting color
  accent: string;       // Highlight color
  background: string;   // Background color
  textColor: string;    // Text color
}
```

## 💾 Data Storage

All data is stored in localStorage:

- `nexushud_profile` - User profile data
- `nexushud_theme` - Active theme
- `nexushud_custom_themes` - Array of saved custom themes

## 🎨 Styling

### HUD Aesthetic
All components follow the premium HUD design language:
- **Dark Backgrounds** - `rgba(10, 10, 15, 0.85)` with blur
- **Cyan Glow Borders** - Primary color with box-shadow
- **Corner Decorations** - L-shaped corner markers
- **Animations** - Pulse, glow, shimmer, scanline effects
- **CSS Modules** - Scoped styling for each component

### CSS Variables
Themes modify global CSS variables:
```css
--hud-primary: #00d4ff;
--hud-secondary: #0088cc;
--hud-accent: #ff3366;
--hud-background: #0a0a0f;
--hud-text: #e0e0e0;
```

## 🚀 Integration Example

```tsx
import { useState } from 'react';
import {
  ProfilePage,
  ProfileEditor,
  ThemeCustomizer,
  UserProfile,
} from '@/components/profile';

function App() {
  const [mode, setMode] = useState<'view' | 'edit' | 'theme'>('view');

  return (
    <div>
      {mode === 'view' && (
        <ProfilePage onEdit={() => setMode('edit')} />
      )}
      
      {mode === 'edit' && (
        <ProfileEditor
          onSave={() => setMode('view')}
          onCancel={() => setMode('view')}
        />
      )}
      
      {mode === 'theme' && (
        <ThemeCustomizer
          onApply={(theme) => console.log('Theme applied:', theme)}
        />
      )}
    </div>
  );
}
```

## ✨ Features

### MySpace Nostalgia
- Top 8 friends grid
- "Currently listening/watching/playing" fields
- Visitor counter
- Customizable banner and colors
- Profile comments section (future)

### Modern Enhancements
- Jarvis-style HUD interface
- Real-time preview
- Advanced theming system
- Responsive design
- Smooth animations
- localStorage persistence

### Accessibility
- Semantic HTML
- ARIA labels (to be added)
- Keyboard navigation support
- High contrast mode compatible

## 🔮 Future Enhancements

- Profile comments/wall posts
- Friend requests system
- Activity feed
- Theme marketplace
- Profile music player
- Background music support
- Profile badges/achievements
- GIF/image uploads
- Profile widgets
- Social feed integration

## 📱 Responsive Design

All components are fully responsive:
- **Desktop** - Full layout with sidebar
- **Tablet** - Stacked layout
- **Mobile** - Single column, optimized touch targets

## 🛠️ Development Notes

- Built with React + TypeScript
- Styled with CSS Modules
- Zero external dependencies (beyond React)
- ~64KB total (uncompressed)
- Follows NexusHUD design system
- Compatible with Vite + Tailwind

---

**Built with 💙 for NexusHUD - The AI Dashboard of the Future**
