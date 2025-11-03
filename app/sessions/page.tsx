"use client";

import ProtectedRoute from '@/components/layout/ProtectedRoute';
import SessionManager from '@/components/auth/SessionManager';
import {
  Alert,
  AlertTitle,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function SessionsPage() {
  return (
    <ProtectedRoute>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={4}>
          <Box>
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
              Session Management
            </Typography>
            <Typography color="text.secondary">
              View and manage every device signed in to your Emoji Hub account.
            </Typography>
          </Box>

          <Alert
            severity="warning"
            variant="outlined"
            icon={<span role="img" aria-label="warning">⚠️</span>}
            sx={{
              borderColor: 'rgba(249, 222, 129, 0.4)',
              backgroundColor: 'rgba(249, 222, 129, 0.08)',
            }}
          >
            <AlertTitle>Security Notice</AlertTitle>
            If you see any suspicious activity or do not recognize a session, revoke it immediately and consider changing your password.
          </Alert>

          <SessionManager />

          <Paper
            variant="outlined"
            sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: 'rgba(208, 188, 255, 0.06)',
            }}
          >
            <Typography variant="h6" gutterBottom>
              💡 Session Security Tips
            </Typography>
            <List dense disablePadding>
              {[
                'Regularly review your active sessions.',
                'Log out from public or shared devices after use.',
                "Revoke sessions you don't recognize right away.",
                'Use "Logout All Other Devices" if you suspect unauthorized access.',
              ].map((tip) => (
                <ListItem key={tip} disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon fontSize="small" color="success" />
                  </ListItemIcon>
                  <ListItemText primary={tip} primaryTypographyProps={{ color: 'text.secondary' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Stack>
      </Container>
    </ProtectedRoute>
  );
}
