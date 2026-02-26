# NexusHUD

A Jarvis/Iron Man style AI command center with MySpace-style customizable profiles.

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── Layout.tsx  # Main layout with sidebar and topbar
├── pages/          # Route pages
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── Settings.tsx
│   └── Login.tsx
├── context/        # React contexts
│   └── AuthContext.tsx
├── types/          # TypeScript types
│   └── index.ts
├── styles/         # Global styles
│   └── index.css
├── App.tsx         # Main app component with routes
└── main.tsx        # Entry point
```

## Features

- ✅ Dark theme with customizable CSS variables
- ✅ Responsive sidebar (collapsible on mobile)
- ✅ Top bar with user avatar and notifications
- ✅ React Router navigation
- ✅ Mock authentication context
- ✅ Tailwind CSS styling
- ✅ TypeScript support

## Theme Customization

Edit CSS variables in `src/styles/index.css`:

```css
:root {
  --color-bg-primary: #0a0a0f;
  --color-accent-primary: #00d4ff;
  --color-accent-secondary: #0066ff;
  /* ... */
}
```

## Next Steps

This is the foundation scaffold. Features to be added:
- Widgets system
- AI chat integration
- Advanced profile customization
- Real authentication
- Data persistence
