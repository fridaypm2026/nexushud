# App Icons

This folder should contain PWA icons in the following sizes:

## Required Sizes

- **icon-72x72.png** - 72×72px
- **icon-96x96.png** - 96×96px
- **icon-128x128.png** - 128×128px
- **icon-144x144.png** - 144×144px (Microsoft Tile)
- **icon-152x152.png** - 152×152px (Apple Touch)
- **icon-192x192.png** - 192×192px (Android, Apple Touch)
- **icon-384x384.png** - 384×384px
- **icon-512x512.png** - 512×512px

## Maskable Icons (Android Adaptive)

- **icon-maskable-192x192.png** - 192×192px with safe zone
- **icon-maskable-512x512.png** - 512×512px with safe zone

## Design Guidelines

- Use transparent PNG format
- For maskable icons, keep important content in the center 80% (safe zone)
- Theme: Dark background (#0a0a0f) with cyan accent (#00d4ff)
- Simple, recognizable design that works at small sizes

## Tools to Generate Icons

- [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- [App Icon Generator](https://www.appicon.co/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Icon Kitchen](https://icon.kitchen/)

## Quick Generate (if you have a 512×512 source icon)

```bash
# Install PWA asset generator
npm install -g pwa-asset-generator

# Generate all sizes
pwa-asset-generator source-icon.png ./public/icons \
  --icon-only \
  --background "#0a0a0f" \
  --index ./public/index.html \
  --manifest ./public/manifest.json
```

## Placeholder

Until real icons are created, you can use a temporary icon generator like:
- [Placeholder.com](https://placeholder.com/)
- Or create simple colored squares with text in design tools
