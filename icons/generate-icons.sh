#!/bin/bash
# Generate PNG icons from SVG sources for NexusHUD
# Requires ImageMagick (convert command)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick (convert) is not installed"
    echo "Install with: sudo apt-get install imagemagick (Debian/Ubuntu)"
    echo "           or: brew install imagemagick (macOS)"
    exit 1
fi

echo "🎨 Generating PNG icons from app-icon.svg..."

# Source SVG
SOURCE_SVG="app-icon.svg"

if [ ! -f "$SOURCE_SVG" ]; then
    echo "❌ Error: $SOURCE_SVG not found in $SCRIPT_DIR"
    exit 1
fi

# Generate standard PWA icon sizes
echo "📱 Generating PWA icons..."
convert "$SOURCE_SVG" -resize 72x72 -background none icon-72x72.png
convert "$SOURCE_SVG" -resize 96x96 -background none icon-96x96.png
convert "$SOURCE_SVG" -resize 128x128 -background none icon-128x128.png
convert "$SOURCE_SVG" -resize 144x144 -background none icon-144x144.png
convert "$SOURCE_SVG" -resize 152x152 -background none icon-152x152.png
convert "$SOURCE_SVG" -resize 192x192 -background none icon-192x192.png
convert "$SOURCE_SVG" -resize 384x384 -background none icon-384x384.png
convert "$SOURCE_SVG" -resize 512x512 -background none icon-512x512.png

echo "🍎 Generating Apple Touch Icon..."
convert "$SOURCE_SVG" -resize 180x180 -background none apple-touch-icon.png

echo "🌐 Generating multi-size favicon.ico..."
# Create multi-resolution favicon with 16x16, 32x32, 48x48
convert "$SOURCE_SVG" \
    \( -clone 0 -resize 16x16 -background none \) \
    \( -clone 0 -resize 32x32 -background none \) \
    \( -clone 0 -resize 48x48 -background none \) \
    -delete 0 -alpha on -colors 256 favicon.ico

echo "✅ Icon generation complete!"
echo ""
echo "Generated files:"
ls -lh *.png *.ico 2>/dev/null || echo "No PNG/ICO files found"
echo ""
echo "📦 Total icons created:"
echo "  • PWA icons: 72, 96, 128, 144, 152, 192, 384, 512 (PNG)"
echo "  • Apple Touch Icon: 180x180 (PNG)"
echo "  • Favicon: Multi-size 16/32/48 (ICO)"
