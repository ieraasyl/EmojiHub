'use client';

import { useAuth } from '@/lib/auth/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoginButton from '@/components/auth/LoginButton';
import {
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  Grid,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={48} />
      </Container>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Grid container spacing={3} alignItems="stretch" justifyContent="center" sx={{ maxWidth: 900, mx: 'auto' }}>
        {/* Left Column - Login */}
        <Grid item xs={12} md={6}>
          <Paper
            variant="outlined"
            sx={{
              p: 6,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: 4,
            }}
          >
            <Stack spacing={3} alignItems="center">
              {/* Hero Emoji */}
              <Typography sx={{ fontSize: '48px', lineHeight: 1 }}>
                🎉
              </Typography>

              {/* Title and Subtitle */}
              <Box>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: { xs: '28px', sm: '32px' },
                    mb: 2,
                  }}
                >
                  Welcome to Emoji Hub
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#D1D1D1',
                    fontSize: '18px',
                    fontWeight: 400,
                  }}
                >
                  Log in to unlock your personal emoji experience
                </Typography>
              </Box>

              {/* Login Button */}
              <Box sx={{ width: '100%', mt: 1 }}>
                <LoginButton />
              </Box>

              {/* Legal Text */}
              <Typography
                variant="body2"
                sx={{
                  color: '#A0A0A0',
                  fontSize: '13px',
                  lineHeight: 2,
                  mt: 2,
                  maxWidth: '90%',
                  mx: 'auto',
                }}
              >
                By signing in, you agree to our{' '}
                <MuiLink
                  href="/terms"
                  sx={{
                    color: '#FFFFFF',
                    textDecoration: 'underline',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      color: '#FFFFFF',
                      opacity: 0.8,
                    }
                  }}
                >
                  Terms
                </MuiLink>{' '}
                and{' '}
                <MuiLink
                  href="/privacy"
                  sx={{
                    color: '#FFFFFF',
                    textDecoration: 'underline',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      color: '#FFFFFF',
                      opacity: 0.8,
                    }
                  }}
                >
                  Privacy Policy
                </MuiLink>
              </Typography>
            </Stack>
          </Paper>
        </Grid>

        {/* Right Column - Benefits */}
        <Grid item xs={12} md={6}>
          <Paper
            variant="outlined"
            sx={{
              p: 6,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
            }}
          >
            <Stack spacing={5}>
              {/* Header */}
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#FFFFFF',
                    fontSize: '24px',
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Your Personal Emoji Hub
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#D1D1D1',
                    fontSize: '16px',
                  }}
                >
                  Get the full experience with these benefits:
                </Typography>
              </Box>

              {/* Benefits List with Consistent Spacing */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Benefit 1 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Typography sx={{ fontSize: '24px', lineHeight: 1, flexShrink: 0 }}>
                    ❤️
                  </Typography>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: 600,
                        mb: 0.5,
                        lineHeight: 1.4,
                      }}
                    >
                      Your favorites, everywhere
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#B0B0B0',
                        fontSize: '15px',
                        lineHeight: 1.5,
                      }}
                    >
                      Never lose your top emojis. Access your collection from any device, anytime.
                    </Typography>
                  </Box>
                </Box>

                {/* Benefit 2 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Typography sx={{ fontSize: '24px', lineHeight: 1, flexShrink: 0 }}>
                    📊
                  </Typography>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: 600,
                        mb: 0.5,
                        lineHeight: 1.4,
                      }}
                    >
                      Rediscover your most-used emojis
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#B0B0B0',
                        fontSize: '15px',
                        lineHeight: 1.5,
                      }}
                    >
                      See your emoji history and quickly find the ones you use the most.
                    </Typography>
                  </Box>
                </Box>

                {/* Benefit 3 */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Typography sx={{ fontSize: '24px', lineHeight: 1, flexShrink: 0 }}>
                    🛡️
                  </Typography>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#FFFFFF',
                        fontSize: '16px',
                        fontWeight: 600,
                        mb: 0.5,
                        lineHeight: 1.4,
                      }}
                    >
                      Secure access from any device
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#B0B0B0',
                        fontSize: '15px',
                        lineHeight: 1.5,
                      }}
                    >
                      Manage your active sessions and keep your account safe wherever you go.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
