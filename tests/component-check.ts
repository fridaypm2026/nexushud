/**
 * NexusHUD Component Validation
 * Verifies all components are valid React components and registry is complete
 */

import { ComponentType } from 'react';

// Import all widget components
import { ClockWidget } from '../src/components/widgets/ClockWidget';
import { CryptoWidget } from '../src/components/widgets/CryptoWidget';
import { WeatherWidget } from '../src/components/widgets/WeatherWidget';
import { AiChatWidget } from '../src/components/widgets/AiChatWidget';
import { SystemStatusWidget } from '../src/components/widgets/SystemStatusWidget';
import { NewsWidget } from '../src/components/widgets/NewsWidget';
import { NotepadWidget } from '../src/components/widgets/NotepadWidget';
import { WidgetGrid } from '../src/components/widgets/WidgetGrid';
import { WidgetWrapper } from '../src/components/widgets/WidgetWrapper';

// Import HUD components
import { HudPanel } from '../src/components/hud/HudPanel';
import { HudButton } from '../src/components/hud/HudButton';
import { HudGlowText } from '../src/components/hud/HudGlowText';
import { HudCircularGauge } from '../src/components/hud/HudCircularGauge';
import { HudLoadingRing } from '../src/components/hud/HudLoadingRing';
import { HudDataStream } from '../src/components/hud/HudDataStream';
import { HudGrid } from '../src/components/hud/HudGrid';
import { HudScanLine } from '../src/components/hud/HudScanLine';

// Import profile components
import { ProfileEditor } from '../src/components/profile/ProfileEditor';
import { ProfileCard } from '../src/components/profile/ProfileCard';
import { ProfilePage } from '../src/components/profile/ProfilePage';
import { ProfileDemo } from '../src/components/profile/ProfileDemo';
import { ThemeCustomizer } from '../src/components/profile/ThemeCustomizer';

// Import settings components
import { AiSettings } from '../src/components/settings/AiSettings';

// Import layout
import Layout from '../src/components/Layout';

// Import widget registry
import { widgetRegistry, getAllWidgets } from '../src/components/widgets/widgetRegistry';

interface ComponentCheck {
  name: string;
  component: any;
  isValid: boolean;
  type: string;
  error?: string;
}

/**
 * Validates if a value is a valid React component
 */
function isValidReactComponent(component: any): boolean {
  // Function components
  if (typeof component === 'function') {
    return true;
  }
  
  // Class components (less common in modern React)
  if (typeof component === 'object' && component !== null) {
    return typeof component.render === 'function';
  }
  
  return false;
}

/**
 * Get component type description
 */
function getComponentType(component: any): string {
  if (typeof component === 'function') {
    // Check if it's likely a class component
    if (component.prototype && component.prototype.isReactComponent) {
      return 'Class Component';
    }
    return 'Function Component';
  }
  
  if (typeof component === 'object' && component !== null) {
    return 'Object Component';
  }
  
  return typeof component;
}

/**
 * Main component validation
 */
