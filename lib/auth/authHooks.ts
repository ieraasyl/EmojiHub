import useSWR from 'swr';
import authClient from './authClient';
import { User, SessionsResponse } from '@/lib/types';

/**
 * Hook to fetch and cache user data
 */
export function useUser() {
  const { data, error, mutate } = useSWR<User>(
    '/auth/me',
    authClient.getCurrentUser,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch and manage sessions
 */
export function useSessions() {
  const { data, error, mutate } = useSWR<SessionsResponse>(
    '/auth/sessions',
    authClient.getSessions,
    {
      revalidateOnFocus: true,
    }
  );

  const revokeSession = async (sessionId: string) => {
    await authClient.revokeSession(sessionId);
    mutate();
  };

  const revokeOtherSessions = async () => {
    await authClient.revokeOtherSessions();
    mutate();
  };

  return {
    sessions: data?.sessions || [],
    total: data?.total || 0,
    isLoading: !error && !data,
    isError: error,
    revokeSession,
    revokeOtherSessions,
    mutate,
  };
}
