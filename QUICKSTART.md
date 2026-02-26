# NexusHUD - Quick Start Guide 🚀

## 🎯 What You Have

A fully functional Jarvis-style AI dashboard with:
- 7 interactive widgets (Clock, Crypto, Weather, AI Chat, System Status, News, Notepad)
- Draggable & resizable widget grid
- Widget Store to add/remove widgets
- HUD-themed UI with glowing effects and animations
- User authentication system
- Profile customization
- Settings page with widget controls

---

## ⚡ Quick Start

### 1. Start Development Server
```bash
cd /data/.openclaw/workspace/app
npm run dev
```
Visit: **http://localhost:5173/**

### 2. Login
- Default credentials are in `AuthContext.tsx`
- Or create your own user via the auth system

### 3. Explore
- **Dashboard** (/) - See all widgets, drag & resize them
- **Widget Store** (/widgets) - Add or remove widget instances
- **Profile** (/profile) - Customize your profile
- **Settings** (/settings) - Toggle widget visibility, theme options

---

## 📦 Build for Production

```bash
npm run build
```

Output in `/dist/` folder. Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static host

Preview build:
```bash
npm run preview
```

---

## 🎨 Customization

### Change Theme Colors
Edit `/src/styles/index.css`:
```css
:root {
  --color-accent-primary: #00d4ff;  /* Your color */
  --color-accent-secondary: #0066ff; /* Your color */
}
```

### Add New Widgets
1. Create widget component in `/src/components/widgets/`
2. Add to `widgetRegistry.ts`
3. Export from `index.ts`

### Modify Layout
Edit `/src/components/Layout.tsx` for sidebar/topbar changes

---

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS settings
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and scripts

---

## 📱 Mobile/Capacitor (Optional)

Build as mobile app:
```bash
npm run cap:init
npm run cap:android  # or cap:ios
npm run build
npm run cap:sync
```

---

## 🐛 Troubleshooting

### TypeScript errors?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 in use?
```bash
npm run dev -- --port 3000
```

### Build fails?
```bash
npm run build -- --debug
```

---

## 📚 Project Structure

```
app/
├── src/
│   ├── App.tsx .................... Main app + routing
│   ├── main.tsx ................... Entry point
│   ├── components/
│   │   ├── Layout.tsx ............. Sidebar + topbar
│   │   ├── hud/ ................... HUD components
│   │   └── widgets/ ............... All widgets
│   ├── pages/
│   │   ├── Dashboard.tsx .......... Main dashboard
│   │   ├── WidgetStore.tsx ........ Add/remove widgets
│   │   ├── Settings.tsx ........... App settings
│   │   ├── Profile.tsx ............ User profile
│   │   └── Login.tsx .............. Login page
│   ├── context/
│   │   └── AuthContext.tsx ........ Authentication
│   └── styles/
│       └── index.css .............. Global styles
├── public/ ........................ Static assets
└── dist/ .......................... Build output
```

---

## ✨ Features

### Working Now
- ✅ Widget grid (drag & resize)
- ✅ 7 widgets with animations
- ✅ Widget Store
- ✅ Settings & toggles
- ✅ User authentication
- ✅ Profile page
- ✅ HUD styling throughout
- ✅ Responsive design
- ✅ localStorage persistence

### Ready to Add
- API integrations (weather, crypto, news)
- Real-time data feeds
- Notifications system
- More widget types
- Theme customizer (connect Settings to Profile)
- Backend database

---

## 🎬 Demo Flow

1. **Login** → See dashboard
2. **Drag widgets** → Rearrange layout
3. **Resize widgets** → Adjust to preference
4. **Visit Widget Store** → Add new widget instance
5. **Settings** → Toggle widget visibility
6. **Layout persists** → Reload page, layout saved

---

## 💡 Pro Tips

- Hold Shift while resizing to maintain aspect ratio
- Multiple instances of the same widget allowed
- Widget visibility in Settings hides from store, not dashboard
- Layout saved in `localStorage` (survives page reload)
- 404 page has a cool HUD design - try `/random-url`

---

## 🚀 Next Steps

1. Test the app in browser
2. Customize theme colors
3. Add real API keys for widgets
4. Deploy to production
5. Add more widgets as needed

---

## 📞 Support

- Check `INTEGRATION-COMPLETE.md` for full technical details
- Review component code in `/src/components/`
- All TypeScript with full type safety
- CSS Modules for scoped styles

---

**Status:** ✅ READY TO RUN

```bash
npm run dev
```

Enjoy your Jarvis-style AI dashboard! 🎉
