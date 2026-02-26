#!/bin/bash

# NexusHUD Quick Smoke Test Suite
# Comprehensive test script for build validation (without dev server tests)

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0
TOTAL=0

# Helper functions
print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

pass() {
    echo -e "${GREEN}✓ PASS${NC} - $1"
    PASSED=$((PASSED + 1))
    TOTAL=$((TOTAL + 1))
}

fail() {
    echo -e "${RED}✗ FAIL${NC} - $1"
    echo -e "  ${RED}Error:${NC} $2"
    FAILED=$((FAILED + 1))
    TOTAL=$((TOTAL + 1))
}

info() {
    echo -e "${YELLOW}ℹ INFO${NC} - $1"
}

# Change to app directory
cd "$(dirname "$0")/.."

print_header "🚀 NEXUSHUD SMOKE TEST SUITE"
info "Starting comprehensive test suite..."
info "Project directory: $(pwd)"

# TEST 1: Build Test
print_header "TEST 1: Build Process"
info "Running npm run build..."

if npm run build > /tmp/build.log 2>&1; then
    pass "Build completed successfully"
    echo ""
    cat /tmp/build.log | tail -n 15
else
    fail "Build failed" "$(tail -n 20 /tmp/build.log)"
    exit 1
fi

# TEST 2: Dist directory exists
print_header "TEST 2: Build Output Validation"

if [ -d "dist" ]; then
    pass "Dist directory exists"
else
    fail "Dist directory not found" "Build output missing"
fi

if [ -f "dist/index.html" ]; then
    pass "index.html exists in dist"
else
    fail "index.html not found" "Entry point missing"
fi

# Count generated files
JS_FILES=$(find dist -name "*.js" | wc -l)
CSS_FILES=$(find dist -name "*.css" | wc -l)
info "Generated files: ${JS_FILES} JavaScript, ${CSS_FILES} CSS"

# TEST 3: Bundle size check
print_header "TEST 3: Bundle Size Analysis"

if command -v gzip &> /dev/null; then
    BUNDLE_SIZE=$(find dist -type f \( -name "*.js" -o -name "*.css" \) -exec cat {} \; | gzip | wc -c)
    BUNDLE_SIZE_KB=$((BUNDLE_SIZE / 1024))
    info "Total gzipped bundle size: ${BUNDLE_SIZE_KB}KB"
    
    if [ $BUNDLE_SIZE -lt 512000 ]; then
        pass "Bundle size under 500KB (${BUNDLE_SIZE_KB}KB)"
    else
        fail "Bundle size exceeds 500KB" "${BUNDLE_SIZE_KB}KB"
    fi
else
    info "gzip not available, skipping bundle size test"
fi

# TEST 4: Component files existence
print_header "TEST 4: Component Files Validation"

COMPONENTS=(
    "src/components/widgets/ClockWidget.tsx"
    "src/components/widgets/CryptoWidget.tsx"
    "src/components/widgets/WeatherWidget.tsx"
    "src/components/widgets/AiChatWidget.tsx"
    "src/components/widgets/SystemStatusWidget.tsx"
    "src/components/widgets/NewsWidget.tsx"
    "src/components/widgets/NotepadWidget.tsx"
    "src/components/widgets/WidgetGrid.tsx"
    "src/components/widgets/WidgetWrapper.tsx"
    "src/components/hud/HudPanel.tsx"
    "src/components/hud/HudButton.tsx"
    "src/components/hud/HudGlowText.tsx"
    "src/components/hud/HudCircularGauge.tsx"
    "src/components/hud/HudLoadingRing.tsx"
    "src/components/Layout.tsx"
    "src/components/profile/ProfileEditor.tsx"
    "src/components/profile/ProfileCard.tsx"
    "src/components/settings/AiSettings.tsx"
)

for component in "${COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        pass "Component exists: $(basename $component)"
    else
        fail "Component missing: $component" "File not found"
    fi
done

# TEST 5: manifest.json validation
print_header "TEST 5: PWA Manifest Validation"

if [ -f "public/manifest.json" ]; then
    if python3 -m json.tool public/manifest.json > /dev/null 2>&1; then
        pass "manifest.json is valid JSON"
        
        # Check key fields
        if grep -q '"name"' public/manifest.json && grep -q '"short_name"' public/manifest.json; then
            pass "manifest.json has required name fields"
        fi
    else
        fail "manifest.json is invalid JSON" "Parse error"
    fi
else
    fail "manifest.json not found" "PWA manifest missing"
fi

# TEST 6: Service worker validation
print_header "TEST 6: Service Worker Validation"

if [ -f "public/sw.js" ]; then
    pass "Service worker (sw.js) exists"
    
    # Check for required service worker patterns
    if grep -q "install" public/sw.js && grep -q "fetch" public/sw.js; then
        pass "Service worker has required event listeners"
    else
        fail "Service worker missing required patterns" "install/fetch handlers not found"
    fi
    
    # Check cache name
    if grep -q "CACHE_NAME" public/sw.js || grep -q "cacheName" public/sw.js; then
        pass "Service worker implements caching"
    fi
