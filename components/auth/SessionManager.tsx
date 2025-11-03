'use client';

import { useState } from 'react';
import { useSessions } from '@/lib/auth/authHooks';
import {
  Box,
  Button,
  Chip,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import DevicesIcon from '@mui/icons-material/Devices';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LogoutIcon from '@mui/icons-material/Logout';
import CelebrationIcon from '@mui/icons-material/Celebration';

export default function SessionManager() {
  const { sessions, isLoading, revokeSession, revokeOtherSessions } = useSessions();
  const [revoking, setRevoking] = useState<string | null>(null);
  const [revokingAll, setRevokingAll] = useState(false);

  const handleRevokeSession = async (sessionId: string) => {
    if (confirm('Are you sure you want to revoke this session?')) {
      setRevoking(sessionId);
      try {
        await revokeSession(sessionId);
      } catch (error) {
        console.error('Failed to revoke session:', error);
        alert('Failed to revoke session. Please try again.');
      } finally {
        setRevoking(null);
      }
    }
  };

  const handleRevokeAll = async () => {
    if (confirm('Are you sure you want to logout from all other devices?')) {
      setRevokingAll(true);
      try {
        await revokeOtherSessions();
        alert('Successfully logged out from all other devices.');
      } catch (error) {
        console.error('Failed to revoke sessions:', error);
        alert('Failed to revoke sessions. Please try again.');
      } finally {
        setRevokingAll(false);
      }
    }
  };

  if (isLoading) {
    return (
      <Stack spacing={2.5}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            height={96}
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }}
          />
        ))}
      </Stack>
    );
  }

  const currentSession = sessions.find((session) => session.is_current);
  const otherSessions = sessions.filter((session) => !session.is_current);

  // Helper function to format device info
  const formatDeviceInfo = (session: any): string => {
    const deviceInfo = session.device || session.device_info;
    if (!deviceInfo || deviceInfo === 'Unknown Device') {
      return 'Unknown Device';
    }
    return deviceInfo;
  };

  // Helper function to format date
  const formatSessionDate = (session: any): string => {
    const dateValue = session.last_used || session.created_at;
    if (!dateValue) return 'Unknown';
    try {
      // Check if it's a Unix timestamp (number or numeric string)
      if (typeof dateValue === 'number' || !isNaN(Number(dateValue))) {
        const timestamp = Number(dateValue);
        const date = new Date(timestamp * 1000);
        if (isNaN(date.getTime())) return 'Unknown';
        return date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      }
      // Otherwise, treat it as an ISO date string
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return 'Unknown';
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return 'Unknown';
    }
  };

  return (
    <Stack spacing={4}>
      {currentSession && (
        <Stack spacing={2}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <SmartphoneIcon color="success" />
            <Typography variant="h6">Current Session</Typography>
          </Stack>
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: 'rgba(129, 210, 136, 0.06)',
              borderColor: 'rgba(129, 210, 136, 0.3)',
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {formatDeviceInfo(currentSession)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentSession.location && `${currentSession.location} · `}IP: {currentSession.ip_address}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Last used {formatSessionDate(currentSession)}
                </Typography>
              </Box>
              <Chip label="Active" color="success" variant="outlined" />
            </Stack>
          </Paper>
        </Stack>
      )}

      {otherSessions.length > 0 && (
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <DevicesIcon color="secondary" />
              <Typography variant="h6">
                Other Sessions ({otherSessions.length})
              </Typography>
            </Stack>
            <Button
              onClick={handleRevokeAll}
              disabled={revokingAll}
              startIcon={<LogoutIcon />}
              variant="outlined"
              color="warning"
            >
              {revokingAll ? 'Revoking...' : 'Logout All Other Devices'}
            </Button>
          </Stack>

          <Stack spacing={2}>
            {otherSessions.map((session) => (
              <Paper
                key={session.id}
                variant="outlined"
                sx={{
                  p: { xs: 3, md: 4 },
                  '&:hover': {
                    borderColor: 'rgba(208, 188, 255, 0.6)',
                    backgroundColor: 'rgba(208, 188, 255, 0.04)',
                  },
                }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {formatDeviceInfo(session)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {session.location && `${session.location} · `}IP: {session.ip_address}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last used {formatSessionDate(session)}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => handleRevokeSession(session.id)}
                    disabled={revoking === session.id}
                    variant="contained"
                    color="error"
                    sx={{ minWidth: 100 }}
                  >
                    {revoking === session.id ? 'Revoking...' : 'Revoke'}
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Stack>
      )}

      {otherSessions.length === 0 && currentSession && (
        <Stack spacing={1} alignItems="center" textAlign="center" sx={{ py: 2 }}>
          <CelebrationIcon color="secondary" sx={{ fontSize: 40 }} />
          <Typography color="text.secondary">
            You are only logged in on this device.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
