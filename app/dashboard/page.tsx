'use client';

import ProtectedRoute from '@/components/layout/ProtectedRoute';
import UserProfile from '@/components/auth/UserProfile';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { useEffect, useState } from 'react';
import authClient from '@/lib/auth/authClient';
import { useAuth } from '@/lib/auth/authContext';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Alert,
} from '@mui/material';

export default function DashboardPage() {
  const { favorites, isLoaded: favoritesLoaded } = useFavorites();
  const { user } = useAuth();
  const [sessionCount, setSessionCount] = useState<number | null>(null);
  const [memberSince, setMemberSince] = useState<string>('Today');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await authClient.getSessions();
        setSessionCount(response.sessions.length);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  useEffect(() => {
    if (user?.created_at) {
      const createdDate = new Date(user.created_at);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        setMemberSince('Today');
      } else if (diffDays === 1) {
        setMemberSince('Yesterday');
      } else if (diffDays < 30) {
        setMemberSince(`${diffDays} days ago`);
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        setMemberSince(`${months} month${months > 1 ? 's' : ''} ago`);
      } else {
        const years = Math.floor(diffDays / 365);
        setMemberSince(`${years} year${years > 1 ? 's' : ''} ago`);
      }
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            background: (theme) => `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* User Profile Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Your Profile
              </Typography>
              <UserProfile />
            </Paper>
          </Grid>

          {/* Quick Actions Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  component={Link}
                  href="/emojis"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Browse Emojis
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  href="/sessions"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Manage Sessions
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Statistics Card */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Your Stats
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography color="text.secondary">Favorite Emojis</Typography>
                  <Typography variant="h4" component="span" color="primary" fontWeight="bold">
                    {favoritesLoaded ? favorites.length : '--'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography color="text.secondary">Active Sessions</Typography>
                  <Typography variant="h4" component="span" color="secondary" fontWeight="bold">
                    {sessionCount !== null ? sessionCount : '--'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography color="text.secondary">Member Since</Typography>
                  <Typography variant="body1" color="text.primary">
                    {memberSince}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Alert
          severity="success"
          variant="outlined"
          sx={{
            mt: 5,
            borderColor: 'rgba(129, 210, 136, 0.4)',
            backgroundColor: 'rgba(129, 210, 136, 0.08)',
          }}
        >
          Welcome to your dashboard! Start exploring emojis and building your favorite collection - everything stays synced automatically.
        </Alert>
      </Container>
    </ProtectedRoute>
  );
}
