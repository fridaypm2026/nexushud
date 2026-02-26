// Profile & Social System Components
// Export all profile-related components and types

export { ProfilePage } from './ProfilePage';
export { ProfileEditor } from './ProfileEditor';
export { ProfileCard } from './ProfileCard';
export { ThemeCustomizer } from './ThemeCustomizer';

export type {
  UserProfile,
  Theme,
  ProfileStats,
  Friend,
} from './profileTypes';

export {
  PRESET_THEMES,
  DEFAULT_PROFILE,
  STORAGE_KEYS,
} from './profileTypes';
