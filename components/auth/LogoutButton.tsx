'use client';

import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@mui/material';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      onClick={logout}
      variant="outlined"
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
      Logout
    </Button>
  );
}
