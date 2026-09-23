export interface MediaItem {
  id: string;
  type: 'movie' | 'series' | 'anime' | 'channel';
  title: string;
  year?: number;
  poster?: string;
  backdrop?: string;
  logo?: string;
  description?: string;
  runtime?: string;
  rating?: number;
  genres?: string[];
  director?: string;
  cast?: string[];
  imdbId?: string;
  episodes?: Episode[];
  season?: number;
  episode?: number;
  progress?: number;
  lastWatched?: string;
  isLive?: boolean;
}

export interface Episode {
  id: string;
  title: string;
  season: number;
  episode: number;
  description?: string;
  thumbnail?: string;
  runtime?: string;
}

export interface Stream {
  id: string;
  name: string;
  title: string;
  url: string;
  quality?: '4K' | '1080p' | '720p' | '480p' | '360p';
  size?: string;
  seeders?: number;
  addon: string;
  cached?: boolean;
  hdr?: boolean;
  audio?: string;
  score: number;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  icon?: string;
  types: string[];
  resources: string[];
  installed: boolean;
  enabled: boolean;
  official: boolean;
  catalog?: boolean;
}

export interface WatchParty {
  id: string;
  name: string;
  host: string;
  participants: number;
  maxParticipants: number;
  media?: MediaItem;
  isLive: boolean;
  createdAt: string;
}

export interface ThemeConfig {
  name: string;
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  accent: string;
  accentHover: string;
  text: string;
  textMuted: string;
  radius: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  addonKeys?: string[];
}
