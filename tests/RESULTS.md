
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34m🚀 NEXUSHUD SMOKE TEST SUITE[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[1;33mℹ INFO[0m - Starting comprehensive test suite...
[1;33mℹ INFO[0m - Project directory: /data/.openclaw/workspace/app

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 1: Build Process[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[1;33mℹ INFO[0m - Running npm run build...
[0;32m✓ PASS[0m - Build completed successfully


> nexushud@0.1.0 build
> tsc && vite build

vite v5.4.21 building for production...
transforming...
✓ 171 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.70 kB │ gzip:  0.69 kB
dist/assets/index-Dz19a-dP.css   67.45 kB │ gzip: 12.89 kB
dist/assets/index-BEDeRd2w.js   303.79 kB │ gzip: 91.80 kB
✓ built in 3.42s

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 2: Build Output Validation[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32m✓ PASS[0m - Dist directory exists
[0;32m✓ PASS[0m - index.html exists in dist
[1;33mℹ INFO[0m - Generated files: 2 JavaScript, 1 CSS

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 3: Bundle Size Analysis[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[1;33mℹ INFO[0m - Total gzipped bundle size: 103KB
[0;32m✓ PASS[0m - Bundle size under 500KB (103KB)

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 4: Component Files Validation[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32m✓ PASS[0m - Component exists: ClockWidget.tsx
[0;32m✓ PASS[0m - Component exists: CryptoWidget.tsx
[0;32m✓ PASS[0m - Component exists: WeatherWidget.tsx
[0;32m✓ PASS[0m - Component exists: AiChatWidget.tsx
[0;32m✓ PASS[0m - Component exists: SystemStatusWidget.tsx
[0;32m✓ PASS[0m - Component exists: NewsWidget.tsx
[0;32m✓ PASS[0m - Component exists: NotepadWidget.tsx
[0;32m✓ PASS[0m - Component exists: WidgetGrid.tsx
[0;32m✓ PASS[0m - Component exists: WidgetWrapper.tsx
[0;32m✓ PASS[0m - Component exists: HudPanel.tsx
[0;32m✓ PASS[0m - Component exists: HudButton.tsx
[0;32m✓ PASS[0m - Component exists: HudGlowText.tsx
[0;32m✓ PASS[0m - Component exists: HudCircularGauge.tsx
[0;32m✓ PASS[0m - Component exists: HudLoadingRing.tsx
[0;32m✓ PASS[0m - Component exists: Layout.tsx
[0;32m✓ PASS[0m - Component exists: ProfileEditor.tsx
[0;32m✓ PASS[0m - Component exists: ProfileCard.tsx
[0;32m✓ PASS[0m - Component exists: AiSettings.tsx

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 5: PWA Manifest Validation[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32m✓ PASS[0m - manifest.json is valid JSON
[0;32m✓ PASS[0m - manifest.json has required name fields

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 6: Service Worker Validation[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32m✓ PASS[0m - Service worker (sw.js) exists
[0;32m✓ PASS[0m - Service worker has required event listeners
[0;32m✓ PASS[0m - Service worker implements caching

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 7: Import Resolution Validation[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[1;33mℹ INFO[0m - Scanning for unresolved imports...
[0;32m✓ PASS[0m - All imports resolve correctly

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 8: Source Code Quality Check[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[1;33mℹ INFO[0m - Found 8 console.error statements
[0;32m✓ PASS[0m - No TODO/FIXME comments found

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 9: TypeScript Compilation[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32m✓ PASS[0m - TypeScript compilation successful (no errors)

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 10: Package Configuration[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32m✓ PASS[0m - package.json exists
[0;32m✓ PASS[0m - Script 'dev' defined
[0;32m✓ PASS[0m - Script 'build' defined
[0;32m✓ PASS[0m - Script 'preview' defined
[0;32m✓ PASS[0m - Capacitor mobile scripts present

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 11: Critical Files Check[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32m✓ PASS[0m - Critical file exists: src/App.tsx
[0;32m✓ PASS[0m - Critical file exists: src/main.tsx
[0;32m✓ PASS[0m - Critical file exists: index.html
[0;32m✓ PASS[0m - Critical file exists: vite.config.ts
[0;32m✓ PASS[0m - Critical file exists: tsconfig.json
[0;32m✓ PASS[0m - Critical file exists: package.json

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34mTEST 12: Asset Validation[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32m✓ PASS[0m - Icons directory exists with 8 files
[0;32m✓ PASS[0m - Offline fallback page exists

[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m
[0;34m📊 TEST SUMMARY[0m
[0;34m━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━[0m

[0;32mPassed:[0m 43
[0;31mFailed:[0m 0
[0;34mTotal:[0m  43

[0;34mPass Rate:[0m 100%

[0;32m╔════════════════════════════════════════╗[0m
[0;32m║  ✓ ALL TESTS PASSED - READY TO SHIP!  ║[0m
[0;32m╚════════════════════════════════════════╝[0m

[0;34m╔════════════════════════════════════════════════════════╗[0m
[0;34m║     NEXUSHUD COMPONENT VALIDATION                     ║[0m
[0;34m╚════════════════════════════════════════════════════════╝[0m

[0;34m📦 WIDGET COMPONENTS[0m

[0;32m✓[0m ClockWidget
[0;32m✓[0m CryptoWidget
[0;32m✓[0m WeatherWidget
[0;32m✓[0m AiChatWidget
[0;32m✓[0m SystemStatusWidget
[0;32m✓[0m NewsWidget
[0;32m✓[0m NotepadWidget
[0;32m✓[0m WidgetGrid
[0;32m✓[0m WidgetWrapper

[0;34m🎨 HUD COMPONENTS[0m

[0;32m✓[0m HudPanel
[0;32m✓[0m HudButton
[0;32m✓[0m HudGlowText
[0;32m✓[0m HudCircularGauge
[0;32m✓[0m HudLoadingRing
[0;32m✓[0m HudDataStream
[0;32m✓[0m HudGrid
[0;32m✓[0m HudScanLine

[0;34m👤 PROFILE COMPONENTS[0m

[0;32m✓[0m ProfileEditor
[0;32m✓[0m ProfileCard
[0;32m✓[0m ProfilePage
[0;32m✓[0m ProfileDemo
[0;32m✓[0m ThemeCustomizer

[0;34m⚙️  SETTINGS COMPONENTS[0m

[0;32m✓[0m AiSettings

[0;34m🏗️  LAYOUT COMPONENTS[0m

[0;32m✓[0m Layout
[0;32m✓[0m LoadingScreen
[0;32m✓[0m HudOverlay

[0;34m📄 PAGE COMPONENTS[0m

[0;32m✓[0m Dashboard
[0;32m✓[0m Profile
[0;32m✓[0m Settings
[0;32m✓[0m Login
[0;32m✓[0m Welcome
[0;32m✓[0m NotFound
[0;32m✓[0m WidgetStore

[0;34m📚 WIDGET REGISTRY VALIDATION[0m

[0;32m✓[0m widgetRegistry.ts exists

Widget Registry Entries:
  [0;32m✓[0m clock (Clock Widget)
  [0;32m✓[0m crypto (Crypto Widget)
  [0;32m✓[0m weather (Weather Widget)
  [0;32m✓[0m aichat (AI Chat Widget)
  [0;32m✓[0m system (System Status Widget)
  [0;32m✓[0m news (News Feed Widget)
  [0;32m✓[0m notepad (Notepad Widget)

Total registry entries: 7/7

[0;34m────────────────────────────────────────────────────────[0m

[0;34m📊 SUMMARY[0m

Total Components:    33
[0;32m✓ Valid:             33[0m
[0;31m✗ Invalid:           0[0m

Success Rate:        100%

[0;34m═════════════════════════════════════════════════════════[0m
[0;32m╔════════════════════════════════════════════════════╗[0m
[0;32m║  ✓ ALL COMPONENTS VALID - SYSTEM OPERATIONAL!     ║[0m
[0;32m╚════════════════════════════════════════════════════╝[0m

