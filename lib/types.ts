// Emoji types
export interface Emoji {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
}

export interface EmojiDescription {
  description: string;
}

// UI types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface EmojiCardProps {
  emoji: Emoji;
  isFavorite: boolean;
  onFavorite: (emoji: Emoji) => void;
}

export type SortBy = 'name' | 'category';
export type ViewMode = 'all' | 'favorites';
export type DisplayMode = 'html' | 'unicode';

// Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  picture_url: string;
  created_at: string;
  last_login: string;
}

export interface Session {
  id: string;
  user_id?: string;
  device: string;
  ip_address: string;
  location: string;
  last_used: string;
  is_current: boolean;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: string;
}

export interface AuthResponse {
  user: User;
  request_id: string;
}

export interface SessionsResponse {
  sessions: Session[];
  total: number;
  request_id: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
  request_id: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// User favorites (server-side storage)
export interface UserFavorite {
  user_id: string;
  emoji_name: string;
  created_at: string;
}
