'use client';

import { SortBy } from '@/lib/types';
import { TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

interface SearchBarProps {
  search: string;
  sortBy: SortBy;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortBy) => void;
}

export default function SearchBar({
  search,
  sortBy,
  onSearchChange,
  onSortChange,
}: SearchBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}
    >
      <TextField
        label="Search emojis..."
        variant="outlined"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flex: 1 }}
      />
      <FormControl
        variant="outlined"
        sx={{ minWidth: { xs: '100%', sm: 180 } }}
      >
        <InputLabel>Sort by</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortBy)}
          label="Sort by"
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="category">Category</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
