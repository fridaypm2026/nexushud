// Profile & Social System Types for NexusHUD

export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  status: string;
  
  // MySpace-style activity fields
  currentlyListening: string;
  currentlyWatching: string;
  currentlyPlaying: string;
  
  // Profile customization
  theme: Theme;
  bannerGradient: string;
  
  // Stats
  stats: ProfileStats;
  
  // Social
  topFriends: Friend[];
  visitorCount: number;
  
  // Metadata
  createdAt: string;
  lastActive: string;
  isOnline: boolean;
}

export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  textColor: string;
}

export interface ProfileStats {
  widgetsCreated: number;
  daysActive: number;
  themeDownloads: number;
  profileViews: number;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: string;
  isOnline: boolean;
}

// Preset themes for ThemeCustomizer
export const PRESET_THEMES: Theme[] = [
  {
    id: 'jarvis-blue',
    name: 'Jarvis Blue',
    primary: '#00d4ff',
    secondary: '#0088cc',
    accent: '#00ffff',
    background: '#0a0a0f',
    textColor: '#e0e0e0',
  },
  {
    id: 'arc-reactor',
    name: 'Arc Reactor',
    primary: '#00ccff',
    secondary: '#0099ff',
    accent: '#66ffff',
    background: '#0d0d12',
    textColor: '#f0f0f0',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    primary: '#ff0080',
    secondary: '#8000ff',
    accent: '#ffff00',
    background: '#120012',
    textColor: '#ff00ff',
  },
  {
    id: 'matrix',
    name: 'Matrix',
    primary: '#00ff00',
    secondary: '#00aa00',
    accent: '#88ff88',
    background: '#000000',
    textColor: '#00ff00',
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    primary: '#ff6600',
    secondary: '#cc4400',
    accent: '#ffaa00',
    background: '#1a0a00',
    textColor: '#ffcc99',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    primary: '#4466ff',
    secondary: '#2244cc',
    accent: '#6688ff',
    background: '#000011',
    textColor: '#ccddff',
  },
  {
    id: 'neon-pink',
    name: 'Neon Pink',
    primary: '#ff3366',
    secondary: '#cc0044',
    accent: '#ff99bb',
    background: '#1a0a0f',
    textColor: '#ffccdd',
  },
  {
    id: 'stealth',
    name: 'Stealth',
    primary: '#666666',
    secondary: '#444444',
    accent: '#888888',
    background: '#0a0a0a',
    textColor: '#cccccc',
  },
];

// Default profile for new users
export const DEFAULT_PROFILE: UserProfile = {
  id: 'user-001',
  username: 'Agent_Phoenix',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Phoenix',
  bio: 'Living in the digital frontier. Building the future, one widget at a time.',
  status: 'Online and ready to assist',
  currentlyListening: 'Synthwave Radio - Neon Dreams',
  currentlyWatching: 'Blade Runner 2049',
  currentlyPlaying: 'Cyberpunk 2077',
  theme: PRESET_THEMES[0], // Jarvis Blue
  bannerGradient: 'linear-gradient(135deg, #0a0a0f 0%, #00d4ff 100%)',
  stats: {
    widgetsCreated: 12,
    daysActive: 47,
    themeDownloads: 203,
    profileViews: 1547,
  },
  topFriends: [],
  visitorCount: 1547,
  createdAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  isOnline: true,
};

// LocalStorage keys
export const STORAGE_KEYS = {
  PROFILE: 'nexushud_profile',
  THEME: 'nexushud_theme',
  CUSTOM_THEMES: 'nexushud_custom_themes',
};
