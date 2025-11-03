import apiClient from '../api/client';
import { AuthResponse, SessionsResponse, User } from '@/lib/types';

const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:8080/api/v1';

export const authClient = {
  /**
   * Initiate Google OAuth login
   */
  login: () => {
    window.location.href = `${AUTH_API_URL}/auth/google/login`;
  },

  /**
   * Get current user information
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<AuthResponse>('/auth/me');
    return response.data.user;
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<void> => {
    await apiClient.post('/auth/refresh');
  },

  /**
   * Logout current session
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  /**
   * Get all active sessions
   */
  getSessions: async (): Promise<SessionsResponse> => {
    const response = await apiClient.get<SessionsResponse>('/auth/sessions');
    return response.data;
  },

  /**
   * Revoke a specific session
   */
  revokeSession: async (sessionId: string): Promise<void> => {
    await apiClient.delete(`/auth/sessions/${sessionId}`);
  },

  /**
   * Revoke all sessions except current
   */
  revokeOtherSessions: async (): Promise<void> => {
    await apiClient.post('/auth/sessions/revoke-others');
  },
};

export default authClient;
