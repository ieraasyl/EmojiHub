'use client';

import { useAuth } from '@/lib/auth/authContext';
import Link from 'next/link';
import { Typography, Button, Container, Box, Grid, Paper, Stack } from '@mui/material';

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={6} alignItems="center" textAlign="center">
        <Box>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to Emoji Hub{isAuthenticated && user ? `, ${user.name.split(' ')[0]}` : ''}!
          </Typography>
          <Typography variant="h4" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto' }}>
            Explore a world of emojis and express yourself with fun, creativity, and a touch of AI magic.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2.5}
          alignItems="center"
          justifyContent="center"
        >
          {!isLoading && !isAuthenticated && (
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              href="/login"
              sx={{ minWidth: 180 }}
            >
              Log in
            </Button>
          )}

          {isAuthenticated && (
            <>
              <Button 
                variant="contained" 
                size="large" 
                component={Link} 
                href="/emojis"
                sx={{ minWidth: 180 }}
              >
                Browse Emojis
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/dashboard"
                sx={{ 
                  minWidth: 180,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  }
                }}
              >
                Go to Dashboard
              </Button>
            </>
          )}
        </Stack>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h3" gutterBottom>🔍</Typography>
              <Typography variant="h5" gutterBottom>Search & Filter</Typography>
              <Typography variant="body2" color="text.secondary">
                Find the perfect emoji with powerful search, category filters, and smart sorting controls.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h3" gutterBottom>⭐</Typography>
              <Typography variant="h5" gutterBottom>Save Favorites</Typography>
              <Typography variant="body2" color="text.secondary">
                {isAuthenticated
                  ? 'Favorites stay in sync automatically—pick up right where you left off.'
                  : 'Log in to build and access your emoji collection from any device.'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, height: '100%', textAlign: 'center', border: (theme) => `1px solid ${theme.palette.divider}` }}>
              <Typography variant="h3" gutterBottom>🤖</Typography>
              <Typography variant="h5" gutterBottom>AI Descriptions</Typography>
              <Typography variant="body2" color="text.secondary">
                Unlock AI-generated mood blurbs for each emoji and find fresh ways to express yourself.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
