'use client';

import { useState, useMemo } from 'react';
import { Emoji, SortBy, ViewMode } from '@/lib/types';
import EmojiCard from './EmojiCard';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { useFavorites } from '@/hooks/useFavorites';
import { Grid, Typography, Box, CircularProgress, Button, Stack, Chip } from '@mui/material';

interface EmojiListProps {
  initialEmojis: Emoji[];
}

const EMOJIS_PER_PAGE = 20;

export default function EmojiList({ initialEmojis }: EmojiListProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

  // Filter and sort emojis
  const processedEmojis = useMemo(() => {
    let filtered = initialEmojis;

    // Apply view mode filter
    if (viewMode === 'favorites') {
      filtered = filtered.filter((emoji) => isFavorite(emoji));
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (emoji) =>
          emoji.name.toLowerCase().includes(searchLower) ||
          emoji.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return a.category.localeCompare(b.category);
      }
    });

    return sorted;
  }, [initialEmojis, search, sortBy, viewMode, isFavorite]);

  // Pagination
  const totalPages = Math.ceil(processedEmojis.length / EMOJIS_PER_PAGE);
  const startIndex = (currentPage - 1) * EMOJIS_PER_PAGE;
  const paginatedEmojis = processedEmojis.slice(
    startIndex,
    startIndex + EMOJIS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortBy) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 3, md: 6 } }}>
      <Typography
        variant="h2"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          background: (theme) => `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Explore Emojis
      </Typography>

      <Typography align="center" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', mb: 3 }}>
        Filter, sort, and curate the perfect list. Favorites stay at your fingertips across every device.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" spacing={2.5} sx={{ mb: 4 }}>
        <Button
          variant={viewMode === 'all' ? 'contained' : 'outlined'}
          color={viewMode === 'all' ? 'primary' : 'inherit'}
          onClick={() => handleViewModeChange('all')}
          aria-pressed={viewMode === 'all'}
        >
          All Emojis
          <Chip
            label={initialEmojis.length}
            size="small"
            sx={{ 
              ml: 1, 
              bgcolor: viewMode === 'all' ? 'rgba(0,0,0,0.3)' : 'rgba(208,188,255,0.2)',
              color: 'white' 
            }}
          />
        </Button>
        <Button
          variant={viewMode === 'favorites' ? 'contained' : 'outlined'}
          color={viewMode === 'favorites' ? 'secondary' : 'inherit'}
          onClick={() => handleViewModeChange('favorites')}
          aria-pressed={viewMode === 'favorites'}
        >
          ❤️ Favorites
          <Chip
            label={favorites.length}
            size="small"
            sx={{ 
              ml: 1, 
              bgcolor: viewMode === 'favorites' ? 'rgba(0,0,0,0.3)' : 'rgba(242,184,198,0.2)',
              color: 'white' 
            }}
          />
        </Button>
      </Stack>

      {/* Search and Sort */}
      <SearchBar
        search={search}
        sortBy={sortBy}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      {/* Results Count */}
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Showing {processedEmojis.length} emoji{processedEmojis.length !== 1 ? 's' : ''}
      </Typography>

      {/* Emoji Grid */}
      {paginatedEmojis.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {paginatedEmojis.map((emoji) => (
              <Grid item key={emoji.name} xs={12} sm={6} md={4} lg={3}>
                <EmojiCard
                  emoji={emoji}
                  isFavorite={isFavorite(emoji)}
                  onFavorite={toggleFavorite}
                />
              </Grid>
            ))}
          </Grid>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h2" sx={{ fontSize: '3.5rem' }}>😢</Typography>
          <Typography variant="h5" gutterBottom>
            No emojis found
          </Typography>
          <Typography color="text.secondary">
            {viewMode === 'favorites'
              ? "You haven't added any favorites yet. Browse emojis and tap the heart to save them."
              : 'Try refining your search terms or switching the sort order.'}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
