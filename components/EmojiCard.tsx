'use client';

import Link from 'next/link';
import { Emoji } from '@/lib/types';
import { Card, CardContent, Typography, Button, Box, CardActionArea, Stack } from '@mui/material';

interface EmojiCardProps {
  emoji: Emoji;
  isFavorite: boolean;
  onFavorite: (emoji: Emoji) => void;
}

export default function EmojiCard({ emoji, isFavorite, onFavorite }: EmojiCardProps) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea
        component={Link}
        href={`/emojis/${encodeURIComponent(emoji.name)}`}
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          p: 2,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
          },
          '&:hover span': { transform: 'scale(1.08)' },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack spacing={2} alignItems="center">
            <Box
              component="span"
              sx={{
                fontSize: '3.5rem',
                transition: 'transform 0.2s ease',
                lineHeight: 1,
              }}
              dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
            />
            <Typography variant="h6" component="h3" sx={{ textTransform: 'capitalize' }}>
              {emoji.name.replace(/-/g, ' ')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {emoji.category}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={(event) => {
            event.preventDefault();
            onFavorite(emoji);
          }}
          variant={isFavorite ? 'contained' : 'outlined'}
          color={isFavorite ? 'error' : 'secondary'}
          sx={{ mt: 'auto' }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          fullWidth
        >
          {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
        </Button>
      </Box>
    </Card>
  );
}
