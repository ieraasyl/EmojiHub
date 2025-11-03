'use client';

import { useAuth } from '@/lib/auth/authContext';
import { Box, Avatar, Typography, Skeleton, Stack } from '@mui/material';

export default function UserProfile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <Skeleton variant="circular" width={64} height={64} />
        <Stack spacing={1} sx={{ flex: 1 }}>
          <Skeleton variant="text" width={150} height={24} />
          <Skeleton variant="text" width={120} height={20} />
        </Stack>
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Not logged in
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
      <Avatar
        src={user.picture_url || undefined}
        alt={user.name}
        sx={{
          width: 64,
          height: 64,
          fontSize: '1.5rem',
          bgcolor: 'primary.main',
          border: (theme) => `3px solid ${theme.palette.primary.main}`,
        }}
      >
        {!user.picture_url && user.name.charAt(0).toUpperCase()}
      </Avatar>
      <Box>
        <Typography variant="h6" component="h3" fontWeight="semibold">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
}
