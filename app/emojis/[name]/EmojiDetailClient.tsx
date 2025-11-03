'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Emoji, DisplayMode } from '@/lib/types';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface EmojiDetailClientProps {
  emoji: Emoji;
}

export default function EmojiDetailClient({ emoji }: EmojiDetailClientProps) {
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('html');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchDescription = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/emojis/description?emoji=${encodeURIComponent(emoji.htmlCode[0])}`
        );
        const data = await response.json();
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching description:', error);
        setDescription('Express yourself! ✨');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescription();
  }, [emoji]);

  const displayCode = displayMode === 'html'
    ? emoji.htmlCode.join(' ')
    : emoji.unicode.join(' ');

  const handleCopy = () => {
    navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Button
        component={Link}
        href="/emojis"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Emojis
      </Button>

      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        {/* Emoji Display */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h1"
            component="div"
            dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
            sx={{ fontSize: '6rem' }}
          />
          <Typography variant="h3" component="h1" sx={{ textTransform: 'capitalize', mt: 2 }}>
            {emoji.name.replace(/-/g, ' ')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {emoji.category}
          </Typography>
        </Box>

        {/* AI Description */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.light} 10%, ${theme.palette.secondary.light} 90%)`,
            border: 'none',
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            🤖 AI Mood Description
          </Typography>
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CircularProgress size={24} />
              <Typography color="text.secondary">Generating description...</Typography>
            </Box>
          ) : (
            <Typography variant="body1" fontStyle="italic">"{description}"</Typography>
          )}
        </Paper>

        {/* Emoji Details */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="overline">Category</Typography>
              <Typography variant="h6">{emoji.category}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
              <Typography variant="overline">Group</Typography>
              <Typography variant="h6">{emoji.group}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Code Display */}
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Code</Typography>
            <ToggleButtonGroup
              value={displayMode}
              exclusive
              onChange={(e, newMode) => newMode && setDisplayMode(newMode)}
              aria-label="code display mode"
            >
              <ToggleButton value="html" aria-label="html code">HTML</ToggleButton>
              <ToggleButton value="unicode" aria-label="unicode">Unicode</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: 'action.hover', overflowX: 'auto' }}>
            <Typography component="code" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {displayCode}
            </Typography>
          </Paper>
          <Button
            onClick={handleCopy}
            fullWidth
            variant="contained"
            startIcon={<ContentCopyIcon />}
            sx={{ mt: 2 }}
          >
            Copy to Clipboard
          </Button>
          {copied && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Copied to clipboard!
            </Alert>
          )}
        </Paper>
      </Paper>
    </Box>
  );
}
