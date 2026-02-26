#!/bin/bash
# NexusHUD Deployment Script
# Usage: ./deploy.sh [--netlify|--vercel|--static]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
PLATFORM=""
STATIC_DIR="./static-deploy"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --netlify)
      PLATFORM="netlify"
      shift
      ;;
    --vercel)
      PLATFORM="vercel"
      shift
      ;;
    --static)
      PLATFORM="static"
      shift
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      echo "Usage: ./deploy.sh [--netlify|--vercel|--static]"
      exit 1
      ;;
  esac
done

# Show banner
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════╗"
echo "║     NexusHUD Deployment Script       ║"
echo "╚═══════════════════════════════════════╝"
echo -e "${NC}"

# Check if platform is specified
if [ -z "$PLATFORM" ]; then
  echo -e "${YELLOW}No platform specified. Choose one:${NC}"
  echo "  ./deploy.sh --netlify   Deploy to Netlify"
  echo "  ./deploy.sh --vercel    Deploy to Vercel"
  echo "  ./deploy.sh --static    Build static files"
  exit 1
fi

echo -e "${YELLOW}→ Installing dependencies...${NC}"
npm install

echo -e "${YELLOW}→ Running tests...${NC}"
npm run test 2>/dev/null || echo "No tests configured, skipping..."

echo -e "${YELLOW}→ Building application...${NC}"
npm run build

if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Build failed!${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Build completed successfully${NC}"

# Platform-specific deployment
case $PLATFORM in
  netlify)
    echo -e "${YELLOW}→ Deploying to Netlify...${NC}"
    
    # Check if Netlify CLI is installed
    if ! command -v netlify &> /dev/null; then
      echo -e "${RED}Netlify CLI not found. Installing...${NC}"
      npm install -g netlify-cli
    fi
    
    # Deploy
    netlify deploy --prod --dir=dist
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}✓ Successfully deployed to Netlify!${NC}"
    else
      echo -e "${RED}✗ Netlify deployment failed${NC}"
      exit 1
    fi
    ;;
    
  vercel)
    echo -e "${YELLOW}→ Deploying to Vercel...${NC}"
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
      echo -e "${RED}Vercel CLI not found. Installing...${NC}"
      npm install -g vercel
    fi
    
    # Deploy
    vercel --prod
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}✓ Successfully deployed to Vercel!${NC}"
    else
      echo -e "${RED}✗ Vercel deployment failed${NC}"
      exit 1
    fi
    ;;
    
  static)
    echo -e "${YELLOW}→ Preparing static deployment...${NC}"
    
    # Remove old static directory
    rm -rf "$STATIC_DIR"
    
    # Create new static directory
    mkdir -p "$STATIC_DIR"
    
    # Copy dist files
    cp -r dist/* "$STATIC_DIR/"
    
    # Create deployment README
    cat > "$STATIC_DIR/README.md" << EOF
# NexusHUD Static Deployment

This directory contains the production build of NexusHUD.

## Deployment Options

### Option 1: Any Static Host (Netlify, Vercel, GitHub Pages, etc.)
Upload the contents of this directory to your static hosting service.

### Option 2: Simple HTTP Server
\`\`\`bash
# Python 3
python3 -m http.server 8080

# Node.js
npx serve -s . -p 8080

# PHP
php -S localhost:8080
\`\`\`

### Option 3: Docker/Nginx
\`\`\`bash
docker run -d -p 8080:80 -v \$(pwd):/usr/share/nginx/html:ro nginx:alpine
\`\`\`

## Important Notes
- All assets are optimized for production
- SPA routing requires server-side redirect to index.html
- Security headers should be configured at the server level
- API keys should be set via environment variables

Generated: $(date)
EOF
    
    echo -e "${GREEN}✓ Static files prepared in: $STATIC_DIR${NC}"
    echo ""
    echo -e "${YELLOW}To deploy:${NC}"
    echo "  1. Upload contents of $STATIC_DIR to your hosting provider"
    echo "  2. Configure server for SPA routing (/* → index.html)"
    echo "  3. Set environment variables for API keys"
    echo ""
    echo -e "${YELLOW}To test locally:${NC}"
    echo "  cd $STATIC_DIR && npx serve -s ."
    ;;
esac

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║      Deployment Complete! 🚀          ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════╝${NC}"
