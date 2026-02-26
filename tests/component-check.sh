#!/bin/bash

# NexusHUD Component Validation
# Verifies all components exist and are properly structured

set -e

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

cd "$(dirname "$0")/.."

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     NEXUSHUD COMPONENT VALIDATION                     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}\n"

TOTAL=0
VALID=0
INVALID=0

check_component() {
    local file=$1
    local name=$(basename "$file" .tsx)
    
    if [ -f "$file" ]; then
        # Check if file exports something
        if grep -q "export" "$file"; then
            echo -e "${GREEN}✓${NC} $name"
            VALID=$((VALID + 1))
        else
            echo -e "${RED}✗${NC} $name - No exports found"
            INVALID=$((INVALID + 1))
        fi
    else
        echo -e "${RED}✗${NC} $name - File not found"
        INVALID=$((INVALID + 1))
    fi
    TOTAL=$((TOTAL + 1))
}

echo -e "${BLUE}📦 WIDGET COMPONENTS${NC}\n"
check_component "src/components/widgets/ClockWidget.tsx"
check_component "src/components/widgets/CryptoWidget.tsx"
check_component "src/components/widgets/WeatherWidget.tsx"
check_component "src/components/widgets/AiChatWidget.tsx"
check_component "src/components/widgets/SystemStatusWidget.tsx"
check_component "src/components/widgets/NewsWidget.tsx"
check_component "src/components/widgets/NotepadWidget.tsx"
check_component "src/components/widgets/WidgetGrid.tsx"
check_component "src/components/widgets/WidgetWrapper.tsx"

echo -e "\n${BLUE}🎨 HUD COMPONENTS${NC}\n"
check_component "src/components/hud/HudPanel.tsx"
check_component "src/components/hud/HudButton.tsx"
check_component "src/components/hud/HudGlowText.tsx"
check_component "src/components/hud/HudCircularGauge.tsx"
check_component "src/components/hud/HudLoadingRing.tsx"
check_component "src/components/hud/HudDataStream.tsx"
check_component "src/components/hud/HudGrid.tsx"
check_component "src/components/hud/HudScanLine.tsx"

echo -e "\n${BLUE}👤 PROFILE COMPONENTS${NC}\n"
check_component "src/components/profile/ProfileEditor.tsx"
check_component "src/components/profile/ProfileCard.tsx"
check_component "src/components/profile/ProfilePage.tsx"
check_component "src/components/profile/ProfileDemo.tsx"
check_component "src/components/profile/ThemeCustomizer.tsx"

echo -e "\n${BLUE}⚙️  SETTINGS COMPONENTS${NC}\n"
check_component "src/components/settings/AiSettings.tsx"

echo -e "\n${BLUE}🏗️  LAYOUT COMPONENTS${NC}\n"
check_component "src/components/Layout.tsx"
check_component "src/components/LoadingScreen.tsx"
check_component "src/components/HudOverlay.tsx"

echo -e "\n${BLUE}📄 PAGE COMPONENTS${NC}\n"
check_component "src/pages/Dashboard.tsx"
check_component "src/pages/Profile.tsx"
check_component "src/pages/Settings.tsx"
check_component "src/pages/Login.tsx"
check_component "src/pages/Welcome.tsx"
check_component "src/pages/NotFound.tsx"
check_component "src/pages/WidgetStore.tsx"

echo -e "\n${BLUE}📚 WIDGET REGISTRY VALIDATION${NC}\n"

if [ -f "src/components/widgets/widgetRegistry.ts" ]; then
    echo -e "${GREEN}✓${NC} widgetRegistry.ts exists"
    
    # Check for widget definitions
    CLOCK=$(grep -c "clock:" src/components/widgets/widgetRegistry.ts || echo 0)
    CRYPTO=$(grep -c "crypto:" src/components/widgets/widgetRegistry.ts || echo 0)
    WEATHER=$(grep -c "weather:" src/components/widgets/widgetRegistry.ts || echo 0)
    AICHAT=$(grep -c "aichat:" src/components/widgets/widgetRegistry.ts || echo 0)
    SYSTEM=$(grep -c "system:" src/components/widgets/widgetRegistry.ts || echo 0)
    NEWS=$(grep -c "news:" src/components/widgets/widgetRegistry.ts || echo 0)
    NOTEPAD=$(grep -c "notepad:" src/components/widgets/widgetRegistry.ts || echo 0)
    
    echo ""
    echo "Widget Registry Entries:"
    [ $CLOCK -gt 0 ] && echo -e "  ${GREEN}✓${NC} clock (Clock Widget)" || echo -e "  ${RED}✗${NC} clock missing"
    [ $CRYPTO -gt 0 ] && echo -e "  ${GREEN}✓${NC} crypto (Crypto Widget)" || echo -e "  ${RED}✗${NC} crypto missing"
    [ $WEATHER -gt 0 ] && echo -e "  ${GREEN}✓${NC} weather (Weather Widget)" || echo -e "  ${RED}✗${NC} weather missing"
    [ $AICHAT -gt 0 ] && echo -e "  ${GREEN}✓${NC} aichat (AI Chat Widget)" || echo -e "  ${RED}✗${NC} aichat missing"
    [ $SYSTEM -gt 0 ] && echo -e "  ${GREEN}✓${NC} system (System Status Widget)" || echo -e "  ${RED}✗${NC} system missing"
    [ $NEWS -gt 0 ] && echo -e "  ${GREEN}✓${NC} news (News Feed Widget)" || echo -e "  ${RED}✗${NC} news missing"
    [ $NOTEPAD -gt 0 ] && echo -e "  ${GREEN}✓${NC} notepad (Notepad Widget)" || echo -e "  ${RED}✗${NC} notepad missing"
    
    REGISTRY_COUNT=$((CLOCK + CRYPTO + WEATHER + AICHAT + SYSTEM + NEWS + NOTEPAD))
    echo ""
    echo "Total registry entries: $REGISTRY_COUNT/7"
else
    echo -e "${RED}✗${NC} widgetRegistry.ts not found"
fi

echo -e "\n${BLUE}────────────────────────────────────────────────────────${NC}"
echo -e "\n${BLUE}📊 SUMMARY${NC}\n"

echo "Total Components:    $TOTAL"
echo -e "${GREEN}✓ Valid:             $VALID${NC}"
echo -e "${RED}✗ Invalid:           $INVALID${NC}"

PERCENT=$((VALID * 100 / TOTAL))
echo -e "\nSuccess Rate:        ${PERCENT}%"

echo -e "\n${BLUE}═════════════════════════════════════════════════════════${NC}"

if [ $INVALID -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✓ ALL COMPONENTS VALID - SYSTEM OPERATIONAL!     ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}\n"
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║  ✗ VALIDATION FAILED - REVIEW REQUIRED            ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════════╝${NC}\n"
    exit 1
fi
