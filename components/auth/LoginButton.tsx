'use client';

import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function LoginButton() {
  const { login } = useAuth();

  return (
    <Button
      onClick={login}
      variant="contained"
      startIcon={<GoogleIcon />}
      sx={{
        backgroundColor: '#fff',
        color: '#757575',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      Log in with Google
    </Button>
  );
}