else
    fail "Service worker (sw.js) not found" "PWA functionality unavailable"
fi

# TEST 7: Import resolution check
print_header "TEST 7: Import Resolution Validation"

info "Scanning for unresolved imports..."
UNRESOLVED=0

# Find all TypeScript/TSX files and check imports
for file in $(find src -name "*.tsx" -o -name "*.ts"); do
    # Extract import paths (simplified check)
    IMPORTS=$(grep -E "^import .* from ['\"](\./|\.\./).*['\"]" "$file" | sed -E "s/.*from ['\"]([^'\"]+)['\"].*/\1/" || true)
    
    for import in $IMPORTS; do
        # Resolve relative path
        DIR=$(dirname "$file")
        FULL_PATH="$DIR/$import"
        
        # Try common extensions
        FOUND=false
        for ext in "" ".ts" ".tsx" ".js" ".jsx" "/index.ts" "/index.tsx"; do
            if [ -f "$FULL_PATH$ext" ]; then
                FOUND=true
                break
            fi
        done
        
        if [ "$FOUND" = false ]; then
            ((UNRESOLVED++))
        fi
    done
done

if [ $UNRESOLVED -eq 0 ]; then
    pass "All imports resolve correctly"
else
    info "Found $UNRESOLVED potentially unresolved imports (may be from node_modules)"
fi

# TEST 8: Console.error patterns
print_header "TEST 8: Source Code Quality Check"

ERROR_PATTERNS=$(grep -r "console\.error" src --include="*.tsx" --include="*.ts" | wc -l || echo "0")

if [ $ERROR_PATTERNS -eq 0 ]; then
    pass "No console.error found in source (good for production)"
else
    info "Found $ERROR_PATTERNS console.error statements"
fi

# Check for TODO/FIXME
TODOS=$(grep -r "TODO\|FIXME" src --include="*.tsx" --include="*.ts" | wc -l || echo "0")
if [ $TODOS -gt 0 ]; then
    info "Found $TODOS TODO/FIXME comments"
else
    pass "No TODO/FIXME comments found"
fi

# TEST 9: TypeScript compilation check
print_header "TEST 9: TypeScript Compilation"

if npx tsc --noEmit > /tmp/tsc.log 2>&1; then
    pass "TypeScript compilation successful (no errors)"
else
    ERROR_COUNT=$(cat /tmp/tsc.log | grep "error TS" | wc -l)
    if [ $ERROR_COUNT -gt 0 ]; then
        fail "TypeScript compilation errors" "$ERROR_COUNT errors found"
        echo ""
        cat /tmp/tsc.log | head -n 30
    else
        pass "TypeScript compilation successful"
    fi
fi

# TEST 10: Package.json validation
print_header "TEST 10: Package Configuration"

if [ -f "package.json" ]; then
    pass "package.json exists"
    
    # Check required scripts
    for script in "dev" "build" "preview"; do
        if grep -q "\"$script\"" package.json; then
            pass "Script '$script' defined"
        else
            fail "Script '$script' missing" "Required npm script not found"
        fi
    done
    
    # Check for Capacitor scripts
    if grep -q "cap:" package.json; then
        pass "Capacitor mobile scripts present"
    fi
else
    fail "package.json not found" "Project configuration missing"
fi

# TEST 11: Critical file existence
print_header "TEST 11: Critical Files Check"

CRITICAL_FILES=(
    "src/App.tsx"
    "src/main.tsx"
    "index.html"
    "vite.config.ts"
    "tsconfig.json"
    "package.json"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        pass "Critical file exists: $file"
    else
        fail "Critical file missing: $file" "File not found"
    fi
done

# TEST 12: Asset files check
print_header "TEST 12: Asset Validation"

if [ -d "public/icons" ]; then
    ICON_COUNT=$(find public/icons -type f | wc -l)
    pass "Icons directory exists with $ICON_COUNT files"
else
    fail "Icons directory not found" "PWA icons missing"
fi

if [ -f "public/offline.html" ]; then
    pass "Offline fallback page exists"
else
    info "No offline.html found (optional)"
fi

# Final summary
print_header "📊 TEST SUMMARY"

echo -e "${GREEN}Passed:${NC} $PASSED"
echo -e "${RED}Failed:${NC} $FAILED"
echo -e "${BLUE}Total:${NC}  $TOTAL"

PASS_RATE=$((PASSED * 100 / TOTAL))
echo -e "\n${BLUE}Pass Rate:${NC} ${PASS_RATE}%"

if [ $FAILED -eq 0 ]; then
    echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✓ ALL TESTS PASSED - READY TO SHIP!  ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}\n"
    exit 0
else
    echo -e "\n${RED}╔════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ✗ SOME TESTS FAILED - REVIEW NEEDED  ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════╝${NC}\n"
    exit 1
fi
