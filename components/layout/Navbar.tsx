'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import LogoutButton from '@/components/auth/LogoutButton';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        borderRadius: 2,
        mx: 16,
        my: 2,
        boxShadow: 2,
        top: 16,
        left: 128,
        right: 128,
        width: 'auto'
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, py: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            '& a': {
              color: 'inherit',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
            },
          }}
        >
          <Link href="/" passHref>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              Emoji Hub
            </Box>
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Main Navigation Group */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link} 
              href="/emojis"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                py: 0.75,
                px: 1.5,
                fontSize: '0.875rem',
                '&:hover': { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.08)' }
              }}
            >
              Browse Emojis
            </Button>

            {!isLoading && isAuthenticated && (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  href="/dashboard"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    py: 0.75,
                    px: 1.5,
                    fontSize: '0.875rem',
                    '&:hover': { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                  }}
                >
                  Dashboard
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  href="/sessions"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    py: 0.75,
                    px: 1.5,
                    fontSize: '0.875rem',
                    '&:hover': { color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.08)' }
                  }}
                >
                  Sessions
                </Button>
              </>
            )}
          </Box>

          {/* User Account Group */}
          {!isLoading && isAuthenticated && (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1.5,
                borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                ml: 1,
                pl: 3
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                  fontSize: '0.875rem'
                }}
              >
                Hi, {user?.name.split(' ')[0]}
              </Typography>
              <LogoutButton />
            </Box>
          )}

          {!isLoading && !isAuthenticated && (
            <Button 
              variant="outlined" 
              component={Link} 
              href="/login"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                py: 0.5,
                px: 2,
                fontSize: '0.875rem',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'white'
                }
              }}
            >
              Log in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
