'use client';

import { useState, useEffect } from 'react';
import { Emoji } from '@/lib/types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Emoji[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('emoji-favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('emoji-favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (emoji: Emoji) => {
    setFavorites((prev) => {
      const exists = prev.find((e) => e.name === emoji.name);
      if (exists) {
        return prev.filter((e) => e.name !== emoji.name);
      } else {
        return [...prev, emoji];
      }
    });
  };

  const isFavorite = (emoji: Emoji): boolean => {
    return favorites.some((e) => e.name === emoji.name);
  };

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
