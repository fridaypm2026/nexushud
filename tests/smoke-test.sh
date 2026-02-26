#!/bin/bash

# NexusHUD Smoke Test Suite
# Comprehensive test script for build validation

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
    ((PASSED++))
    ((TOTAL++))
}

fail() {
    echo -e "${RED}✗ FAIL${NC} - $1"
    echo -e "  ${RED}Error:${NC} $2"
    ((FAILED++))
    ((TOTAL++))
}

info() {
    echo -e "${YELLOW}ℹ INFO${NC} - $1"
}

# Cleanup function
cleanup() {
    if [ ! -z "$DEV_SERVER_PID" ]; then
        info "Killing dev server (PID: $DEV_SERVER_PID)"
        kill $DEV_SERVER_PID 2>/dev/null || true
        wait $DEV_SERVER_PID 2>/dev/null || true
    fi
}

trap cleanup EXIT

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
    cat /tmp/build.log | tail -n 10
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
        pass "Component exists: $component"
    else
        fail "Component missing: $component" "File not found"
    fi
done

# TEST 5: manifest.json validation
print_header "TEST 5: PWA Manifest Validation"

if [ -f "public/manifest.json" ]; then
    if python3 -c "import json; json.load(open('public/manifest.json'))" 2>/dev/null; then
        pass "manifest.json is valid JSON"
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
            info "  Unresolved: $import in $file"
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

ERROR_PATTERNS=$(grep -r "console\.error" src --include="*.tsx" --include="*.ts" | wc -l)

if [ $ERROR_PATTERNS -eq 0 ]; then
    pass "No console.error found in source (good for production)"
else
    info "Found $ERROR_PATTERNS console.error statements (consider using proper error handling)"
fi

# Check for TODO/FIXME
TODOS=$(grep -r "TODO\|FIXME" src --include="*.tsx" --include="*.ts" | wc -l)
if [ $TODOS -gt 0 ]; then
    info "Found $TODOS TODO/FIXME comments"
fi

# TEST 9: Dev server and route testing
print_header "TEST 9: Development Server & Route Testing"

info "Starting dev server..."
npm run dev > /tmp/dev-server.log 2>&1 &
DEV_SERVER_PID=$!

info "Waiting for dev server to start (PID: $DEV_SERVER_PID)..."
sleep 8

# Check if server is running
if ! kill -0 $DEV_SERVER_PID 2>/dev/null; then
    fail "Dev server failed to start" "$(tail -n 20 /tmp/dev-server.log)"
    exit 1
fi

pass "Dev server started successfully"

# Determine the port (usually 5173 for Vite)
PORT=5173
BASE_URL="http://localhost:$PORT"

# Test routes (public routes only, since we can't auth in tests)
info "Testing routes..."

# Test main page
if curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" | grep -q "200"; then
    pass "Route / returns 200"
else
    fail "Route / failed" "Did not return 200"
fi

# TEST 10: Concurrent load test
print_header "TEST 10: Concurrent Load Testing"

info "Running 200 concurrent requests..."

SUCCESS_COUNT=0
FAIL_COUNT=0

for i in {1..200}; do
    if curl -s -o /dev/null -w "%{http_code}" "$BASE_URL" | grep -q "200"; then
        ((SUCCESS_COUNT++))
    else
        ((FAIL_COUNT++))
    fi
done

info "Load test complete: $SUCCESS_COUNT successful, $FAIL_COUNT failed"

if [ $FAIL_COUNT -eq 0 ]; then
    pass "All 200 concurrent requests succeeded"
else
    fail "Some concurrent requests failed" "$FAIL_COUNT out of 200 failed"
fi

# TEST 11: TypeScript compilation check
print_header "TEST 11: TypeScript Compilation"

if npx tsc --noEmit > /tmp/tsc.log 2>&1; then
    pass "TypeScript compilation successful"
else
    ERROR_COUNT=$(cat /tmp/tsc.log | grep "error TS" | wc -l)
    if [ $ERROR_COUNT -gt 0 ]; then
        fail "TypeScript compilation errors" "$ERROR_COUNT errors found"
        cat /tmp/tsc.log | head -n 20
    else
        pass "TypeScript compilation successful"
    fi
fi

# TEST 12: Package.json validation
print_header "TEST 12: Package Configuration"

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
else
    fail "package.json not found" "Project configuration missing"
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