function validateComponents(): void {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     NEXUSHUD COMPONENT VALIDATION                     ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  const checks: ComponentCheck[] = [];

  // Define all components to check
  const componentsToCheck = [
    // Widget Components
    { name: 'ClockWidget', component: ClockWidget },
    { name: 'CryptoWidget', component: CryptoWidget },
    { name: 'WeatherWidget', component: WeatherWidget },
    { name: 'AiChatWidget', component: AiChatWidget },
    { name: 'SystemStatusWidget', component: SystemStatusWidget },
    { name: 'NewsWidget', component: NewsWidget },
    { name: 'NotepadWidget', component: NotepadWidget },
    { name: 'WidgetGrid', component: WidgetGrid },
    { name: 'WidgetWrapper', component: WidgetWrapper },
    
    // HUD Components
    { name: 'HudPanel', component: HudPanel },
    { name: 'HudButton', component: HudButton },
    { name: 'HudGlowText', component: HudGlowText },
    { name: 'HudCircularGauge', component: HudCircularGauge },
    { name: 'HudLoadingRing', component: HudLoadingRing },
    { name: 'HudDataStream', component: HudDataStream },
    { name: 'HudGrid', component: HudGrid },
    { name: 'HudScanLine', component: HudScanLine },
    
    // Profile Components
    { name: 'ProfileEditor', component: ProfileEditor },
    { name: 'ProfileCard', component: ProfileCard },
    { name: 'ProfilePage', component: ProfilePage },
    { name: 'ProfileDemo', component: ProfileDemo },
    { name: 'ThemeCustomizer', component: ThemeCustomizer },
    
    // Settings Components
    { name: 'AiSettings', component: AiSettings },
    
    // Layout
    { name: 'Layout', component: Layout },
  ];

  console.log('📦 COMPONENT VALIDATION\n');

  // Validate each component
  for (const { name, component } of componentsToCheck) {
    const isValid = isValidReactComponent(component);
    const type = getComponentType(component);
    
    const check: ComponentCheck = {
      name,
      component,
      isValid,
      type,
    };

    if (!isValid) {
      check.error = `Invalid component type: ${typeof component}`;
    }

    checks.push(check);

    const status = isValid ? '✓' : '✗';
    const color = isValid ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    
    console.log(`${color}${status}${reset} ${name.padEnd(30)} [${type}]`);
  }

  // Validate widget registry
  console.log('\n📚 WIDGET REGISTRY VALIDATION\n');

  const registryWidgets = getAllWidgets();
  console.log(`Found ${registryWidgets.length} widgets in registry:\n`);

  let registryValid = true;

  for (const widget of registryWidgets) {
    const isValid = isValidReactComponent(widget.component);
    const status = isValid ? '✓' : '✗';
    const color = isValid ? '\x1b[32m' : '\x1b[31m';
    const reset = '\x1b[0m';
    
    console.log(`${color}${status}${reset} ${widget.id.padEnd(15)} → ${widget.name.padEnd(20)} [${widget.icon}]`);
    
    if (!isValid) {
      registryValid = false;
      console.log(`  \x1b[31mERROR: Invalid component in registry\x1b[0m`);
    }
    
    // Check if component matches one we validated
    const matchingCheck = checks.find(c => c.component === widget.component);
    if (matchingCheck) {
      console.log(`  ↪ Matches: ${matchingCheck.name}`);
    }
  }

  // Summary
  console.log('\n' + '─'.repeat(60));
  console.log('📊 SUMMARY\n');

  const validCount = checks.filter(c => c.isValid).length;
  const invalidCount = checks.filter(c => !c.isValid).length;
  const totalCount = checks.length;

  console.log(`Total Components:    ${totalCount}`);
  console.log(`\x1b[32m✓ Valid:            ${validCount}\x1b[0m`);
  console.log(`\x1b[31m✗ Invalid:          ${invalidCount}\x1b[0m`);
  console.log(`Registry Widgets:    ${registryWidgets.length}`);
  console.log(`Registry Valid:      ${registryValid ? '\x1b[32m✓ Yes\x1b[0m' : '\x1b[31m✗ No\x1b[0m'}`);

  console.log('\n' + '─'.repeat(60));

  // Component breakdown by type
  console.log('\n📋 COMPONENT BREAKDOWN BY TYPE\n');
  
  const widgetComponents = checks.filter(c => c.name.includes('Widget'));
  const hudComponents = checks.filter(c => c.name.includes('Hud'));
  const profileComponents = checks.filter(c => c.name.includes('Profile'));
  const settingsComponents = checks.filter(c => c.name.includes('Settings'));
  const layoutComponents = checks.filter(c => c.name === 'Layout');

  console.log(`Widgets:    ${widgetComponents.length} (${widgetComponents.filter(c => c.isValid).length} valid)`);
  console.log(`HUD:        ${hudComponents.length} (${hudComponents.filter(c => c.isValid).length} valid)`);
  console.log(`Profile:    ${profileComponents.length} (${profileComponents.filter(c => c.isValid).length} valid)`);
  console.log(`Settings:   ${settingsComponents.length} (${settingsComponents.filter(c => c.isValid).length} valid)`);
  console.log(`Layout:     ${layoutComponents.length} (${layoutComponents.filter(c => c.isValid).length} valid)`);

  // Final result
  console.log('\n' + '═'.repeat(60));
  
  if (invalidCount === 0 && registryValid) {
    console.log('\x1b[32m╔════════════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[32m║  ✓ ALL COMPONENTS VALID - SYSTEM OPERATIONAL!     ║\x1b[0m');
    console.log('\x1b[32m╚════════════════════════════════════════════════════╝\x1b[0m\n');
    process.exit(0);
  } else {
    console.log('\x1b[31m╔════════════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[31m║  ✗ VALIDATION FAILED - REVIEW REQUIRED            ║\x1b[0m');
    console.log('\x1b[31m╚════════════════════════════════════════════════════╝\x1b[0m\n');
    process.exit(1);
  }
}

// Run validation
validateComponents();
